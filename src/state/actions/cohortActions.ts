import { StringAction, TypeKeys, ActionWithPayload } from './index';

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

export const toggleCohortClassroomDialog = (payload: boolean): ActionWithPayload<boolean> => ({
  type: TypeKeys.TOGGLE_COHORT_CLASSROOM_DIALOG,
  payload
});

export const updateClassroomInEdit = (payload) => ({
  type: TypeKeys.UPDATE_EDIT_CLASSROOM,
  payload
});

export const saveClassroomToCohort = (cohortId, classroom) => {
  return ({
    type: TypeKeys.SAVE_CLASSROOM_TO_COHORT,
    payload: {cohortId, classroom}
  })
};

export const saveUpdatedClassroomToCohort = (cohortId, classroomId, classroom) => ({
  type: TypeKeys.SAVE_UPDATED_CLASSROOM_TO_COHORT,
  payload: {cohortId, classroomId, classroom}
});

export const notifySlackWithUpcomingClassDetails = (cohortId, slackChannel) => {
  return ({
    type: TypeKeys.NOTIFY_SLACK_WITH_UPCOMING_CLASS_DETAILS,
    payload: {cohortId, slackChannel}
  })
};
