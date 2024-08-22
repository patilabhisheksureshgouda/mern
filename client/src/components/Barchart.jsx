import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchBarChart } from '../api';


const BarChart = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchBarChart(month).then(response => {
      setData(response.data);
    });
  }, [month]);

  const chartData = {
    labels: data.map(item => item.range),
    datasets: [
      {
        label: 'Number of Items',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Bar Chart for {month}</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
