import { daysOfWeek, monthsOfYear } from './constants';
import * as moment from 'moment';

export const convertObjectToValuesArray = (object) => {
    return Object.keys(object).map(id => ({...object[id], id}));
}

export const formatDateStringWithoutTime = (date) => {
    const year = date.getFullYear();
    const dayOfWeek  = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    const dayOfMonth = date.getDate();

    return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
}

export const formatAmPmTime = (timeString) => {
    const hours = parseInt(timeString.split(":")[0], 10);
    const minutes = timeString.split(":")[1];
    const amPm = (24 > hours && hours >= 12) ? "pm" : "am";
    let modifiedHours;

    if (hours === 0 || hours === 24) {
        modifiedHours = 12;
    } else if (hours > 12) {
        modifiedHours = hours - 12;
    } else {
        modifiedHours = hours;
    }

    return `${modifiedHours}:${minutes} ${amPm}`;
}

export const sortClassroomsByDate = (classroomA, classroomB) => (classroomA.day < classroomB.day) ? -1 : ((classroomA.day > classroomB.day) ? 1 : 0);

export const formatISOStringDate = (isoString) => moment(isoString).format("dddd, MMMM Do, YYYY");
