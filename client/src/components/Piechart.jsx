import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchPieChart } from '../api';

const PieChart = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPieChart(month).then(response => {
      setData(response.data);
    });
  }, [month]);

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      },
    ],
  };

  return (
    <div>
      <h3>Pie Chart for {month}</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
