import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
        Paper, Tooltip, Button, Modal, Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import eventService from "../../services/eventService";
import { useTranslation } from 'react-i18next';

const EventList = ({fetchData, events, user}) => {

    // state variables
    const [openModal, setOpenModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

     // Function to handle internationalization
     const { t } = useTranslation('common');

    //  useEffect to fetch data
    useEffect(() => {
        if (user.user.role == "doctor") {
            fetchData('doctor_events');
        }
        else if(user.user.role == "lab"){
            fetchData('lab_events');
        }
    }, []);

    // Function to handle delete event
    const handleDeleteClick = async (e, eventId) => {
        console.log('Delete button clicked');
        e.stopPropagation();
        try {
            const resp = await eventService.deleteEvent(eventId);
            console.log("delete resp : ", resp);
            if (user.user.role == "doctor") {
                fetchData('doctor_events');
            }
            else if(user.user.role == "lab"){
                fetchData('lab_events');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
        setOpenModal(false);
    };

    // Function to handle row click
    const handleRowClick = (event) => {
        setSelectedEvent(event);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedEvent(null);
    };

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return [date.getFullYear(), (date.getMonth() + 1).toString().padStart(2, '0'), date.getDate().toString().padStart(2, '0')].join('-');
    };

    return (
        <>
        <TableContainer component={Paper} sx={{ marginTop: '30px', maxHeight: '430px' }}>
            <Table aria-label="event table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('event')}</TableCell>
                        <TableCell>{t('description')}</TableCell>
                        <TableCell>{t('created_date')}</TableCell>
                        <TableCell>{t('location')}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map((event, index) => (
                        <TableRow 
                                key={index}
                                hover
                                onClick={() => handleRowClick(event)}
                                style={{ cursor: 'pointer' }}
                            >
                            <TableCell>{event.name}</TableCell>
                            <TableCell>
                                <Typography noWrap sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {event.description}
                                </Typography>
                            </TableCell>
                            <TableCell>{formatDate(event.createdDate)}</TableCell>
                            <TableCell>{event.address.city}</TableCell>
                            <TableCell>
                                <Tooltip title="Delete Event">
                                    <Button onClick={(e) => handleDeleteClick(e, event._id)}><DeleteIcon /></Button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        {console.log("selectedEvent:",selectedEvent)}
                            {selectedEvent ? selectedEvent.name : Event} {t('details')}
                        </Typography>
                        <IconButton aria-label="close" onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {selectedEvent && (
                        <>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1">{selectedEvent.description}</Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1">{t('on')} {formatDate(selectedEvent.createdDate)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={(e) => handleDeleteClick(e, selectedEvent._id)}
                                >
                                    {t('delete_event')}
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default EventList;