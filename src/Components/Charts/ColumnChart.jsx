import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

function aggregateData(data) {
  const aggregated = data.reduce((acc, entry) => {
    const { country, adults, children, babies } = entry;
    if (!acc[country]) {
      acc[country] = { adults: 0, children: 0, babies: 0 };
    }
    acc[country].adults += adults;
    acc[country].children += children;
    acc[country].babies += babies;
    return acc;
  }, {});

  return {
    countries: Object.keys(aggregated),
    values: Object.values(aggregated).map(entry => entry.adults + entry.children + entry.babies),
  };
}

const ColumnChartWithLabels = ({ data }) => {
  const [chartData, setChartData] = useState({
    countries: [],
    values: [],
  });
  const chartId = 'column-chart';

  useEffect(() => {
    const formattedData = aggregateData(data);
    setChartData(formattedData);
  }, [data]);

  const options = {
    series: [
      {
        name: 'Visitors',
        data: chartData.values,
      },
    ],
    chart: {
      id: chartId,
      height: 350,
      type: 'bar',
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 1,
        dataLabels: {
          position: 'top'
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val.toString(),
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#e10000"],
      },
    },
    xaxis: {
      categories: chartData.countries,
      position: 'bottom',
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
      },
    },
    fill: {
      colors: ['#1E90FF'],
    },
    title: {
      text: 'Number of visitors per country',
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
  };

  return (
    <div>
      <Chart options={options} series={options.series} type="bar" height={350} width={600} />
    </div>
  );
};

export default ColumnChartWithLabels;
