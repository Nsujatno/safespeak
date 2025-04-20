import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  ImageBackground,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState(null);
  
  const features = [
    {
      id: 1,
      title: 'Document Incidents',
      description: 'Safely record and store interactions that made you uncomfortable or concerned.',
      icon: '📝',
      route: '/document'
    },
    {
      id: 2,
      title: 'Incident Timeline',
      description: 'Get a timeline of incidents that of you have documented.',
      icon: '⌛',
      route: '/timeline'
    },
    {
      id: 3,
      title: 'Next Steps',
      description: 'Get personalized guidance on how to proceed with your situation.',
      icon: '🛤️',
      route: '/steps'
    },
    {
      id: 4,
      title: 'Resources',
      description: 'Access helpful articles, contacts, and support networks.',
      icon: '📚',
      route: '/resource'
    }
  ];

  const renderFeatureCard = (feature) => (

    <TouchableOpacity
      // key={feature.id
      style={[
        styles.featureCard,
        activeFeature === feature.id && styles.activeFeatureCard
      ]}
      onPress={() => {setActiveFeature(feature.id);
        router.push(feature.route); // Navigate to the feature's route
      }}
    >
      <Text style={styles.featureIcon}>{feature.icon}</Text>
      <Text style={styles.featureTitle}>{feature.title}</Text>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
      source={{ uri: 'https://media.istockphoto.com/id/1285656386/photo/pastel-colored-romantic-sky-panoramic.jpg?s=612x612&w=0&k=20&c=z9gFDxZ6aye7pVWWHmcsRVh0abFlhLt-oElF0Mo54tY=' }}
      style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerContainer}>
              <Text style={styles.welcomeText}>Welcome to</Text>
              <Text style={styles.logoText}>SafeSpeak</Text>
              <Text style={styles.tagline}>
              You’re in a space where your story matters—at your pace, in your words
              </Text>
            </View>
            
            <Text style={styles.sectionTitle}>How can we help you today?</Text>
            
            <View style={styles.featuresContainer}>
              {features.map(renderFeatureCard)}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    color: '#7986CB',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#5C6BC0',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#7986CB',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  messageContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(179, 157, 219, 0.0)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#5E35B1',
    marginTop: 10,
    marginBottom: 50,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 25,
  },
  featureCard: {
    width: '40%',
    backgroundColor: 'rgba(209, 196, 233, 0.5)',
    borderRadius: 12,
    padding: 35,
    alignItems: 'center',
    marginBottom: 45,
    // elevation: 2,
    // shadowColor: '#9C27B0',
  },
  activeFeatureCard: {
    backgroundColor: 'rgba(179, 157, 219, 0.7)',
    borderWidth: 1,
    borderColor: '#7E57C2',
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4527A0',
    textAlign: 'center',
  },
  featureDetailContainer: {
    backgroundColor: 'rgba(209, 196, 233, 0.3)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  featureDetailTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4527A0',
    marginBottom: 10,
  },
  featureDetailDescription: {
    fontSize: 16,
    color: '#512DA8',
    lineHeight: 24,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#7E57C2',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignSelf: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  
});