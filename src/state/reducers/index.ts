import { combineReducers, Reducer } from 'redux';

import { ModuleReducer, ModuleReducerState } from './module';
import { authReducer, AuthState } from './auth';
import { CohortReducer, CohortReducerState } from './cohort';
import { teacherReducer, TeacherState } from './teacher';

export type RootReducerState =
  & ModuleReducerState
  & CohortReducerState
  & {teachers: TeacherState}
  & AuthState;

export const rootReducer: Reducer<RootReducerState> = combineReducers({
  ...ModuleReducer,
  ...CohortReducer,
  teachers: teacherReducer,
  auth: authReducer
});
