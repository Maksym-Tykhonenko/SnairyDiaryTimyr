/**
 * Snairy: Knowledge Diary
 * An interactive app designed to strengthen your memory through stories and challenges.
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Text, TextInput } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  useEffect(() => {
    // Set global default font family
    // Note: font file should be added under src/assets/fonts and linked via react-native.config.js
    // Example file name: Montserrat-Regular.ttf -> use 'Montserrat-Regular'
    // If you use a single regular file, alias to 'Montserrat'
    // @ts-ignore
    Text.defaultProps = Text.defaultProps || {};
    // @ts-ignore
    Text.defaultProps.style = [Text.defaultProps.style, { fontFamily: 'Montserrat' }];
    // @ts-ignore
    TextInput.defaultProps = TextInput.defaultProps || {};
    // @ts-ignore
    TextInput.defaultProps.style = [TextInput.defaultProps.style, { fontFamily: 'Montserrat' }];
  }, []);

  return <AppNavigator />;
}

export default App;
