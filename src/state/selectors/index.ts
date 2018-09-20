import { RootReducerState } from '../reducers';
import { createSelector } from 'reselect';
import { ContentModule } from '../../constants';
import { get } from 'lodash';

export const getIDsFromList = createSelector(
  (state: RootReducerState) => get(state, 'module.timeline', []),
  (modules: ContentModule[]) => modules.map(mod => mod.id)
);

export const getCohortByID = (state: RootReducerState, cohortID: string) => get(state, `cohort.allCohorts.${cohortID}`, {});

export const getAllModules = (state: RootReducerState) => get(state, `module.allModules`, []);

export const getCohortModuleIds = createSelector(
  getCohortByID,
    // todo: create cohort interface
  (cohort: any) => get(cohort, 'moduleIds', []), 
);

export const getModuleObjectsByIds = createSelector(
  getAllModules,
  getCohortModuleIds,
  (modules: ContentModule[], cohortModuleIds: string[]) => 
  cohortModuleIds.map(modId => modules.find(mod => mod.id === modId)).filter(Boolean)
);

export const formatModuleObjects = createSelector(
  getModuleObjectsByIds,
  getAllModules,
  (modulesByID: ContentModule[], allModules: ContentModule[]) =>
     modulesByID.map(module => ({
       ...module,
       dependencies: (module ? module.dependencies || [] : [])
    .map(depId => ({id: depId, label: allModules.find(m => m.id === depId).name}))
     }))
);

export const getCurrentModuleID = (state: RootReducerState) => get(state, `module.currentModuleID`, "");

export const getCurrentModuleObjectByModuleID = createSelector(
  getCurrentModuleID,
  getAllModules,
  (moduleID: string, allModules: ContentModule[]) => allModules.find(mod => mod.id === moduleID)
);

export const formatCurrentModuleObject = createSelector(
  getCurrentModuleObjectByModuleID,
  getAllModules,
  (moduleObject: ContentModule, allModules: ContentModule[]) => {
    return {
      ...moduleObject,
      dependencies: (moduleObject ? moduleObject.dependencies || [] : [])
      .map(depId => ({id: depId, label: allModules.find(m => m.id === depId).name}))
    }
  }
);
