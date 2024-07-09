import React, { useState } from 'react';
import Box from '@mui/material/Box';

import EventCards from '../components/event/EventList';
import EventMap from '../components/event/Event';


const EventsPage = () => {
    const [focusedEvent, setFocusedEvent] = useState(null);

    const handleEventSelect = (event) => {
        setFocusedEvent(event); // Update the focused event to the selected one
    };

    return (
        <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: 'calc(100vh - 64px)', 
                width: '100%' ,
                backgroundColor: 'black',
                // justifyContent: 'space-around',
                alignItems: 'center'
            }}>
            <EventCards onEventSelect={handleEventSelect} />
            <EventMap focusedEvent={focusedEvent} />
        </Box>
    );
};

export default EventsPage;