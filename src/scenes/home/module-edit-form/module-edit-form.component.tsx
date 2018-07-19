import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Button 
          variant="contained" 
          color="default"
          size="small"
          onClick={this.handleClickOpen}
        >
          Edit
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Module</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                autoFocus={true}
                defaultValue="Module Name"
                margin="dense"
                id="name"
                label="Name"
                type="text"
              />
              <TextField
                autoFocus={true}
                defaultValue="Module Complexity"
                margin="dense"
                id="complexity"
                label="Complexity"
                type="text"
              />
              <TextField
                autoFocus={true}
                defaultValue="Module Dependencies"
                margin="dense"
                id="dependencies"
                label="Dependencies"
                type="text"
                fullWidth={true}
              />
              <TextField
                autoFocus={true}
                defaultValue="Module Content"
                margin="dense"
                id="content"
                label="Content"
                type="text"
                fullWidth={true}
              />
              <TextField
                autoFocus={true}
                defaultValue="In Class Challenges"
                margin="dense"
                id="challenges"
                label="In Class Challenges"
                type="text"
                fullWidth={true}
              />
              <TextField
                autoFocus={true}
                defaultValue="Homework"
                margin="dense"
                id="homework"
                label="Homework"
                type="text"
                fullWidth={true}
              />
              <TextField
                autoFocus={true}
                defaultValue="Slides"
                margin="dense"
                id="slides"
                label="Slides"
                type="text"
                fullWidth={true}
              />
              <TextField
                autoFocus={true}
                defaultValue="Extras"
                margin="dense"
                id="extras"
                label="Extras"
                type="text"
                fullWidth={true}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}