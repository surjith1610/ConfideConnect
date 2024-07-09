import axios from 'axios';

const OPENCAGE_API_KEY = 'a541ebd2f65a46f089dc86b9401c75bb';
const OPENCAGE_URL = 'https://api.opencagedata.com/geocode/v1/json';

const geocode = async (query) => {
    try {
        const { data } = await axios.get(OPENCAGE_URL, {
            params: {
                key: OPENCAGE_API_KEY,
                q: query,
                pretty: 1
            }
        });
        if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            return { latitude: lat, longitude: lng };
        }
        return { latitude: 0, longitude: 0 }; 
    } catch (error) {
        console.error('Geocoding failed:', error);
        return { latitude: 0, longitude: 0 };
    }
};

export default geocode;