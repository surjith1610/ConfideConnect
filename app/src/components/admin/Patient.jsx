import React, { useEffect, useState } from 'react';
import patientService from '../../services/patientService';
import { Button, Paper, CircularProgress, Grid, Typography, Box,Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

// AdminPatients component
const AdminPatients = () => {
    // State variables
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);

    // Fetch all patients initially
    useEffect(() => {
        fetchPatients();
    }, []);

    // Fetch all patients
    const fetchPatients = () => {
        setLoading(true);
        patientService.AdminGetPatients().then((res) => {
            setPatients(res); // Ensure this correctly targets the array of patients
            setLoading(false);
        }).catch((err) => {
            console.error('Something went wrong:', err);
            setLoading(false);
        });
    };

    // Open the dialog to edit a patient
    const handleOpen = (patient) => {
        setEditingPatient(patient);
        setOpen(true);
    };

    // Close the dialog
    const handleClose = () => {
        setOpen(false);
        setEditingPatient(null); // Clear the editing patient
    };

    // Save the patient
    const handleSave = () => {
        console.log('Updating data...', editingPatient);
        patientService.AdminUpdatePatient(editingPatient)
            .then(() => {
                fetchPatients(); // Refresh the patient list
                handleClose(); // Close the dialog after save
            })
            .catch(err => {
                console.error('Update failed:', err);
            });
    };

    // Handle changes to the patient data with nested objects
    const handleChange = (event) => {
        const { name, value } = event.target;
        const keys = name.split('.');
        
        setEditingPatient(prev => {
            let updated = {...prev}; // Copy the current state
            let current = updated;
            
            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    current[key] = value; // Set the value at the final key
                } else {
                    if (!current[key]) current[key] = {}; // Ensure nested object exists
                    current = current[key]; // Move reference down to the nested object
                }
            });
            
            return updated;
        });
    };

    return (
        <>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'start',
                height: '750px',
                width: 'calc(100vw - 15vw)',
                backgroundColor: '#dec8c3',
                marginLeft: '-28px',
                overflow: 'hidden'
            }}>
                 <Paper sx={{ width: '96%', height:'92%', margin: 0, overflow: 'auto', padding: 2, marginTop:1.5, marginLeft:1 }}>
                <Grid container spacing={2} sx={{ minWidth: 1000, alignItems: 'center' }}>
                    {/* Header Rows of table */}
                    <Grid item xs={12}>
                        <Grid container spacing={1} sx={{ fontWeight: 'bold', borderBottom: '2px solid white' }}>
                            <Grid item xs={3}><Typography>Patient ID</Typography></Grid>
                            <Grid item xs={2}><Typography>Name</Typography></Grid>
                            <Grid item xs={2}><Typography>Phone</Typography></Grid>
                            <Grid item xs={2}><Typography>Address</Typography></Grid>
                            <Grid item xs={1}><Typography>Gender</Typography></Grid>
                            <Grid item xs={1}><Typography>Language</Typography></Grid>
                            <Grid item xs={1}><Typography>DOB</Typography></Grid>
                        </Grid>
                    </Grid>
                    {/* Patient Rows */}
                    {loading ? (
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Grid>
                    ) : (
                        patients.map((patient, index) => (
                            <Grid item xs={12} key={patient.patientId || index} onClick={() => handleOpen(patient)} sx={{ cursor: 'pointer', borderBottom: '2px solid white', padding: 1 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={3}><Typography>{patient.patientId}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{patient.name}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{patient.phone}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{[patient.address?.street, patient.address?.city, patient.address?.state, patient.address?.country, patient.address?.zip].filter(Boolean).join(', ')}</Typography></Grid>
                                    <Grid item xs={1}><Typography>{patient.gender}</Typography></Grid>
                                    <Grid item xs={1}><Typography>{patient.languagePreference}</Typography></Grid>
                                    <Grid item xs={1}><Typography>{patient.dob ? new Date(patient.dob).toLocaleDateString() : 'N/A'}</Typography></Grid>
                                </Grid>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Paper>
            {/* Patient Edit Dialog */}
                {editingPatient && (
                    <Dialog open={open} onClose={handleClose} >
                        <DialogTitle>Edit Patient</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingPatient.name || ''}
                            />
                            <TextField
                                margin="dense"
                                name="phone"
                                label="Phone"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingPatient.phone || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.street"
                                label="Street"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingPatient.address?.street || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.city"
                                label="City"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingPatient.address?.city || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.state"
                                label="State"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingPatient.address?.state || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.country"
                                label="Country"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingPatient.address?.country || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.zip"
                                label="Zip Code"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingPatient.address?.zip || ''}
                            />
                            <TextField
                                margin="dense"
                                name="gender"
                                label="Gender"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingPatient.gender || ''}
                            />
                            <TextField
                                margin="dense"
                                name="languagePreference"
                                label="Language Preference"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingPatient.languagePreference || ''}
                            />
                            <TextField
                                margin="dense"
                                name="dob"
                                label="Date of Birth"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                                value={editingPatient.dob ? editingPatient.dob.split('T')[0] : ''}
                            />
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
};

export default AdminPatients;