import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Image } from 'react-native';

interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

interface Props {
  navigation: NavigationProp;
}

const { width, height } = Dimensions.get('window');

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const onboardingData = [
    {
      title: 'Read exciting stories, memorize details and test your attentiveness.',
      subtitle: 'Each story is a new challenge for your mind.',
      image: require('../assets/img/image2.png'),
      buttonText: 'Next',
      onPress: () => setCurrentScreen(1),
    },
    {
      title: 'After reading, answer questions.',
      subtitle: 'Get 3 stars — and the story will be yours forever!',
      image: require('../assets/img/im3.png'),
      buttonText: 'Ok',
      onPress: () => setCurrentScreen(2),
    },
    {
      title: 'Collect stories in your own library, reread them without limits.',
      subtitle: 'Discover new levels, improve your memory and become a true master of memorization!',
      image: require('../assets/img/img4.png'),
      buttonText: 'Start',
      onPress: () => navigation.navigate('Main'),
    },
  ];

  const { title, subtitle, buttonText, onPress, image } = onboardingData[currentScreen];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Illustration Area */}
        <View style={styles.illustrationContainer}>
          <Image source={image} style={styles.illustrationImage} resizeMode="cover" />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {/* Pagination */}
        <View style={styles.paginationContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentScreen === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
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
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  illustrationContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height * 0.4,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  // Text styles
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    lineHeight: 24,
  },
  // Pagination
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paginationDot: {
    width: 30,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#444',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#ff6b35',
  },
  // Button
  button: {
    backgroundColor: '#ff6b35',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});

export default OnboardingScreen;

