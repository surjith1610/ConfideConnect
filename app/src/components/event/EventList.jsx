import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

import { fetchEvents } from "../../services/eventService"; 


const EventCards = ({ onEventSelect }) => {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);  // State to track the selected event ID

    const images = [
        '/src/assets/eventsImages/aids img1.jpeg',
        '/src/assets/eventsImages/aids img 2.webp',
        '/src/assets/eventsImages/aids imag 3.jpeg',
        '/src/assets/eventsImages/aids img 4.jpeg',
        '/src/assets/eventsImages/aids img 5.jpeg',
        '/src/assets/eventsImages/aids img 6.png',
        '/src/assets/eventsImages/aids img 7.jpeg'
    ];

    useEffect(() => {
        async function loadEvents() {
            let eventData = await fetchEvents();
            // Assign images in order and repeat
            eventData = eventData.map((event, index) => ({
                ...event,
                image: images[index % images.length]  // Loop through images sequentially
            }));
            setEvents(eventData);
        }
        loadEvents();
    }, []);

    const handleEventSelect = (event) => {
        onEventSelect(event);
        setSelectedEventId(event._id);  // Set the selected event ID
    };

    return (
        <Box sx={{
            display: 'flex',
            overflowX: 'scroll',
            width: '90%',
            // height: '200px',
            // bgcolor: 'background.paper',
            // '&::-webkit-scrollbar': {
            //     height: '8px'
            // },
            // '&::-webkit-scrollbar-thumb': {
            //     background: 'rgba(255,255,255,0.5)',
            //     borderRadius: '4px'
            // },
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            {events.map(event => (
                <Card
                    key={event._id}
                    sx={{
                        minWidth: 200,
                        m: 1,
                        bgcolor: 'background.default',
                        boxShadow: 3,
                        display: 'flex',
                        paddingBottom: '5px',
                        flexDirection: 'column',
                        border: event._id === selectedEventId ? '1px solid' : 'none',  // Highlight if selected
                        transform: event._id === selectedEventId ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.3s ease, border 0.3s ease'
                    }}
                    onClick={() => handleEventSelect(event)}
                >
                    <CardMedia
                        component="img"
                        sx={{ height: 80, objectFit: 'cover' }}  // Ensure images cover the area well
                        image={event.image}
                        alt="Event Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {event.name}
                        </Typography>
                        {/* <Typography variant="body2" color="text.secondary">
                            {event.description}
                        </Typography> */}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default EventCards;