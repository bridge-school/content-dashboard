import * as React from 'react';
import { connect } from 'react-redux';
import { RootReducerState } from 'state/reducers';
import { ModuleComponent } from '../../../components/content-module/content-module';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { formatDateStringWithoutTime, formatAmPmTime } from 'helpers';
import { Link } from 'react-router-dom';
import { formatModuleObjects } from '../../../state/selectors';

export const ClassroomDetailComponent =
  ({
    selectedClassroom,
    selectedCohort,
    classroomModules,
   }) => (
    <React.Fragment>

        { selectedCohort &&
            <Link to={`/cohorts/${selectedCohort.id}`} style={{ textDecoration: 'none' }}>
                <button className="bg-light-green bn ph3 pv2 pointer">Back to cohort page</button>
            </Link>
        }

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
      
    </React.Fragment>
  );

export const ClassroomStateful = connect((state: RootReducerState, ownProps: RouteComponentProps<any>) => {

    const classroomById = (state.cohort.allCohorts[ownProps.match.params.name] && state.cohort.allCohorts[ownProps.match.params.name].classrooms) ? 
    state.cohort.allCohorts[ownProps.match.params.name].classrooms[ownProps.match.params.id] : [];

    const classroomModuleIds = classroomById.modules || [];

    const selectedModuleList = formatModuleObjects(state, ownProps.match.params.name);

  return {
    ...ownProps,
    selectedCohort: state.cohort.allCohorts[ownProps.match.params.name],
    selectedClassroom: classroomById,
    classroomModules: selectedModuleList ? selectedModuleList.filter(module => classroomModuleIds.includes(module.id)) : [],
  };
}, {
})(ClassroomDetailComponent);

export const ClassroomScene = ({match}) => (
  <Switch>
    <Route exact={true} path={`${match.path}`} component={ClassroomStateful} />
  </Switch>
);
