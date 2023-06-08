import { Router } from 'express';
import multer from 'multer';
import { taskController } from '../controllers/tasks.controller';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/task', upload.single('image'), taskController.createTask);
router.get('/task/:taskId', taskController.getTask);

export default router;