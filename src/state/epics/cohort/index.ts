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

export const setAllCohorts = () =>
  allCohortsUpdated$.pipe(
    map(cohorts => ({ type: TypeKeys.SET_ALL_COHORTS, payload: cohorts }))
  );
