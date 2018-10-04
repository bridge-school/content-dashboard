import * as React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export const CalendarComponent = (props) => {

    const highlightStyle = `.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
        background-color: orange;
        color: white;
    }`;

    return (
        <div className="calendar-root flex justify-center" style={{minHeight: '300px'}}>
            <div className="calendar flex ba bw3 b--light-gray">
                <style>{highlightStyle}</style>
                <DayPicker {...props} />
            </div>
        </div>
    );
};
