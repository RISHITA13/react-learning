// src/components/TransactionList.js
import React, { useState } from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense

  // Derive a new filtered array based on the state of our search and filters
  const filteredTransactions = transactions.filter(transaction => {
    // 1. Check Search Match
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Check Filter Match
    let matchesFilter = true;
    if (filterType === 'income') matchesFilter = transaction.amount > 0;
    if (filterType === 'expense') matchesFilter = transaction.amount < 0;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="card">
      <h3>History</h3>
      
      {/* Filtering Controls */}
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search transactions..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income Only</option>
          <option value="expense">Expense Only</option>
        </select>
      </div>

      {/* Render List or Empty State */}
      {filteredTransactions.length > 0 ? (
        <ul className="list">
          {filteredTransactions.map(transaction => (
            <TransactionItem 
              key={transaction.id} // React needs unique keys for list items
              transaction={transaction} 
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      ) : (
        <p className="empty-state">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;