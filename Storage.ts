import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


import express from 'express';
import { getLoans, createLoan } from './storage';

const router = express.Router();

router.get('/loans', async (req, res) => {
  const loans = await getLoans();
  res.json(loans);
});

router.post('/loans', async (req, res) => {
  const newLoan = await createLoan(req.body);
  res.status(201).json(newLoan);
});

export default router;


interface Loan {
  id: string;
  type: 'agent' | 'farmer' | 'salary' | 'business';
  name: string;
  amount: number;
  status: 'pending' | 'approved' | 'repaid';
}

let loans: Loan[] = [];

export async function getLoans(): Promise<Loan[]> {
  return loans;
}

export async function createLoan(data: Omit<Loan, 'id' | 'status'>): Promise<Loan> {
  const newLoan: Loan = {
    id: Date.now().toString(),
    status: 'pending',
    ...data,
  };
  loans.push(newLoan);
  return newLoan;
}
