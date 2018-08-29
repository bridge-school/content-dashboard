import { Action, TypeKeys } from '../actions';



interface CohortState {
  selectedDates: Date[];
  allCohorts: any;
  selectedCohort: any;
  classroomDialogIsOpen: boolean;
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
};

const cohortDefaultState = { 
  allCohorts: {}, 
  classroomDialogIsOpen: false,
  selectedCohort: null,
  selectedDates: [new Date("August 15 2018"), new Date('August 10 2018'), new Date('August 30 2018')]
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
