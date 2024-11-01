import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const formatData = (data) => {
  const dailyVisitors = {};
  
  data.forEach((entry) => {
    const { arrival_date_year, arrival_date_month, arrival_date_day_of_month, adults, children, babies } = entry;

    const date = new Date(Date.UTC(
      arrival_date_year,
      new Date(`${arrival_date_month} 1`).getMonth(),
      arrival_date_day_of_month
    ));

    const timestamp = date.getTime();
    const totalVisitors = adults + children + babies;

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

const TimeseriesChart = ({ data }) => {
  const [series, setSeries] = useState([]);
  const chartId = 'timeseries-chart';

  useEffect(() => {
    const formattedData = formatData(data);
    setSeries([{ name: 'Visitors', data: formattedData }]);
  }, [data]);

  const options = {
    chart: {
      id: chartId,
      type: 'area',
      stacked: false,
      height: 400,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    colors: ['#1E90FF'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 1,
        gradientToColors: ['#FFFFFF'],
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
    },
    title: {
      text: 'Number of Visitors per Day',
      align: 'center',               
      floating: true,              
      offsetX: 10,                 
      offsetY: -5,                 
      style: {
        color: '#454545',
        fontFamily: 'Segoe UI',
        fontSize: '18px',
        fontWeight: '600'
      },
    },
    
    yaxis: {
      title: {
        text: 'Visitors Count',
        style: {
          color: '#454545',
          fontFamily: 'Segoe UI',
          fontSize: '16px',
          fontWeight: '600'
        },
      },
      labels: {
        formatter: (val) => val.toFixed(0),
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: false,
      y: {
        formatter: (val) => val.toFixed(0),
      },
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="area" height={350} width={600} />
    </div>
  );
};

export default TimeseriesChart;
