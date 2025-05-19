import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Input validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('posturapp_users')) || [];
    const matchedUser = storedUsers.find(
      user => user.username === username && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem('posturapp_current_user', JSON.stringify(matchedUser));
      setError('');
      onLoginSuccess && onLoginSuccess(); // Trigger success callback
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PosturAPP</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginForm;
