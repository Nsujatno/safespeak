import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import axios from 'axios';

interface Incident {
  id: string;
  date: string;
  description: string;
  emotions: string[];
}

export default function IncidentTimelineScreen() {
  const router = useRouter();

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const incidentArr: Incident[] = [];
  // const [incidents, setIncidents] = useState([
  //   {
  //     id: '1',
  //     date: '2025-04-10',
  //     description: 'Argument where I was called names and blamed for things I didn\'t do',
  //     emotions: ['Hurt', 'Confused', 'Angry']
  //   },
  //   {
  //     id: '2',
  //     date: '2025-03-25',
  //     description: 'Was told my memory of events was wrong when I brought up a past incident',
  //     emotions: ['Gaslighted', 'Anxious', 'Confused']
  //   },
  //   {
  //     id: '3',
  //     date: '2025-03-12',
  //     description: 'Silent treatment after I expressed concerns about our relationship',
  //     emotions: ['Sad', 'Anxious', 'Guilty']
  //   },
  //   {
  //     id: '4',
  //     date: '2025-02-28',
  //     description: 'Public humiliation at dinner with friends',
  //     emotions: ['Embarrassed', 'Belittled', 'Angry']
  //   },
  // ]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/incident/get');
        for(let i = 0; i < response.data.length; i++){
          const transformedIncident = {
            id: response.data[i]._id,
            date: response.data[i].timestamp,
            description: response.data[i].description,
            emotions: response.data[i].emotionalState,
          };
          incidentArr.push(transformedIncident);
          // console.log(transformedIncident);
        }
        // console.log(response.data);
        setIncidents(incidentArr);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      }
    }

    fetchIncidents();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderIncidentItem = ({ item }) => (
    <View style={styles.incidentCard}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formatDate(item.date)}</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.descriptionText}>
          {item.description}
        </Text>
        
        <View style={styles.emotionsContainer}>
          {item.emotions.map((emotion, index) => (
            <View key={index} style={styles.emotionTag}>
              <Text style={styles.emotionText}>{emotion}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Incident Timeline</Text>
        <Text style={styles.headerSubtitle}>
          Review and track incidents you've documented
        </Text>
      </View>

      {incidents.length > 0 ? (
        <FlatList
          data={incidents}
          renderItem={renderIncidentItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You haven't documented any incidents yet.
          </Text>
          <View style={styles.createButtonContainer}>
            <Text style={styles.createButtonText}>Document an Incident</Text>
          </View>
        </View>
      )}
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
  headerContainer: {
    padding: 25,
    backgroundColor: '#F9F5FF',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5C6BC0',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 20,
    color: '#7986CB',
    lineHeight: 27.5,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  incidentCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 17.5,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.75,
  },
  dateContainer: {
    width: 112.5,
    padding: 18.75,
    backgroundColor: 'rgba(179, 157, 219, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 17.5,
    fontWeight: '600',
    color: '#5E35B1',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 18.75,
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: 20,
    color: '#512DA8',
    marginBottom: 10,
  },
  emotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emotionTag: {
    backgroundColor: 'rgba(209, 196, 233, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 7.5,
    marginBottom: 5,
  },
  emotionText: {
    fontSize: 15,
    color: '#5E35B1',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  emptyText: {
    fontSize: 20,
    color: '#7986CB',
    textAlign: 'center',
    marginBottom: 25,
  },
  createButtonContainer: {
    backgroundColor: '#7E57C2',
    borderRadius: 31.25,
    paddingVertical: 15,
    paddingHorizontal: 31.25,
    opacity: 0.7,
  },
  createButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});