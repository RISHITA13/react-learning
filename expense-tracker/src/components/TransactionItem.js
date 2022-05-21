// src/components/TransactionItem.js
import React from 'react';
import { formatMoney } from '../utils/helpers';

const TransactionItem = ({ transaction, onDelete, onEdit }) => {
  // Determine if it's income (+) or expense (-) for styling
  const sign = transaction.amount < 0 ? '-' : '+';
  const itemClass = transaction.amount < 0 ? 'minus' : 'plus';

  return (
    <li className={itemClass}>
      <div className="item-info">
        <span>{transaction.description}</span>
        <span className="item-category">
          {transaction.category} | {transaction.date}
        </span>
      </div>
      
      <div>
        <span>{sign}{formatMoney(Math.abs(transaction.amount))}</span>
        <div className="action-btns">
          <button onClick={() => onEdit(transaction)} className="edit-btn">✎</button>
          <button onClick={() => onDelete(transaction.id)} className="delete-btn">✗</button>
        </div>
      </div>
    </li>
  );
};

export default TransactionItem;