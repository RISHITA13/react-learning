// src/components/TransactionForm.js
import React, { useState, useEffect } from 'react';

const TransactionForm = ({ onAddTransaction, onUpdateTransaction, editingTransaction, clearEdit }) => {
  // Local state for our form inputs
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // 'income' or 'expense'
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  // useEffect watches the 'editingTransaction' prop. 
  // If we click "edit" on a transaction, this populates the form.
  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description);
      // Make amount positive for the input field
      setAmount(Math.abs(editingTransaction.amount)); 
      setType(editingTransaction.amount > 0 ? 'income' : 'expense');
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
    }
  }, [editingTransaction]);

  const onSubmit = (e) => {
    e.preventDefault();

    // 1. Validation
    if (!description || !amount || !category || !date) {
      setError('Please fill out all fields.');
      return;
    }
    if (amount <= 0) {
      setError('Amount must be greater than zero.');
      return;
    }
    setError(''); // Clear errors

    // 2. Prepare the data
    const parsedAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);
    const transactionData = {
      description,
      amount: parsedAmount,
      category,
      date
    };

    // 3. Send data up to parent
    if (editingTransaction) {
      onUpdateTransaction({ ...transactionData, id: editingTransaction.id });
    } else {
      onAddTransaction(transactionData);
    }

    // 4. Reset form
    resetForm();
  };

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('');
    setDate('');
    if (editingTransaction) clearEdit();
  };

  return (
    <div className="card">
      <h3>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h3>
      <form onSubmit={onSubmit}>
        
        <div>
          <label>Description</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="e.g. Groceries" 
          />
        </div>

        <div>
          <label>Amount</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Enter amount..." 
            step="0.01"
          />
        </div>

        <div>
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category...</option>
            <option value="Food">Food</option>
            <option value="Housing">Housing</option>
            <option value="Salary">Salary</option>
            <option value="Transportation">Transportation</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Date</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button className="btn" type="submit">
          {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </button>
        
        {editingTransaction && (
          <button className="btn btn-cancel" type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default TransactionForm;