import React, { useState } from 'react';
import './DateRangePicker.css';

const DateRangePicker = ({ onDateRangeChange }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (e) => {
        const date = e.target.value;
        setStartDate(date);
        onDateRangeChange(new Date(date), endDate ? new Date(endDate) : null);
    };

    const handleEndDateChange = (e) => {
        const date = e.target.value;
        setEndDate(date);
        onDateRangeChange(startDate ? new Date(startDate) : null, new Date(date));
    };

    return (
        <div className="dateRangePicker">
            <h3 className="label">Date Range:</h3>

            <label htmlFor="startDate">Select start date</label>
            <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="dateInput"
                placeholder="Start Date"
                id="startDate"
            />
            <span> - </span>

            <label htmlFor="endDate">Select end date</label>
            <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="dateInput"
                placeholder="End Date"
                id="endDate"
            />
        </div>
    );
};

export default DateRangePicker;
