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

interface Props {
  id: string;
  modules: ContentModule[];
  submitUpdatedModule: any;
}

interface State {
  open: boolean;
  currentModule: ContentModule;
  currentModuleIndex: number;
}

class FormDialog extends React.Component<Props, State> {
  state = {
    open: false,
    currentModule: this.props.modules.find(mod => mod.id === this.props.id),
    currentModuleIndex: this.props.modules.map(mod => mod.id).indexOf(this.props.id)
  };

  toggleModal = () => {
    this.setState({ open: !this.state.open });
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
    const {target: {id, value}} = e;
    const index = e.target.getAttribute('data-index');
    this.setState({
      currentModule: {
        ...this.state.currentModule,
        [id]: [
          ...this.state.currentModule[id].slice(0, index), 
          value, 
          ...this.state.currentModule[id].slice(index + 1)
        ]
      }
    });
    console.log(this.state.currentModule[id]);
  }

  handleModuleUpdate = (e) => {
    e.preventDefault();
    this.props.submitUpdatedModule(this.state.currentModule, this.state.currentModuleIndex);
    this.toggleModal();
  }

  addNewFormField = () => {
    this.setState({
      currentModule: {
        ...this.state.currentModule,
        challenges: this.state.currentModule.challenges.concat('') 
      }
    });
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
              {
                this.state.currentModule.challenges &&
                this.state.currentModule.challenges.map((challenge, index) => {
                  return (
                    <TextField
                        autoFocus={true}
                        key={index}
                        data-index={index}
                        defaultValue={challenge}
                        margin="dense"
                        id="challenges"
                        inputProps={{'data-index': index}}
                        label="Challenges"
                        type="text"
                        fullWidth={true}
                        onChange={(e) => this.updateArrayValue(e)}
                    />
                  );
                })
              }
              <Button
                variant="contained" 
                color="primary"
                size="small"
                onClick={this.addNewFormField}
              >
                Add link
              </Button>
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
              {
                this.state.currentModule.extras && 
                this.state.currentModule.extras.map((extra, index) => {
                  return (
                    <TextField
                        autoFocus={true}
                        key={index}
                        defaultValue={extra}
                        margin="dense"
                        id="extras"
                        label="Extras"
                        type="text"
                        fullWidth={true}
                        onChange={(e) => this.updateArrayValue(e)}
                    />
                  );
                })
              }
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