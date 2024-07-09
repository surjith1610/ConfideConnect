import axios from "axios";
import geocode from "./geoCoding";

const baseURL = "http://localhost:3002/confideconnect/events";

// Fetches weather and location data
const ACCUWEATHER_API_KEY = 'vsM0pU907AyNMA45k7xEzeWzmte0hDlt';
const ACCUWEATHER_BASE_URL = 'http://dataservice.accuweather.com';

// Get events by creatorId
const getEventsForCreator = async (creatorId) => {
  const response = await axios.get(`${baseURL}/filter?creatorId=${creatorId}`);
  return response.data;
};

// Create event
const createEvent = async (eventInfo) => {
  const response = await axios.post(baseURL, eventInfo);
  return response.data;
};

// Delete event by id
const deleteEvent = async (eventId) => {
  const response = await axios.delete(`${baseURL}/${eventId}`);
  return response.data;
};

// Fetch location key from Accuweather
const getLocationKey = async (city, state, country) => {
  const query = `${city},${state},${country}`;
  const url = `${ACCUWEATHER_BASE_URL}/locations/v1/cities/search?apikey=${ACCUWEATHER_API_KEY}&q=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(url);
    if (response.data && response.data.length > 0) {
      return response.data[0].Key;
    }
    return null;
  } catch (error) {
    console.error('Error fetching location key:', error);
    return null;
  }
};

// Fetch weather data
const fetchWeather = async (locationKey, date) => {
  const formattedDate = date.toISOString().split('T')[0];
  const url = `${ACCUWEATHER_BASE_URL}/forecasts/v1/daily/1day/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&date=${formattedDate}`;
  try {
    const response = await axios.get(url);
    if (response.data && response.data.DailyForecasts && response.data.DailyForecasts.length > 0) {
      const { Temperature, Day } = response.data.DailyForecasts[0];
      return {
        temperature: (Temperature.Minimum.Value + Temperature.Maximum.Value) / 2,
        description: Day.IconPhrase
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

// Fetch all events
export const fetchEvents = async () => {
  try {
    const { data } = await axios.get(baseURL);
    return Promise.all(data.map(async event => {
      const coords = await geocode(`${event.address.street}, ${event.address.city}, ${event.address.state}, ${event.address.country}`);
      const locationKey = await getLocationKey(event.address.city, event.address.state, event.address.country);
      const weather = locationKey ? await fetchWeather(locationKey, new Date(event.eventDate)) : null;
      return { ...event, coords, weather };
    }));
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};

const eventService = { getEventsForCreator, createEvent, deleteEvent, fetchEvents };
export default eventService;
