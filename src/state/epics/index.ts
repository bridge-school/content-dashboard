import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { getModulesEpic, setSelectedModuleFromRoute, editModuleEpic } from './modules';
import { addCohortEpic, setCohortDataByRouteEpic, setAllCohorts, setLocalstorageToken } from './cohort';

const rootEpic = combineEpics(
  getModulesEpic,
  addCohortEpic,
  setSelectedModuleFromRoute,
  setCohortDataByRouteEpic,
  setAllCohorts,
  editModuleEpic,
  setLocalstorageToken,
);

export const epicMiddleware = createEpicMiddleware(rootEpic);