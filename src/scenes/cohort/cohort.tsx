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
  saveUpdatedClassroomToCohort,
  notifySlackWithUpcomingClassDetails
} from '../../state/actions/cohortActions';
import {
  convertObjectToValuesArray,
  sortClassroomsByDate,
  formatISOStringDate,
  getSelectedClassroom
} from '../../helpers';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { formatModuleObjects } from '../../state/selectors';
import { ReplCohortCard } from './replCohort.component';

interface CohortCalendarProps {
  cohort: any,
  classrooms: any[],
  handleDayClick: (day: any) => void,
  handleNotifyClick: (cohortID: string, slackChannel: string) => void,
}

interface CohortCalendarState {
  slackChannel: string
}

class CohortCalendar extends React.Component<CohortCalendarProps, CohortCalendarState> {
  state = {
    slackChannel: ''
  }

  onSlackChannelChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      slackChannel: value
    });
  }

  render() {
    const {cohort, classrooms, handleDayClick} = this.props;

    return (
      <Card style={{minWidth: '65%', minHeight: '360px', height: '360px', display: 'flex', alignItems: 'center'}}>
        <CardContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} className="flex-grow-1 h-100">
          <div>
            <Typography variant="h6"> {cohort && cohort.cohortName} </Typography>
            <Typography variant="caption"> Upcoming classes </Typography>
            <Typography variant="body1" className="flex flex-column" style={{display: 'flex'}}>
              {classrooms.map(classroom =>
                (<Link key={classroom.id} to={`/cohorts/${cohort.id}/classrooms/${classroom.id}`}>{formatISOStringDate(classroom.day)}</Link>))}
            </Typography>
          </div>
          <div>
            <Typography variant="caption"> Notify Slack </Typography>
            <input
              type="text"
              onChange={this.onSlackChannelChange}
              value={this.state.slackChannel}
              placeholder="Enter Slack channel..."
            />
            <Button onClick={() => this.props.handleNotifyClick(this.props.cohort.id, this.state.slackChannel)} color="primary">
                Notify
            </Button>
          </div>
        </CardContent>
        <CardContent className="flex-grow-1">
          <CalendarComponent
            onDayClick={handleDayClick}
            disabledDays={{before: new Date(cohort.startDate)}}
            initialMonth={new Date(cohort.startDate)}
            selectedDays={convertObjectToValuesArray(cohort.classrooms || {}).map((classroom) => new Date(classroom.day))}
          />
        </CardContent>
      </Card>
    );
  }
}

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
     replCohortData,
     notifySlack
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
        handleNotifyClick ={notifySlack}
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
  saveUpdatedClassroom: saveUpdatedClassroomToCohort,
  notifySlack: notifySlackWithUpcomingClassDetails
})(CohortSceneComponent);

export const CohortScene = ({match}) => (
  <Switch>
    <Route exact={true} path={`${match.path}`} component={CohortStateful} />
    <Route path={`${match.path}/classrooms/:id`} component={ClassroomScene} />
  </Switch>
);
