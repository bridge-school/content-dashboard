import { combineReducers, Reducer } from 'redux';

import { ModuleReducer, ModuleReducerState } from './module';
import { authReducer } from './auth';
import { CohortReducer, CohortReducerState } from './cohort';

export type RootReducerState =
    & ModuleReducerState 
    & CohortReducerState
    & { auth: {loggedInUser: any} };

export const rootReducer: Reducer<RootReducerState> = combineReducers({
    ...ModuleReducer,
    ...CohortReducer,
    auth: authReducer
});
