import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform
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
      },
      {
        name: 'Crisis Text Line',
        info: 'Text HOME to 741741',
        url: 'https://www.crisistextline.org/',
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
      },
      {
        name: 'Psychology Today',
        info: 'Find a therapist near you',
        url: 'https://www.psychologytoday.com/',
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
      },
      {
        name: 'WomensLaw.org',
        info: 'Legal help tailored for survivors of abuse',
        url: 'https://www.womenslaw.org/',
      },
    ],
  },
];

export default function ResourceScreen() {
  const router = useRouter();

  const handleOpenLink = async (url: string) => {
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

        {resources.map((section) => (
          <View key={section.title} style={styles.resourceSection}>
            <View style={styles.sectionHeader}>
              <Icon name={section.icon} size={22} color="#5E35B1" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            {section.items.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={styles.resourceCard}
                onPress={() => handleOpenLink(item.url)}
              >
                <Text style={styles.resourceName}>{item.name}</Text>
                <Text style={styles.resourceInfo}>{item.info}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

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
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#5C6BC0',
  },
  scrollContent: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7E57C2',
    lineHeight: 22,
  },
  resourceSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#5E35B1',
  },
  resourceCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1C4E9',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  resourceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4527A0',
    marginBottom: 4,
  },
  resourceInfo: {
    fontSize: 14,
    color: '#7E57C2',
    lineHeight: 20,
  },
  footerSpace: {
    height: 40,
  },
});
