import { combineReducers, Reducer } from 'redux';

import { RouterReducer, RouterReducerState } from './router';
import { ModuleReducer, ModuleReducerState } from './module';
import { CohortReducer } from './cohort';

export type RootReducerState = RouterReducerState & ModuleReducerState & { cohort: any };

export const rootReducer: Reducer<RootReducerState> = combineReducers({
    ...RouterReducer,
    ...ModuleReducer,
    ...CohortReducer,
});
