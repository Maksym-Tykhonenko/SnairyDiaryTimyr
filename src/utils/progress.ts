import AsyncStorage from '@react-native-async-storage/async-storage';
import { stories, Story } from '../data/stories';

export type { Story } from '../data/stories';

const PROGRESS_KEY = 'snairy_progress';

export interface UserProgress {
  unlockedStories: string[];
  completedStories: string[];
  storyStars: { [storyId: string]: number };
  currentStoryId?: string;
}

export const getProgress = async (): Promise<UserProgress> => {
  try {
    const progressData = await AsyncStorage.getItem(PROGRESS_KEY);
    if (progressData) {
      return JSON.parse(progressData);
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  
  // Default progress - only first story unlocked
  return {
    unlockedStories: ['pig-story'],
    completedStories: [],
    storyStars: {},
    currentStoryId: undefined
  };
};

export const saveProgress = async (progress: UserProgress): Promise<void> => {
  try {
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const unlockNextStory = async (currentStoryId: string): Promise<void> => {
  const progress = await getProgress();
  const currentIndex = stories.findIndex((story: Story) => story.id === currentStoryId);
  
  if (currentIndex >= 0 && currentIndex < stories.length - 1) {
    const nextStoryId = stories[currentIndex + 1].id;
    if (!progress.unlockedStories.includes(nextStoryId)) {
      progress.unlockedStories.push(nextStoryId);
      await saveProgress(progress);
    }
  }
};

export const completeStory = async (storyId: string, stars: number): Promise<void> => {
  const progress = await getProgress();
  
  if (stars >= 3) {
    if (!progress.completedStories.includes(storyId)) {
      progress.completedStories.push(storyId);
    }
    await unlockNextStory(storyId);
  }
  
  progress.storyStars[storyId] = stars;
  await saveProgress(progress);
};

export const getUpdatedStories = async (): Promise<Story[]> => {
  const progress = await getProgress();
  
  return stories.map((story: Story) => ({
    ...story,
    unlocked: progress.unlockedStories.includes(story.id),
    completed: progress.completedStories.includes(story.id),
    stars: progress.storyStars[story.id] || 0
  }));
};
