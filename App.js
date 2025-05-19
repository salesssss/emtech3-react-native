import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import RegisterForm from './Register';
import LoginForm from './login';
import HomePage from './HomePage';
import Exercise from './Exercise';


export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // home, register, login, homepage
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [animateTransition, setAnimateTransition] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('posturapp_current_user');
    if (user) {
      setCurrentScreen('homepage');
    }
  }, []);

  const handleScreenChange = (target) => {
    setAnimateTransition(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen(target);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setAnimateTransition(false));
    });
  };

  const handleLoginSuccess = () => {
    handleScreenChange('homepage');
  };

  const handleLogout = () => {
    localStorage.removeItem('posturapp_current_user');
    handleScreenChange('login');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        {currentScreen === 'home' && (
          <HomeScreen 
            onRegister={() => handleScreenChange('register')} 
            onLogin={() => handleScreenChange('login')} 
          />
        )}
        {currentScreen === 'register' && (
          <RegisterForm />
        )}
        {currentScreen === 'login' && (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        )}
        {currentScreen === 'homepage' && (
          <HomePage onLogout={handleLogout} />
        )}
      </Animated.View>
    </View>
  );
}

const HomeScreen = ({ onRegister, onLogin }) => (
  <View style={styles.homeContainer}>
    <Text style={styles.title}>POSTURAPP</Text>
    <Text style={styles.tagline}>
      Mobile application that aims to help our users practice a healthier lifestyle
    </Text>
    <AnimatedButton title="Sign up"onPress={onRegister} />
    <AnimatedButton title="LOGIN" onPress={onLogin} />
  </View>
);

const AnimatedButton = ({ title, onPress }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: -20,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: -10,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onPress && onPress();
    });
  };

  return (
    <Animated.View style={{ transform: [{ translateY: bounceAnim }], marginTop: 20 }}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
