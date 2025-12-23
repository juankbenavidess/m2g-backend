import { Router } from 'express';
import { EventsController } from '../controllers/EventsController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const eventsController = new EventsController();

router.get('/', authMiddleware, (req, res, next) =>
  eventsController.getAll(req, res, next)
);

export default router;