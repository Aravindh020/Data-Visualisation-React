import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import content from "./wind.json";

const BarChart = () => {
    const [ data, setData ] = useState({labels: [], datasets: []});
    useEffect(() => {
        const labels = content.map(({t}) => t);
        const datasets = [
            {
                label: 'Wind Speed (km/h²)',
                data: content.map(({w}) => w),
                backgroundColor: ['Red']
            },
            
        ]

        setData({labels, datasets})
    }, [])

    const options = {
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Windy',
        },
      },
    };

  return <Bar data={data} options={options} />
}

export default BarChart;