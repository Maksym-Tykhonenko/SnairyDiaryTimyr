import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import AppHeader from '../components/AppHeader';
import { Story, getUpdatedStories } from '../utils/progress';

interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

interface Props {
  navigation: NavigationProp;
}

const StorySelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    const updatedStories = await getUpdatedStories();
    setStories(updatedStories);
  };

  const handleStorySelect = (storyId: string) => {
    const story = stories.find(s => s.id === storyId);
    if (story && story.unlocked) {
      setSelectedStoryId(storyId);
    }
  };

  const handleStart = () => {
    if (selectedStoryId) {
      navigation.navigate('StoryReading', { storyId: selectedStoryId });
    }
  };

  const getImageSource = (story: Story) => {
    // Map story ids to local images here (user to fill paths)
    const imageMap: Record<string, any> = {
       'pig-story': require('../assets/img/image7.png'),
     'cowboy-story': require('../assets/img/image8.png'),
    'zeus-story': require('../assets/img/image9.png'),
      'reader-story': require('../assets/img/image0.png'),
    };
    return imageMap[story.id] ?? null;
  };

  const renderStoryCard = (story: Story) => {
    const isSelected = selectedStoryId === story.id;
    const isLocked = !story.unlocked;
    const imageSource = getImageSource(story);

    return (
      <TouchableOpacity
        key={story.id}
        style={[
          styles.storyCard,
          isSelected && styles.selectedCard,
          isLocked && styles.lockedCard
        ]}
        onPress={() => handleStorySelect(story.id)}
        disabled={isLocked}
      >
        <View style={styles.storyImageContainer}>
          {imageSource ? (
            <Image source={imageSource} style={styles.storyImage} resizeMode="cover" />
          ) : (
            <View style={[styles.storyImage, styles.placeholder]} />
          )}
          {isLocked && (
            <View style={styles.lockedOverlay}>
              <View style={styles.lockCircle}>
                <Text style={styles.lockX}>✕</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const selectedStory = stories.find(s => s.id === selectedStoryId);
  const stars = selectedStory ? selectedStory.stars : 0;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Tests" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <View style={styles.storyGrid}>
          {stories.map(renderStoryCard)}
        </View>

       
      </ScrollView>

      {/* Start Button */}
      {selectedStoryId && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStart}
          >
            <Text style={styles.startButtonText}>Start</Text>
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
  content: {
    flex: 1,
    padding: 20,
  },
  storyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  storyCard: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#222',
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#ff6b35',
  },
  lockedCard: {
    opacity: 0.5,
  },
  storyImageContainer: {
    flex: 1,
    position: 'relative',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  placeholder: {
    backgroundColor: '#333',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  lockCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockX: {
    fontSize: 32,
    color: '#9b3b2e',
    fontWeight: '900',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  star: {
    fontSize: 24,
    marginHorizontal: 5,
    opacity: 0.3,
    fontFamily: 'Montserrat',
  },
  filledStar: {
    opacity: 1,
  },
  footer: {
    padding: 20,
  },
  startButton: {
    backgroundColor: '#ff6b35',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});

export default StorySelectionScreen;
