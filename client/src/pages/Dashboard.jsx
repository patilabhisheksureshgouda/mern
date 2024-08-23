import React, { useState } from 'react';
import TransactionTable from '../components/TransactionTable';
import Statistics from '../components/Statistics';
import Barchart from '../components/Barchart';
import Piechart from '../components/Piechart';
import './DashBoard.css';

const Dashboard = () => {
  const [month, setMonth] = useState('3');

  return (
    <div className="dashboard-container">
      <h1>Transactions Dashboard</h1>
      <label>
        Select Month:
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </label>
      <div className="dashboard-section">
        <Statistics month={month} />
      </div>
      <div className="dashboard-section">
        <Barchart month={month} />
      </div>
      <div className="dashboard-section">
        <Piechart month={month} />
      </div>
      <div className="dashboard-section">
        <TransactionTable month={month} />
      </div>
    </div>
  );
};

export default Dashboard;
