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




const renderField = ({
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
)

const textFields = ['name', 'complexity', 'content', 'homework', 'slides'];

export const EditForm = (props) => {
  console.log(props);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      console.log('form is', props.updatedFormValues, props.id);
      console.log(props.submitUpdatedModule);
      // props.submitUpdatedModule(props.updatedFormValues, props.id)}
      }>
      {
        textFields.map((fieldname, index) => {
          return (
            <React.Fragment key={index}>
              <Field
                name={fieldname}
                component={renderField}
              />
            </React.Fragment>
          );
        })
      }
      <Button variant="contained" color="primary" type="submit" disabled={props.pristine || props.submitting}>
        Submit
      </Button>
      <Button variant="contained" color="secondary" type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>
        Undo Changes
      </Button>
    </form>
  );
}

export const ReduxEditFormFragment = reduxForm({
  form: 'editForm' // a unique identifier for this form
  // add validation functions here
})(EditForm) as any;

export const ReduxEditForm = connect(
  (state: any, ownProps: any) => ({
    initialValues: state.module.modules.find(mod => mod.id === ownProps.id),
    updatedFormValues: state.form.editForm
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
          <DialogContent>
            <ReduxEditForm 
             id={this.props.id}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}