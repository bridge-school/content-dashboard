import * as firebase from 'firebase';
import { Observable, fromEvent } from 'rxjs/index';
import { filter, map } from 'rxjs/internal/operators';
import { ContentModule } from '../constants';

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
    signInSuccess: () => false
  },
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ]
};

export const modulesFirebase$ = fromEvent((firebase as any).database().ref('/modules') as any, 'value').pipe(
  filter(Boolean),
  map((snapshot): ContentModule =>  snapshot.val())
);

// todo: update to use completion callback
// https://firebase.google.com/docs/database/web/read-and-write#add_a_completion_callback
export const setCohort = (cohortName, moduleIds, startDate, endDate) => {
  return Observable.create(obs => {
    ((firebase as any).database().ref(`/cohort/${cohortName}`) as any)
      .set(
        {
        cohortName,
        moduleIds,
        startDate,
        endDate,
        },
        () => {
        obs.next({
          cohortName,
          moduleIds,
          startDate,
          endDate,
        });
      });
  });
};

export const allCohortsUpdated$ = fromEvent((firebase as any).database().ref(`/cohort/`) as any, 'value').pipe(
  filter(Boolean),
  map(cohorts => cohorts.val())
);
