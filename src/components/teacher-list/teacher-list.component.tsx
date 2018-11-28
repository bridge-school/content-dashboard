import * as React from 'react';
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  TextField,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Teacher } from '../../state/reducers/teacher';


interface TeacherListProps {
  user: any;
  teachers: Teacher[];
  onTeacherAdded?: Function;
  isEditMode?: boolean;
  teacherInEdit?: Teacher;
  onTeacherEdit?: Function;
}

export const TeacherList = ({
                              user,
                              teachers = [],
                              onTeacherAdded = null,
                              onTeacherEdit = null,
                              isEditMode = true,
                              teacherInEdit = {name: '', email: ''}
                            }: TeacherListProps) =>
  <React.Fragment>
    {teachers.map(teacher =>
      <ExpansionPanel style={{width: '50%'}}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography variant={'h4'}>{teacher.name}</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    )
    }

    {isEditMode &&
    <ExpansionPanel style={{width: '50%'}}>
      <ExpansionPanelSummary expanded={true}>
        <Typography variant={'h4'}>{teacherInEdit.name || 'Click here to add a teacher'}</Typography>
      </ExpansionPanelSummary>
      <Divider/>
      <ExpansionPanelDetails>
        <TextField
          label="Name"
          style={{marginBottom: '10px', marginRight: '20px', width: '30%'}}
          onChange={(e) => onTeacherEdit({...teacherInEdit, name: e.target.value})}
        />
        <TextField
          label="email"
          style={{marginBottom: '10px', width: '30%'}}
          onChange={(e) => onTeacherEdit({...teacherInEdit, email: e.target.value})}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
    }
  </React.Fragment>;
