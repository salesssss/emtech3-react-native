import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

const recommendedExercises = [
  { title: 'Obliques', duration: '45sec', image: require('./assets/obliques.png') },
  { title: 'Lunge Lift', duration: '30sec', image: require('./assets/lunge.png') },
  { title: 'Front Press', duration: '45sec', image: require('./assets/press.png') },
];

const categories = [
  {
    title: 'Cardio',
    description: 'Any type of exercise that gets your heart rate up.',
    image: require('./assets/cardio.png'),
  },
];

const HomePage = ({ onLogout }) => {
  const user = JSON.parse(localStorage.getItem('posturapp_current_user'));

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <Image 
          source={require('./assets/posturapp.png')} // Adjust the path if necessary
          style={styles.logoImage} 
        />
        <Text style={styles.logoText}>PosturApp</Text>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Recommended */}
        <Text style={styles.sectionTitle}>Recommended</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {recommendedExercises.map((item, index) => (
            <View key={index} style={styles.recommendCard}>
              <Image source={item.image} style={styles.exerciseImage} />
              <Text style={styles.exerciseTitle}>{item.title}</Text>
              <Text style={styles.exerciseTime}>{item.duration}</Text>
              <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playIcon}>▶</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        {categories.map((item, index) => (
          <View key={index} style={styles.categoryCard}>
            <Image source={item.image} style={styles.categoryImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.categoryTitle}>{item.title}</Text>
              <Text style={styles.categoryDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#0D47A1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoImage: {
    width:60, // Set the desired width for the logo
    height:60, // Set the desired height for the logo
    marginRight: 10, // Space between logo and title
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1, // Allow the text to take remaining space
  },
  logout: {
    color: '#fff',
    fontSize: 14,
  },
  scrollContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  recommendCard: {
    width: 140,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    alignItems: 'center',
  },
  exerciseImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  exerciseTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  exerciseTime: {
    fontSize: 12,
    color: '#555',
  },
  playButton: {
    marginTop: 5,
    backgroundColor: '#2196F3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  playIcon: {
    color: '#fff',
    fontSize: 14,
  },
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoryDescription: {
    fontSize: 13,
    color: '#444',
  },
});
