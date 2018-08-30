export enum ItemTypes {
    Module = 'MODULE'
}

export const complexityColors = {
  [1]: 'green',
  [2]: 'gold',
  [3]: 'orange',
  [4]: 'red',
  [5]: 'dark-red',
};

type URL = string;

export interface ContentModule {
  name: string;
  id: string;
  complexity: 1 | 2 | 3 | 4 | 5;
  dependencies?: string[];
  content?: URL;
  challenges?: URL[];
  homework?: URL;
  extras?: URL[];
  slides?: URL;
}

export const daysOfWeek = [
  "Sunday",
  "Monday", 
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
