import * as React from 'react';
import { ContentModule } from '../../../../../constants';
import { Field, reduxForm, WrappedFieldInputProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const renderField = ({
  defaultValue,
  input,
  ...rest
}: {defaultValue: string, input?: WrappedFieldInputProps}) => (
  <TextField
    autoFocus={true}
    margin="dense"
    type="text"
    fullWidth={true}
    defaultValue={defaultValue}
    {...input}
    {...rest}
  />
)

const textFields = ['name', 'complexity', 'content', 'homework', 'slides'];

export const EditForm = (props) => {
  const { currentModule } = props;
  return (
    <form>
      {
        textFields.map((prop, index) => {
          return (
            <Field
              name={prop}
              component={renderField}
              defaultValue={String(currentModule[prop])}
              key={index}
            />
          );
        })
      }
    </form>
  );
}

export default reduxForm({
  form: 'editForm' // a unique identifier for this form
  // add validation functions here
})(EditForm)

/// TODO: Split it into two components


/**
 * 
 * The EditFormModal contain the Editform that is wrapped in reduxForm
 * The EditFormModal pass props to Editform
 * 
 * **/
interface FormDialogProps {
  id: string;
  modules: ContentModule[];
  onEdit: any;
}

interface FormDialogState {
  open: boolean;
  currentModule: ContentModule;
  currentModuleIndex: number;
}
export class EditFormModal extends React.Component<FormDialogProps, FormDialogState> {
  state = {
    open: false,
    currentModule: this.props.modules.find(mod => mod.id === this.props.id),
    currentModuleIndex: this.props.modules.map(mod => mod.id).indexOf(this.props.id)
  };

  toggleModal = () => {
    this.setState({ 
      open: !this.state.open 
    });
  }

  updateTextFieldInputValue = ({target: {id, value}}) => {
    const textFieldValue = isNaN(value) ? value.trim() : parseInt(value, 10);
    this.setState({
      currentModule: {
        ...this.state.currentModule,
        [id]: textFieldValue
      }
    });
  }

  updateTextFieldGroupValue = (e) => {
    const {target: {name, value}} = e;
    const index = e.target.getAttribute('data-index');
    this.setState({
      currentModule: {
        ...this.state.currentModule,
        [name]: [
          ...this.state.currentModule[name].slice(0, index), 
          value.trim(), 
          ...this.state.currentModule[name].slice(index + 1)
        ]
      }
    });
  }

  addNewFormField = (id: string) => {
    this.setState({
      currentModule: {
        ...this.state.currentModule,
        [id]: this.state.currentModule[id].concat('') 
      }
    });
  }

  handleModuleUpdate = (e) => {
    e.preventDefault();
    this.props.onEdit(this.state.currentModule, this.state.currentModuleIndex);
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
            <EditForm 
              currentModule={this.state.currentModule}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}