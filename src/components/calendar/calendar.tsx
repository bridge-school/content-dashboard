import * as React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export const CalendarComponent = () => {

    const selectedDays = [new Date("August 15 2018"), new Date('August 10 2018'), new Date('August 30 2018')];

    const handleDayClick = (day) => {
        console.log("DAY", day);
    }

    return (
        <div className="calendar-root flex justify-center ba">
            <div className="calendar flex b--red ba">
                <DayPicker onDayClick={handleDayClick} selectedDays={selectedDays}/>
            </div>
        </div>
    );
};
