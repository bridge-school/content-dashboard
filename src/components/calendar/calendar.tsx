import * as React from 'react';
// import { ContentModule } from '../../constants';
import * as moment from 'moment';

export const CalendarComponent = () => {

    const getToday = () => {
        return moment().format('LLLL');
    };

    return (
        <div className="calendar-root">
            <p>This is our custom calendar component</p>
            {getToday()}
        </div>
    );
};
