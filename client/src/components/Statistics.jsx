import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../api';

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStatistics(month).then(response => {
      setStats(response.data);
    });
  }, [month]);

  return (
    <div>
      <h3>Statistics for {month}</h3>
      <p>Total Sales Amount: ${stats.totalAmount}</p>
      <p>Total Sold Items: {stats.totalSoldItems}</p>
      <p>Total Unsold Items: {stats.totalNotSoldItems}</p>
    </div>
  );
};

export default Statistics;
