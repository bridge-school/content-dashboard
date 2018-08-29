import * as React from 'react';
import { Link } from 'react-router-dom';

import * as moment from 'moment';


interface LessonPlanSelectedFunc {
  (event: Event, plan: any): any;
}

interface Props {
  plan: any;
  onClick?: LessonPlanSelectedFunc;
}

interface DateLabelProps {
  startDate: moment.Moment;
  endDate: moment.Moment;
}

const DateLabel: React.SFC<DateLabelProps> = ({ startDate, endDate }) => {
  const now = moment();

  if (now.isBetween(startDate, endDate)) {
    return <small style={{color: '#19a974' }}>Currently active</small>;
  }

  const style = {color: 'rgba(0, 0, 0, 0.75)'};
  if (now.isBefore(startDate)) {
    if (now.clone().add(1, 'week').isAfter(startDate)) {
      style.color = '#ffb700';
    }
    return <small style={style}>Starts {startDate.fromNow()}</small>;
  }

  return <small style={style}>Ended {endDate.fromNow()}</small>;
};

export const LessonPlanListItem: React.SFC<Props> = ({ plan }) => (
  <div
    className="flex items-center mb4 lesson-plan-listing-item"
  >
      <div className="w-100 ph2">
        <Link to={`/cohorts/${plan.cohortName}`}>
          <h2 className="mb0">
            {plan.cohortName}
          </h2>
        </Link>
        <div>
          <DateLabel startDate={plan.startDate} endDate={plan.endDate} />
        </div>
      </div>
  </div>
);