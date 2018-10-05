import * as React from 'react';
import { connect } from 'react-redux';
import { RootReducerState } from 'state/reducers';
import { ModuleComponent } from '../../../components/content-module/content-module';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { formatDateStringWithoutTime, formatAmPmTime } from 'helpers';
import { Link } from 'react-router-dom';
import {
  getClassroomByID,
  getClassroomIDFromSelectedClassroomID,
  getClassroomModules,
  getCohortByID
} from '../../../state/selectors';
import { Button, Paper } from '@material-ui/core';

const LinkButton = ({url, children, ...buttonProps}) => (
  <Link to={url} style={{textDecoration: 'none', pointerEvents: buttonProps.disabled ? 'none' : 'inherit'}}>
    <Button {...buttonProps}>{children}</Button>
  </Link>
);

export const ClassroomDetailComponent =
  ({
    selectedClassroom,
    selectedCohort,
    classroomModules,
     nextClassroomID,
     prevClassroomID,
   }) => (
    <React.Fragment>

      <Paper elevation={1} className="flex justify-between w-100" style={{minHeight: 'fit-content'}}>
        <LinkButton disabled={!Boolean(prevClassroomID)} color="primary" url={`/cohorts/${selectedCohort.id}/classrooms/${prevClassroomID}`}>Prev</LinkButton>
        { selectedCohort &&
          <LinkButton url={`/cohorts/${selectedCohort.id}`}>Back To Cohort</LinkButton>
        }
        <LinkButton disabled={!Boolean(nextClassroomID)} url={`/cohorts/${selectedCohort.id}/classrooms/${nextClassroomID}`} color="primary">Next</LinkButton>

      </Paper>


      {selectedClassroom ?
        <div className="classroom-detail">

          <p>
            <span className="b">Class Date: </span>
            { selectedClassroom.day ? formatDateStringWithoutTime(new Date(selectedClassroom.day)) : "" }
          </p>
          <p>
            <span className="b">Start Time: </span>
            { selectedClassroom.startTime ? formatAmPmTime(selectedClassroom.startTime) : "" }
          </p>
          <p>
            <span className="b">End Time: </span>
            { selectedClassroom.endTime ? formatAmPmTime(selectedClassroom.endTime) : "" }
          </p>

          <div className="flex">
            <div style={{marginRight: '40px'}}>
              <span className="b">Teachers</span>
              {selectedClassroom.teachers ? selectedClassroom.teachers.map((teacher) => <div key={teacher}>{teacher}</div>) : ''}
            </div>

            <div>
              <span className="b">Tas</span>
              {selectedClassroom.tas ? selectedClassroom.tas.map((ta) => <div key={ta}>{ta}</div>) : ''}
            </div>
          </div>


          { selectedClassroom.notes &&
          (
            <p>
              <span className="b">Additional Notes: </span>
              { selectedClassroom.notes }
            </p>
          )
          }

          <div className="modules-container">
            <p className="b">Modules in this class:</p>

            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              {classroomModules.map(mod => (
                <ModuleComponent
                  key={mod.id}
                  module={mod}
                  cohortAssignments={selectedCohort.assignmentsGroupedByModule && selectedCohort.assignmentsGroupedByModule[mod.id]} />
              ))}
            </div>
          </div>
        </div>
        : 'Loading...'}

    </React.Fragment>
  );

export const ClassroomStateful = connect((state: RootReducerState, ownProps: RouteComponentProps<any>) => {
  return {
    ...ownProps,
    selectedCohort: getCohortByID(state, ownProps.match.params.name),
    selectedClassroom: getClassroomByID(state, ownProps.match.params.name, ownProps.match.params.id),
    classroomModules: getClassroomModules(state, ownProps.match.params.name, ownProps.match.params.id),
    nextClassroomID: getClassroomIDFromSelectedClassroomID(state, ownProps.match.params.name, ownProps.match.params.id, 1),
    prevClassroomID: getClassroomIDFromSelectedClassroomID(state, ownProps.match.params.name, ownProps.match.params.id, -1)
  };
}, {
})(ClassroomDetailComponent);

export const ClassroomScene = ({match}) => (
  <Switch>
    <Route exact={true} path={`${match.path}`} component={ClassroomStateful} />
  </Switch>
);
