import { Action, TypeKeys } from '../actions';

interface CohortState {
  allCohorts: any;
  selectedCohort: any;
  classroomDialogIsOpen: boolean;
  classroomInEdit: any;
  defaultClassStartTime: string;
  defaultClassEndTime: string;
  replCohortData: any;
}

export interface CohortReducerState {
  cohort: CohortState;
}

const CohortReducerMap = {
  [TypeKeys.SET_SELECTED_COHORT]: (state, action) => {
    return { ...state, selectedCohort: action.payload };
  },
  [TypeKeys.SET_ALL_COHORTS]: (state, action) => {
    return { ...state, allCohorts: action.payload };
  },
  [TypeKeys.TOGGLE_COHORT_CLASSROOM_DIALOG]: (state, action) => {
    return { ...state, classroomDialogIsOpen: action.payload };
  },
  [TypeKeys.UPDATE_EDIT_CLASSROOM]: (state, action) => {
    return { ...state, classroomInEdit: action.payload };
  },
  SET_REPL_COHORT_DATA: (state, action) => {
    return { ...state, replCohortData: action.payload };
  },
};

const cohortDefaultState = { 
  allCohorts: {}, 
  classroomDialogIsOpen: false,
  selectedCohort: null,
  classroomInEdit: null,
  defaultClassStartTime: '18:30',
  defaultClassEndTime: '21:30',
  replCohortData: {},
}

const cohortReducer = (state = cohortDefaultState, action: Action) => {
  if (action && CohortReducerMap.hasOwnProperty(action.type)) {
    return CohortReducerMap[action.type](state, action);
  }

  return state;
};

export const CohortReducer = {
  cohort: cohortReducer
};
