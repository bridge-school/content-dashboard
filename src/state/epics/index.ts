import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { getModulesEpic } from './modules';

const rootEpic = combineEpics(getModulesEpic);

export const epicMiddleware = createEpicMiddleware(rootEpic);