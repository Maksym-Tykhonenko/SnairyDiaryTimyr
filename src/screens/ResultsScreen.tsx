import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AppHeader from '../components/AppHeader';
import { getStoryById } from '../data/stories';
import { completeStory, getUpdatedStories } from '../utils/progress';

interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

interface RouteProp {
  params: {
    storyId: string;
    score: number;
    totalQuestions: number;
  };
}

interface Props {
  navigation: NavigationProp;
  route: RouteProp;
}

const ResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { storyId, score, totalQuestions } = route.params;
  const [stars, setStars] = useState(0);
  const [story, setStory] = useState(getStoryById(storyId));

  useEffect(() => {
    calculateStars();
    saveProgress();
  }, []);

  const calculateStars = () => {
    const percentage = (score / totalQuestions) * 100;
    let starCount = 0;
    
    if (percentage >= 90) {
      starCount = 3;
    } else if (percentage >= 70) {
      starCount = 2;
    } else if (percentage >= 50) {
      starCount = 1;
    }
    
    setStars(starCount);
  };

  const saveProgress = async () => {
    const percentage = (score / totalQuestions) * 100;
    let starCount = 0;
    
    if (percentage >= 90) {
      starCount = 3;
    } else if (percentage >= 70) {
      starCount = 2;
    } else if (percentage >= 50) {
      starCount = 1;
    }
    
    await completeStory(storyId, starCount);
    
    // Update story data
    const updatedStories = await getUpdatedStories();
    const updatedStory = updatedStories.find(s => s.id === storyId);
    if (updatedStory) {
      setStory(updatedStory);
    }
  };

  const handleNextStage = () => {
    // Navigate back to story selection to see unlocked stories
    navigation.navigate('StorySelection');
  };

  const handleRetry = () => {
    // Navigate back to story reading
    navigation.navigate('StoryReading', { storyId });
  };

  const getStarColor = (starIndex: number) => {
    return starIndex < stars ? '#FFD700' : '#666';
  };

  const getResultMessage = () => {
    if (stars === 3) {
      return 'Excellent! You\'ve mastered this story!';
    } else if (stars === 2) {
      return 'Good job! You\'re getting there!';
    } else if (stars === 1) {
      return 'Not bad! Try again for more stars!';
    } else {
      return 'Keep practicing! You can do better!';
    }
  };

  if (!story) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Story not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Results" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        {/* Stars Display */}
        <View style={styles.starsContainer}>
          <Text style={styles.starsTitle}>Your Performance</Text>
          <View style={styles.starsRow}>
            {[0, 1, 2].map((starIndex) => (
              <Text
                key={starIndex}
                style={[
                  styles.star,
                  { color: getStarColor(starIndex) }
                ]}
              >
                ⭐
              </Text>
            ))}
          </View>
          <Text style={styles.starsText}>{stars} out of 3 stars</Text>
        </View>

        {/* Score Summary */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreTitle}>Result</Text>
          <Text style={styles.scoreText}>
            {score} correct answer{score !== 1 ? 's' : ''} out of {totalQuestions}
          </Text>
          <Text style={styles.resultMessage}>{getResultMessage()}</Text>
        </View>

        {/* Story Status */}
        {story.completed && (
          <View style={styles.completedContainer}>
            <Text style={styles.completedTitle}>🎉 Story Completed!</Text>
            <Text style={styles.completedText}>
              This story has been added to your collection. You can now read it anytime and download its illustration!
            </Text>
          </View>
        )}

        {/* Next Story Available */}
        {story.completed && (
          <View style={styles.nextStoryContainer}>
            <Text style={styles.nextStoryTitle}>🌟 New Story Unlocked!</Text>
            <Text style={styles.nextStoryText}>
              You've unlocked the next story in your adventure!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        {stars >= 3 ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextStage}
          >
            <Text style={styles.nextButtonText}>Next stage</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRetry}
          >
            <Text style={styles.retryButtonText}>Try again</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ff6b35',
    borderRadius: 5,
  },
  headerButtonText: {
    color: '#ff6b35',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  starsContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  starsTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 40,
    marginHorizontal: 5,
  },
  starsText: {
    color: '#fff',
    fontSize: 16,
  },
  scoreContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  scoreTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  resultMessage: {
    color: '#ff6b35',
    fontSize: 16,
    textAlign: 'center',
  },
  completedContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  completedTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  completedText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  nextStoryContainer: {
    backgroundColor: '#ff6b35',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  nextStoryTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  nextStoryText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
  },
  nextButton: {
    backgroundColor: '#ff6b35',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  retryButton: {
    backgroundColor: '#666',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ResultsScreen;
