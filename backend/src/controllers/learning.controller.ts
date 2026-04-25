import { Request, Response } from 'express';

interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

interface Module {
  id: string;
  conceptId: string;
  title: string;
  content: string;
  quizQuestions: QuizQuestion[];
}

// In-memory store for generated modules (simulating a database)
const db: Record<string, Module> = {};

function generateContentForTopic(topic: string, difficulty: string, moduleIndex: number): { title: string; content: string; questions: QuizQuestion[] } {
  const isBeginner = difficulty === 'beginner';
  
  const phases = [
    {
      title: `Fundamentals of ${topic}`,
      content: `Welcome to the fundamentals of ${topic}. In this module, we will explore the core principles that make ${topic} essential. Understanding the foundation is critical before moving on to complex scenarios. You'll learn about the basic syntax, the primary use-cases, and why developers and scientists rely on ${topic} daily. By the end of this module, you should be able to identify the main components of ${topic} and explain its primary value proposition.`,
      questions: [
        {
          id: `q-${Date.now()}-1`,
          text: `What is the primary purpose of learning the fundamentals of ${topic}?`,
          options: [
            `To immediately build complex, production-ready systems.`,
            `To understand the core principles and foundation before tackling advanced topics.`,
            `To memorize syntax without understanding the underlying concepts.`,
            `It has no real purpose; we should skip to advanced topics.`
          ],
          correctAnswerIndex: 1
        },
        {
          id: `q-${Date.now()}-2`,
          text: `Which of the following is an expected outcome of this module?`,
          options: [
            `You will be an absolute master of ${topic}.`,
            `You will never need to read documentation again.`,
            `You will be able to identify the main components and value proposition of ${topic}.`,
            `You will build a full-stack application from scratch.`
          ],
          correctAnswerIndex: 2
        }
      ]
    },
    {
      title: `Deep Dive: Mechanisms of ${topic}`,
      content: `Now that you have grasped the basics of ${topic}, it is time to look under the hood. How does ${topic} actually work? This module breaks down the internal mechanics. We will analyze the lifecycle, the state management, and the data flow. When working with ${topic} in the real world, you will encounter edge cases. Understanding the internal mechanism ensures you can debug effectively. Make sure to take notes on the architecture patterns discussed here.`,
      questions: [
        {
          id: `q-${Date.now()}-3`,
          text: `Why is understanding the internal mechanics of ${topic} important?`,
          options: [
            `It allows you to debug effectively when encountering edge cases.`,
            `It makes your code run 10x faster automatically.`,
            `It is only useful for passing interviews, not real work.`,
            `It isn't important; abstraction handles everything.`
          ],
          correctAnswerIndex: 0
        }
      ]
    },
    {
      title: `Advanced Patterns in ${topic}`,
      content: `Welcome to the final stage of your ${topic} journey. Advanced patterns separate beginners from experts. We will cover optimization, scalability, and architectural design patterns specific to ${topic}. You'll learn how to structure large-scale applications and manage complex state. We'll also cover anti-patterns—things you should absolutely avoid doing when using ${topic}.`,
      questions: [
        {
          id: `q-${Date.now()}-4`,
          text: `What is an anti-pattern?`,
          options: [
            `A highly recommended way of writing code.`,
            `A common practice that initially seems helpful but ultimately causes more problems.`,
            `A security feature built into ${topic}.`,
            `A new design pattern introduced in the latest version.`
          ],
          correctAnswerIndex: 1
        },
        {
          id: `q-${Date.now()}-5`,
          text: `What separates beginners from experts in ${topic}?`,
          options: [
            `Using as many libraries as possible.`,
            `Writing the shortest code possible, regardless of readability.`,
            `Understanding optimization, scalability, and advanced architectural patterns.`,
            `Memorizing the entire official documentation.`
          ],
          correctAnswerIndex: 2
        }
      ]
    }
  ];

  // If beginner, give them simpler phases. If advanced, start from phase 2 or 3.
  let selectedPhase;
  if (isBeginner) {
    selectedPhase = phases[moduleIndex % 2]; // 0 and 1
  } else {
    selectedPhase = phases[(moduleIndex % 2) + 1]; // 1 and 2
  }

  // Adjust title based on module index to ensure uniqueness if we generate many
  return {
    title: `${selectedPhase.title} (Part ${Math.floor(moduleIndex / 2) + 1})`,
    content: selectedPhase.content,
    questions: selectedPhase.questions
  };
}

export const generateModules = (req: Request, res: Response) => {
  const { topic, difficulty } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  const conceptId = `concept-${Date.now()}`;
  const moduleCount = difficulty === 'advanced' ? 4 : 3;
  
  const generatedModules = [];

  for (let i = 0; i < moduleCount; i++) {
    const modId = `mod-${conceptId}-${i}`;
    const generatedData = generateContentForTopic(topic, difficulty, i);
    
    const newModule: Module = {
      id: modId,
      conceptId: conceptId,
      title: generatedData.title,
      content: generatedData.content,
      quizQuestions: generatedData.questions
    };
    
    db[modId] = newModule;
    generatedModules.push({ id: modId, title: newModule.title });
  }

  res.json({
    conceptId,
    topic,
    difficulty,
    modules: generatedModules
  });
};

export const getModule = (req: Request, res: Response) => {
  const id = req.params['id'] as string;
  const module = db[id];
  if (!module) {
    return res.status(404).json({ error: 'Module not found. It may have expired from our in-memory store.' });
  }
  
  // Return module without correct answers to prevent cheating
  const safeModule = {
    ...module,
    quizQuestions: module.quizQuestions.map((q) => ({ id: q.id, text: q.text, options: q.options }))
  };
  
  res.json(safeModule);
};

export const evaluateQuiz = (req: Request, res: Response) => {
  const { moduleId, answers } = req.body;
  const module = db[moduleId];
  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }

  let correctCount = 0;
  const results = answers.map((ans: { questionId: string, selectedIndex: number }) => {
    const q = module.quizQuestions.find(q => q.id === ans.questionId);
    const isCorrect = q && q.correctAnswerIndex === ans.selectedIndex;
    if (isCorrect) correctCount++;
    return { 
      questionId: ans.questionId, 
      isCorrect,
      correctAnswerIndex: q?.correctAnswerIndex 
    };
  });

  const passed = correctCount === module.quizQuestions.length;

  res.json({
    passed,
    results,
    score: correctCount,
    total: module.quizQuestions.length
  });
};
