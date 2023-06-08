import { Router } from 'express';
import { outputController } from '../controllers/output.controller';

const router = Router();

router.get('/output/:taskId/:size', outputController.getImage);

export default router;