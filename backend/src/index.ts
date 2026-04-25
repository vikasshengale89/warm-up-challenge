import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import learningRoutes from './routes/learning.routes';

dotenv.config();

const app = express();
const port = process.env['PORT'] || 3000;

app.use(cors({ origin: process.env['CORS_ORIGIN'] || 'http://localhost:4200' }));
app.use(express.json());

app.use('/api/v1', learningRoutes);

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
