import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDebit = {
      description: description,
      amount: Number(parseFloat(amount).toFixed(2)),
      date: new Date().toISOString().slice(0, 10)
    };
    props.addDebit(newDebit);
    setDescription('');
    setAmount('');
  };

  return (
    <div>
      <h1>Debits</h1>
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
        <button type="submit">Add Debit</button>
      </form>

      <h3>Debit Transactions:</h3>
      <ul>
        {props.debits.map((debit, index) => (
          <li key={index}>
            {debit.description} — ${debit.amount.toFixed(2)} — {debit.date.slice(0, 10)}
          </li>
        ))}
      </ul>

      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Debits;
