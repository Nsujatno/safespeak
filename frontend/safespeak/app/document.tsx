import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function DocumentIncidentScreen() {
  const router = useRouter();

  const handleSubmit = async () => {
    console.log(incidentDescription, incidentDate, emotions);
    try{
      const response = await axios.post('http://localhost:8000/api/toxicbert/analyze', {
        text: incidentDescription,
        time: incidentDate,
        feelings: emotions,
      })
      // console.log('Response from server:', response.data);
      // console.log("Severity score:", response.data.combinedSeverityScore);
      router.push({
        pathname: '/steps',
        params: { severityScore: response.data.combinedSeverityScore },
      });
    }catch (error) {
      console.error('Error submitting incident:', error);
      Alert.alert('Error', 'There was an error submitting your incident. Please try again later.');
    }
  }

  const [incidentDate, setIncidentDate] = useState<string>('');
  const [incidentDescription, setIncidentDescription] = useState<string>('');
  const [emotions, setEmotions] = useState<string[]>([]);
  const [isSaveAnonymously, setIsSaveAnonymously] = useState<boolean>(false);

  const emotionOptions: string[] = [
    'Confused', 'Hurt', 'Angry', 'Anxious',
    'Sad', 'Scared', 'Belittled', 'Embarrassed',
    'Guilty', 'Manipulated', 'Gaslighted'
  ];

  const toggleEmotion = (emotion: string) => {
    if (emotions.includes(emotion)) {
      setEmotions(emotions.filter(item => item !== emotion));
    } else {
      setEmotions([...emotions, emotion]);
    }
  };

  const handleSave = () => {
    if (!incidentDate || !incidentDescription) {
      Alert.alert('Missing information', 'Please provide both date and description');
      return;
    }

    // Simulate saving
    console.log('Saving incident:', {
      date: incidentDate,
      description: incidentDescription,
      emotions,
      anonymous: isSaveAnonymously
    });

    Alert.alert(
      'Incident Documented',
      'Your experience has been safely recorded.',
      [{ text: 'OK', onPress: () => router.push('/') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Document an Incident</Text>
        
          <Text style={styles.headerSubtitle}>
            Record what happened in a safe space. This information is private to you.
          </Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>When did this happen?</Text>
          <TextInput
            style={styles.dateInput}
            placeholder="MM/DD/YYYY or approximate date"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={incidentDate}
            onChangeText={setIncidentDate}
          />

          <Text style={styles.label}>What happened?</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Tell us what happened while describing your relationship with the person, where it happened, and if it's the first time. Take your time."
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={incidentDescription}
            onChangeText={setIncidentDescription}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
          />

          <Text style={styles.label}>How did this make you feel?</Text>
          <Text style={styles.helperText}>Select all that apply</Text>

          <View style={styles.emotionsContainer}>
            {emotionOptions.map((emotion) => (
              <TouchableOpacity
                key={emotion}
                style={[
                  styles.emotionChip,
                  emotions.includes(emotion) && styles.emotionChipSelected
                ]}
                onPress={() => toggleEmotion(emotion)}
              >
                <Text
                  style={[
                    styles.emotionChipText,
                    emotions.includes(emotion) && styles.emotionChipTextSelected
                  ]}
                >
                  {emotion}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.privacySection}>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Save anonymously in system</Text>
              <Switch
                value={isSaveAnonymously}
                onValueChange={setIsSaveAnonymously}
                trackColor={{ false: '#D1C4E9', true: '#9575CD' }}
                thumbColor={isSaveAnonymously ? '#7E57C2' : '#f4f3f4'}
              />
            </View>
            <Text style={styles.privacyNote}>
              Your information is always kept confidential. Anonymous incidents may be used to identify patterns without identifying details.
            </Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit}
          >
            <Text style={styles.saveButtonText}>Save Incident</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
  },
  headerContainer: {
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#5C6BC0',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7986CB',
    lineHeight: 22,
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5E35B1',
    marginBottom: 8,
    marginTop: 16,
  },
  helperText: {
    fontSize: 14,
    color: '#9575CD',

    marginBottom: 8,
    fontStyle: 'italic',
  },
  dateInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1C4E9',
  },
  descriptionInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1C4E9',
    height: 200,
  },
  emotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  emotionChip: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D1C4E9',
  },
  emotionChipSelected: {
    backgroundColor: '#7E57C2',
  },
  emotionChipText: {
    color: '#5E35B1',
    fontSize: 14,
  },
  emotionChipTextSelected: {
    color: 'white',
  },
  privacySection: {
    marginTop: 25,
    backgroundColor: 'rgba(209, 196, 233, 0.2)',
    borderRadius: 10,
    padding: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#5E35B1',
    flex: 1,
  },
  privacyNote: {
    fontSize: 14,
    color: '#7E57C2',
    lineHeight: 20,
  },
  buttonsContainer: {
    marginTop: 30,
    marginBottom: 40,
  },
  saveButton: {
    backgroundColor: '#7E57C2',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B39DDB',
  },
  cancelButtonText: {
    color: '#7E57C2',
    fontSize: 18,
  },
});