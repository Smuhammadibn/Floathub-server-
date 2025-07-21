import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import LoansPage from './pages/LoansPage';

const App = () => {
  return (
    <div>
      <h1>FloatHub Loan Dashboard</h1>
      <LoansPage />
    </div>
  );
};

export default App;


import React, { useEffect, useState } from 'react';
import LoanForm from '../components/LoanForm';

type Loan = {
  id: string;
  name: string;
  amount: number;
  type: 'agent' | 'farmer' | 'salary';
  status: 'pending' | 'approved' | 'repaid';
};

const LoansPage = () => {
  const [loans, setLoans] = useState<Loan[]>([]);

  const fetchLoans = async () => {
    const res = await fetch('http://localhost:5000/api/loans');
    const data = await res.json();
    setLoans(data);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div>
      <LoanForm onNewLoan={fetchLoans} />
      <h2>All Loans</h2>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>
            <strong>{loan.name}</strong> requested ₦{loan.amount} as a {loan.type} - <em>{loan.status}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoansPage;


import React, { useState } from 'react';

type Props = {
  onNewLoan: () => void;
};

const LoanForm = ({ onNewLoan }: Props) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'agent' | 'farmer' | 'salary'>('agent');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, amount: Number(amount), type }),
    });
    setName('');
    setAmount('');
    onNewLoan();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Apply for Loan</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" required />
      <select value={type} onChange={(e) => setType(e.target.value as any)}>
        <option value="agent">POS Agent</option>
        <option value="farmer">Farmer</option>
        <option value="salary">Salary Earner</option>
      </select>
      <button type="submit">Apply</button>
    </form>
  );
};

export default LoanForm;


