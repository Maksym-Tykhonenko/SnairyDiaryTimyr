import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, NativeScrollEvent, NativeSyntheticEvent, Alert, Dimensions, Share } from 'react-native';
import AppHeader from '../components/AppHeader';

interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

interface Props {
  navigation: NavigationProp;
}

const { width } = Dimensions.get('window');

const IllustrationsScreen: React.FC<Props> = ({ navigation }) => {
  // Replace these with your image assets
  const images: any[] = [
    require('../assets/img/image7.png'),
    require('../assets/img/image8.png'),
    require('../assets/img/image9.png'),
  ];

  const [index, setIndex] = useState(0); // default open first illustration
  const scrollRef = useRef<ScrollView>(null);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / (width - 48));
    setIndex(Math.max(0, Math.min(images.length - 1, newIndex)));
  };

  const handleShare = async () => {
    try {
      const asset = Image.resolveAssetSource(images[index]);
      const uri = asset?.uri;
      await Share.share({
        message: 'Check out this illustration from Snairy!',
        url: uri,
      });
    } catch (e) {
      Alert.alert('Share', 'Unable to share this illustration.');
    }
  };

  const handleDownload = () => {
    Alert.alert('Download', `Downloading illustration ${index + 1}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Illustrations" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumEnd}
          contentContainerStyle={styles.scrollerContent}
        >
          {images.map((src, i) => (
            <View key={i} style={styles.cardWrapper}>
              <Image source={src} style={styles.image} resizeMode="cover" />
            </View>
          ))}
        </ScrollView>

        <View style={styles.controls}>
          {/* <TouchableOpacity style={styles.controlBtn} onPress={handleDownload}>
            <Text style={styles.controlIcon}>⬇️</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.controlBtn} onPress={handleShare}>
            <Text style={styles.controlIcon}>↗</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  scrollerContent: {
    alignItems: 'center',
  },
  cardWrapper: {
    width: width - 48,
    height: width - 48,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ff6b35',
    overflow: 'hidden',
    marginHorizontal: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 16,
  },
  controlBtn: {
    width: 72,
    height: 72,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ff6b35',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  controlIcon: {
    fontSize: 22,
    color: '#ff6b35',
    fontWeight: '700',
  },
});

export default IllustrationsScreen;


