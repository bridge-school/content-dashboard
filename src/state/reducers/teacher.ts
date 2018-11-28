import { Action } from '../actions';

const teacherReducerMap = {
  SET_TEACHER_LIST: (state, action) => ({...state, teachers: action.payload}),
  UPDATE_TEACHER_IN_EDIT: (state, action) => ({...state, teacherInEdit: action.payload})
};

// todo: move these interfaces to a better place
export interface Teacher {
  id?: string;
  name: string;
  email: string;
}

export interface TeacherState {
  teachers: Teacher[];
  teacherInEdit: any;
}

export const teacherReducer = (state = { teachers: [
    {name: 'Della', email: 'whatever'},
    {name: 'Della2', email: 'whatever1'},
    {name: 'Della3', email: 'whatever2'},
    {name: 'Della4', email: 'whatever3'},
  ], teacherInEdit: {name: '', email: ''} }, action: Action) => {
  if (action && teacherReducerMap.hasOwnProperty(action.type)) {
    return teacherReducerMap[action.type](state, action);
  }

  return state;
};