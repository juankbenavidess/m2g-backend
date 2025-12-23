import { Router } from 'express';
import { TicketsController } from '../controllers/TicketsController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const ticketsController = new TicketsController();

router.post('/purchase', authMiddleware, (req, res, next) =>
  ticketsController.purchase(req, res, next)
);

router.get('/my-tickets', authMiddleware, (req, res, next) =>
  ticketsController.getMyTickets(req, res, next)
);

export default router;