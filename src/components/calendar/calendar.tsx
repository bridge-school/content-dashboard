import * as React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export const CalendarComponent = ({handleDayClick, selectedDates}) => {

    return (
        <div className="calendar-root flex justify-center ba">
            <div className="calendar flex b--red ba">
                <DayPicker onDayClick={handleDayClick} selectedDays={selectedDates}/>
            </div>
        </div>
    );
};
