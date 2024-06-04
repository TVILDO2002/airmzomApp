import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert, Pressable, ImageBackground } from "react-native";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const image = require('../../../assets/backgrounds/app-register.png');

export default function Registration({ setCurrentScreen }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [passwordsMatch, setPasswordsMatch] = useState(true); 
  const [isFormValid, setIsFormValid] = useState(false);
  const { t } = useTranslation(['global']);

  useEffect(() => {
    const { name, username, password, confirmPassword, email, address, phoneNumber } = formData;
    if (
      name &&
      username &&
      password &&
      confirmPassword &&
      email &&
      address &&
      phoneNumber &&
      passwordsMatch
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData, passwordsMatch]);

  const handleLogin = () => {
    setCurrentScreen("Login");
  };

  const handleRegister = () => {
    setErrorMessage(""); 
    setSuccessMessage(""); 

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage("Password must be at least 8 characters long, start with a capital letter, and contain at least one number");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    axios
      .post("https://localhost:3000/register", formData)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("Account has been created successfully");
        Alert.alert("Success", "Account has been created successfully");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          Alert.alert("Error", "Registration failed. Please try again.");
        }
      });
  };

  const handleConfirmPasswordChange = (text) => {
    setFormData({ ...formData, confirmPassword: text });
    setPasswordsMatch(formData.password === text);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>{t("global:form")}</Text>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder={t("global:name")}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder={t('global:username')}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder={t("global:password")}
          secureTextEntry
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
        <TextInput
          style={styles.input}
          placeholder={t('global:confirm')}
          secureTextEntry
          onChangeText={handleConfirmPasswordChange}
        />
        {!passwordsMatch ? <Text style={styles.warningText}>Passwords do not match</Text> : null}
        <TextInput
          style={styles.input}
          placeholder={t("global:email")}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder={t("global:address")}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
        />
        <TextInput
          style={styles.input}
          placeholder={t("global:number")}
          inputMode="numeric"
          onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
        />
        <View style={styles.buttonContainer}>
          <Pressable  style={styles.buttonS} onPress={handleRegister} disabled={!isFormValid}>
          <Text style={styles.textColor}>{t("global:register")}</Text> 
          </Pressable>
          <Pressable style={styles.buttonS} onPress={handleLogin}>
           <Text style={styles.textColor} >{t("global:login")}</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: '100%',
    padding: 0,
    margin: 0,
    backgroundColor: 'darkblue'
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
  },
  text: {
    color: "darkblue",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    width: 300,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  successText: {
    color: "green",
    marginBottom: 10,
  },
  warningText: {
    color: "orange",
    marginBottom: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    gap: 20,
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
