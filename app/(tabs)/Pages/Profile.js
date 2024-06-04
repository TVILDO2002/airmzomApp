import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Pressable, ImageBackground } from 'react-native';
import { useUser } from './UserContext';
import BurgerBar from './BurgerBar';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const image = require('../../../assets/backgrounds/app-bolo.png');

export default function Profile({ setCurrentScreen }) {
  const { userEmail } = useUser();
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    email: '',
    address: '',
    phoneNumber: '',
  });
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [changePassword, SetChangePassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation(['global']);

  const handleConfirmPasswordChange = (text) => {
    setFormData({ ...formData, confirmPassword: text });
    setPasswordsMatch(formData.password === text);
  };

  useEffect(() => {
    const { password, confirmPassword } = formData;
    if (password && confirmPassword && passwordsMatch) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData, passwordsMatch]);

  const handleChange = () => {
    axios
      .post("https://localhost:3000/changepassword", { username: profile.username, password: formData.password })
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("Password has been changed");
        Alert.alert("Password has been changed");
      })
      .catch((error) => {
        console.error("Error Changing Password:", error);
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          Alert.alert("Error", "Changing Password has failed, Please try again.");
        }
      });
  };


  useEffect(() => {
    if (!userEmail) return;
    fetch(`https://localhost:3000/profile-data?email=${userEmail}`)
      .then((response) => response.json())
      .then((result) => {
        setProfile(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      });
  }, [userEmail]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <ImageBackground source={image} style={styles.image} resizeMode="cover" >
      <BurgerBar setCurrentScreen={setCurrentScreen} />
        <View style={styles.profileInfo}>
          <Text style={styles.title}>{t('global:profile')}</Text>
          <Text style={styles.text}>{t("global:name")} : {profile.name} </Text>
          <Text style={styles.text}>{t('global:username')} : {profile.username} </Text>
          <Text style={styles.text}>{t("global:email")} : {profile.email} </Text>
          <Text style={styles.text}>{t("global:address")} : {profile.address} </Text>
          <Text style={styles.text}>{t("global:number")} : {profile.phoneNumber} </Text>
          <Pressable style={styles.buttonS} onPress={() => { SetChangePassword(!changePassword) }}>
            <Text>{t("global:change")}</Text>
          </Pressable>
          {changePassword ? <View>
            <TextInput style={styles.input} placeholder={t('global:password')} secureTextEntry onChangeText={(text) => setFormData({ ...formData, password: text })} />
            <TextInput style={styles.input} placeholder={t('global:confirm')} secureTextEntry onChangeText={handleConfirmPasswordChange} />
            {!passwordsMatch ? <Text style={styles.warningText}>{t('global:match')}</Text> : null}
            <Pressable style={styles.buttonS} onPress={handleChange} disabled={!isFormValid}>
              <Text>{t('global:conf')}</Text> 
            </Pressable>
            </View> : null}
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
  },
  profileInfo: {
    width: '80%',
    height: 'auto', // This allows the container to adjust based on its content
    paddingVertical: 20, // Adding vertical padding for spacing
    paddingHorizontal: 15, // Adding horizontal padding for spacing
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15, // Adding border radius for rounded corners
  },
  text: {
    color: 'black',
    padding: 10,
    borderRadius: 15,
    fontSize: 20,
  },
  title: {
    color: 'white',
    fontSize: 32,
    marginBottom: 20, // Adding margin bottom for spacing
  },
  input: {
    backgroundColor: "white",
    width: 300,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  warningText: {
    color: "orange",
    marginBottom: 10,
  },
  buttonS: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginVertical: 10, // Adding vertical margin for spacing
  },
});
