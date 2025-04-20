const router = require('express').Router();
require("dotenv").config();
const mongoose = require("mongoose");
const axios = require('axios');

const TOXICBERT_API_URL = 'https://api-inference.huggingface.co/models/unitary/toxic-bert';

router.post('/toxicbert/analyze', async (req, res) => {
    const { text, time, feelings } = req.body;
    const date = new Date(time);
    let recommendation = "Keep monitoring the situation and seek help if needed.";
  
    if (!text) return res.status(400).json({ error: 'No text provided' });
  
    try {
        const extractedContext = extractContextFromText(text);
        const contextualText = `${text} (Relationship: ${extractedContext.relationship}, Location: ${extractedContext.location}, Repeat Behavior: ${extractedContext.repeatBehavior})`;
        
        
        const response = await axios.post(
            TOXICBERT_API_URL,
            { inputs: contextualText },
            {
            headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            },
            }
        );
    
        const toxicityData = response.data[0] || [];
        
      
        let toxicScore = 0;
        let threatScore = 0;
        let insultScore = 0;
        
        toxicityData.forEach(item => {
            if (item.label === 'toxic') toxicScore = item.score;
            else if (item.label === 'threat') threatScore = item.score;
            else if (item.label === 'insult') insultScore = item.score;
        });

        const threatWords = [
          { word: 'harm', weight: 0.2 },
          { word: 'hurt', weight: 0.2 },
          { word: 'kill', weight: 0.3 },
          { word: 'threat', weight: 0.15 },
          { word: 'abuse', weight: 0.2 },
          { word: 'hit', weight: 0.2 },
          { word: 'beat', weight: 0.2 },
          { word: 'punch', weight: 0.15 },
          { word: 'attack', weight: 0.15 },
          { word: 'die', weight: 0.25 },
          { word: 'weapon', weight: 0.25 },
          { word: 'gun', weight: 0.25 },
          { word: 'knife', weight: 0.25 },
          { word: 'fear', weight: 0.1 },
          { word: 'afraid', weight: 0.1 },
          { word: 'scared', weight: 0.1 },
          { word: 'danger', weight: 0.2 },
          { word: 'threaten', weight: 0.25 },
          { word: 'violence', weight: 0.3 },
          { word: 'violently', weight: 0.3 },
          { word: 'assault', weight: 0.25 },
          { word: 'stalk', weight: 0.2 },
          { word: 'stalker', weight: 0.2 },
          { word: 'stalking', weight: 0.2 },
          { word: 'harassed', weight: 0.2 },
          { word: 'harass', weight: 0.2 },
          { word: 'harassment', weight: 0.2 },
          { word: 'harassing', weight: 0.2 },
          { word: 'bully', weight: 0.2 },
          { word: 'bullying', weight: 0.2 },
          { word: 'control', weight: 0.15 },
          { word: 'controlling', weight: 0.15 },
          { word: 'manipulate', weight: 0.15 },
          { word: 'manipulation', weight: 0.15 },
          { word: 'coerce', weight: 0.2 },
          { word: 'coercion', weight: 0.2 },
          { word: 'force', weight: 0.2 },
          { word: 'forced', weight: 0.2 },
          { word: 'pressure', weight: 0.15 },
          { word: 'pressured', weight: 0.15 },
          { word: 'threatening', weight: 0.25 },
          { word: 'threats', weight: 0.25 },
      ];
      
      let manualThreatScore = 0;
      const lowerText = text.toLowerCase();
      
      threatWords.forEach(item => {
          if (lowerText.includes(item.word)) {
              manualThreatScore += item.weight;
          }
      });
      
      manualThreatScore = Math.min(manualThreatScore, 0.8);
      
      threatScore = Math.max(threatScore, manualThreatScore);
      
      const weightedToxicityScore = (
          toxicScore * 0.6 + 
          threatScore * 5.0 + 
          insultScore * 0.5
      ) / 4;
      
      const toxicitySeverity = weightedToxicityScore * 100;
        

        const repeatBehaviorSeverity = extractedContext.repeatBehavior ? 20 : 0;
        let relationshipSeverity = 0;
        if (extractedContext.relationship === 'ex boyfriend' || extractedContext.relationship === 'ex girlfriend' || extractedContext.relationship === 'ex' || extractedContext.relationship === 'spouse') {
            relationshipSeverity = 10;
        }
        const combinedSeverityScore = Math.min(toxicitySeverity + repeatBehaviorSeverity + relationshipSeverity, 100);
        if (combinedSeverityScore >= 80) {
          recommendation = "This situation is critical. Seek immediate help from local authorities or a trusted support organization."
        } else if (combinedSeverityScore >= 60) {
          recommendation = "This situation is serious. Consider reaching out to a counselor, therapist, or a trusted friend for support."
        } else if (combinedSeverityScore >= 40) {
          recommendation = "This situation is concerning. It may be beneficial to talk to someone about it."
        } else if (combinedSeverityScore >= 20) {
          recommendation = "This situation is mild. It may be helpful to monitor the situation and seek support if needed."
        }
        res.json({ result: response.data, context: extractedContext, combinedSeverityScore, recommendation, time, feelings });

        try{
            const response = await axios.post("http://localhost:8000/api/incident/send", {
                name: 'Anonymous',
                description: text,
                timestamp: date,
                relationship: extractedContext.relationship || "Unknown",
                emotionalState: feelings,
                repeatBehavior: extractedContext.repeatBehavior || false,
                severityScore: combinedSeverityScore,
                recommendation: recommendation,
                location: extractedContext.location || "Not specified",
            });
            console.log('Incident saved successfully:', response.data);
        }catch(error){
            console.error("Error saving incident:", error);
            res.status(500).json({ message: "Error saving incident" });
        }
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: 'Hugging Face API call failed' });

      if(error.response && error.response.status === 503) {
        return res.status(503).json({ error: 'Hugging Face service is unavailable. Please try again later.' });
      }
    }
  });

  function extractContextFromText(text) {
    const relationshipKeywords = ['ex boyfriend', 'ex girlfriend', 'boyfriend', 'girlfriend', 'spouse', 'parent', 'friend', 'ex'];
    const locationKeywords = ['home', 'work', 'school', 'park', 'public', 'apartment'];
    const repeatBehaviorKeywords = ['several occurrences', 'multiple times', 'repeatedly', 'often', 'several times', 'not the first time', 'repeated', "wasn't the first time", 'has happened before'];

    const relationship = relationshipKeywords.find((keyword) => text.toLowerCase().includes(keyword)) || 'Unknown';
    const location = locationKeywords.find((keyword) => text.toLowerCase().includes(keyword)) || 'Not specified';
    const repeatBehavior = repeatBehaviorKeywords.some((keyword) => text.toLowerCase().includes(keyword));

    return {
        relationship,
        location,
        repeatBehavior,
    };
  }
  

module.exports = router;