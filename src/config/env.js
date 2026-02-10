require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3000,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  OFFICIAL_EMAIL: process.env.OFFICIAL_EMAIL,
};

const validateConfig = () => {
  const required = ['GEMINI_API_KEY', 'OFFICIAL_EMAIL'];
  const missing = required.filter(key => !config[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }
};

validateConfig();

module.exports = config;
