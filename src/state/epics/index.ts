import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { getModulesEpic, setSelectedModuleFromRoute, editModuleEpic } from './modules';
import {
  addCohortEpic,
  setCohortDataByRouteEpic,
  setAllCohorts,
  setLocalstorageToken,
  addModuleToNewCohort,
  removeModuleFromModuleList,
  addModuleToTimeline,
  saveClassroomToCohort
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
  saveClassroomToCohort
);

export const epicMiddleware = createEpicMiddleware(rootEpic);