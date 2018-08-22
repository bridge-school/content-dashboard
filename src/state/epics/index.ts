import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { getModulesEpic, setSelectedModuleFromRoute } from './modules';
import { addCohortEpic, setCohortDataByRouteEpic, setAllCohorts, setLocalstorageToken } from './cohort';

const rootEpic = combineEpics(
  getModulesEpic,
  addCohortEpic,
  setSelectedModuleFromRoute,
  setCohortDataByRouteEpic,
  setAllCohorts,
  setLocalstorageToken,
);

export const epicMiddleware = createEpicMiddleware(rootEpic);