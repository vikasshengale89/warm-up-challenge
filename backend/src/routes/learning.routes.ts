import { Router } from 'express';
import { generateModules, getModule, evaluateQuiz } from '../controllers/learning.controller';

const router = Router();

router.post('/concepts', generateModules);
router.get('/modules/:id', getModule);
router.post('/quiz/evaluate', evaluateQuiz);

export default router;
