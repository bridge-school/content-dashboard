"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const rp = require("request-promise");
const cors = require('cors')({
    origin: true,
});
admin.initializeApp();
exports.createNewClassroom = functions.database.ref('/cohort/{cohortID}').onCreate((cohortSnapshot, { params }) => {
    return replLogin(functions.config().replit.username, functions.config().replit.password)
        .then(cookie => {
        // todo: get all classrooms from account, and update firebase classroom references
        return Promise.all([
            replRequest('GET', cookie, 'https://repl.it/data/teacher/classrooms'),
            getAllCurrentModules(),
        ]).then(([replClassrooms, firebaseModules]) => {
            updateModules(firebaseModules.map(module => {
                const replData = replClassrooms.find((classroom) => {
                    return classroom.name.toLowerCase() === module.name.toLowerCase().replace(/[a-z]+: /, '');
                });
                return replData ? Object.assign({}, module, { challenges: [].concat(module.challenges[0] ? module.challenges[0].replace(/[0-9]+/, replData.id) : []) }) : module;
            }));
        })
            .then(() => Promise.all([
            replRequest('POST', cookie, 'https://repl.it/data/classrooms/create', {
                name: cohortSnapshot.val().cohortName,
                language_key: 'babel',
                description: '',
                isPublic: false,
                image: '',
            }), getAllAssignmentIdsForListOfModules(cohortSnapshot.val().moduleIds, cookie)
        ])
            .then(([classroomCreateResponse, allIds]) => {
            return updateClassroomWithAssignments(classroomCreateResponse.id, allIds, cookie)
                .then(() => admin.database().ref(`/cohort/${params.cohortID}`).update({ replClassroomID: classroomCreateResponse.id }));
        }));
    });
});
function updateClassroomWithAssignments(classroomId, assignmentIDs, cookie) {
    return Promise.all(assignmentIDs.map((id) => replRequest('POST', cookie, `https://repl.it/data/assignments/${id}/clone`, { classroomId })));
}
function replRequest(method, cookie, uri, formData) {
    return rp(Object.assign({ method, headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': cookie,
        }, json: true, uri }, ({ form: formData } || {})));
}
function getAllAssignmentIdsForListOfModules(moduleIds, cookie) {
    return new Promise(function (resolve) {
        admin.database().ref('/modules').once('value', (modSnapshot) => {
            return Promise.all(modSnapshot.val().filter(mod => moduleIds.includes(mod.id)).map(mod => mod.challenges || []).reduce((a, b) => [...a, ...b], [])
                .map(url => /[^/]*$/.exec(url)[0])
                .filter(Boolean)
                .map(id => replRequest('GET', cookie, `https://repl.it/data/classrooms/${id}/assignments`))).then((res) => {
                resolve(res.reduce((a, b) => [...a, ...b], []).map(assignment => assignment.id));
            });
        });
    });
}
function getAllCurrentModules() {
    return new Promise(function (resolve) {
        admin.database().ref('/modules').once('value', (modSnapshot) => {
            resolve(modSnapshot.val());
        });
    });
}
function updateModules(updatedModules) {
    return new Promise(function (resolve) {
        admin.database().ref('/modules').set(updatedModules, resolve);
    });
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
    }).then((loginResponse) => loginResponse.headers['set-cookie']);
}
//# sourceMappingURL=index.js.map