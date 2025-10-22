import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import AppHeader from '../components/AppHeader';
interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

interface Props {
  navigation: NavigationProp;
}

const MainScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      {/* <AppHeader title="Snairy" showBack={false} /> */}

      
      {/* Main Content */}
      <View style={styles.content}>
      <Image source={require('../assets/img/logo.png')} style={{width: 400, height: 200}} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StorySelection')}
        >
          <Text style={styles.buttonText}>Tests</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Collection')}
        >
          <Text style={styles.buttonText}>Collection</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Illustrations')}
        >
          <Text style={styles.buttonText}>Illustrations</Text>
        </TouchableOpacity>
      </View>

      {/* Info Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.infoButton}  onPress={() => navigation.navigate('About')}>
          <Text style={styles.infoIcon}>i</Text>
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
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  logoIcon: {
    fontSize: 24,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#ff6b35',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  infoButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#ff6b35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b35',
    fontFamily: 'Montserrat',
  },
});

export default MainScreen;
