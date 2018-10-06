"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const rp = require("request-promise");
const moment = require("moment");
const client_1 = require("@slack/client");
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
            }), getAllAssignmentsForListOfModules(cohortSnapshot.val().moduleIds, cookie)
        ])
            .then(([classroomCreateResponse, moduleObjWithAssignments]) => {
            return updateClassroomWithAssignments(classroomCreateResponse.id, moduleObjWithAssignments, cookie)
                .then((savedAssignments) => admin.database().ref(`/cohort/${params.cohortID}`)
                .update({ replClassroomID: classroomCreateResponse.id, savedAssignments }));
        }));
    });
});
function updateClassroomWithAssignments(classroomId, modulesWithAssignments, cookie) {
    const assignments = Object.keys(modulesWithAssignments).reduce((acc, moduleKey) => [...acc, ...modulesWithAssignments[moduleKey].moduleAssignments.map(assignment => (Object.assign({ moduleKey }, assignment)))], []);
    return Promise.all(assignments.map((assignment) => replRequest('POST', cookie, `https://repl.it/data/assignments/${assignment.id}/clone`, { classroomId })
        .then((savedAssignment) => (Object.assign({}, savedAssignment, { moduleKey: assignment.moduleKey, originalID: assignment.id })))));
}
function replRequest(method, cookie, uri, formData) {
    return rp(Object.assign({ method, headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': cookie,
        }, json: true, uri }, ({ form: formData } || {})));
}
function getAllAssignmentsForListOfModules(moduleIds, cookie) {
    return new Promise(resolve => {
        admin.database().ref('/modules').once('value', (modSnapshot) => Promise.all(modSnapshot.val()
            .filter(mod => moduleIds.includes(mod.id))
            .map(mod => (Object.assign({}, mod, { challenges: mod.challenges && mod.challenges.length ? mod.challenges.map(url => /[^/]*$/.exec(url)[0]) : [] })))
            .filter((module) => module.challenges.length)
            .map(module => Promise.all(module.challenges.filter(Boolean).map(id => replRequest('GET', cookie, `https://repl.it/data/classrooms/${id}/assignments`)
            .then((moduleAssignments) => (Object.assign({}, module, { moduleAssignments }))))))).then((res) => {
            resolve(res.reduce((acc, next) => [...acc, ...next], []).reduce((acc, modData) => (Object.assign({}, acc, (acc[modData.id] ?
                {
                    [modData.id]: Object.assign({}, acc[modData.id], { moduleAssignments: [...acc[modData.id].moduleAssignments, ...modData.moduleAssignments] })
                } :
                { [modData.id]: modData }))), {}));
        }));
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
exports.getReplCohortData = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        req.method === 'GET' && req.query.id ?
            replLogin(functions.config().replit.username, functions.config().replit.password)
                .then(cookie => Promise.all([
                replRequest('GET', cookie, `https://repl.it/data/classrooms/${req.query.id}`),
                replRequest('GET', cookie, `https://repl.it/data/classrooms/${req.query.id}/assignments`),
                replRequest('GET', cookie, `https://repl.it/data/classrooms/${req.query.id}/teaching_assistants`),
                replRequest('GET', cookie, `https://repl.it/data/teacher/classrooms/${req.query.id}/submissions`),
                replRequest('GET', cookie, `https://repl.it/data/teacher/classrooms/${req.query.id}/students`),
            ]))
                .then((all) => res.status(200).send({
                classroom: all[0],
                assignments: all[1],
                teachers: all[2],
                submissions: all[3],
                students: all[4]
            }))
            : res.status(403).send('Forbidden!');
    });
});
const findUpcomingClassesOrderedByAscendingDate = (cohort) => Object.keys(cohort.classrooms)
    .map(key => cohort.classrooms[key])
    .filter(classroom => moment().isBefore(moment(classroom.day)))
    .sort((a, b) => moment(a.day).isBefore(moment(b.day)) ? -1 : 1);
exports.notifySlackChannel = functions.https.onRequest((req, res) => {
    const slackWebhook = new client_1.IncomingWebhook(functions.config().slack.url);
    return cors(req, res, () => req.method === 'GET' && req.query.cohortID ?
        admin.database().ref(`/cohort/${req.query.cohortID}`).once('value', (snapshot) => {
            if (!snapshot.exists()) {
                return res.sendStatus(404);
            }
            const cohort = snapshot.val();
            const upcomingClassesOrderedByAscendingDate = findUpcomingClassesOrderedByAscendingDate(cohort);
            const [upcomingClass] = upcomingClassesOrderedByAscendingDate;
            return res.json(upcomingClass);
            // slackWebhook.send('Hello from function land!', (error, slackResponse) => !error ? res.sendStatus(200) : res.sendStatus(500))
        })
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