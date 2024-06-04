import React from 'react';
import {  View, Pressable, Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const iconGeorgia = require('../../../assets/flags/georgia.png');
const iconEnglish = require('../../../assets/flags/united-kingdom (2).png');

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.wrapper} >
      <Pressable onPress={() => changeLanguage('en')}>
        <Image source={iconEnglish} style={styles.image} />
      </Pressable>
      <Pressable onPress={() => changeLanguage('ka')}>
        <Image source={iconGeorgia} style={styles.image} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper:{
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    padding: 15
  },
  image: {
    width: 40,
    height: 40
  }
})

export default LanguageSwitcher;
