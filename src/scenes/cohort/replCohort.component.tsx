import { Card, CardContent, CardHeader, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import * as React from 'react';

export const ReplCohortCard = props => (
  <Card style={{minWidth: '65%', marginTop: '20px', minHeight: '360px', height: '360px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
    <CardHeader title="Repl Cohort data"/>
    <span style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
      <CardContent className="flex-grow-1 h-100">
      <Typography variant="caption"> Students </Typography>
      <List>
        {
          props.students.map(student => (
            <ListItem key={student.email}>
              <ListItemText primary={student.username}/>
            </ListItem>
          ))
        }
      </List>
    </CardContent>
    <CardContent className="flex-grow-1 h-100">
      <Typography variant="caption"> Teachers </Typography>
      <List>
        {
          props.teachers.map(teacher => (
            <ListItem key={teacher.email}>
              <ListItemText primary={teacher.username}/>
            </ListItem>
          ))
        }
      </List>
    </CardContent>
    </span>
  </Card>
);
