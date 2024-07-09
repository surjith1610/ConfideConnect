import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, Tooltip, Button, Typography, Modal, Box, IconButton , Input, Select, MenuItem, FormControl} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import labRequestService from "../../services/labrequestService";

import { useTranslation } from 'react-i18next';


const LabRequestList = ({fetchData, labRequests}) => {

    // state variables
    const [openModal, setOpenModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [dropDownValue, setDropDownValue] = useState(null);
    const [updateState, setUpdateState] = useState(null);

    const { t } = useTranslation('common');

    useEffect(() => {
        fetchData("lab_lab_requests");
    }, []);

    // Function to handle chat click
    const handleChatClick = (e) => {
        console.log('Chat button clicked');
        e.stopPropagation();
    };

     // Function to handle update request
     const handleUpdate = async (e) => {
        console.log('Update button clicked');
        e.stopPropagation();

        try {
            const updatedRequest = {
                ...updateState,
                labrequest: {
                    ...updateState.labrequest,
                    status: dropDownValue
                }
            };
            console.log("updatedRequest:", updatedRequest);
            const resp = await labRequestService.updateLabRequest(updateState.labrequest._id, updatedRequest.labrequest);
            console.log("Update response:", resp);
            fetchData('lab_lab_requests');
            handleCloseModal();
        } catch (error) {
            console.error('Error updating lab request:', error);
        }
    };

    // Function to handle delete request
    const handleDeleteClick = async (e, labRequestId) => {
        console.log('Delete button clicked');
        e.stopPropagation();
        try {
            const resp = await labRequestService.deleteLabRequest(labRequestId);
            console.log("delete resp : ", resp);
            fetchData("lab_lab_requests");
        } catch (error) {
            console.error('Error deleting lab request:', error);
        }
        setOpenModal(false);
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
                    setUpdateState(prevState => ({
                        ...prevState,
                        labrequest: {
                            ...prevState.labrequest,
                            labReport: reader.result
                        },
                    }));
                };

                reader.onerror = (error) => {
                    console.log("Error reading file: ", error);
                };
            }
        }
    };



    // Function to handle row click
    const handleRowClick = (request) => {
        setSelectedRequest(request);
        setUpdateState(request);
        setDropDownValue(request.labrequest.status)
        setOpenModal(true);
    };

    // Function to handle close modal
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedRequest(null);
        setUpdateState(null);
        setDropDownValue(null);
    };

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return [date.getFullYear(), (date.getMonth() + 1).toString().padStart(2, '0'), date.getDate().toString().padStart(2, '0')].join('-');
    };

    return (
        <>
        <TableContainer component={Paper} sx={{ marginTop: '30px', maxHeight: '430px' }}>
            <Table aria-label="Lab request table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('request')}</TableCell>
                        <TableCell>{t('description')}</TableCell>
                        <TableCell>{t('created_date')}</TableCell>
                        <TableCell>{t('status')}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {labRequests.map((request, index) => (
                        <TableRow 
                            key={index}
                            hover
                            onClick={() => handleRowClick(request)}
                            style={{ cursor: 'pointer' }}
                            >
                            <TableCell>{request.labrequest.requestName}</TableCell>
                            <TableCell>
                                <Typography noWrap sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {request.labrequest.requestDescription}
                                </Typography>
                            </TableCell>
                            <TableCell>{formatDate(request.labrequest.createdDate)}</TableCell>
                            <TableCell>{request.labrequest.status}</TableCell>
                            <TableCell>
                                <Tooltip title="Delete Request">
                                    <Button onClick={(e) => handleDeleteClick(e,request.labrequest._id)}><DeleteIcon /></Button>
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
                            {selectedRequest? selectedRequest.labrequest.requestName: Request} {t('details')}
                        </Typography>
                        <IconButton aria-label="close" onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {selectedRequest && (
                        <>
                        {console.log("selectedRequest:",selectedRequest)}
                        <Box sx={{mt: 2}}>
                            <Typography variant="body1">{t('assigned_to_physician')} Dr. {selectedRequest.lab.name}</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1">{selectedRequest.labrequest.requestDescription}</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1">{t('on')} {formatDate(selectedRequest.labrequest.creationTime)}</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                         <FormControl  sx={{ mt: 2 }}>
                            <Select
                                value={dropDownValue}
                                onChange={(e) => setDropDownValue(e.target.value)}
                            >
                                <MenuItem value="REQUESTED">REQUESTED</MenuItem>
                                <MenuItem value="MATCHED">MATCHED</MenuItem>
                                <MenuItem value="KITDELIVERED">KIT DELIVERED</MenuItem>
                                <MenuItem value="SAMPLESENT">SAMPLE SENT</MenuItem>
                                <MenuItem value="SAMPLEDELIVERED">SAMPLE DELIVERED</MenuItem>
                                <MenuItem value="ANALYSISINPROGRESS">ANALYSIS IN PROGRESS</MenuItem>
                                <MenuItem value="REPORTPUBLISHED">REPORT PUBLISHED</MenuItem>"
                            </Select>
                        </FormControl>
                            </Box>
                        <Box sx={{ mt: 4 }}>
                            <Input type="file" accept="application/pdf" onChange={handleFileUpload} />
                        </Box>
                        <Box sx={{mt: 4}}>
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={(e) => handleUpdate(e)}
                            >
                                {t('update')}
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={(e) => handleDeleteClick(e, selectedRequest.labrequest._id)}
                            >
                                {t('delete_request')}
                            </Button>
                        </Box>
                    </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default LabRequestList;