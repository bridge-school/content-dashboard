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

const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number between 1 to 5' : undefined;

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
  },
  label: {
    textTransform: 'capitalize',
  },
})(DialogContent);

const CustomDialogActions = withStyles({
  root: {
    paddingBottom: '2rem',
    paddingRight: '1.5rem'
  },
  label: {
    textTransform: 'capitalize',
  },
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
        label={input.name.slice(0, 1).toUpperCase() + input.name.slice(1)}
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
        <Button
          onClick={() => fields.push()}
          variant="contained" color="primary" aria-label="Add New Item"
        >
          Add Link
        </Button>
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
          label={input.name.slice(0, 1).toUpperCase() + input.name.slice(1)}
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
          validate={[ required, number ]}
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
  // currentModule: ContentModule;
  // currentModuleIndex: number;
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
            />
        </Dialog>
      </div>
    );
  }
}