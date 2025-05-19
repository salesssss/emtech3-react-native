import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
  padding: 20px;
`;

const Logo = styled.img`
  width: 100px; // Set the desired width
  height: 100px; // Set the desired height
  margin-bottom: 20px; // Space below the image
`;

const Title = styled.h1`
  font-size: 3em;
  font-weight: bold;
  color: #0056b3;
  margin-bottom: 10px;
`;

const Tagline = styled.p`
  font-size: 1.2em;
  color: #333;
  margin-bottom: 20px;
`;

const DevelopersContainer = styled.div`
  margin-bottom: 20px;
`;

const DeveloperName = styled.p`
  font-style: italic;
  color: #555;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export { Container, Logo, Title, Tagline, DevelopersContainer, DeveloperName, ButtonContainer, Button };
