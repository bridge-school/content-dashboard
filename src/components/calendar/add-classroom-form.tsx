import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
// import Chip from '@material-ui/core/Chip';

export const AddClassroomForm = ({isOpen, onClose, availableModules}) => {

    let modulesInThisClass = [];

    const handleChange = event => {
        modulesInThisClass = event.target.value;
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Create Classroom</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Set the date, time, and module content for your classroom here.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                />

                <Select
                    multiple
                    value={modulesInThisClass}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => {

                        console.log("selected", selected);
                        return (
                    <div className={"chip"}>
                        {/* {selected.map(value => (
                        <Chip key={value} label={value} className={"chip"} />
                        ))} */}
                    </div>
                    )}}
                >
                {availableModules.map(module => (
                <MenuItem
                    key={module.name}
                    value={module.name}
                    style={{
                    color:
                        modulesInThisClass.indexOf(module.name) === -1
                        ? "red"
                        : "indigo",
                    }}
                >
                    {module.name}
                </MenuItem>
                ))}
            </Select>



            </DialogContent>
            <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
            <Button onClick={onClose} color="primary">
                Add Classroom
            </Button>
            </DialogActions>
        </Dialog>

    );
}
