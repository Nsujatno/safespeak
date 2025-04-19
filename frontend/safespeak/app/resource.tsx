import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const resources = [
  {
    title: 'Emergency & Crisis Support',
    items: [
      {
        name: 'National Domestic Violence Hotline',
        info: 'Call 1-800-799-7233 or text "START" to 88788',
        url: 'https://www.thehotline.org/'
      },
      {
        name: 'Crisis Text Line',
        info: 'Text HOME to 741741',
        url: 'https://www.crisistextline.org/'
      },
    ],
  },
  {
    title: 'Mental Health & Counseling',
    items: [
      {
        name: 'BetterHelp',
        info: 'Online therapy with licensed professionals',
        url: 'https://www.betterhelp.com/'
      },
      {
        name: 'Psychology Today',
        info: 'Find a therapist near you',
        url: 'https://www.psychologytoday.com/'
      },
    ],
  },
  {
    title: 'Legal & Advocacy Services',
    items: [
      {
        name: 'RAINN (Rape, Abuse & Incest National Network)',
        info: 'Support for survivors of sexual violence',
        url: 'https://www.rainn.org/'
      },
      {
        name: 'WomensLaw.org',
        info: 'Legal help tailored for survivors of abuse',
        url: 'https://www.womenslaw.org/'
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Support Resources</Text>
          <Text style={styles.headerSubtitle}>
            You are not alone. Here are trusted resources that may be helpful for you or someone you know.
          </Text>
        </View>

        {resources.map((section) => (
          <View key={section.title} style={styles.resourceSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#F9F5FF',
  },
  scrollContent: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5C6BC0',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7986CB',
    lineHeight: 22,
  },
  resourceSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5E35B1',
    marginBottom: 12,
  },
  resourceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#D1C4E9',
    marginBottom: 12,
  },
  resourceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5E35B1',
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
