/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCredit = {
      description: description,
      amount: Number(parseFloat(amount).toFixed(2)),
      date: new Date().toISOString().slice(0, 10) // format: YYYY-MM-DD
    };
    props.addCredit(newCredit);
    setDescription('');
    setAmount('');
  };

  return (
    <div>
      <h1>Credits</h1>
      <AccountBalance accountBalance={props.accountBalance} />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Add Credit</button>
      </form>

      <h3>Credit Transactions:</h3>
      <ul>
        {props.credits.map((credit, index) => (
          <li key={index}>
            {credit.description} — ${credit.amount.toFixed(2)} — {credit.date}
          </li>
        ))}
      </ul>

      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;
