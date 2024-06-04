import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, ImageBackground,Pressable } from 'react-native';
import { useUser } from './UserContext';
import BurgerBar from './BurgerBar';
import { useTranslation } from 'react-i18next';

const image = require('../../../assets/backgrounds/app.png');

export default function AddDevice({ setCurrentScreen }) {
  const { userEmail } = useUser();
  const [deviceName, setDeviceName] = useState('');
  const [device_id, setdevice_id] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation(['global']);

  const handleAddDevice = () => {
    fetch(`https://localhost:3000/add-device`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail, name: deviceName, device_id: device_id }),
    })
      .then(response => response.json())
      .then(result => {
        Alert.alert("Success", "Device added successfully!");
        setCurrentScreen("Home");
      })
      .catch(error => {
        console.error("Error adding device:", error);
        setError("Failed to add device.");
      });
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <BurgerBar setCurrentScreen={setCurrentScreen} />
        <TextInput
          placeholder={t('global:give')}
          placeholderTextColor="black"
          style={styles.input}
          value={deviceName}
          onChangeText={setDeviceName}
        />
        <TextInput
          placeholder={t('global:mac')}
          placeholderTextColor="black"
          style={styles.input}
          value={device_id}
          onChangeText={setdevice_id}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Pressable style={styles.button} onPress={handleAddDevice}>
          <Text>{t('global:add')}</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    color: "black",
  },
  errorText: {
    color: 'red',
    marginVertical: 5,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    backgroundColor: 'white',
  },
});
