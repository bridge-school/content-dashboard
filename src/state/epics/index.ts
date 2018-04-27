import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { getModulesEpic, setSelectedModuleFromRoute } from './modules';

const rootEpic = combineEpics(getModulesEpic, setSelectedModuleFromRoute);

export const epicMiddleware = createEpicMiddleware(rootEpic);