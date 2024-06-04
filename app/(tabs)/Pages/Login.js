import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Pressable } from 'react-native';
import axios from 'axios';
import { useUser } from './UserContext';
import { useTranslation } from 'react-i18next';

const image = require('../../../assets/backgrounds/app-register.png');

export default function Login({ setCurrentScreen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserEmail } = useUser();
  const { t } = useTranslation(['global']);

  const handleLogin = () => {
    setErrorMessage(''); 

    axios
      .post('https://localhost:3000/login', { email, password })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === 'Login successful') {
          setUserEmail(email);
          setCurrentScreen('Home');
        } else {
          setErrorMessage(response.data.error);
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('Login failed. Please try again.');
        }
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image}  style={styles.image} resizeMode="cover">
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder={t("global:email")}
            placeholderTextColor="black"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder={t("global:password")}
            placeholderTextColor="black"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonS} onPress={handleLogin}> 
              <Text style={styles.textColor}>{t("global:in")}</Text> 
            </Pressable>
            <Pressable style={styles.buttonS} onPress={() => setCurrentScreen('Registration')}>
              <Text style={styles.textColor}>{t('global:registration')}</Text> 
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    backgroundColor: 'white',
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  inputWrapper:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  buttonC:{
    color: "black",
  },
  errorText: {
    
    color: 'red',
    marginBottom: 10,
  },
  buttonS:{
    backgroundColor: 'lightblue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  textColor:{
    color: "darkblue",
  }
});
