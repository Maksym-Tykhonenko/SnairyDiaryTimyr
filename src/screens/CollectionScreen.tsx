import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import AppHeader from '../components/AppHeader';
import { Story, getCompletedStories } from '../data/stories';

interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

interface Props {
  navigation: NavigationProp;
}

const CollectionScreen: React.FC<Props> = ({ navigation }) => {
  const [completedStories, setCompletedStories] = useState<Story[]>([]);

  useEffect(() => {
    loadCompletedStories();
  }, []);

  const loadCompletedStories = async () => {
    const stories = await getCompletedStories();
    setCompletedStories(stories);
  };

  const handleStoryPress = (story: Story) => {
    Alert.alert(
      'Story Options',
      'What would you like to do with this story?',
      [
        {
          text: 'Read Again',
          onPress: () => navigation.navigate('StoryReading', { storyId: story.id })
        },
        {
          text: 'Share Story',
          onPress: () => shareStory(story)
        },
        {
          text: 'Download Illustration',
          onPress: () => downloadIllustration(story)
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const shareStory = (story: Story) => {
    // In a real app, this would use the Share API
    Alert.alert('Share Story', `Sharing "${story.title}" story!`);
  };

  const downloadIllustration = (story: Story) => {
    // In a real app, this would download the illustration
    Alert.alert('Download Illustration', `Downloading illustration for "${story.title}"!`);
  };

  const getStoryEmoji = (storyId: string) => {
    switch (storyId) {
      case 'pig-story':
        return '🐷';
      case 'cowboy-story':
        return '🤠';
      case 'zeus-story':
        return '⚡';
      case 'reader-story':
        return '📚';
      default:
        return '📖';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Collection" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        {completedStories.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Stories Completed Yet</Text>
            <Text style={styles.emptyText}>
              Complete stories with 3 stars to add them to your collection!
            </Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => navigation.navigate('StorySelection')}
            >
              <Text style={styles.startButtonText}>Start Your Journey</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.title}>Your Collection</Text>
            <Text style={styles.subtitle}>
              {completedStories.length} stor{completedStories.length === 1 ? 'y' : 'ies'} completed
            </Text>
            
            {completedStories.map((story) => (
              <TouchableOpacity
                key={story.id}
                style={styles.storyCard}
                onPress={() => handleStoryPress(story)}
              >
                <View style={styles.storyHeader}>
                  <View style={styles.storyIcon}>
                    <Text style={styles.storyEmoji}>{getStoryEmoji(story.id)}</Text>
                  </View>
                  <View style={styles.storyInfo}>
                    <Text style={styles.storyTitle}>{story.title}</Text>
                    <View style={styles.starsContainer}>
                      {[0, 1, 2].map((starIndex) => (
                        <Text
                          key={starIndex}
                          style={[
                            styles.star,
                            starIndex < story.stars && styles.filledStar
                          ]}
                        >
                          ⭐
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
                
                <View style={styles.storyActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('StoryReading', { storyId: story.id })}
                  >
                    <Text style={styles.actionButtonText}>Read</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => shareStory(story)}
                  >
                    <Text style={styles.actionButtonText}>Share</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => downloadIllustration(story)}
                  >
                    <Text style={styles.actionButtonText}>Download</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#ff6b35',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#999',
    fontSize: 16,
    marginBottom: 20,
  },
  storyCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  storyIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff6b35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  storyEmoji: {
    fontSize: 24,
  },
  storyInfo: {
    flex: 1,
  },
  storyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    marginRight: 2,
    opacity: 0.3,
  },
  filledStar: {
    opacity: 1,
  },
  storyActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#ff6b35',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CollectionScreen;
