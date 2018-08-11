import * as React from 'react';
import { connect } from 'react-redux';

import { RootReducerState } from '../../../../../state/reducers';
import { ContentModule } from '../../../../../constants';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { UpdateModule } from '../../../../../state/actions/editModule';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    autoFocus={true}
    defaultValue={this.state.currentModule.name}
    margin="dense"
    id="name"
    label="Name"
    type="text"
    onChange={(e) => this.updateInputValue(e)}
  />
);

interface TextFieldGroupInterface {
  fieldName: string; 
  list: string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const TextFieldGroup = ({fieldName, onChange, onClick, list}: TextFieldGroupInterface) => {
  return (
    <div className="textfield-group">
      {
        list && list.map((item, index) => {
          return (
            <TextField
              autoFocus={true}
              key={index}
              data-index={index}
              defaultValue={item}
              margin="dense"
              name={fieldName}
              id={`${fieldName}-${index}`}
              inputProps={{'data-index': index}}
              label={fieldName.toUpperCase()}
              type="text"
              fullWidth={true}
              onChange={onChange}
            />
          );
        })
      }
      <Button
        variant="contained" 
        color="primary"
        size="small"
        onClick={onClick}
      >
        Add link
      </Button>
    </div>
  );
};

interface FormDialogProps {
  id: string;
  modules: ContentModule[];
  submitUpdatedModule: any;
}

interface FormDialogState {
  open: boolean;
  currentModule: ContentModule;
  currentModuleIndex: number;
}

// todo: update to use redux form
class FormDialog extends React.Component<FormDialogProps, FormDialogState> {
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

  updateInputValue = ({target: {id, value}}) => {
    this.setState({
      currentModule: {
        ...this.state.currentModule,
        [id]: value
      }
    });
  }

  updateArrayValue = (e) => {
    const {target: {name, value}} = e;
    const index = e.target.getAttribute('data-index');
    this.setState({
      currentModule: {
        ...this.state.currentModule,
        [name]: [
          ...this.state.currentModule[name].slice(0, index), 
          value, 
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
    this.props.submitUpdatedModule(this.state.currentModule, this.state.currentModuleIndex);
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
            <form>
              <TextField
                autoFocus={true}
                defaultValue={this.state.currentModule.name}
                margin="dense"
                id="name"
                label="Name"
                type="text"
                onChange={(e) => this.updateInputValue(e)}
              />
              <TextField
                autoFocus={true}
                defaultValue={this.state.currentModule.complexity}
                margin="dense"
                id="complexity"
                label="Complexity"
                type="text"
                onChange={(e) => 
                  this.updateInputValue({target: {id: e.target.id, value: parseInt(e.target.value, 10)}})
                }
              />
              <TextField
                autoFocus={true}
                defaultValue={this.state.currentModule.content}
                margin="dense"
                id="content"
                label="Content"
                type="text"
                fullWidth={true}
                onChange={(e) => this.updateInputValue(e)}
              />
              <TextFieldGroup 
                fieldName="challenges" 
                list={this.state.currentModule.challenges} 
                onChange={(e) => this.updateArrayValue(e)}
                onClick={(e) => this.addNewFormField('challenges')}
              />
              <TextField
                autoFocus={true}
                defaultValue={this.state.currentModule.homework}
                margin="dense"
                id="homework"
                label="Homework"
                type="text"
                fullWidth={true}
                onChange={(e) => this.updateInputValue(e)}
              />
              <TextFieldGroup 
                fieldName="extras" 
                list={this.state.currentModule.extras} 
                onChange={(e) => this.updateArrayValue(e)}
                onClick={(e) => this.addNewFormField('extras')}
              />
              <TextField
                autoFocus={true}
                defaultValue={this.state.currentModule.slides}
                margin="dense"
                id="slides"
                label="Slides"
                type="text"
                fullWidth={true}
                onChange={(e) => this.updateInputValue(e)}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleModal} color="primary">
              Cancel
            </Button>
            <Button onClick={(e) => this.handleModuleUpdate(e)} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const ConnectedEditForm = connect(
  (state: RootReducerState) => ({
      modules: state.module.allModules,
  }),
  {
    submitUpdatedModule: UpdateModule,
  }
)(FormDialog);

export {
  ConnectedEditForm as EditForm
};