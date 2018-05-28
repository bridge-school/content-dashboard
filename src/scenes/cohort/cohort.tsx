import * as React from 'react';
import { connect } from 'react-redux';
import { RootReducerState } from '../../state/reducers';
import { ModuleComponent } from '../../components/content-module/content-module';

const CohortSceneComponent = ({selectedCohort, selectedModuleList}) => (
  <div className="w-100 overflow-y-auto">
    <h2>{selectedCohort && selectedCohort.name}</h2>
    {selectedModuleList.map(mod => <ModuleComponent key={mod.id} module={mod} />)}
  </div>);

export const CohortScene = connect((state: RootReducerState) => {
  return ({
    selectedCohort: state.cohort.allCohorts[state.cohort.selectedCohort],
    selectedModuleList: (state.cohort.allCohorts[state.cohort.selectedCohort] || {moduleIds: []})
      .moduleIds.map(id => state.module.allModules.find(m => m.id === id)).filter(Boolean)
  });
})(CohortSceneComponent);
