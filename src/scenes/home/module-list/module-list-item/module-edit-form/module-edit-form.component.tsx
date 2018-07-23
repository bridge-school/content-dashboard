import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootReducerState } from '../../../../../state/reducers';
import { Action } from '../../../../../state/actions';
import { TypeKeys } from '../../../../../state/actions';
import { ContentModule } from '../../../../../constants';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  id: string;
  modules: ContentModule[];
  submitUpdatedModule: any;
}

interface State {
  open: boolean;
  currentModule: ContentModule;
}

class FormDialog extends React.Component<Props, State> {
  state = {
    open: false,
    currentModule: this.props.modules.find(mod => mod.id === this.props.id)
  };

  toggleModal = () => {
    this.setState({ open: !this.state.open });
  }

  updateInputValue = (e) => {
    const {target: {id, value}} = e;
    this.setState({
      currentModule: {
        ...this.state.currentModule,
        [id]: value
      }
    });
  }

  handleModuleUpdate = (e) => {
    e.preventDefault();
    this.props.submitUpdatedModule(this.state.currentModule);
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
                onChange={(e) => this.updateInputValue(e)}
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
  (dispatch: Dispatch<Action>) => ({
    submitUpdatedModule: (item) => dispatch({type: TypeKeys.UPDATE_MODULE, payload: item}),
  })
)(FormDialog);

export {
  ConnectedEditForm as EditForm
};