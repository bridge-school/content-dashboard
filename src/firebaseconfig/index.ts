import * as firebase from 'firebase';
import { fromEvent } from 'rxjs/index';
import { filter, map } from 'rxjs/internal/operators';

const config = {
  apiKey: process.env.REACT_APP_firebase_api,
  authDomain: process.env.REACT_APP_firebase_auth_domain,
  databaseURL: process.env.REACT_APP_firebbase_database_url,
  projectId: process.env.REACT_APP_firebase_project_id,
  storageBucket: process.env.REACT_APP_storage_bucket,
  messagingSenderId: process.env.REACT_APP_firebase_messenger_send_id,
};

(firebase as any).initializeApp(config);

export const modulesFirebase$ = fromEvent((firebase as any).database().ref('/modules') as any, 'value').pipe(
  filter(Boolean),
  map(snapshot => {
    const result = snapshot.val();
    const headers = result[0];
    const rows = result.slice(1);

    return rows.map(row => row.reduce((acc, n, i) => ({...acc, [headers[i].toLowerCase().split(' ')[1]]: n}), {}));
  })
);
