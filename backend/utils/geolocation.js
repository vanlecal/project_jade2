const opencage = require('opencage-api-client');


const getHumanReadableLocation = async (latitude, longitude) => {
  try {
    const result = await opencage.geocode({
      q: `${latitude},${longitude}`,
      key: process.env.OPENCAGE_API_KEY, // Make sure it's stored in .env
      language: 'en',
    });

    if (result.status.code === 200 && result.results.length > 0) {
      return result.results[0].formatted; // Full readable address
    } else {
      console.warn('OpenCage response issue:', result.status.message);
      return null;
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error.message);
    return null;
  }
};

module.exports = getHumanReadableLocation;
