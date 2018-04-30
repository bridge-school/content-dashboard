import * as React from 'react';
import { ModuleComponent } from '../../components/content-module/content-module';
import { connect } from 'react-redux';
import { RootReducerState } from '../../state/reducers';

const ModuleSceneComponent = ({currentModule, currentID}) => (
  <div className="w-100">
    {currentModule ?
      <ModuleComponent module={currentModule} /> :
      <h1>No module with the id <strong>{currentID}</strong></h1>}
  </div>
);

export const ModuleScene = connect((state: RootReducerState) => ({
  currentModule: state.module.allModules.find(module => module.id === state.module.currentModuleID),
  currentID: state.module.currentModuleID,
}))(ModuleSceneComponent);
