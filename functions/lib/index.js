"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const rp = require("request-promise");
admin.initializeApp();
exports.createNewClassroom = functions.database.ref('/cohort/{cohortID}').onCreate((cohortSnapshot, { params }) => {
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
        return Promise.all([replRequest('POST', loginResponse.headers['set-cookie'], 'https://repl.it/data/classrooms/create', {
                name: cohortSnapshot.val().cohortName,
                language_key: 'babel',
                description: '',
                isPublic: false,
                image: '',
            }), getAllAssignmentIdsForListOfModules(cohortSnapshot.val().moduleIds, loginResponse.headers['set-cookie'])])
            .then(([classroomCreateResponse, allIds]) => {
            return updateClassroomWithAssignments(classroomCreateResponse.id, allIds, loginResponse.headers['set-cookie'])
                .then(() => admin.database().ref(`/cohort/${params.cohortID}`).update({ replClassroomID: classroomCreateResponse.id }));
        });
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
                .map(id => replRequest('GET', cookie, `https://repl.it/data/classrooms/${id}/assignments`))).then((res) => {
                resolve(res.reduce((a, b) => [...a, ...b], []).map(assignment => assignment.id));
            });
        });
    });
}
//# sourceMappingURL=index.js.map