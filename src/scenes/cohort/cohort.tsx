import * as React from 'react';
import { connect } from 'react-redux';
import { RootReducerState } from '../../state/reducers';
import { ModuleComponent } from '../../components/content-module/content-module';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { CalendarComponent } from '../../components/calendar/calendar';
import { ClassroomScene } from './classroom/classroom-detail';
import { AddClassroomFormModal } from '../../components/calendar/add-classroom-form-modal';
import {
  toggleCohortClassroomDialog,
  updateClassroomInEdit,
  saveClassroomToCohort
} from '../../state/actions/cohortActions';
import { convertObjectToValuesArray } from '../../helpers';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


const CohortCalendar = ({cohort, handleDayClick}) => (
  <Card style={{minWidth: '65%', minHeight: '360px', height: '360px', display: 'flex', alignItems: 'center'}}>
    <CardContent className="flex-grow-1 h-100">
      <Typography variant="title"> {cohort && cohort.cohortName} </Typography>
      <Typography variant="caption"> Upcoming classes </Typography>
      <Typography variant="body1" className="flex flex-column" style={{display: 'flex'}}>
        {convertObjectToValuesArray(cohort.classrooms || {}).map(classroom =>
          (<Link key={classroom.id} to={`/cohorts/${cohort.id}/classrooms/${classroom.id}`}>{classroom.day}</Link>))}
      </Typography>
    </CardContent>
    <CardContent className="flex-grow-1">
      <CalendarComponent
        handleDayClick={handleDayClick}
        selectedDates={convertObjectToValuesArray(cohort.classrooms || {}).map((classroom) => new Date(classroom.day))}
      />
    </CardContent>
</Card>);


const CohortSceneComponent =
  ({
     selectedCohort,
     selectedModuleList,
     classroomDialogIsOpen,
     toggleDialog,
     classroomInEdit,
     updateClassroom,
     saveClassroom,
     defaultClassStartTime,
     defaultClassEndTime,
   }) => (
    <React.Fragment>
      { selectedCohort ? <CohortCalendar
        cohort={selectedCohort}
        handleDayClick={(day) => {
          toggleDialog(true);
          updateClassroom({day: day.toUTCString(), startTime: defaultClassStartTime, endTime: defaultClassEndTime});
        }}
      /> : '...loading' }
      <AddClassroomFormModal
        isOpen={classroomDialogIsOpen}
        onClose={() => {
          toggleDialog(false);
          updateClassroom(null);
        }
        }
        onSave={(classroom) => saveClassroom(selectedCohort.id, classroom)}
        availableModules={selectedModuleList}
        classroom={classroomInEdit}
        updateClassroom={updateClassroom}
        defaultStartTime={defaultClassStartTime}
        defaultEndTime={defaultClassEndTime}
      />
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {selectedModuleList.map(mod => (
          <ModuleComponent
            key={mod.id}
            module={mod}
            cohortAssignments={selectedCohort.assignmentsGroupedByModule && selectedCohort.assignmentsGroupedByModule[mod.id]} />
        ))}
      </div>
    </React.Fragment>
  );

export const CohortStateful = connect((state: RootReducerState, ownProps: RouteComponentProps<any>) => {
  return {
    ...ownProps,
    classroomDialogIsOpen: state.cohort.classroomDialogIsOpen,
    classroomInEdit: state.cohort.classroomInEdit || {},
    selectedCohort: state.cohort.allCohorts[ownProps.match.params.name],
    selectedModuleList: (state.cohort.allCohorts[ownProps.match.params.name] || {moduleIds: []})
      .moduleIds.map(id => state.module.allModules.find(m => m.id === id)).filter(Boolean),
    defaultClassStartTime: state.cohort.defaultClassStartTime || "",
    defaultClassEndTime: state.cohort.defaultClassEndTime || "",
  };
}, {
  toggleDialog: toggleCohortClassroomDialog,
  updateClassroom: updateClassroomInEdit,
  saveClassroom: saveClassroomToCohort
})(CohortSceneComponent);

export const CohortScene = ({match}) => (
  <Switch>
    <Route exact={true} path={`${match.path}`} component={CohortStateful} />
    <Route path={`${match.path}/classrooms/:id`} component={ClassroomScene} />
  </Switch>
);
