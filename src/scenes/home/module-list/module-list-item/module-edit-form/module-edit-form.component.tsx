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

interface TextFieldGroupInterface {
  fieldName: string; 
  list: string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const TextFieldGroup = ({fieldName, list, onChange, onClick}: TextFieldGroupInterface) => {
  return (
    <div className="textfield-group">
      {
        list && list.map((value, index) => {
          return (
            <TextField
              autoFocus={true}
              key={index}
              data-index={index}
              id={`${fieldName}-${index}`}
              name={fieldName}
              defaultValue={value}
              inputProps={{'data-index': index}}
              label={fieldName}
              margin="dense"
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
    this.props.submitUpdatedModule(this.state.currentModule, this.state.currentModuleIndex);
    this.toggleModal();
  }

  render() {
    const textFields = ['name', 'complexity', 'content', 'homework', 'slides'];
    const textFieldGroups = ['extras', 'challenges'];
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
              {
                textFields.map((prop, index) => {
                  return (
                    <TextField
                      key={index}
                      autoFocus={true}
                      defaultValue={this.state.currentModule[prop].toString()}
                      margin="dense"
                      id={prop}
                      label={prop}
                      type="text"
                      onChange={(e) => this.updateTextFieldInputValue(e)}
                      fullWidth={true}
                    />
                  );
                })
              }
              {
                textFieldGroups.map((prop, index) => {
                  return (
                    <TextFieldGroup 
                      key={index}
                      fieldName={prop} 
                      list={this.state.currentModule[prop]} 
                      onChange={(e) => this.updateTextFieldGroupValue(e)}
                      onClick={(e) => this.addNewFormField(prop)}
                    />
                  );
                })
              }
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