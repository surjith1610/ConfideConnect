import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import { fetchEvents } from "../../services/eventService";
import SetViewOnClick from "./SetViewOnClick";
import { setLoading } from "../../store/slices/loading-slice";


const EventMap = ({ focusedEvent }) => {

    const dispatch = useDispatch();

    const [events, setEvents] = useState([]);
    const defaultCenter = [42.3601, -71.0589];
    const defaultZoom = 13;

    useEffect(() => {
        async function loadEvents() {
            dispatch(setLoading(true));
            try {
                const eventData = await fetchEvents();
                setEvents(eventData);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        loadEvents();
    }, []);

    return (
        <>
            {events.length != 0 &&
                <Box sx={{ height: '70%', width: '90%', marginBottom: '10px', marginTop: '10px' }}>
                    <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        {events.map(event => (
                            <Marker key={event._id} position={[event.coords.latitude, event.coords.longitude]}>
                                <Popup>
                                    <Typography variant="h6" sx={{ color: '#007BFF', fontWeight: 'bold' }}>{event.name}</Typography>
                                    <Typography variant="body2" sx={{ color: '#007BFF' }}>{event.description}</Typography>
                                    <Typography sx={{ color: '#71e21d' }}>
                                        {event.address.street}<br />
                                        {event.address.city}
                                    </Typography>
                                    {event.weather && (
                                        <Typography sx={{ color: '#DC3545', fontStyle: 'italic' }}>
                                            Weather on event day: {event.weather.temperature}°F
                                        </Typography>
                                    )}
                                </Popup>
                            </Marker>
                        ))}
                        {focusedEvent && <SetViewOnClick coords={[focusedEvent.coords.latitude, focusedEvent.coords.longitude]} zoom={16} />}
                    </MapContainer>
                </Box>
            }
        </>
    );
};

export default EventMap;
