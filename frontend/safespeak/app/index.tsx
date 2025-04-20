import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Platform,
  Linking,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasSeenDisclaimer = await AsyncStorage.getItem('hasSeenDisclaimer');
        if (!hasSeenDisclaimer) {
          setShowModal(true);
        }
      } catch (error) {
        console.error('Failed to check AsyncStorage:', error);
      }
    };
    checkFirstLaunch();
  }, []);

  const handleModalClose = async () => {
    try {
      await AsyncStorage.setItem('hasSeenDisclaimer', 'true');
      setShowModal(false);
    } catch (error) {
      console.error('Failed to set AsyncStorage:', error);
    }
  };

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
      description: 'Get a timeline of incidents that you have documented.',
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
      key={feature.id}
      style={[styles.featureCard, activeFeature === feature.id]}
      onPress={() => {
        setActiveFeature(feature.id);
        router.push(feature.route);
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
          {/* Escape Button */}
          <TouchableOpacity
            style={styles.escapeButton}
            onPress={() => Linking.openURL('https://www.amazon.com')}
          >
            <Text style={styles.escapeButtonText}>Escape</Text>
          </TouchableOpacity>

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

          {/* Disclaimer Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Stay Safe</Text>
                <Text style={styles.modalText}>
                  Some partners may track device activity. For your safety, try using a private device and clear this site from your browser history if needed.
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleModalClose}
                >
                  <Text style={styles.modalButtonText}>I Understand</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
    fontSize: 60,
    fontFamily: 'Round',
    color: '#5C6BC0',
    marginTop: 10,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#7986CB',
    textAlign: 'center',
    fontStyle: 'italic',
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
  escapeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 20,
    backgroundColor: '#EF5350',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 999,
  },
  escapeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#D32F2F',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#5C6BC0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
});
