import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const resources = [
  {
    title: 'Emergency & Crisis Support',
    icon: 'alert-circle-outline',
    items: [
      {
        id: '1-1',
        name: 'National Domestic Violence Hotline',
        info: 'Call 1-800-799-7233 or text "START" to 88788',
        url: 'https://www.thehotline.org/',
        icon: 'phone-alert',
      },
      {
        id: '1-2',
        name: 'Crisis Text Line',
        info: 'Text HOME to 741741',
        url: 'https://www.crisistextline.org/',
        icon: 'message-alert',
      },
    ],
  },
  {
    title: 'Mental Health & Counseling',
    icon: 'account-heart-outline',
    items: [
      {
        id: '2-1',
        name: 'BetterHelp',
        info: 'Online therapy with licensed professionals',
        url: 'https://www.betterhelp.com/',
        icon: 'account-heart',
      },
      {
        id: '2-2',
        name: 'Psychology Today',
        info: 'Find a therapist near you',
        url: 'https://www.psychologytoday.com/',
        icon: 'brain',
      },
    ],
  },
  {
    title: 'Legal & Advocacy Services',
    icon: 'gavel',
    items: [
      {
        id: '3-1',
        name: 'RAINN',
        info: 'Support for survivors of sexual violence',
        url: 'https://www.rainn.org/',
        icon: 'shield-account',
      },
      {
        id: '3-2',
        name: 'WomensLaw.org',
        info: 'Legal help tailored for survivors of abuse',
        url: 'https://www.womenslaw.org/',
        icon: 'scale-balance',
      },
    ],
  },
];

export default function ResourceScreen() {
  const router = useRouter();
  // Add state for tracking hovered resource
  const [hoveredResource, setHoveredResource] = useState(null);

  const handleOpenLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Support Resources</Text>
          <Text style={styles.headerSubtitle}>
            You are not alone. These trusted resources may help you or someone you know.
          </Text>
        </View>

        <View style={styles.categoriesContainer}>
          {resources.map((section) => (
            <View key={section.title} style={styles.resourceSection}>
              <View style={styles.sectionHeader}>
                <Icon name={section.icon} size={24} color="#5E35B1" style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              
              {section.items.map((item) => {
                // Check if this resource is currently hovered
                const isHovered = hoveredResource === item.id && Platform.OS === 'web';
                // Adjust text color when hovered, similar to the index page
                const textColor = isHovered ? '#311B92' : '#4527A0';
                
                return (
                  <TouchableOpacity
                    key={item.name}
                    style={[
                      styles.resourceCard,
                      isHovered && styles.hoveredResourceCard
                    ]}
                    onPress={() => handleOpenLink(item.url)}
                    onMouseEnter={() => Platform.OS === 'web' && setHoveredResource(item.id)}
                    onMouseLeave={() => Platform.OS === 'web' && setHoveredResource(null)}
                  >
                    <View style={styles.resourceCardContent}>
                      <Icon 
                        name={item.icon} 
                        size={36} 
                        color={textColor} 
                        style={styles.resourceIcon} 
                      />
                      <View style={styles.resourceText}>
                        <Text style={[
                          styles.resourceName,
                          { color: textColor }
                        ]}>{item.name}</Text>
                        <Text style={[
                          styles.resourceInfo,
                          isHovered && { color: '#512DA8' }
                        ]}>{item.info}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#5C6BC0',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F5FF',
  },
  scrollContent: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7E57C2',
    lineHeight: 22,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resourceSection: {
    width: '32%',
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5E35B1',
    flexShrink: 1,
  },
  resourceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#D1C4E9',
    marginBottom: 16,
    minHeight: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    
    // Add web-specific transitions similar to index page
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }),
  },
  // Add hover style similar to index page
  hoveredResourceCard: {
    backgroundColor: 'rgba(230, 154, 243, 0.2)',
    transform: [{ scale: 1.05 }],
    elevation: 5,
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderColor: '#B39DDB',
  },
  resourceCardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  resourceIcon: {
    marginBottom: 16,
  },
  resourceText: {
    width: '100%',
    alignItems: 'center',
  },
  resourceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4527A0',
    marginBottom: 10,
    textAlign: 'center',
  },
  resourceInfo: {
    fontSize: 15,
    color: '#7E57C2',
    lineHeight: 20,
    textAlign: 'center',
  },
  footerSpace: {
    height: 40,
  },
});