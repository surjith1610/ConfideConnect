import React, { useEffect, useState } from 'react';
import labRequestService from '../../services/labrequestService';
import { Button, Paper, CircularProgress, Grid, Typography,IconButton, Box,Dialog, DialogActions, DialogContent, DialogTitle,
     TextField, FormControl, InputLabel, Select, MenuItem, Tooltip, Input} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';

// AdminLabRequests component
const AdminLabRequests = () => {
    const [labRequests, setLabRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingLabRequest, setEditingLabRequest] = useState(null);
    const [isNewLabRequest, setIsNewLabRequest] = useState(false);

    // Fetch all lab requests
    const fetchLabRequests = async () => {
        setLoading(true);
       labRequestService.AdminGetLabRequests().then(res => {
        setLabRequests(Array.isArray(res) ? res : []);
        console.log('Lab Requests:', res);
            setLoading(false);
        }).catch(err => {
            console.error('Something went wrong:', err);
            setLoading(false);
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return [date.getFullYear(), (date.getMonth() + 1).toString().padStart(2, '0'), date.getDate().toString().padStart(2, '0')].join('-');
    };

    // Fetch all lab requests on component mount
    useEffect(() => {
        fetchLabRequests();
    }, []);

    // Open new lab request form
    const openNewLabRequestForm = () => {
        setEditingLabRequest({
            patientId: '',
            labId: '',
            requestName: '',
            requestDescription: '',
            doctorPrescription: '',
            status: 'REQUESTED',
            notificationEmail: '',
            notificationPhone: '',
            preExistingConditions: [],
            patientAddress: {
                street: '',
            city: '',
            state: '',
            country: '',
            zip: ''
            },
            creationTime: new Date().toISOString(),
            modifiedTime: new Date().toISOString()
        });
        setIsNewLabRequest(true);
        setOpen(true);
    };

    // Open edit lab request form
    const openEditForm = (labRequest) => {
        setEditingLabRequest(labRequest);
        setIsNewLabRequest(false);
        setOpen(true);
    }

    // Open edit lab request form
    const handleOpen = (labRequest) => {
        setEditingLabRequest(labRequest);
        setOpen(true);
    }

    // Close form
    const handleClose = () => {
        setOpen(false);
        setEditingLabRequest(null);
    }

    // Save lab request
   const handleSave = () => {
    const action = isNewLabRequest ? labRequestService.AdminCreateLabRequest : labRequestService.AdminUpdateLabRequest;
    console.log('Updating data...', editingLabRequest);
        action(editingLabRequest)
            .then(() => {
                fetchLabRequests();
                handleClose();
            })
            .catch(err => {
                console.error('Update failed:', err);
            });
   };

    // Delete lab request
const handleDelete = (id) => (e) => {
    e.stopPropagation(); // Prevent opening the edit dialog or any other click propagation issues
    console.log('Deleting data with ID:', id);
    labRequestService.AdminDeleteLabRequest(id)
        .then(() => {
            fetchLabRequests(); // Refresh the list after deletion
        })
        .catch(err => {
            console.error('Delete failed:', err);
        });
};

// Function to handle file download
const handleDownloadClick = (e, base64Data) => {
    e.stopPropagation();
    console.log('Download button clicked');

    // Convert base64 to raw binary data held in a string
    const byteCharacters = atob(base64Data.split(',')[1]); // Remove header

    // Convert binary string to an array of 8-bit unsigned integers
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    // Create a blob from the typed arrays
    const blob = new Blob(byteArrays, {type: 'application/pdf'});
    const blobUrl = URL.createObjectURL(blob);

    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', 'Report.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the blob URL
    URL.revokeObjectURL(blobUrl);
};


// Function to handle file upload
const handleFileUpload = (event) => {
    if (event.target.type === "file") {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type !== "application/pdf") {
                console.log("Invalid file type: ", file.type);
                alert("Please upload a PDF file.");
                return;
            }

            console.log("File uploaded: ", file);
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                console.log("File as Data URL: ", reader.result);
                setEditingLabRequest(prevState => ({
                    ...prevState,
                    labReport: reader.result
                }));
            };

            reader.onerror = (error) => {
                console.log("Error reading file: ", error);
            };
        }
    }
};

// Handle form input changes
   const handleChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split('.');
    
    setEditingLabRequest(prev => {
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

// Text style for the table data
const textStyle = {
    wordBreak: 'break-word', // Break the word to next line if needed
    hyphens: 'auto' // Automatically add hyphens when breaking words
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
           <Paper sx={{ width: '96%', height:'95%', overflowX: 'auto', padding: 2, marginBottom: 2, marginTop:2, marginLeft: 1 }}>
                <Grid container spacing={2} sx={{ minWidth: 2800, alignItems: 'center' }}>
                    {/* Header Row of the table*/}
                    <Grid item xs={12}>
                        <Grid container spacing={1} sx={{ fontWeight: 'bold', borderBottom: '2px solid white' }}>
                            <Grid item xs={1} style={textStyle}><Typography>Request ID</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Patient ID</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Lab ID</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Name</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Description</Typography></Grid>
                            <Grid item xs={0.5} style={textStyle}><Typography>Report</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Status</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Notification Email</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Notification Phone</Typography></Grid>
                            <Grid item xs={0.6} style={textStyle}><Typography>Creation Time</Typography></Grid>
                            <Grid item xs={0.6} style={textStyle}><Typography>Modified Time</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Pre Existing Conditions</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Address</Typography></Grid>
                            <Grid item xs={0.3}></Grid>
                        </Grid>
                    </Grid>
                    {/* Lab Request Data Rows */}
                    {loading ? (
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Grid>
                    ) : (
                        labRequests.map(request => (
                            <Grid item xs={12} key={request._id} onClick={() => openEditForm(request)} sx={{ cursor: 'pointer', borderBottom: '2px solid white', padding: 1 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={1}><Typography style={textStyle}>{request._id}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.patientId}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.labId}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.requestName}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.requestDescription}</Typography></Grid>
                                    <Grid item xs={0.5}>{request.labReport ? 
                                    <Tooltip title="Download Report">
                                        <Button onClick={(e) => handleDownloadClick(e, request.labReport)}>
                                            <GetAppIcon />
                                        </Button>
                                    </Tooltip> : 
                                    "On the way..."
                                }</Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.status}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.notificationEmail}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.notificationPhone}</Typography></Grid>
                                    <Grid item xs={0.6}><Typography style={textStyle}>{formatDate(request.createdDate)}</Typography></Grid>
                                    <Grid item xs={0.6}><Typography style={textStyle}>{formatDate(request.modifiedTime)}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.preExistingConditions}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{
                                                        [
                                                            request.patientAddress?.street,
                                                            request.patientAddress?.city,
                                                            request.patientAddress?.state,
                                                            request.patientAddress?.country,
                                                            request.patientAddress?.zip
                                                        ].filter(Boolean).join(', ')
                                                    }
                                                </Typography>
                                            </Grid>
                                    <Grid item xs={0.3}><IconButton onClick={handleDelete(request._id)} aria-label="delete"><DeleteIcon />
                                    </IconButton></Grid>
                             </Grid>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Paper>
            <Button variant="contained" onClick={openNewLabRequestForm} sx={{ alignSelf:'flex-end', mt: 2, marginRight: 6, marginBottom:3}}>New Lab Request</Button>
           
            {/* Edit Dialog */}
            {open && (
                    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                        <DialogTitle>{isNewLabRequest?'Create New Lab Request':'Edit Lab Request'}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Patient ID"
                                        name="patientId"
                                        rows={4}
                                        value={editingLabRequest.patientId || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Lab ID"
                                        name="labId"
                                        rows={4}
                                        value={editingLabRequest.labId || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        margin="dense"
                                        label="Request Name"
                                        name="requestName"
                                        value={editingLabRequest.requestName || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        name="requestDescription"
                                        multiline
                                        rows={4}
                                        value={editingLabRequest.requestDescription || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <Box sx={{ mt: 4 }}>
                            <Input type="file" accept="application/pdf" onChange={handleFileUpload} />
                        </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            name="status"
                                            value={editingLabRequest.status}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="REQUESTED">REQUESTED</MenuItem>
                                            <MenuItem value="MATCHED">MATCHED</MenuItem>
                                            <MenuItem value="KITSENT">KITSENT</MenuItem>
                                            <MenuItem value="KITDELIVERED">KITDELIVERED</MenuItem>
                                            <MenuItem value="SAMPLESENT">SAMPLESENT</MenuItem>
                                            <MenuItem value="SAMPLEDELIVERED">SAMPLEDELIVERED</MenuItem>
                                            <MenuItem value="ANALYSISINPROGRESS">ANALYSISINPROGRESS</MenuItem>
                                            <MenuItem value="REPORTPUBLISHED">REPORTPUBLISHED</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Notification Email"
                                        name="notificationEmail"
                                        value={editingLabRequest.notificationEmail || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Notification Phone"
                                        name="notificationPhone"
                                        value={editingLabRequest.notificationPhone || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Pre Existing Conditions"
                                        name="preExistingConditions"
                                        multiline
                                        rows={2}
                                        value={editingLabRequest.preExistingConditions.join(', ') || ''}
                                        onChange={(e) => handleChange({ target: { name: 'preExistingConditions', value: e.target.value.split(', ') } })}
                                    />
                                </Grid>
                                <TextField
                                margin="dense"
                                name="patientAddress.street"
                                label="Street"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingLabRequest.patientAddress?.street || ''}
                            />
                            <TextField
                                margin="dense"
                                name="patientAddress.city"
                                label="City"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingLabRequest.patientAddress?.city || ''}
                            />
                            <TextField
                                margin="dense"
                                name="patientAddress.state"
                                label="State"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingLabRequest.patientAddress?.state || ''}
                            />
                            <TextField
                                margin="dense"
                                name="patientAddress.country"
                                label="Country"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingLabRequest.patientAddress?.country || ''}
                            />
                            <TextField
                                margin="dense"
                                name="patientAddress.zip"
                                label="Zip Code"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingLabRequest.patientAddress?.zip || ''}
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
    )

}

export default AdminLabRequests;