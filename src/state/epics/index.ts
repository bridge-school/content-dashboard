import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { getModulesEpic, setSelectedModuleFromRoute, editModuleEpic } from './modules';
import { addCohortEpic, setCohortDataByRouteEpic, setAllCohorts } from './cohort';

const rootEpic = combineEpics(
  getModulesEpic,
  addCohortEpic,
  setSelectedModuleFromRoute,
  setCohortDataByRouteEpic,
  setAllCohorts,
  editModuleEpic
);

export const epicMiddleware = createEpicMiddleware(rootEpic);