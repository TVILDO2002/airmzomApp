import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Animated, Dimensions } from 'react-native';
import Drawer from './Drawer';

export default function BurgerBar({ setCurrentScreen }) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width)).current;

  useEffect(() => {
    if (drawerVisible) {
      Animated.timing(slideAnim, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('window').width, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [drawerVisible, slideAnim]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setDrawerVisible(true)}>
        <Text style={styles.burgerText}>☰</Text>
      </Pressable>
      <Modal
        visible={drawerVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setDrawerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.overlayTouchable} onPress={() => setDrawerVisible(false)} />
          <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
            <Drawer setCurrentScreen={setCurrentScreen} />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10, 
  },
  burgerText: {
    color: 'white',
    fontSize: 30,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row', 
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
  },
  overlayTouchable: {
    flex: 1,
  },
  drawerContainer: {
    width: '60%',
    backgroundColor: '#009C9D',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
