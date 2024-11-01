import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const formatData = (data, title) => {
  const dailyVisitors = {};
  
  data.forEach((entry) => {
    const { arrival_date_year, arrival_date_month, arrival_date_day_of_month, adults, children, babies } = entry;

    const date = new Date(Date.UTC(
      arrival_date_year,
      new Date(`${arrival_date_month} 1`).getMonth(),
      arrival_date_day_of_month
    ));

    const timestamp = date.getTime();
    let totalVisitors = 0;
    if (title === "Adult") {
      totalVisitors = adults;
    } else if (title === "Children") {
      totalVisitors = children;
    } else {
      totalVisitors = 0;
    }

    if (dailyVisitors[timestamp]) {
      dailyVisitors[timestamp] += totalVisitors;
    } else {
      dailyVisitors[timestamp] = totalVisitors;
    }
  });

  return Object.entries(dailyVisitors).map(([date, totalVisitors]) => ({
    x: Number(date),
    y: totalVisitors,
  }));
};

const SparkLineChart = ({ data, title }) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const formattedData = formatData(data, title);
    setSeries([{ name: `${title} Visitors`, data: formattedData }]);
  }, [data, title]);  

  const options = {
    chart: {
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0,
    },
    colors: ['#DCE6EC'],
    title: {
      text: `${series[0]?.data.reduce((sum, entry) => sum + entry.y, 0) || 0}`,
      offsetX: 10,
      offsetY: 30,
      style: {
        color: '#e10000',
        fontFamily: 'Segoe UI',
        fontSize: '24px',
        fontWeight: '700'
      },
    },
    subtitle: {
      text: `${title} Visitors`,  
      offsetX: 10,
      offsetY: 10,
      style: {
        fontFamily: 'Segoe UI',
        fontWeight: '500',
        fontSize: '17px'
      },
    },
    xaxis: {
      type: 'datetime',
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="area" height={350} width={600} />
    </div>
  );
};

export default SparkLineChart;
