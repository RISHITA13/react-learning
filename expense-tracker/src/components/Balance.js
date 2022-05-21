// src/components/Balance.js
import React from 'react';
import { formatMoney } from '../utils/helpers';

const Balance = ({ transactions }) => {
  // Extract all amounts into an array
  const amounts = transactions.map(transaction => transaction.amount);
  
  // Reduce the array to a single total sum
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <div className="balance-container card">
      <h4>Your Balance</h4>
      <h1>{formatMoney(total)}</h1>
    </div>
  );
};

export default Balance;