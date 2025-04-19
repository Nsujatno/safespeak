const router = require('express').Router();
require("dotenv").config();
const mongoose = require("mongoose");
const axios = require('axios');

const TOXICBERT_API_URL = 'https://api-inference.huggingface.co/models/unitary/toxic-bert';


router.post('/toxicbert/analyze', async (req, res) => {
    const { text, time, feelings } = req.body;
    const date = new Date(time);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: 'Invalid time format. Use MM/DD/YYYY.' });
    }
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
    
        const toxicityScores = response.data[0]?.map((item) => item.score) || [];
        const maxToxicityScore = Math.max(...toxicityScores);
        const toxicitySeverity = maxToxicityScore * 100;
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
                relationship: extractedContext.relationship,
                emotionalState: feelings,
                repeatBehavior: extractedContext.repeatBehavior,
                severityScore: combinedSeverityScore,
                recommendation: recommendation,
            });
            console.log('Incident saved successfully:', response.data);
        }catch(error){
            console.error("Error saving incident:", error);
            res.status(500).json({ message: "Error saving incident" });
        }
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: 'Hugging Face API call failed' });
    }
  });

  function extractContextFromText(text) {
    const relationshipKeywords = ['ex boyfriend', 'ex girlfriend', 'boyfriend', 'girlfriend', 'spouse', 'parent', 'friend', 'ex'];
    const locationKeywords = ['home', 'work', 'school', 'park', 'public'];
    const repeatBehaviorKeywords = ['several occurrences', 'multiple times', 'repeatedly', 'often', 'several times', 'not the first time'];

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