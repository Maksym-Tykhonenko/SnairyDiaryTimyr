export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  type: 'multiple-choice' | 'sentence-completion' | 'title-selection';
}

export interface Story {
  id: string;
  title: string;
  content: string;
  readingTimeMinutes: number;
  illustration: string;
  quizzes: {
    multipleChoice: QuizQuestion[];
    sentenceCompletion: QuizQuestion[];
    titleSelection: QuizQuestion[];
  };
  unlocked: boolean;
  completed: boolean;
  stars: number;
}

export const stories: Story[] = [
  {
    id: 'pig-story',
    title: 'The Three Little Pigs Adventure',
    content: `In the quiet village of Baconville lived three pig brothers - Porky, Becky and Gummy. One day, they heard that the farmer was planning a sausage fair and decided to run away to find the legendary Pig Treasure that gives freedom and happiness.

They journeyed through a corn maze where crows gave them a riddle, crossed a "bridge of luck" after Becky guessed a slot machine combination, and encountered a fox-hunter in the mountains. Gummy pressed a slot machine lever that resulted in "Oink - Oink - Oink!" which led to a chest of gold appearing.

The pigs realized the true treasure was freedom, courage and friendship. They founded the "Oink Kingdom" and lived happily ever after.`,
    readingTimeMinutes: 2,
    illustration: 'pig-story-illustration',
    unlocked: true,
    completed: false,
    stars: 0,
    quizzes: {
      multipleChoice: [
        {
          id: 'q1',
          question: 'What were the names of the three little pigs?',
          options: ['Tim, Tom and Ted', 'Porky, Becky and Gummy', 'Hans, Gretel and Henry', 'Lucky, Picky and Paco'],
          correctAnswer: 1,
          type: 'multiple-choice'
        },
        {
          id: 'q2',
          question: 'Where did the little pigs live at the beginning of the story?',
          options: ['In the forest', 'In the village of Baconville', 'On a farm by the sea', 'In the city'],
          correctAnswer: 1,
          type: 'multiple-choice'
        },
        {
          id: 'q3',
          question: 'Who was the farmer in the village?',
          options: ['Their father', 'The wolf', 'The man who decided to have a sausage fair', 'The cat'],
          correctAnswer: 2,
          type: 'multiple-choice'
        },
        {
          id: 'q4',
          question: 'What did the little pigs decide to do when they heard about the fair?',
          options: ['Run away', 'Hide', 'Attack', 'Laugh'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'q5',
          question: 'Where did they run away to?',
          options: ['In the forest', 'In the desert', 'In the mountains', 'In the field'],
          correctAnswer: 1,
          type: 'multiple-choice'
        },
        {
          id: 'q6',
          question: 'What was the name of the treasure they were looking for?',
          options: ['Book of Wisdom', 'Pig Key', 'Pig Treasure', 'Golden Bucket'],
          correctAnswer: 2,
          type: 'multiple-choice'
        },
        {
          id: 'q7',
          question: 'What did the legendary treasury give?',
          options: ['Freedom and Happiness', 'Food', 'House', 'Gold for the Farm'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'q8',
          question: 'Who met them in the corn maze?',
          options: ['Fox', 'Crows', 'Wolf', 'Rabbits'],
          correctAnswer: 1,
          type: 'multiple-choice'
        },
        {
          id: 'q9',
          question: 'What did the crows do?',
          options: ['Asked a riddle', 'Attacked', 'Trapped', 'Gave a coin'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'q10',
          question: 'What was the name of the bravest pig?',
          options: ['Porky', 'Becky', 'Gummy', 'Lucky'],
          correctAnswer: 1,
          type: 'multiple-choice'
        }
      ],
      sentenceCompletion: [
        {
          id: 'sc1',
          question: 'Complete the sentence: The pigs crossed the _____ of Luck.',
          options: ['Bridge', 'Road', 'Path', 'River'],
          correctAnswer: 0,
          type: 'sentence-completion'
        },
        {
          id: 'sc2',
          question: 'Complete the sentence: The machine combination was _____ - _____ - _____.',
          options: ['Oink - Oink - Oink', 'Pig - Pig - Pig', 'Lucky - Oink - Gold', 'Oink - Gold - Star'],
          correctAnswer: 0,
          type: 'sentence-completion'
        }
      ],
      titleSelection: [
        {
          id: 'ts1',
          question: 'What would be the best title for this story?',
          options: ['The Great Escape', 'Pig Adventure', 'The Treasure Hunt', 'Oink Kingdom'],
          correctAnswer: 0,
          type: 'title-selection'
        },
        {
          id: 'ts2',
          question: 'What is the main theme of this story?',
          options: ['Adventure and Friendship', 'Gold and Wealth', 'Fear and Running', 'Magic and Mystery'],
          correctAnswer: 0,
          type: 'title-selection'
        }
      ]
    }
  },
  {
    id: 'cowboy-story',
    title: 'The Legend of Pistolero',
    content: `In the hot and dusty town of San Caliente, there lived a legendary gunslinger named Pistolero. Once a lawman, he was betrayed by his friend the sheriff and became an outlaw. He rode a dark brown horse across the desert filled with sand dunes and red rocks, searching for the legendary Fire Blaze treasure hidden in an old mine.

The Black Coyotes gang chased him across the desert, wanting the Fire Blaze treasure that was said to contain the golden bullet of luck. Pistolero traveled at sunset under a fiery red sky, determined to find freedom. He found the entrance to the mine by following a coyote's howl and heard echoes of the past inside.

The treasure was guarded by traps and fire. In the final scene, Pistolero shot the heart of the flame with his revolver, and the fire vanished. A golden treasure appeared, and a voice said "Luck belongs to the brave." Pistolero raised his hat and rode away, having found his destiny.

His red poncho and revolver symbolized justice and freedom. The story ended with a gunshot and silence, leaving only a golden glow in the desert. Pistolero became legendary for his courage and skill, proving that luck favors the brave.`,
    readingTimeMinutes: 2,
    illustration: 'cowboy-story-illustration',
    unlocked: false,
    completed: false,
    stars: 0,
    quizzes: {
      multipleChoice: [
        {
          id: 'cowboy-q1',
          question: 'What was the cowboy\'s name?',
          options: ['Pistolero', 'Ramon', 'El Toro', 'Santiago'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q2',
          question: 'Where did the story take place?',
          options: ['In San Caliente', 'In Santa Fe', 'In Los Caballos', 'In Rio Verde'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q3',
          question: 'What kind of weather was described in the beginning?',
          options: ['Hot and dusty', 'Cold and rainy', 'Windy and foggy', 'Stormy and dark'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q4',
          question: 'What did Pistolero used to be?',
          options: ['A lawman', 'A thief', 'A sheriff', 'A farmer'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q5',
          question: 'Who betrayed Pistolero?',
          options: ['The sheriff', 'His friend', 'His horse', 'A stranger'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q6',
          question: 'What was the treasure called?',
          options: ['The Fire Blaze treasure', 'The Gold Canyon chest', 'The Lost Coin of San Caliente', 'The Blaze of Luck'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q7',
          question: 'Where was the Fire Blaze treasure hidden?',
          options: ['In an old mine', 'In a desert cave', 'Under the saloon', 'Behind a waterfall'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q8',
          question: 'What was said to be inside the treasure?',
          options: ['The golden bullet of luck', 'A cursed diamond', 'A sheriff\'s badge', 'A map'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q9',
          question: 'What did Pistolero ride?',
          options: ['A dark brown horse', 'A black bull', 'A red mustang', 'A white donkey'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q10',
          question: 'Who chased Pistolero across the desert?',
          options: ['The Black Coyotes gang', 'The Red Hawks', 'The Desert Snakes', 'The Sand Bandits'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q11',
          question: 'What weapon did Pistolero carry?',
          options: ['A revolver', 'A rifle', 'A bow', 'A sword'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q12',
          question: 'What did the bandits want from him?',
          options: ['The Fire Blaze treasure', 'His revolver', 'His horse', 'Revenge'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q13',
          question: 'What was the desert filled with?',
          options: ['Sand dunes and red rocks', 'Snow and cactus', 'Rivers and grass', 'Trees and fog'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q14',
          question: 'What time of day did Pistolero travel?',
          options: ['At sunset', 'At dawn', 'At midnight', 'In the morning'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q15',
          question: 'What was Pistolero searching for?',
          options: ['Freedom', 'Revenge', 'Home', 'Friends'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q16',
          question: 'What was the color of the sky during his journey?',
          options: ['Fiery red', 'Dark purple', 'Cloudy gray', 'Pale blue'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q17',
          question: 'How did Pistolero find the entrance to the mine?',
          options: ['By following a map', 'By accident', 'By a coyote\'s howl', 'By the sheriff\'s message'],
          correctAnswer: 2,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q18',
          question: 'What did he hear inside the mine?',
          options: ['Echoes of the past', 'The sound of gold', 'Gunfire', 'The sheriff\'s voice'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q19',
          question: 'Who guarded the treasure?',
          options: ['Traps and fire', 'A bandit', 'A ghost', 'A wolf'],
          correctAnswer: 0,
          type: 'multiple-choice'
        },
        {
          id: 'cowboy-q20',
          question: 'What did Pistolero shoot in the final scene?',
          options: ['The heart of the flame', 'The sheriff', 'The bandit leader', 'The mine door'],
          correctAnswer: 0,
          type: 'multiple-choice'
        }
      ],
      sentenceCompletion: [
        {
          id: 'cowboy-sc1',
          question: 'Complete the sentence: Pistolero was once a _____ who was betrayed.',
          options: ['lawman', 'thief', 'sheriff', 'farmer'],
          correctAnswer: 0,
          type: 'sentence-completion'
        },
        {
          id: 'cowboy-sc2',
          question: 'Complete the sentence: The voice said "_____ belongs to the brave."',
          options: ['Luck', 'Gold', 'Fire', 'Courage'],
          correctAnswer: 0,
          type: 'sentence-completion'
        }
      ],
      titleSelection: [
        {
          id: 'cowboy-ts1',
          question: 'What would be the best title for this story?',
          options: ['The Legend of Pistolero', 'The Desert Treasure', 'The Sheriff\'s Betrayal', 'The Golden Bullet'],
          correctAnswer: 0,
          type: 'title-selection'
        },
        {
          id: 'cowboy-ts2',
          question: 'What is the main theme of this story?',
          options: ['Courage and destiny', 'Gold and greed', 'Betrayal and revenge', 'Friendship and loyalty'],
          correctAnswer: 0,
          type: 'title-selection'
        }
      ]
    }
  },
  {
    id: 'zeus-story',
    title: 'The Zeus Adventure',
    content: 'This story will be unlocked after completing the cowboy story.',
    readingTimeMinutes: 2,
    illustration: 'zeus-story-illustration',
    unlocked: false,
    completed: false,
    stars: 0,
    quizzes: {
      multipleChoice: [],
      sentenceCompletion: [],
      titleSelection: []
    }
  },
  {
    id: 'reader-story',
    title: 'The Reader Adventure',
    content: 'This story will be unlocked after completing the Zeus story.',
    readingTimeMinutes: 2,
    illustration: 'reader-story-illustration',
    unlocked: false,
    completed: false,
    stars: 0,
    quizzes: {
      multipleChoice: [],
      sentenceCompletion: [],
      titleSelection: []
    }
  }
];

export const getStoryById = (id: string): Story | undefined => {
  return stories.find(story => story.id === id);
};

export const getUnlockedStories = (): Story[] => {
  return stories.filter(story => story.unlocked);
};

export const getCompletedStories = (): Story[] => {
  return stories.filter(story => story.completed && story.stars >= 3);
};

// This function is now implemented in src/utils/progress.ts
