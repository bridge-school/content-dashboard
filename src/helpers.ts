import { daysOfWeek, monthsOfYear } from './constants';

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
