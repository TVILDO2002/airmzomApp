import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Pressable, Dimensions } from 'react-native';
import BurgerBar from "./BurgerBar";
import { useUser } from './UserContext';
import { useTranslation } from 'react-i18next';

const image = require('../../../assets/backgrounds/app.png');

const { width, height } = Dimensions.get('window');

export default function Home({ setCurrentScreen }) {
  const { userEmail } = useUser();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(['global']);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = () => {
    fetch(`https://localhost:3000/get-devices?userEmail=${userEmail}`)
      .then(response => response.json())
      .then(devicesData => {
        setDevices(devicesData);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching devices:", error));
  };

  const handleDeleteDevice = (device_id) => {
    fetch(`https://localhost:3000/delete-device`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail, device_id }),
    })
      .then(response => response.json())
      .then(result => {
        fetchDevices();
      })
      .catch(error => {
        console.error("Error deleting device:", error);
        alert("Failed to delete device.");
      });
  };

  if (loading) {
    return (
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.loadingContainer}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (devices.length === 0) {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <BurgerBar setCurrentScreen={setCurrentScreen} style={styles.burgerBar} />
          <View style={styles.noDeviceWrapper}>
            <Text style={styles.text}>No device added. Please add a device.</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <BurgerBar setCurrentScreen={setCurrentScreen} style={styles.burgerBar} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Array.isArray(devices) ? devices.map(device => (
          <View key={device.id} style={styles.deviceContainer}>
            <Text style={styles.deviceName}>{device.device_name}</Text>
            <Text style={styles.text}>{t('global:ms')} {device.device_id}</Text>
            <Text style={styles.text}>{t('global:temperature')} {device.temperature}</Text>
            <Text style={styles.text}>{t('global:humidity')} {device.humidity} % </Text>
            <Text style={styles.text}>{t('global:cO2')} {device.co2_level}</Text>
            <Text style={styles.text}>{t('global:TVOC')} {device.tvoc_level}</Text>
            <Text style={styles.text}>{t('global:h2')} {device.rawh2_level}</Text>
            <Text style={styles.text}>{t('global:ethanol')} {device.rawethanol_level}</Text>
            <Text style={styles.text}>{t('global:dust')}  {device.dust_level}</Text>
            <Text style={styles.text}>{t('global:CO')}  {device.CO_level}</Text>
            <Text style={styles.text}>{t('global:NH3')}  {device.NH3_level}</Text>
            <Text style={styles.text}>{t('global:NO2')}  {device.NO2_level}</Text>
            <Pressable style={styles.deleteWrapper}  onPress={() => handleDeleteDevice(device.device_id)} > 
              <Text style={styles.deleteText}>X</Text> 
            </Pressable>
          </View>
        )) : null}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noDeviceWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  deviceContainer: {
    width: '75%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  burgerBar: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  deviceName: {
    color: 'black',
    fontSize: width * 0.05, // Adaptive font size based on screen width
    fontWeight: 'bold'
  },
  text: {
    color: 'black',
    fontSize: width * 0.05, // Adaptive font size based on screen width
    marginTop: 5,
  },
  deleteText: {
    color: "darkblue",
    fontSize: width * 0.05, // Adaptive font size based on screen width
  },
  deleteWrapper: {
    backgroundColor: 'lightblue',
    padding: width * 0.03, // Adaptive padding based on screen width
    borderRadius: (width * 0.03) + (width * 0.05) / 2, // Ensure it's round
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
