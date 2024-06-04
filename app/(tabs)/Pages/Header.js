import React from 'react';
import { View, StyleSheet, ImageBackground, Pressable,Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import ChangeLanguageButton from './ChangeLanguageButton';

const image = require('../../../assets/backgrounds/app-login.png');


export default function Header({ setCurrentScreen }) {
  const { t } = useTranslation(['global']);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonS} onPress={() => setCurrentScreen('Registration')}>
            <Text style={styles.textColor}>{t('global:registration')}</Text>
          </Pressable>
          <Pressable style={styles.buttonS} onPress={() => setCurrentScreen('Login')}>
            <Text style={styles.textColor}>{t('global:login')}</Text>
          </Pressable>
        </View>
        <ChangeLanguageButton style={styles.languagePosition} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languagePosition:{
    width: 120,
    position: 'absolute',
    bottom: 20,
    right: 20,  
  },
  buttonS:{
    backgroundColor: 'darkblue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  textColor:{
    color: "white",
  }
});

