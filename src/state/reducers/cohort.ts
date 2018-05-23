import { Action, TypeKeys } from '../actions';

const CohortReducerMap = {
  [TypeKeys.SET_SELECTED_COHORT]: (state, action) => {
    return { ...state, selectedCohort: action.payload };
  },
  [TypeKeys.SET_ALL_COHORTS]: (state, action) => {
    return { ...state, allCohorts: action.payload };
  },
};

const cohortReducer = (state = { allCohorts: {}, selectedCohort: null }, action: Action) => {
  if (action && CohortReducerMap.hasOwnProperty(action.type)) {
    return CohortReducerMap[action.type](state, action);
  }

  return state;
};

export const CohortReducer = {
  cohort: cohortReducer
};
