import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
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
        name: 'National Domestic Violence Hotline',
        info: 'Call 1-800-799-7233 or text "START" to 88788',
        url: 'https://www.thehotline.org/',
        icon: 'phone-alert',
      },
      {
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
        name: 'BetterHelp',
        info: 'Online therapy with licensed professionals',
        url: 'https://www.betterhelp.com/',
        icon: 'account-heart',
      },
      {
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
        name: 'RAINN',
        info: 'Support for survivors of sexual violence',
        url: 'https://www.rainn.org/',
        icon: 'shield-account',
      },
      {
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
              
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  style={styles.resourceCard}
                  onPress={() => handleOpenLink(item.url)}
                >
                  <View style={styles.resourceCardContent}>
                    <Icon name={item.icon} size={36} color="#5E35B1" style={styles.resourceIcon} />
                    <View style={styles.resourceText}>
                      <Text style={styles.resourceName}>{item.name}</Text>
                      <Text style={styles.resourceInfo}>{item.info}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
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