import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { formatDateStringWithoutTime } from '../../helpers';

export const AddClassroomFormModal = ({
        isOpen, 
        onClose, 
        availableModules, 
        classroom, 
        updateClassroom,
        onSave
    }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            classes={{
                root: 'add-classroom-dialog',
            }}
        >
            <DialogTitle id="form-dialog-title">Create Classroom</DialogTitle>
            <DialogContent>
                <DialogContentText
                    classes={{
                        root: 'add-classroom-text',
                    }}
                >
                    Set the date, time, and module content for your classroom here, as well as any classroom notes.
                </DialogContentText>
                
                {/* CLASSROOM DATE */}
                <DialogContentText
                    classes={{
                        root: 'add-classroom-text classroom-date',
                    }}
                >
                    {`Class Date: ${classroom.day ? formatDateStringWithoutTime(new Date(classroom.day)) : ""}`}
                </DialogContentText>
                
                {/* START TIME */}
                <FormControl style={{width: '100%', marginBottom: '20px'}}>
                    <TextField
                        id="start-time"
                        label="Class Start Time"
                        type="time"
                        defaultValue="18:30"
                        onChange={(event: any) => updateClassroom({...classroom, startTime: event.target.value || ""})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                </FormControl>

                {/* END TIME */}
                <FormControl style={{width: '100%', marginBottom: '20px'}}>
                    <TextField
                        id="end-time"
                        label="Class End Time"
                        type="time"
                        defaultValue="21:30"
                        onChange={(event: any) => updateClassroom({...classroom, endTime: event.target.value || ""})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                </FormControl>
                
                {/* MODULE PICKER */}
                <FormControl style={{width: '100%'}}>
                    <InputLabel htmlFor="select-multiple-chip">Select Modules</InputLabel>
                    <Select
                        multiple
                        classes={{
                            selectMenu: 'modules-select-menu'
                        }}
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                            }
                        }}
                        value={classroom.modules || []}
                        onChange={(event: any) => updateClassroom({...classroom, modules: event.target.value || []})}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected: string[]) => {
                            return (
                                <div>
                                    {selected.map(id => (
                                        <Chip 
                                            key={id} 
                                            label={availableModules.find((m) => m.id === id).name} 
                                            className={"chip"} 
                                        />
                                    ))}
                                </div>
                            )}}
                    >
                        {availableModules.map(module => (
                        <MenuItem
                            key={module.id}
                            value={module.id}
                            style={{
                            color:
                                (classroom.modules || []).includes(module.id)
                                ? "#470284"
                                : "black",
                            }}
                        >
                            {module.name}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl >

                {/* ADDITIONAL NOTES */}
                <FormControl style={{width: '100%'}}>
                    <TextField
                        onChange={(event: any) => updateClassroom({...classroom, notes: event.target.value || ""})}
                        id="notes"
                        label="Add Notes for this Classroom"
                        multiline={true}
                        value={classroom.notes || ""}
                        margin="normal"
                    />
                </FormControl>

            </DialogContent>
            <DialogActions>

                {/* CANCEL BUTTON */}
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>

                {/* SAVE CLASSROOM BUTTON */}
                <Button onClick={() => {
                    onSave(classroom);
                    onClose();
                }} color="primary">
                    Add Classroom
                </Button>

            </DialogActions>
        </Dialog>
    );
}
