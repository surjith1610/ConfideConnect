import React, { useEffect, useState } from 'react';
import doctorService from '../../services/doctorService';
import { Button, Paper, CircularProgress, Grid, Typography, Box,Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

// AdminDoctors component
const AdminDoctors = () => {
    // State variables
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);

    // Fetch all doctors
    const fetchDoctors = () => {
        setLoading(true);
        doctorService.AdminGetDoctors().then((res) => {
            setDoctors(res);
            setLoading(false);
        }).catch((err) => {
            console.error('Something went wrong:', err);
            setLoading(false);
        });
    };

    // Fetch all doctors on component mount
    useEffect(() => {
        fetchDoctors();
    }, []);

    // Open doctor form
    const handleOpen = (doctor) => {
        setEditingDoctor(doctor);
        setOpen(true);
    };

    // Close form
    const handleClose = () => {
        setOpen(false);
        setEditingDoctor(null);
    };

    // Save doctor
    const handleSave = () => {
        console.log('Updating data...', editingDoctor);
        doctorService.AdminUpdateDoctor(editingDoctor)
            .then(() => {
                fetchDoctors();
                handleClose();
            })
            .catch(err => {
                console.error('Update failed:', err);
            });
    };

    // Handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        const keys = name.split('.');
        
        setEditingDoctor(prev => {
            let updated = {...prev}; // Copy the current state
            let current = updated;
            
            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    current[key] = value;
                } else {
                    if (!current[key]) current[key] = {};
                    current = current[key];
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
                 <Grid container spacing={2} sx={{ padding: 1 }}>
                 <Grid item xs={12}>
                        {/* Headers for table */}
                        <Grid container spacing={1} sx={{ fontWeight: 'bold', borderBottom: '2px solid white' }}>
                            <Grid item xs={3}><Typography>Doctor ID</Typography></Grid>
                            <Grid item xs={1}><Typography>Name</Typography></Grid>
                            <Grid item xs={2}><Typography>Phone</Typography></Grid>
                            <Grid item xs={2}><Typography>Address</Typography></Grid>
                            <Grid item xs={1}><Typography>Gender</Typography></Grid>
                            <Grid item xs={1}><Typography>Language</Typography></Grid>
                            <Grid item xs={1}><Typography>DOB</Typography></Grid>
                            <Grid item xs={1}><Typography>Qualifications</Typography></Grid>
                        </Grid>
                    </Grid>
                     {/* Doctor Rows */}
                     {
                        loading ? (
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Grid>
                        ) : (
                            doctors.map(doctor => (
                                <Grid item xs={12} key={doctor.patientId} onClick={() => handleOpen(doctor)} sx={{ cursor: 'pointer', borderBottom: '2px solid white', padding: 1 }}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={3}><Typography>{doctor.doctorId}</Typography></Grid>
                                        <Grid item xs={1}><Typography>{doctor.name}</Typography></Grid>
                                        <Grid item xs={2}><Typography>{doctor.phone}</Typography></Grid>
                                        <Grid item xs={2}><Typography>{[doctor.address?.street, doctor.address?.city, doctor.address?.state, doctor.address?.country, doctor.address?.zip].filter(Boolean).join(', ')}</Typography></Grid>
                                        <Grid item xs={1}><Typography>{doctor.gender}</Typography></Grid>
                                        <Grid item xs={1}><Typography>{doctor.languagePreference}</Typography></Grid>
                                        <Grid item xs={1}><Typography>{doctor.dob ? new Date(doctor.dob).toLocaleDateString() : 'N/A'}</Typography></Grid>
                                        <Grid item xs={1}><Typography>{doctor.qualifications}</Typography></Grid>
                                    </Grid>
                            </Grid>            
                        ))
                     )}
                    </Grid>
                    </Paper>
                    {/* Doctor form dialog */}
                    {
                        editingDoctor && (
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Edit Doctor</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        name="name"
                                        label="Name"
                                        type="text"
                                        fullWidth
                                        value={editingDoctor.name || ''}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        margin="dense"
                                        name="phone"
                                        label="Phone"
                                        type="text"
                                        fullWidth
                                        value={editingDoctor.phone || ''}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                margin="dense"
                                name="address.street"
                                label="Street"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingDoctor.address?.street || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.city"
                                label="City"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingDoctor.address?.city || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.state"
                                label="State"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingDoctor.address?.state || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.country"
                                label="Country"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingDoctor.address?.country || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.zip"
                                label="Zip Code"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingDoctor.address?.zip || ''}
                            />
                            <TextField
                                margin="dense"
                                name="gender"
                                label="Gender"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingDoctor.gender || ''}
                            />
                            <TextField
                                margin="dense"
                                name="languagePreference"
                                label="Language Preference"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingDoctor.languagePreference || ''}
                            />
                            <TextField
                                margin="dense"
                                name="dob"
                                label="Date of Birth"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                                value={editingDoctor.dob ? editingDoctor.dob.split('T')[0] : ''}
                            />
                             <TextField
                                margin="dense"
                                name="qualifications"
                                label="Qualifications"
                                type="string"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                                value={editingDoctor.qualifications || ''}
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
}

export default AdminDoctors;