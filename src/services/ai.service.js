const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/env');

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);

const extractSingleWord = (text) => {
    const cleaned = text
        .replace(/[.,\\/#!$%\\^\\&\\*;:{}=\\-_`~()]/g, '')
        .trim()
        .split(/\\s+/)[0];

    return cleaned;
};

const getAIAnswer = async (question) => {
    try {
        // Use gemini-1.5-flash for better speed and reliability
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Answer the following question with ONLY ONE WORD. Do not provide explanations, just the single most relevant word.\n\nQuestion: ${question}\n\nAnswer (one word only):`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return extractSingleWord(text);
    } catch (error) {
        console.error('AI Service Detailed Error:', error);
        // Fallback or rethrow with specific message
        if (error.message?.includes('API key')) {
            console.error('API Key invalid or missing');
        }
        throw new Error('AI service temporarily unavailable');
    }
};

module.exports = {
    getAIAnswer,
};
