import * as firebase from 'firebase';
import { fromEvent } from 'rxjs/index';
import { filter, map } from 'rxjs/internal/operators';

// after reading a bit about this, makes the most sense to keep this in the client side code, and will just eventually
// create a whitelist of domains
const config = {
  apiKey: 'AIzaSyDARrkRl7MEYc2sXJ3aSYx59zOyApL9x5g',
  authDomain: 'content-dashboard-staging.herokuapp.com',
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
  map(snapshot => {
    const result = snapshot.val();
    const headers = result[0];
    const rows = result.slice(1);

    return rows.map(row => row.reduce((acc, n, i) => ({...acc, [headers[i].toLowerCase().split(' ')[1]]: n}), {}));
  })
);
