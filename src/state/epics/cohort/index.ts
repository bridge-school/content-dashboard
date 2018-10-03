import { filter, map, mergeMap } from 'rxjs/internal/operators';
import { TypeKeys } from '../../actions';
import { setCohort, addClassroomToCohort, updateClassroomToCohort } from '../../../firebaseconfig';
import { groupBy } from 'lodash';
import { push } from 'connected-react-router';
import { ajax } from 'rxjs/ajax';
import { combineLatest } from 'rxjs';

export const addCohortEpic = $action =>
  $action.ofType(TypeKeys.CREATE_COHORT).pipe(
    map(({ payload }) => ({
      ...payload,
      startDate: (new Date(payload.startDate)).toISOString(),
      endDate: (new Date(payload.endDate)).toISOString()
    })),
    mergeMap(({ cohortName, moduleIds, startDate, endDate }) => setCohort(cohortName, moduleIds, startDate, endDate)),
    map((cohort: any) => push(`/cohorts/${cohort.id}`))
  );

export const setCohortDataByRouteEpic = ($action) =>
  $action.ofType('@@router/LOCATION_CHANGE')
    .pipe(
      filter((action: any) => action.payload.location.pathname.includes('/cohorts/')),
      map((action: any) => ({ type: TypeKeys.SET_SELECTED_COHORT, payload: action.payload.location.pathname.split('/')[2] })),
  );

export const getReplCohortData = ($action) =>
  combineLatest($action.ofType('SET_SELECTED_COHORT'), $action.ofType('SET_ALL_COHORTS'))
    .pipe(
      map(([action, {payload}]) => payload[action.payload]),
      mergeMap(({replClassroomID}) =>
        ajax.get(`https://us-central1-bridge-content-dashboard.cloudfunctions.net/getReplCohortData?id=${replClassroomID}`)
      ),
      map(res => ({type: 'SET_REPL_COHORT_DATA', payload: res.response}))
  );

export const setLocalstorageToken = ($action) =>
  $action.ofType('SIGNIN_SUCCESS_WITH_CREDENTIALS')
    .pipe(
      filter((action: any) => Boolean(action.payload)),
      map((action: any) => ({type: 'SET_SIGNIN_USER', payload: action.payload.user.toJSON()}))
  );

export const setAllCohorts = ($action) =>
  $action.ofType('COHORTS_UPDATED').pipe(
    map((action: {type: string, payload: any[]}) => action.payload),
    filter(Boolean),
    map(cohorts => Object.keys(cohorts).reduce((acc, next) => ({...acc, [next]: {...cohorts[next], id: next}}) , {})),
    map(cohorts => Object.keys(cohorts).reduce((acc, next) => (
      {...acc,
        [next]: {...cohorts[next], assignmentsGroupedByModule: groupBy(cohorts[next].savedAssignments, 'moduleKey')}
      }) , {})),
    map(cohorts => ({ type: TypeKeys.SET_ALL_COHORTS, payload: cohorts }))
  );

export const addModuleToNewCohort = ($action) =>
  $action.ofType('ADD_MODULE_TO_NEW_COHORT')
    .pipe(
      filter(({payload: {modules, selectedModuleID}}) => modules.find(module => module.id === selectedModuleID)),
      filter(Boolean),
      map(({payload}) => ({type: 'CAN_ADD_MODULE', payload}))
    );

export const removeModuleFromModuleList = ($action) =>
  $action.ofType('CAN_ADD_MODULE')
    .pipe(
      map(({payload: {modules, selectedModuleID}}) => modules.filter(module => module.id !== selectedModuleID)),
      map((modules) => ({type: 'UPDATE_MODULE_LIST', payload: modules}))
    );

export const addModuleToTimeline = ($action) =>
  $action.ofType('CAN_ADD_MODULE')
    .pipe(
      map(({payload: {timeline, modules, selectedModuleID}}) =>
        timeline.concat(modules.find(module => module.id === selectedModuleID))),
      map((timeline) => ({type: 'UPDATE_TIMELINE', payload: timeline}))
    );

export const saveClassroomToCohort = ($action) =>
    $action.ofType(TypeKeys.SAVE_CLASSROOM_TO_COHORT)
      .pipe(
        mergeMap((action: any) => addClassroomToCohort(action.payload.cohortId, action.payload.classroom)),
        map(() => ({type: 'FAKE_SUCCESS_ADD_CLASSROOM'}))
      );

export const saveUpdatedClassroomToCohort = ($action) =>
      $action.ofType(TypeKeys.SAVE_UPDATED_CLASSROOM_TO_COHORT)
        .pipe(
          mergeMap((action: any) => updateClassroomToCohort(action.payload.cohortId, action.payload.classroomId, action.payload.classroom)),
          map(() => ({type: 'FAKE_SUCCESS_UPDATE_CLASSROOM'}))
        );

export const notifySlackWithUpcomingClassDetails = ($action) =>
    $action.ofType(TypeKeys.NOTIFY_SLACK_WITH_UPCOMING_CLASS_DETAILS)
      .pipe(
        mergeMap(({cohortId, slackChannel}) =>
          ajax.get(`https://us-central1-bridge-content-dashboard.cloudfunctions.net/notifySlackChannel?cohortID=${cohortId}&slackChannel=${slackChannel}`)
        ),
        map(() => ({type: 'FAKE_SUCCESS_NOTIFY_SLACK_WITH_UPCOMING_CLASS_DETAILS'}))
      );
