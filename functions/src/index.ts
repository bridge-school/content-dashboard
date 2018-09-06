import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as rp from 'request-promise';

const cors = require('cors')({
  origin: true,
});

admin.initializeApp();

export const createNewClassroom = functions.database.ref('/cohort/{cohortID}').onCreate((cohortSnapshot, {params}) => {
  return replLogin(functions.config().replit.username, functions.config().replit.password)
    .then(cookie => {
      // todo: get all classrooms from account, and update firebase classroom references
      return Promise.all([
          replRequest('GET', cookie, 'https://repl.it/data/teacher/classrooms'),
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
          replRequest('POST', cookie, 'https://repl.it/data/classrooms/create', {
            name: cohortSnapshot.val().cohortName,
            language_key: 'babel',
            description: '',
            isPublic: false,
            image: '',
          }), getAllAssignmentsForListOfModules(cohortSnapshot.val().moduleIds, cookie)])
          .then(([classroomCreateResponse, moduleObjWithAssignments]) => {
              return updateClassroomWithAssignments(classroomCreateResponse.id, moduleObjWithAssignments, cookie)
                .then((savedAssignments) =>
                  admin.database().ref(`/cohort/${params.cohortID}`)
                    .update({replClassroomID: classroomCreateResponse.id, savedAssignments }))
            }
          ))
    });
});

function updateClassroomWithAssignments(classroomId, modulesWithAssignments, cookie) {
  const assignments = Object.keys(modulesWithAssignments).reduce((acc, moduleKey) =>
    [...acc, ...modulesWithAssignments[moduleKey].moduleAssignments.map(assignment => ({moduleKey, ...assignment}))], []);
  return Promise.all(assignments.map((assignment) =>
    replRequest('POST', cookie, `https://repl.it/data/assignments/${assignment.id}/clone`, {classroomId})
      .then((savedAssignment) => ({...savedAssignment, moduleKey: assignment.moduleKey, originalID: assignment.id}))
  ));
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

function getAllAssignmentsForListOfModules(moduleIds, cookie) {
  return new Promise(resolve => {
    admin.database().ref('/modules').once('value', (modSnapshot) =>
      Promise.all(
        modSnapshot.val()
          .filter(mod => moduleIds.includes(mod.id))
          .map(mod => ({
            ...mod,
            challenges: mod.challenges && mod.challenges.length ? mod.challenges.map(url => /[^/]*$/.exec(url)[0]) : []
          }))
          .filter((module) => module.challenges.length)
          .map(module => Promise.all(module.challenges.filter(Boolean).map(id =>
            replRequest('GET', cookie, `https://repl.it/data/classrooms/${id}/assignments`)
              .then((moduleAssignments) => ({...module, moduleAssignments}))
          )))
      ).then((res: any) => {
        resolve(res.reduce((acc, next) => [...acc, ...next], []).reduce((acc, modData) =>
          ({
            ...acc,
            ...(acc[modData.id] ?
              {
                [modData.id]: {
                  ...acc[modData.id],
                  moduleAssignments: [...acc[modData.id].moduleAssignments, ...modData.moduleAssignments]
                }
              } :
              {[modData.id]: modData})
          }), {}));
      })
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

exports.getReplCohortData = functions.https.onRequest(() => {
    return cors((req, res) => req.method === 'GET' && req.query.id ?
      replLogin(functions.config().replit.username, functions.config().replit.password)
        .then(cookie => replRequest('GET', cookie, `https://repl.it/data/classrooms/${req.query.id}`))
        .then((res) => res.status(200).send(res))
      : res.status(403).send('Forbidden!'));
});


function replLogin(username, password) {
  return rp({
    method: 'POST',
    uri: 'https://repl.it/login',
    body: {
      username,
      password,
      teacher: true
    },
    json: true,
    resolveWithFullResponse: true
  }).then((loginResponse) => loginResponse.headers['set-cookie'])
}