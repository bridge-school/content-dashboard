import { StringAction, TypeKeys } from './index';

export const createCohort = (
  cohortName,
  moduleIds,
  startDate = (new Date()).toLocaleDateString(),
  endDate = (new Date()).toLocaleDateString(),
) => ({
  type: TypeKeys.CREATE_COHORT,
  payload: { cohortName, moduleIds, startDate, endDate },
});

export const setCohortName = (payload: string): StringAction => ({
  type: TypeKeys.SET_COHORT_NAME,
  payload,
});
export const setCohortStartDate = (payload: string): StringAction => ({
  type: TypeKeys.SET_COHORT_START_DATE,
  payload,
});
