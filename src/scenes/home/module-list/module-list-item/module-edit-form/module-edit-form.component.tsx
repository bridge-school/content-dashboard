import * as React from 'react';
import { connect } from 'react-redux';
import { ContentModule } from '../../../../../constants';
import { Field, FieldArray, reduxForm, WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import { UpdateModule } from '../../../../../state/actions/editModule';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogActions } from '@material-ui/core';

const required = value => Boolean(value) ? undefined : 'Required';
const isValidNumber = value => value && !isNaN(value) && (value < 0 || value >= 5) ? 'Must be a number between 1 to 5' : undefined;
const formattedTitle = title => title.charAt(0).toUpperCase() + title.slice(1);

const DeleteButton = withStyles({
  root: {
    marginLeft: '0.4rem'
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const CustomDialogContent = withStyles({
  root: {
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingTop: 0,
    paddingBottom: 0
  }
})(DialogContent);

const CustomDialogActions = withStyles({
  root: {
    paddingBottom: '2rem',
    paddingRight: '1.5rem'
  }
})(DialogActions);

const renderTextField = ({
  input,
  meta,
  ...rest
}: {
  input?: WrappedFieldInputProps,
  meta?: WrappedFieldMetaProps
  }) => {
    return (
      <TextField
        required
        error={!!meta.error}
        autoFocus={true}
        margin="dense"
        type="text"
        fullWidth={true}
        label={formattedTitle(input.name)}
        onChange={value => input.onChange(value)}
        helperText={meta.touched && ((meta.error && <span>{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))}
        {...input}
        {...rest}
      />
    );
  };

  const renderTextFieldGroup = ({
    fields,
    meta,
  }: {
    fields?: any,
    meta?: WrappedFieldMetaProps
    }) => {
      return (
      <div className="mv3">
      <div className="flex justify-between items-start">
        <strong>{ formattedTitle(fields.name) }</strong>
        <Button
          onClick={() => fields.push()}
          variant="contained" color="primary" aria-label="Add New Item"
        >
          Add Link
        </Button>
      </div>
          {
            fields.map((field, index) => (
              <div className="flex items-end mv1" key={index}>
                <Field
                  name={field}
                  component={renderTextField}
                />
                <DeleteButton
                  onClick={() => fields.remove(index)}
                  variant="outlined" color="secondary" aria-label="Remove Item"
                >
                  Delete
                </DeleteButton>
              </div>
            ))
          }
      </div>)
    };

  const renderNumberField = ({
    input,
    meta,
    ...rest
  }: {
    input?: WrappedFieldInputProps,
    meta?: WrappedFieldMetaProps
    }) => {
      return (
        <TextField
          required
          error={!!meta.error}
          autoFocus={true}
          margin="dense"
          type="number"
          fullWidth={true}
          label={formattedTitle(input.name)}
          onChange={value => input.onChange((value))}
          helperText={meta.touched && ((meta.error && <span>{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))}
          {...input}
          {...rest}
        />
      );
    };

export const EditForm = (props) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      props.submitUpdatedModule(props.updatedFormValues.values, props.currentModuleIndex);
      props.toggleModal();
    }}>
      <CustomDialogContent>
        <Field
          name="name"
          component={renderTextField}
          validate={[ required ]}
        />
        <Field
          name="complexity"
          parse={value => parseInt(value, 10)}
          component={renderNumberField}
          validate={[ required, isValidNumber ]}
        />
        <Field
          name="content"
          component={renderTextField}
          validate={[ required ]}
        />
        <Field
          name="homework"
          component={renderTextField}
          validate={[ required ]}
        />
        <Field
          name="slides"
          component={renderTextField}
          validate={[ required ]}
        />
        <FieldArray name="extras" component={renderTextFieldGroup} />
        <FieldArray name="challenges" component={renderTextFieldGroup} />
      </CustomDialogContent>
      <CustomDialogActions>
        <Button variant="outlined" color="primary" type="submit" disabled={props.pristine || props.submitting}>
          Submit
        </Button>
        <Button variant="contained" color="primary" type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>
          Undo Changes
        </Button>
        <Button onClick={() => props.toggleModal()} variant="outlined" type="button">
          X Close
        </Button>
      </CustomDialogActions>
    </form>
  );
}

export const ReduxEditFormFragment = reduxForm({
  form: 'editForm' // a unique identifier for this form
  // add validation functions here
})(EditForm) as any;

export const ReduxEditForm = connect(
  (state: any, ownProps: any) => ({
    currentModuleIndex: state.module.modules.findIndex(mod => mod.id === ownProps.id),
    initialValues: state.module.modules.find(mod => mod.id === ownProps.id),
    updatedFormValues: state.form.editForm,
  }), 
  {
    submitUpdatedModule: UpdateModule,
  }
)(ReduxEditFormFragment); 


/**
 * 
 * The EditFormModal contain the Editform that is wrapped in reduxForm
 * The EditFormModal pass props to Editform
 * 
 * **/
interface FormDialogProps {
  id: string;
  modules: ContentModule[];
}

interface FormDialogState {
  open: boolean;
}
export class EditFormModal extends React.Component<FormDialogProps, FormDialogState> {
  state = {
    open: false,
  };

  toggleModal = () => {
    this.setState({ 
      open: !this.state.open 
    });
  }

  handleModuleUpdate = (e) => {
    e.preventDefault();
    this.toggleModal();
  }

  render() {
    return (
      <div>
        <Button 
          variant="contained" 
          color="default"
          size="small"
          onClick={this.toggleModal}
        >
          Edit
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.toggleModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" style={{ paddingTop: '2rem', paddingBottom: 0 }}>Edit Module</DialogTitle>
            <ReduxEditForm 
             id={this.props.id}
             toggleModal={this.toggleModal}
            />
        </Dialog>
      </div>
    );
  }
}