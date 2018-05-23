import { StringAction, TypeKeys } from './index';

export const createCohort = (
  cohortName,
  moduleIds,
  startDate = (new Date()).toISOString(),
  endDate = (new Date()).toISOString()
) => ({ type: TypeKeys.CREATE_COHORT, payload: { cohortName, moduleIds, startDate, endDate } });

export const setCohortName = (payload: string): StringAction => ({ type: TypeKeys.SET_COHORT_NAME, payload });