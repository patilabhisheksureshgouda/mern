import React, { useState } from 'react';
import TransactionTable from '../components/TransactionTable';
import Statistics from '../components/Statistics';
import Barchart from '../components/Barchart';
import Piechart from '../components/Piechart';

const Dashboard = () => {
  const [month, setMonth] = useState('3');

  return (
    <div>
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
      <Statistics month={month} />
      <Barchart month={month} />
      <Piechart month={month} />
      <TransactionTable month={month} />
    </div>
  );
};

export default Dashboard;
