// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Balance from './components/Balance';
import Summary from './components/Summary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import useLocalStorage from './hooks/useLocalStorage';
import { generateId } from './utils/helpers';
import './styles/main.css';

function App() {
  // Using our custom hook for the main transactions list
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  
  // State to track if we are currently editing a specific transaction
  const [editingTransaction, setEditingTransaction] = useState(null);

  // CRUD Operations
  const addTransaction = (transactionData) => {
    const newTransaction = {
      id: generateId(),
      ...transactionData
    };
    // Spread operator (...): Copy old array, add new item at the top
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    // Filter out the one we want to delete
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions(transactions.map(t => 
      t.id === updatedTransaction.id ? updatedTransaction : t
    ));
    setEditingTransaction(null); // Clear edit mode
  };

  return (
    <div className="container">
      <Header />
      
      <Balance transactions={transactions} />
      <Summary transactions={transactions} />
      
      <TransactionForm 
        onAddTransaction={addTransaction}
        onUpdateTransaction={updateTransaction}
        editingTransaction={editingTransaction}
        clearEdit={() => setEditingTransaction(null)}
      />
      
      <TransactionList 
        transactions={transactions} 
        onDelete={deleteTransaction}
        onEdit={(transaction) => setEditingTransaction(transaction)}
      />
    </div>
  );
}

export default App;