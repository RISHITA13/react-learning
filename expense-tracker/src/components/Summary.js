// src/components/Summary.js
import React from 'react';
import { formatMoney } from '../utils/helpers';

const Summary = ({ transactions }) => {
  const amounts = transactions.map(transaction => transaction.amount);

  // Filter for positive numbers and sum them
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  // Filter for negative numbers, sum them, and make absolute for display
  const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1;

  return (
    <div className="inc-exp-container card">
      <div>
        <h4>Income</h4>
        <p className="money plus">{formatMoney(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">{formatMoney(expense)}</p>
      </div>
    </div>
  );
};

export default Summary;