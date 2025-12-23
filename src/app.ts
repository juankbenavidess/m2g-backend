import express from 'express';
import cors from 'cors';
import { errorHandler } from './presentation/middlewares/errorHandler';
import authRoutes from './presentation/routes/auth.routes';
import eventsRoutes from './presentation/routes/events.routes';
import ticketsRoutes from './presentation/routes/tickets.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/tickets', ticketsRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

export default app;