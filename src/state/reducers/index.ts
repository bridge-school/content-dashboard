import { combineReducers, Reducer } from 'redux';

import { RouterReducer, RouterReducerState } from './router';
import { ModuleReducer, ModuleReducerState } from './module';

export type RootReducerState = RouterReducerState & ModuleReducerState;

export const rootReducer: Reducer<RootReducerState> = combineReducers({
    ...RouterReducer,
    ...ModuleReducer
});
