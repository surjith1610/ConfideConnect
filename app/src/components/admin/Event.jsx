import React, { useEffect, useState } from 'react';
import { Button, Paper, CircularProgress, Grid, Typography,IconButton, Box,Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import eventService from '../../services/eventService';

// AdminEvents component
const AdminEvents = () => {
    // State variables
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    // Fetch all events
    const fetchEvents = async () => {
        setLoading(true);
        eventService.AdminGetEvents().then((data) => {
            setEvents(data);
            setLoading(false);
        }).catch((err) => {
            console.error('Something went wrong:', err);
            setLoading(false);
        });
    };

    // Fetch all events on component mount
    useEffect(() => {
        fetchEvents();
    }, []);

    // Open event form
    const handleOpen = (event) => {
        setEditingEvent(event);
        setOpen(true);
    }

    // Close form
    const handleClose = () => {
        setOpen(false);
        setEditingEvent(null);
    }

    // Save event
    const handleSave = () => {
        console.log('Updating event...',editingEvent);
        eventService.updateEvent(editingEvent).then(() => {
            fetchEvents();
            handleClose();
        }).catch((error) => {
            console.error('Something went wrong:', error);
        });
    };

    // Delete event
    const handleDelete = (id) => (e) =>{
        e.stopPropagation();
        console.log('Deleting event...',id);
        eventService.deleteEvent(id).then(() => {
            fetchEvents();
        }).catch((error) => {
            console.error('Something went wrong:', error);
        });
    };

    // Handle form input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        const keys = name.split('.');
        
        setEditingEvent(prev => {
            let updated = {...prev}; // Copy the current state
            let current = updated;
            
            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    current[key] = value; // Set the value at the final key
                } else {
                    if (!current[key]) current[key] = {};
                    current = current[key];
                }
            });
            
            return updated;
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return [date.getFullYear(), (date.getMonth() + 1).toString().padStart(2, '0'), date.getDate().toString().padStart(2, '0')].join('-');
    };

    return (
        <>
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '750px',
            width: 'calc(100vw - 15vw)',
            backgroundColor: '#dec8c3',
            overflow: 'hidden',
            marginLeft: '-28px'
        }}>
             <Paper sx={{  width: '96%',height:'92%', overflowX: 'auto', padding: 2, marginLeft:1, marginTop:1}}>
                <Grid container spacing={2} sx={{ minWidth: 1600, alignItems: 'center' }}>
                    {/* Header Row for table */}
                    <Grid item xs={12}>
                        <Grid container spacing={1} sx={{ fontWeight: 'bold', borderBottom: '2px solid white' }}>
                        <Grid item xs={2}><Typography>Event ID</Typography></Grid>
                        <Grid item xs={1.5}><Typography>Event Name</Typography></Grid>
                        <Grid item xs={2}><Typography>Description</Typography></Grid>
                        <Grid item xs={2}><Typography>Address</Typography></Grid>
                        <Grid item xs={1.5}><Typography>Creation Time</Typography></Grid>
                        <Grid item xs={2}><Typography>Creator Id</Typography></Grid>
                        <Grid item xs={0.5}></Grid>
                    </Grid>
                    </Grid>
                    {/* Event Data Rows */}
                    {loading ? (
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Grid>
                    ) : (
                        events.map(event => (
                            <Grid item xs={12} key={event._id} onClick={() => handleOpen(event)} sx={{ cursor: 'pointer', borderBottom: '2px solid white', padding: 1 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2}><Typography>{event._id}</Typography></Grid>
                                    <Grid item xs={1.5}><Typography>{event.name}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{event.description}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{[event.address?.street, event.address?.city, event.address?.state, event.address?.country, event.address?.zip].filter(Boolean).join(', ')}</Typography></Grid>
                                    <Grid item xs={1.5}><Typography>{formatDate(event.createdDate)}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{event.creatorId}</Typography></Grid>
                                    <Grid item xs={0.5}>
                                    <IconButton  onClick={handleDelete(event._id)} aria-label="delete"><DeleteIcon /></IconButton></Grid>
                                </Grid>
                            </Grid>
                        ))
                    )}
        </Grid>
        </Paper> 
        {/* Edit Event Dialog */}
        {
            editingEvent && (
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        margin="dense"
                                        label="Event Name"
                                        name="name"
                                        value={editingEvent.name || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        name="description"
                                        multiline
                                        rows={4}
                                        value={editingEvent.description|| ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <TextField
                                margin="dense"
                                name="address.street"
                                label="Street"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingEvent.address?.street || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.city"
                                label="City"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingEvent.address?.city || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.state"
                                label="State"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingEvent.address?.state || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.country"
                                label="Country"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingEvent.address?.country || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.zip"
                                label="Zip Code"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingEvent.address?.zip || ''}
                            />
                            </Grid>
                            </DialogContent>
                            {/* Save and Cancel buttons */}
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={handleSave} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>
                )}
        </Box>
        </>
    );
}

export default AdminEvents;