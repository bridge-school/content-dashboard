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
  saveClassroomToCohort,
  saveUpdatedClassroomToCohort
} from '../../state/actions/cohortActions';
import { 
  convertObjectToValuesArray, 
  sortClassroomsByDate,
  formatISOStringDate,
  getSelectedClassroom
} from '../../helpers';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { formatModuleObjects } from '../../state/selectors';
import { ReplCohortCard } from './replCohort.component';

const CohortCalendar = ({cohort, handleDayClick, classrooms = []}) => (
  <Card style={{minWidth: '65%', minHeight: '360px', height: '360px', display: 'flex', alignItems: 'center'}}>
    <CardContent className="flex-grow-1 h-100">
      <Typography variant="title"> {cohort && cohort.cohortName} </Typography>
      <Typography variant="caption"> Upcoming classes </Typography>
      <Typography variant="body1" className="flex flex-column" style={{display: 'flex'}}>
        {classrooms.map(classroom =>
          (<Link key={classroom.id} to={`/cohorts/${cohort.id}/classrooms/${classroom.id}`}>{formatISOStringDate(classroom.day)}</Link>))}
      </Typography>
    </CardContent>
    <CardContent className="flex-grow-1">
      <CalendarComponent
        onDayClick={handleDayClick}
        disabledDays={{before: new Date(cohort.startDate)}}
        initialMonth={new Date(cohort.startDate)}
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
     saveUpdatedClassroom,
     defaultClassStartTime,
     defaultClassEndTime,
     cohortClassrooms,
     replCohortData
   }) => (
    <React.Fragment>
      { selectedCohort ? <CohortCalendar
        classrooms={cohortClassrooms}
        cohort={selectedCohort}
        handleDayClick={(day) => {
          const selectedClassroom = getSelectedClassroom(cohortClassrooms, day.toISOString());
          toggleDialog(true);
          selectedClassroom.length > 0 ? updateClassroom(selectedClassroom[0]) : updateClassroom({
            day: day.toISOString(),
            endTime: defaultClassEndTime,
            startTime: defaultClassStartTime,
          });
        }}
      /> : '...loading' }

      <ReplCohortCard students={replCohortData.students || []} teachers={replCohortData.teachers || []} />

      <AddClassroomFormModal
        isOpen={classroomDialogIsOpen}
        onClose={() => {
          toggleDialog(false);
          updateClassroom(null);
        }
        }
        onSave={(classroomId, classroom) => {
          classroomId ? saveUpdatedClassroom(selectedCohort.id, classroomId, classroom) : saveClassroom(selectedCohort.id, classroom);
        }}
        availableModules={selectedModuleList}
        classroom={classroomInEdit}
        updateClassroom={updateClassroom}
        defaultStartTime={defaultClassStartTime}
        defaultEndTime={defaultClassEndTime}
      />
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {selectedModuleList.map(mod => (
          <ModuleComponent
            key={`mod_${mod.id}`}
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
    replCohortData: state.cohort.replCohortData,
    selectedCohort: state.cohort.allCohorts[ownProps.match.params.name],
    cohortClassrooms: (state.cohort.allCohorts[ownProps.match.params.name] && state.cohort.allCohorts[ownProps.match.params.name].classrooms) ? convertObjectToValuesArray(state.cohort.allCohorts[ownProps.match.params.name].classrooms).filter(Boolean).sort(sortClassroomsByDate) : [],
    selectedModuleList: formatModuleObjects(state, ownProps.match.params.name),
    defaultClassStartTime: state.cohort.defaultClassStartTime || "",
    defaultClassEndTime: state.cohort.defaultClassEndTime || "",
  };
}, {
  toggleDialog: toggleCohortClassroomDialog,
  updateClassroom: updateClassroomInEdit,
  saveClassroom: saveClassroomToCohort,
  saveUpdatedClassroom: saveUpdatedClassroomToCohort
})(CohortSceneComponent);

export const CohortScene = ({match}) => (
  <Switch>
    <Route exact={true} path={`${match.path}`} component={CohortStateful} />
    <Route path={`${match.path}/classrooms/:id`} component={ClassroomScene} />
  </Switch>
);
