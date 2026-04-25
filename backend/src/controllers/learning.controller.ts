import { Request, Response } from 'express';

interface Module {
  id: string;
  conceptId: string;
  title: string;
  content: string;
  quizQuestions: any[];
}

const mockModules: Record<string, Module> = {
  'mod-1': {
    id: 'mod-1',
    conceptId: 'concept-1',
    title: 'Introduction to the Concept',
    content: 'This is the foundational module where you learn the basics. The concept is divided into simple parts...',
    quizQuestions: [
      { id: 'q1', text: 'What is the main purpose?', options: ['Option A', 'Option B', 'Option C'], correctAnswerIndex: 0 }
    ]
  },
  'mod-2': {
    id: 'mod-2',
    conceptId: 'concept-1',
    title: 'Advanced Applications',
    content: 'Now that you know the basics, let us dive into advanced applications...',
    quizQuestions: [
      { id: 'q2', text: 'Which is an advanced feature?', options: ['Feature X', 'Feature Y', 'Feature Z'], correctAnswerIndex: 1 }
    ]
  }
};

export const generateModules = (req: Request, res: Response) => {
  const { topic, difficulty } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  // Mock generation
  res.json({
    conceptId: 'concept-1',
    topic,
    difficulty,
    modules: [
      { id: 'mod-1', title: 'Introduction to ' + topic },
      { id: 'mod-2', title: 'Advanced ' + topic }
    ]
  });
};

export const getModule = (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  const module = mockModules[id];
  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }
  
  // Return module without correct answers
  const safeModule = {
    ...module,
    quizQuestions: module.quizQuestions.map((q: any) => ({ id: q.id, text: q.text, options: q.options }))
  };
  
  res.json(safeModule);
};

export const evaluateQuiz = (req: Request, res: Response) => {
  const { moduleId, answers } = req.body;
  const module = mockModules[moduleId];
  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }

  let correctCount = 0;
  const results = answers.map((ans: { questionId: string, selectedIndex: number }) => {
    const q = module.quizQuestions.find(q => q.id === ans.questionId);
    const isCorrect = q && q.correctAnswerIndex === ans.selectedIndex;
    if (isCorrect) correctCount++;
    return { questionId: ans.questionId, isCorrect };
  });

  const passed = correctCount === module.quizQuestions.length;

  res.json({
    passed,
    results,
    score: correctCount,
    total: module.quizQuestions.length
  });
};
