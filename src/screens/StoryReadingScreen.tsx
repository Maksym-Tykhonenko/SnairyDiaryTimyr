import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AppHeader from '../components/AppHeader';
import { getStoryById } from '../data/stories';

interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

interface RouteProp {
  params: {
    storyId: string;
  };
}

interface Props {
  navigation: NavigationProp;
  route: RouteProp;
}

const StoryReadingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { storyId } = route.params;
  const [timeLeft, setTimeLeft] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const story = getStoryById(storyId);

  useEffect(() => {
    if (story) {
      setTimeLeft(story.readingTimeMinutes * 60); // Convert to seconds
    }
  }, [story]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsReady(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleReady = () => {
    // Start with multiple choice quiz
    navigation.navigate('Quiz', { 
      storyId, 
      quizType: 'multiple-choice' 
    });
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
      <AppHeader title="Stage 1" onBack={() => navigation.goBack()} />
      <View style={styles.timerContainer}>
        <View style={styles.timerPill}>
          <Text style={styles.timerIcon}>⏱️</Text>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      {/* Story Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.storyText}>{story.content}</Text>
        
       
       
      </ScrollView>

      {/* Ready Button */}
      {isReady && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.readyButton}
            onPress={handleReady}
          >
            <Text style={styles.readyButtonText}>Ready</Text>
          </TouchableOpacity>
        </View>
      )}
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
  timerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  timerIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  timerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  storyText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },
  hintButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff6b35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  footer: {
    padding: 20,
  },
  readyButton: {
    backgroundColor: '#ff6b35',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  readyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'Montserrat',
  },
});

export default StoryReadingScreen;
