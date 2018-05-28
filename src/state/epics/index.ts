import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { getModulesEpic, setSelectedModuleFromRoute } from './modules';
import { addCohortEpic, setCohortDataByRouteEpic, setAllCohorts } from './cohort';

const rootEpic = combineEpics(
  getModulesEpic,
  addCohortEpic,
  setSelectedModuleFromRoute,
  setCohortDataByRouteEpic,
  setAllCohorts,
);

export const epicMiddleware = createEpicMiddleware(rootEpic);