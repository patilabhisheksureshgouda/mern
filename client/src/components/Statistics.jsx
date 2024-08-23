import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../api';
import './Statistics.css';

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStatistics(month).then(response => {
      setStats(response.data);
    });
  }, [month]);

  return (
    <div className="statistics-container">
      <h3>Statistics for {month}</h3>
      <p>Total Sales Amount: <span>${stats.totalAmount}</span></p>
      <p>Total Sold Items: <span>{stats.totalSoldItems}</span></p>
      <p>Total Unsold Items: <span>{stats.totalNotSoldItems}</span></p>
    </div>
  );
};

export default Statistics;
