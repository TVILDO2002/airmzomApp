import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from './Pages/Header';
import Home from './Pages/Home';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import AddDevice from "./Pages/AddDevice"
import { UserProvider } from './Pages/UserContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';


export default function App() {
  const [currentScreen, setCurrentScreen] = useState(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <Home style={styles.container} setCurrentScreen={setCurrentScreen} />;
      case 'Registration':
        return <Registration setCurrentScreen={setCurrentScreen} />;
      case 'Login':
        return <Login setCurrentScreen={setCurrentScreen} />;
      case 'Profile':
        return <Profile setCurrentScreen={setCurrentScreen} />;
      case 'AddDevice':
        return <AddDevice setCurrentScreen={setCurrentScreen} />;
      default:
        return (
          <View style={styles.defaultView}>
            <Header setCurrentScreen={setCurrentScreen} />
          </View>
        );
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <View style={styles.container}>{renderScreen()}</View>
        </UserProvider>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    padding: 0,
    margin: 0,
    backgroundColor: 'white',
    
  },
  defaultView: {
    height: "100%",
    padding: 0,
    margin: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009C9D',
  },
});
