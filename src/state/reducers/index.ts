import { combineReducers, Reducer } from 'redux';

import { RouterReducer, RouterReducerState } from './router';
import { ModuleReducer, ModuleReducerState } from './module';
import { CohortReducer } from './cohort';
import { authReducer } from './auth';

export type RootReducerState = RouterReducerState & ModuleReducerState & { cohort: any, auth: {loggedInUser: any} };

export const rootReducer: Reducer<RootReducerState> = combineReducers({
    ...RouterReducer,
    ...ModuleReducer,
    ...CohortReducer,
    auth: authReducer
});
