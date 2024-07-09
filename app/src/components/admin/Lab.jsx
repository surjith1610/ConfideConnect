import React, { useEffect, useState } from 'react';
import labService from '../../services/labService';
import { Button, Paper, CircularProgress, Grid, Typography, Box,Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

// AdminLabs component
const AdminLabs = () => {
    // State variables
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingLab, setEditingLab] = useState({});

    // Fetch all labs
    const fetchLabs = () => {
       setLoading(true);
       labService.AdminGetLabs().then(res => {
           setLabs(res);
           setLoading(false);
       }).catch(err => {  
        console.error('Something went wrong:', err);
        setLoading(false);
         });
    };

    // Fetch all labs on component mount
    useEffect(() => {
        fetchLabs();
    }, []);

    // Open lab form
    const handleOpen = (lab) => {
        setOpen(true);
        setEditingLab(lab);
    };

    // Close form
    const handleClose = () => {
        setOpen(false);
        setEditingLab(null);
    };

    // Save lab
    const handleSave = () => {
        labService.AdminUpdateLab(editingLab).then(res => {  
            fetchLabs();
            handleClose();
        }).catch(err => {    
            console.error('Something went wrong:', err);
        });
    }

    // Handle form input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        const keys = name.split('.');
        
        setEditingLab(prev => {
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

    return(
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
              <Paper sx={{ width: '96%', height:'92%', margin: 0, overflow: 'auto', padding: 2, marginLeft:1, marginTop:1 }}>
                 <Grid container spacing={2} sx={{ padding: 1 }}>
                    {/* Header rows for table */}
                 <Grid item xs={12}>
                        <Grid container spacing={1} sx={{ fontWeight: 'bold', borderBottom: '2px solid white' }}>
                            <Grid item xs={3}><Typography>Lab ID</Typography></Grid>
                            <Grid item xs={3}><Typography>Name</Typography></Grid>
                            <Grid item xs={2}><Typography>Phone</Typography></Grid>
                            <Grid item xs={4}><Typography>Address</Typography></Grid>
                        </Grid>
                    
                    </Grid>
                 {/* Doctor Rows */}
                 {
                        loading ? (
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Grid>
                        ) : (
                            labs.map(lab => (
                                <Grid item xs={12} key={lab.labId} onClick={() => handleOpen(lab)} sx={{ cursor: 'pointer', borderBottom: '2px solid white', padding: 1 }}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={3}><Typography>{lab.labId}</Typography></Grid>
                                        <Grid item xs={3}><Typography>{lab.name}</Typography></Grid>
                                        <Grid item xs={2}><Typography>{lab.phone}</Typography></Grid>
                                        <Grid item xs={4}><Typography>{[lab.address?.street, lab.address?.city, lab.address?.state, lab.address?.country, lab.address?.zip].filter(Boolean).join(', ')}</Typography></Grid>
                                    </Grid>
                            </Grid>            
                        ))
                     )}
                     </Grid>
                    </Paper>
                    {/* Lab form dialog */}
                    { editingLab && (
                    <Dialog open={open} onClose={handleClose} >
                        <DialogTitle>Edit Lab</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingLab.name || ''}
                            />
                            <TextField
                                margin="dense"
                                name="phone"
                                label="Phone"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingLab.phone || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.street"
                                label="Street"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingLab.address?.street || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.city"
                                label="City"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingLab.address?.city || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.state"
                                label="State"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingLab.address?.state || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.country"
                                label="Country"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingLab.address?.country || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.zip"
                                label="Zip Code"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingLab.address?.zip || ''}
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
    )

}

export default AdminLabs;