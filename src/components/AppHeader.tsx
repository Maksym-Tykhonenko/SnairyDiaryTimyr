import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface Props {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
}

const AppHeader: React.FC<Props> = ({ title, onBack, showBack = true }) => {
  return (
    <View style={styles.header}> 
      <View style={styles.sideContainer}>
        {showBack ? (
          <TouchableOpacity style={styles.pill} onPress={onBack}>
            <Text style={styles.pillText}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.pill, styles.invisible]} />
        )}
      </View>

      <View style={styles.centerContainer}>
        <View style={[styles.pill, styles.centerPill]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <View style={styles.sideContainer}>
        <View style={styles.pill}>
          <Image source={require('../assets/img/logo.png')} style={{width: 80, height: 40}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  sideContainer: {
    width: 100,
  },
  centerContainer: {
    flex: 1,
    paddingHorizontal: 6,
  },
  pill: {
    height: 44,
    borderWidth: 2,
    borderColor: '#ff6b35',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
  },
  centerPill: {
    paddingHorizontal: 12,
  },
  pillText: {
    color: '#ff6b35',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Montserrat',
  },
  invisible: {
    opacity: 0,
  },
});

export default AppHeader;


