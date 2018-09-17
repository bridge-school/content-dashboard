import * as firebase from 'firebase';
import { Observable, fromEvent, from } from 'rxjs/index';
import { filter, map } from 'rxjs/internal/operators';
import { ContentModule } from '../constants';
import { reduxStoreInstance } from '../state/store';
import { database } from 'firebase-admin';

// after reading a bit about this, makes the most sense to keep this in the client side code, and will just eventually
// create a whitelist of domains
const config = {
  apiKey: 'AIzaSyDARrkRl7MEYc2sXJ3aSYx59zOyApL9x5g',
  authDomain: 'bridge-content-dashboard.firebaseapp.com',
  databaseURL: 'https://bridge-content-dashboard.firebaseio.com',
  projectId: 'bridge-content-dashboard',
  storageBucket: 'bridge-content-dashboard.appspot.com',
  messagingSenderId: '636794336898',
};

(firebase as any).initializeApp(config);

export const uiConfig = {
  signInFlow: 'popup',
  callbacks: {
    signInSuccessWithAuthResult: authResult =>
      reduxStoreInstance.dispatch({type: 'SIGNIN_SUCCESS_WITH_CREDENTIALS', payload: authResult})
  },
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ]
};

firebase.auth().onAuthStateChanged(user =>
  reduxStoreInstance.dispatch({type: 'SET_SIGNIN_USER', payload: user.toJSON()}));

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const modulesFirebase$ = fromEvent((firebase as any).database().ref('/modules') as any, 'value').pipe(
  filter(Boolean),
  map((snapshot): ContentModule =>  snapshot.val())
);

export const updateModuleFirebase = (moduleID, moduleValue) => 
Observable.create(obs => {
  firebase.database().ref(`/modules/${moduleID}`).set(moduleValue, () => obs.next('Success'));
});

// todo: update to use completion callback
// https://firebase.google.com/docs/database/web/read-and-write#add_a_completion_callback
export const setCohort = (cohortName, moduleIds, startDate, endDate) => {
  return from(((firebase as any).database().ref(`/cohort`) as any)
    .push(
      {
        cohortName,
        moduleIds,
        startDate,
        endDate,
      }
    )).pipe(
      map((saveRef: database.Reference) => ({
        id: saveRef.key,
        cohortName,
        moduleIds,
        startDate,
        endDate,
      })));
};

fromEvent((firebase as any).database().ref(`/cohort/`) as any, 'value').pipe(
  filter(Boolean),
  map(cohorts => cohorts.val()),
).subscribe((cohorts) => {
  reduxStoreInstance.dispatch({type: 'COHORTS_UPDATED', payload: cohorts})
});

export const addClassroomToCohort = (cohortId, classroom) => {

  return Observable.create(obs => {
    ((firebase as any).database().ref(`/cohort/${cohortId}/classrooms`) as any)
      .push(
        classroom,
        () => {
        obs.next('success!');
      });
  });
};