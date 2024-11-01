import React, { useState } from 'react';
import TimeseriesChart from '../../Components/Charts/TimeseriesChart';
import ColumnChartWithLabels from '../../Components/Charts/ColumnChart';
import DateRangePicker from '../../Components/DateRangePicker/DateRangePicker'
import SparkLineChart from '../../Components/Charts/SparkLineChart';
import { data } from '../../../hotelData';
import './dashboard.css'

const monthMap = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
};

const Dashboard = () => {
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });

    const handleDateRangeChange = (startDate, endDate) => {
        setDateRange({ startDate, endDate });
    };

    const filteredData = data.filter((item) => {
        const itemDate = new Date(
            item.arrival_date_year,
            monthMap[item.arrival_date_month],
            item.arrival_date_day_of_month
        );

            const isWithinStartDate = itemDate >= dateRange?.startDate;
            const isWithinEndDate = itemDate <= dateRange?.endDate;

        return isWithinStartDate && isWithinEndDate;
    });

    if(!dateRange.startDate && !dateRange.endDate){
        filteredData.slice(0,51);
    }   

    return (
        <div>
            <div className='title'><p>Hotel Booking Dashboard</p></div>
            <DateRangePicker onDateRangeChange={handleDateRangeChange} />

                {(filteredData.length > 0) ? (
                    <div className='chartsContainer'>
                        <TimeseriesChart data={filteredData} />
                        <ColumnChartWithLabels data={filteredData} />
                        <SparkLineChart data={filteredData} title="Adult"/>
                        <SparkLineChart data={filteredData} title="Children"/>
                    </div>
                ) : (
                    <div className='no-data-prompt'>
                        <span className='no-data'>
                        {dateRange.startDate && dateRange.endDate 
                            ? 'No data available for selected date range.' 
                            : 'No data available. Please select a date range to view bookings.'
                        }
                        </span>
                    </div>
                )}
        </div>
    );
    
};

export default Dashboard;
