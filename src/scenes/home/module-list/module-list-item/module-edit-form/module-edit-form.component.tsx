import * as React from 'react';
import { connect } from 'react-redux';
import { ContentModule } from '../../../../../constants';
import { Field, reduxForm, WrappedFieldInputProps } from 'redux-form';
import { UpdateModule } from '../../../../../state/actions/editModule';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogActions } from '@material-ui/core';




const renderTextField = ({
  input,
  ...rest
}: {input?: WrappedFieldInputProps}) => (
  <TextField
    autoFocus={true}
    margin="dense"
    type="text"
    fullWidth={true}
    label={input.name}
    onChange={value => input.onChange(value)}
    {...input}
    {...rest}
  />
);

const renderNumberField = ({
  input,
  ...rest
}: {input?: WrappedFieldInputProps}) => (
  <TextField
    autoFocus={true}
    margin="dense"
    type="number"
    fullWidth={true}
    label={input.name}
    onChange={value => input.onChange(value)}
    {...input}
    {...rest}
  />
)

const textFields = ['name', 'complexity', 'content', 'homework', 'slides'];

export const EditForm = (props) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // pass in updated form value and the edited module index
      props.submitUpdatedModule(props.updatedFormValues.values, props.currentModuleIndex);
    }}>
      <DialogContent>
        {
          textFields.map((fieldname, index) => {
            if (fieldname === 'complexity') {
              return (
                <React.Fragment key={index}>
                  <Field
                    name={fieldname}
                    parse={value => parseInt(value, 10)}
                    component={renderNumberField}
                  />
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={index}>
                  <Field
                    name={fieldname}
                    component={renderTextField}
                  />
                </React.Fragment>
              );
            }
          })
        }
      </DialogContent>
      <DialogActions>
        <Button color="primary" type="submit" disabled={props.pristine || props.submitting}>
          Submit
        </Button>
        <Button color="secondary" type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>
          Undo Changes
        </Button>
      </DialogActions>
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
          <DialogTitle id="form-dialog-title">Edit Module</DialogTitle>
            <ReduxEditForm 
             id={this.props.id}
            />
        </Dialog>
      </div>
    );
  }
}