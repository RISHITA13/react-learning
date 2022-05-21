// src/utils/helpers.js

// Generates a random ID for our transactions. 
// In a real app, a database usually handles this, but for local storage, this works great!
export const generateId = () => {
  return Math.floor(Math.random() * 100000000).toString();
};

// Formats a number to a standard USD currency format
export const formatMoney = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};