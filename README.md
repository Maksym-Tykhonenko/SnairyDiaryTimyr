# Snairy: Knowledge Diary

An interactive React Native app designed to strengthen your memory through stories and challenges.

## Features

- **Story Reading**: Read unique short tales with timed reading sessions
- **Memory Challenges**: Test your recall with engaging quizzes including:
  - Multiple choice questions
  - Sentence completion
  - Title selection
- **Progress Tracking**: Earn stars (1-3) based on your performance
- **Story Collection**: Unlock stories by achieving 3 stars
- **Collection Management**: Revisit completed stories, share them, or download illustrations

## Story Content

The app includes the "Three Little Pigs Adventure" story with comprehensive quiz questions covering:
- Character names and details
- Plot events and locations
- Story themes and messages
- Symbolic elements and meanings

## Getting Started

### Prerequisites

- Node.js (>=18)
- React Native development environment
- iOS Simulator or Android Emulator

### Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

### Running the App

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

## App Structure

- `src/screens/` - All screen components
- `src/navigation/` - Navigation configuration
- `src/data/` - Story data and quiz questions
- `src/utils/` - Progress tracking utilities

## Story Progression

1. **Stage 1**: Read the story (2-minute timer)
2. **Stage 2**: Multiple choice quiz (10 questions)
3. **Stage 3**: Sentence completion (2 questions)
4. **Stage 4**: Title selection (2 questions)

Complete all stages with 3 stars to unlock the next story!

## Technical Details

- Built with React Native 0.80.0
- Uses React Navigation for screen navigation
- AsyncStorage for progress persistence
- TypeScript for type safety
- Dark theme with orange accent colors

## Future Enhancements

- Additional story content
- Illustration downloads
- Social sharing features
- Performance analytics
- Offline mode support