import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock severity score for testing

export default function NextSteps() {
  const router = useRouter();
  const { severityScore } = useLocalSearchParams();
  const combinedSeverityScore = Number(severityScore);
  // console.log("serverity score:" + combinedSeverityScore);

  const handleBack = () => {
    router.push('/'); // Navigate back to the home screen
  }

  let recommendation = '';
  let initialSteps: string[] = [];

  if (combinedSeverityScore >= 80) {
    recommendation = 'This situation is critical. Seek immediate help.';
    initialSteps = [
      'Call 911 or your local emergency number immediately.',
      'Find a safe location or shelter near you.',
      'Reach out to a domestic violence hotline or organization.',
      'Avoid being alone with the abuser if possible.'
    ];
  } else if (combinedSeverityScore >= 60) {
    recommendation = 'This situation is serious. Consider professional support.';
    initialSteps = [
      'Talk to a licensed counselor or therapist.',
      'Create a safety plan in case the situation escalates.',
      'Document any further incidents in detail.',
      'Speak with trusted friends or family members.'
    ];
  } else if (combinedSeverityScore >= 40) {
    recommendation = 'This situation is concerning. Talking helps.';
    initialSteps = [
      'Jot down thoughts and feelings in a private journal.',
      'Consider joining a support group.',
      'Look into therapy options for emotional support.',
      'Keep monitoring your emotional and physical well-being.'
    ];
  } else if (combinedSeverityScore >= 20) {
    recommendation = 'This situation is mild. Stay aware and prepared.';
    initialSteps = [
      'Keep an eye on any patterns that concern you.',
      'Stay connected with your support network.',
      'Learn more about healthy boundaries and relationships.',
      'Check in with yourself regularly.'
    ];
  } else {
    recommendation = 'Your input suggests no immediate concern.';
    initialSteps = [
      'Continue practicing self-awareness.',
      'Use this app to log future concerns if they arise.',
      'Learn about healthy communication and relationship dynamics.',
      'Stay informed about available resources just in case.'
    ];
  }

  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(initialSteps.length).fill(false)
  );

  const animations = useRef(initialSteps.map(() => new Animated.Value(0))).current;
  const congratsOpacity = useRef(new Animated.Value(0)).current;
  const noteOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(150, animations.map(anim =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    )).start();
  }, []);

  useEffect(() => {
    if (completedSteps.filter(Boolean).length === completedSteps.length) {
      // When all steps are completed, start fading in the "Congrats" message
      Animated.sequence([
        Animated.timing(congratsOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(noteOpacity, {
          toValue: 1,
          duration: 500,
          delay: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [completedSteps]); // Use completedSteps as the dependency

  const toggleStep = (index: number) => {
    const updated = [...completedSteps];
    updated[index] = !updated[index];
    setCompletedSteps(updated);
  };

  const progress = completedSteps.filter(Boolean).length / completedSteps.length;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#5C6BC0" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your Next Steps</Text>
        <Text style={styles.subtitle}>{recommendation}</Text>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {Math.round(progress * 100)}% Complete
        </Text>

        <View style={styles.stepsContainer}>
          {initialSteps.map((step, index) => (
            <Animated.View
              key={index}
              style={[styles.stepCard, {
                opacity: animations[index],
                transform: [{ translateY: animations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                }) }]
              }]}
            >
              <TouchableOpacity onPress={() => toggleStep(index)} style={styles.checkIcon}>
                <Ionicons
                  name={completedSteps[index] ? 'checkbox' : 'square-outline'}
                  size={24}
                  color="#7E57C2"
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.stepText,
                  completedSteps[index] && { textDecorationLine: 'line-through', opacity: 0.6 }
                ]}
              >
                {step}
              </Text>
            </Animated.View>
          ))}
        </View>

        {progress === 1 && (
          <Animated.View style={[styles.congratsContainer, { opacity: congratsOpacity }]}>
            <Ionicons name="sparkles" size={48} color="#7E57C2" />
            <Text style={styles.congratsText}>Congrats on taking the first step!</Text>
            <Animated.Text style={[styles.resourceNote, { opacity: noteOpacity }]}>
              For more information, seek the resource tab
            </Animated.Text>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5FF'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backButtonText: {
    marginLeft: 5,
    color: '#5C6BC0',
    fontSize: 16,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5E35B1',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#7E57C2',
    textAlign: 'center',
    marginBottom: 25,
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#D1C4E9',
    borderRadius: 5,
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#7E57C2',
    borderRadius: 5,
  },
  progressText: {
    alignSelf: 'flex-start',
    marginBottom: 15,
    color: '#512DA8',
    fontWeight: '600'
  },
  stepsContainer: {
    width: '100%',
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE7F6',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
  },
  checkIcon: {
    marginRight: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#512DA8',
    flexShrink: 1,
  },
  congratsContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  congratsText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#5E35B1',
    textAlign: 'center',
    marginBottom: 8,
  },
  resourceNote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7E57C2',
    textAlign: 'center',
  },
});