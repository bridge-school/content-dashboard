import * as React from 'react';
import { connect } from 'react-redux';
import { RootReducerState } from '../../state/reducers';
import { ModuleComponent } from '../../components/content-module/content-module';
import { RouteComponentProps } from 'react-router';
import { CalendarComponent } from '../../components/calendar/calendar';
import { AddClassroomForm } from '../../components/calendar/add-classroom-form';
import { toggleCohortClassroomDialog } from '../../state/actions/cohortActions';

const CohortSceneComponent = ({selectedCohort, selectedModuleList, selectedDates, classroomDialogIsOpen, toggleDialog}) => (
  <div className="w-100 overflow-y-auto">
    <h2>{selectedCohort && selectedCohort.cohortName}</h2>
    <CalendarComponent handleDayClick={(day) => toggleDialog(true)} selectedDates={selectedDates}/>
    <AddClassroomForm isOpen={classroomDialogIsOpen} onClose={() => toggleDialog(false)} availableModules={selectedModuleList}/>
    {selectedModuleList.map(mod => <ModuleComponent key={mod.id} module={mod} />)}
  </div>);

export const CohortScene = connect((state: RootReducerState, ownProps: RouteComponentProps<any>) => {
  return {
    selectedDates: state.cohort.selectedDates,
    classroomDialogIsOpen: state.cohort.classroomDialogIsOpen,
    selectedCohort: state.cohort.allCohorts[ownProps.match.params.name],
    selectedModuleList: (state.cohort.allCohorts[ownProps.match.params.name] || {moduleIds: []})
      .moduleIds.map(id => state.module.allModules.find(m => m.id === id)).filter(Boolean)
  };
}, {
  toggleDialog: toggleCohortClassroomDialog
})(CohortSceneComponent);
