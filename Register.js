import React, { useState } from 'react';
import styled from 'styled-components';
import LoginForm from './login'; // Import your login component

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  font-family: sans-serif;
`;

const Title = styled.h1`
  font-size: 1.5em;
  color: #007bff;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 20px;
`;

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });

  const [showLogin, setShowLogin] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const existingUsers = JSON.parse(localStorage.getItem('posturapp_users')) || [];

    const usernameExists = existingUsers.find(user => user.username === formData.username);
    if (usernameExists) {
      alert('Username already taken!');
      return;
    }

    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem('posturapp_users', JSON.stringify(updatedUsers));
    alert('Registered successfully! Please log in.');

    setShowLogin(true);
  };

  return (
    <RegisterContainer>
      {showLogin ? (
        <LoginForm />
      ) : (
        <>
          <Title>Create an account</Title>
          <InputGroup>
            <InputLabel>First name</InputLabel>
            <InputField
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Last name</InputLabel>
            <InputField
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Username</InputLabel>
            <InputField
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Password</InputLabel>
            <InputField
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </InputGroup>
          <Button onClick={handleSubmit}>CONTINUE</Button>
        </>
      )}
    </RegisterContainer>
  );
};

export default RegisterForm;
