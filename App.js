import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectScreen from './pages/SelectScreen';
import SecondScreen from './pages/SecondScreen';
import MapScreen from'./pages/MapScreen';

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Wait for 2 seconds before showing SelectScreen
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Restaurant</Text>
        <ActivityIndicator size="large" color="#19f5aa" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectScreen">
        <Stack.Screen name="SelectScreen" component={SelectScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0286FF',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
    color :'#19f5aa',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default App;
