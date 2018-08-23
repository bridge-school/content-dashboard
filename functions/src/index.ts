import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as rp from 'request-promise';

admin.initializeApp();

export const createNewClassroom = functions.database.ref('/cohort/{cohortID}').onCreate((cohortSnapshot, {params}) => {
  return rp({
    method: 'POST',
    uri: 'https://repl.it/login',
    body: {
      username: functions.config().replit.username,
      password: functions.config().replit.password,
      teacher: false
    },
    json: true,
    resolveWithFullResponse: true
  })
    .then(loginResponse => {
      // todo: get all classrooms from account, and update firebase classroom references
      return Promise.all([
          replRequest('GET', loginResponse.headers['set-cookie'], 'https://repl.it/data/teacher/classrooms'),
          getAllCurrentModules(),
        ]).then(([replClassrooms, firebaseModules]: [any[], any[]]) => {
        updateModules(firebaseModules.map(module => {
            const replData = replClassrooms.find((classroom) => {
              return classroom.name.toLowerCase() === module.name.toLowerCase().replace(/[a-z]+: /, '');
            });
            return replData ? {...module, challenges: [].concat( module.challenges[0] ? module.challenges[0].replace(/[0-9]+/, replData.id) : []) } : module;
          }));
      })
        .then(() => Promise.all([
          replRequest('POST', loginResponse.headers['set-cookie'], 'https://repl.it/data/classrooms/create', {
            name: cohortSnapshot.val().cohortName,
            language_key: 'babel',
            description: '',
            isPublic: false,
            image: '',
          }), getAllAssignmentIdsForListOfModules(cohortSnapshot.val().moduleIds, loginResponse.headers['set-cookie'])])
          .then(([classroomCreateResponse, allIds]) => {
              return updateClassroomWithAssignments(classroomCreateResponse.id, allIds, loginResponse.headers['set-cookie'])
                .then(() => admin.database().ref(`/cohort/${params.cohortID}`).update({replClassroomID: classroomCreateResponse.id}))
            }
          ))
    });
});

function updateClassroomWithAssignments(classroomId, assignmentIDs, cookie) {
  return Promise.all(assignmentIDs.map((id) => replRequest('POST', cookie, `https://repl.it/data/assignments/${id}/clone`, {classroomId})));
}

function replRequest(method, cookie, uri, formData?) {
  return rp({
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': cookie,
    },
    json: true,
    uri,
    ...({form: formData} || {})
  })
}

function getAllAssignmentIdsForListOfModules(moduleIds, cookie) {
  return new Promise(function (resolve) {
    admin.database().ref('/modules').once('value', (modSnapshot) => {
        return Promise.all(
          modSnapshot.val().filter(mod => moduleIds.includes(mod.id)).map(mod => mod.challenges || []).reduce((a, b) => [...a, ...b], [])
            .map(url => /[^/]*$/.exec(url)[0])
            .filter(Boolean)
            .map(id => replRequest('GET', cookie, `https://repl.it/data/classrooms/${id}/assignments`))
        ).then((res: any) => {
          resolve(res.reduce((a, b) => [...a, ...b], []).map(assignment => assignment.id));
        })
      }
    );
  })
}

function getAllCurrentModules() {
  return new Promise(function (resolve) {
    admin.database().ref('/modules').once('value', (modSnapshot) => {
      resolve(modSnapshot.val());
      }
    );
  })
}


function updateModules(updatedModules) {
  return new Promise(function (resolve) {
    admin.database().ref('/modules').set(updatedModules, resolve);
      }
    );
}