import React from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import ChangeLanguageButton from "./ChangeLanguageButton"
import { useTranslation } from 'react-i18next';

const home = require('../../../assets/burgerBarIcons/home (1).png');
const logOut = require('../../../assets/burgerBarIcons/logout (1).png');
const add = require('../../../assets/burgerBarIcons/add (1).png');
const user = require('../../../assets/burgerBarIcons/user (1).png');

export default function Drawer({ setCurrentScreen }) {
  const { t } = useTranslation(['global']);
  return (
    <View style={styles.drawer}>
      <ChangeLanguageButton/>
      <Pressable onPress={() => setCurrentScreen('Home')}>
        <Text style={styles.drawerText}>{t('global:home')}</Text>
      </Pressable>
      <Pressable onPress={() => setCurrentScreen('AddDevice')}>
        <Text style={styles.drawerText}>{t('global:add')}</Text>
      </Pressable>
      <Pressable onPress={() => setCurrentScreen('Profile')}>
        <Text style={styles.drawerText}>{t('global:profile')}</Text>
      </Pressable>
      <Pressable onPress={() => setCurrentScreen(null)}>
        <Text style={styles.drawerText}>{t('global:logout')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  drawerText: {
    color: 'white',
    fontSize: 20,
    marginVertical: 20,
  },
  drawerIcon:{
    width:40,
    height:40,
    marginTop: 15
  }
});
