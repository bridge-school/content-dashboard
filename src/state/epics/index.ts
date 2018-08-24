import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { getModulesEpic, setSelectedModuleFromRoute, editModuleEpic } from './modules';
import {
  addCohortEpic,
  setCohortDataByRouteEpic,
  setAllCohorts,
  setLocalstorageToken,
  addModuleToNewCohort,
  removeModuleFromModuleList,
  addModuleToTimeline, getReplCohortData
} from './cohort';

const rootEpic = combineEpics(
  getModulesEpic,
  addCohortEpic,
  setSelectedModuleFromRoute,
  setCohortDataByRouteEpic,
  setAllCohorts,
  editModuleEpic,
  setLocalstorageToken,
  addModuleToNewCohort,
  removeModuleFromModuleList,
  addModuleToTimeline,
  getReplCohortData,
);

export const epicMiddleware = createEpicMiddleware(rootEpic);