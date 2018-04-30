import * as moment from 'moment';

export interface CohortLessonPlan {
  id: string;
  cohortName: string;
  moduleIds: string[];
  startDate: moment.Moment;
  endDate: moment.Moment;
}

const now = moment();

export const cohortLessonPlans: Array<CohortLessonPlan> = [
  // Currently active
  {
    id: '0',
    cohortName: 'Tulip Retail - Cohort 1',
    moduleIds: ['0', '1', '2'],
    startDate: now.clone().subtract(2, 'weeks'),
    endDate: now.clone().subtract(2, 'weeks').add(11, 'weeks')
  },
  // Starting really soon
  {
    id: '1',
    cohortName: 'Wayne Enterprises - Cohort 4',
    moduleIds: ['0', '1', '2'],
    startDate: now.clone().add(4, 'days'),
    endDate: now.clone().add(4, 'days').add(11, 'weeks')
  },
  // Starting soonish
  {
    id: '2',
    cohortName: 'Awesome Cohort of Awesome',
    moduleIds: ['0', '1', '2'],
    startDate: moment('2018-05-06'),
    endDate: moment('2018-05-06').add(11, 'weeks')
  },
  // Ended
  {
    id: '3',
    cohortName: 'Weyland Yutani - Cohort 1',
    moduleIds: ['0', '1', '2'],
    startDate: moment('2018-05-06').subtract(14, 'weeks'),
    endDate: moment('2018-05-06').subtract(14, 'weeks').add(11, 'weeks')
  }
];