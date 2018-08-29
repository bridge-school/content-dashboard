import * as React from 'react';
import { connect } from 'react-redux';
import { RootReducerState } from '../../state/reducers';
import { ModuleComponent } from '../../components/content-module/content-module';
import { RouteComponentProps } from 'react-router';
import { CalendarComponent } from '../../components/calendar/calendar';
import { AddClassroomForm } from '../../components/calendar/add-classroom-form';
import { toggleCohortClassroomDialog, updateClassroomInEdit, saveClassroomToCohort } from '../../state/actions/cohortActions';
import { convertObjectToValuesArray } from '../../helpers';

const CohortSceneComponent = ({
  selectedCohort, 
  selectedModuleList, 
  selectedCohortClassroomDates, 
  classroomDialogIsOpen, 
  toggleDialog, 
  classroomInEdit,
  updateClassroom,
  saveClassroom
}) => {
  
  return (
  <div className="w-100 overflow-y-auto">
    <h2>{selectedCohort && selectedCohort.cohortName}</h2>
    <CalendarComponent 
      handleDayClick={(day) => {
          toggleDialog(true);
          updateClassroom({day: day.toUTCString()});
        }
      } 
      selectedDates={selectedCohortClassroomDates}
    />
    <AddClassroomForm 
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
    />
    {selectedModuleList.map(mod => <ModuleComponent key={mod.id} module={mod} />)}
  </div>
  )};

export const CohortScene = connect((state: RootReducerState, ownProps: RouteComponentProps<any>) => {
  return {
    classroomDialogIsOpen: state.cohort.classroomDialogIsOpen,
    classroomInEdit: state.cohort.classroomInEdit || {},
    selectedCohort: state.cohort.allCohorts[ownProps.match.params.name],
    selectedCohortClassroomDates: (state.cohort.allCohorts[ownProps.match.params.name] && state.cohort.allCohorts[ownProps.match.params.name].classrooms) ? convertObjectToValuesArray(state.cohort.allCohorts[ownProps.match.params.name].classrooms).map((classroom) => new Date(classroom.day)) : [],
    selectedModuleList: (state.cohort.allCohorts[ownProps.match.params.name] || {moduleIds: []})
      .moduleIds.map(id => state.module.allModules.find(m => m.id === id)).filter(Boolean)
  };
}, {
  toggleDialog: toggleCohortClassroomDialog,
  updateClassroom: updateClassroomInEdit,
  saveClassroom: saveClassroomToCohort
})(CohortSceneComponent);
