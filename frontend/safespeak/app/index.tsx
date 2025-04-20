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
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  
  const features = [
    {
      id: 1,
      title: 'Document Incidents',
      description: 'Safely record and store interactions that made you uncomfortable or concerned.',
      icon: 'file-document-outline',
      route: '/document'
    },
    {
      id: 2,
      title: 'Incident Timeline',
      description: 'Get a timeline of incidents that of you have documented.',
      icon: 'history',
      route: '/timeline'
    },
    {
      id: 3,
      title: 'Next Steps',
      description: 'Get personalized guidance on how to proceed with your situation.',
      icon: 'arrow-decision-outline',
      route: '/steps'
    },
    {
      id: 4,
      title: 'Resources',
      description: 'Access helpful articles, contacts, and support networks.',
      icon: 'book-open-variant',
      route: '/resource'
    }
  ];

  const renderFeatureCard = (feature) => {
    const isHovered = hoveredFeature === feature.id && Platform.OS === 'web';
    const textColor = isHovered ? '#311B92' : '#4527A0';
    
    return (
      <TouchableOpacity
        key={feature.id}
        style={[
          styles.featureCard,
          activeFeature === feature.id && styles.activeFeatureCard,
          isHovered && styles.hoveredFeatureCard
        ]}
        onPress={() => {
          setActiveFeature(feature.id);
          router.push(feature.route); // Navigate to the feature's route
        }}
        onMouseEnter={() => Platform.OS === 'web' && setHoveredFeature(feature.id)}
        onMouseLeave={() => Platform.OS === 'web' && setHoveredFeature(null)}
      >
        <MaterialCommunityIcons 
          name={feature.icon} 
          size={32} 
          color={textColor} 
          style={styles.featureIcon} 
        />
        <Text style={[
          styles.featureTitle,
          { color: textColor }
        ]}>{feature.title}</Text>
      </TouchableOpacity>
    );
  };

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
              You're in a space where your story matters—at your pace, in your words
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
    fontFamily: 'Sans',
    color: '#7986CB',
  },
  logoText: {
    fontSize: 60,
    fontFamily: 'Round',
    color: '#5C6BC0',
    marginTop: 10,
    marginBottom: 15,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Sans',
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
    fontFamily: 'Sans',
    fontSize: 18,
    fontWeight: '900',
    color: '#5C6BC0',
    marginTop: 10,
    marginBottom: 55,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 25,
  },
  featureCard: {
    width: '40%',
    backgroundColor: 'rgba(209, 196, 233, 0.55)',
    borderRadius: 12,
    padding: 45,
    alignItems: 'center',
    marginBottom: 60,
    
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }),
  },
  hoveredFeatureCard: {
    backgroundColor: 'rgba(230, 154, 243, 0.6)',
    transform: [{ scale: 1.05 }],
    elevation: 5,
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  activeFeatureCard: {
    backgroundColor: 'rgba(230, 154, 243, 0.6)',
  },
  featureIcon: {
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Sans',
    fontWeight: '900',
    textAlign: 'center',
  },
  featureDetailContainer: {
    backgroundColor: 'rgba(209, 196, 233, .3)',
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