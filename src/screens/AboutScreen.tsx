import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import AppHeader from '../components/AppHeader';

interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

interface Props {
  navigation: NavigationProp;
}

const AboutScreen: React.FC<Props> = ({ navigation }) => {
  const handleShare = () => {
    // In a real app, this would use the Share API
    console.log('Share app');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="About" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        {/* Logo and Title */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/img/logo.png')} style={{width: 400, height: 300}} />
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Snairy: Knowledge Diary is your personal memory trainer and story companion. 
            Read engaging short stories, test your recall with interactive quizzes, and 
            unlock beautiful illustrations as rewards.
          </Text>
          
          <Text style={styles.descriptionText}>
            Every story you master becomes part of your growing knowledge diary — a space 
            where your memory evolves with every challenge.
          </Text>
        </View>
      </ScrollView>

      {/* Share Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Text style={styles.shareIcon}>↗</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a1a1a',
    borderWidth: 3,
    borderColor: '#ff6b35',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIcon: {
    fontSize: 32,
    color: '#ff6b35',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  descriptionContainer: {
    paddingHorizontal: 10,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'left',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  shareButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#ff6b35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b35',
  },
});

export default AboutScreen;


