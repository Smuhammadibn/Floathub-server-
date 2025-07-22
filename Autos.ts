// server/auth.ts
import express from 'express';
const router = express.Router();

const users = [{ username: 'admin', password: '1234' }]; // You can later replace this with a DB

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

export default router;
