import { filter, map, mergeMap } from 'rxjs/internal/operators';
import { TypeKeys } from '../../actions';
import { setCohort, allCohortsUpdated$ } from '../../../firebaseconfig';
// import { ajax } from 'rxjs/internal/observable/dom/ajax';

export const addCohortEpic = $action =>
  $action.ofType(TypeKeys.CREATE_COHORT).pipe(
    map(({ payload }) => ({
      ...payload,
      startDate: (new Date(payload.startDate)).toISOString(),
      endDate: (new Date(payload.endDate)).toISOString()
    })),
    mergeMap(({ cohortName, moduleIds, startDate, endDate }) => setCohort(cohortName, moduleIds, startDate, endDate)),
    map((cohort: any) => ({
      type: TypeKeys.ROUTE_TO,
      payload: `/cohort/${cohort.cohortName}`
    }))
  );

export const setCohortDataByRouteEpic = ($action) =>
  $action.ofType('@@router/LOCATION_CHANGE')
    .pipe(
      filter((action: any) => action.payload.pathname.includes('/cohort/')),
      map((action: any) => ({ type: TypeKeys.SET_SELECTED_COHORT, payload: action.payload.pathname.split('/')[2] })),
  );

export const setLocalstorageToken = ($action) =>
  $action.ofType('SIGNIN_SUCCESS_WITH_CREDENTIALS')
    .pipe(
      filter((action: any) => Boolean(action.payload)),
      map((action: any) => ({type: 'SET_SIGNIN_USER', payload: action.payload.user.toJSON()}))
  );

export const setAllCohorts = () =>
  allCohortsUpdated$.pipe(
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