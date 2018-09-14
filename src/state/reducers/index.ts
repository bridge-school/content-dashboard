import { combineReducers, Reducer } from 'redux';

import { ModuleReducer, ModuleReducerState } from './module';
import { authReducer } from './auth';
import { CohortReducer, CohortReducerState } from './cohort';
import { reducer as formReducer } from 'redux-form'

export type RootReducerState =
    & ModuleReducerState 
    & CohortReducerState
    & { auth: {loggedInUser: any} };

export const rootReducer: Reducer<RootReducerState> = combineReducers({
    ...ModuleReducer,
    ...CohortReducer,
    auth: authReducer,
    form: formReducer
});
