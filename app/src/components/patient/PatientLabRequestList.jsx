import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Tooltip, Button, Typography, Modal, Box, IconButton
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import labRequestService from "../../services/labrequestService";
import { useTranslation } from 'react-i18next';


const PatientLabRequestList = ({fetchData, labRequests}) => {

    const [openModal, setOpenModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const { t } = useTranslation('common');


    useEffect(() => {
        fetchData('patient_lab_requests');
    }, []);

    const handleChatClick = (e) => {
        console.log('Chat button clicked');
        e.stopPropagation()
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
        link.setAttribute('download', 'report.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
        // Clean up the blob URL
        URL.revokeObjectURL(blobUrl);
    };

    const handleDeleteClick = async (e, labRequestId) => {
        console.log('Delete button clicked');
        e.stopPropagation()
        try {
            const resp = await labRequestService.deleteLabRequest(labRequestId);
            console.log("delete resp : ", resp);
            fetchData('patient_lab_requests');
        } catch (error) {
            console.error('Error deleting lab request:', error);
        }
    };

    const handleRowClick = (request) => {
        setSelectedRequest(request);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedRequest(null);
    };

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return [date.getFullYear(), (date.getMonth() + 1).toString().padStart(2, '0'), date.getDate().toString().padStart(2, '0')].join('-');
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ marginTop: '30px', maxHeight: '430px' }}>
                <Table aria-label="lab request table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('request')}</TableCell>
                            <TableCell>{t('description')}</TableCell>
                            <TableCell>{t('created_date')}</TableCell>
                            <TableCell>{t('status')}</TableCell>
                            <TableCell>{t('lab')}</TableCell>
                            <TableCell>{t('report')}</TableCell>
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
                            >{console.log("request:",request)}
                                <TableCell>
                                    <Typography noWrap sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {request.labrequest.requestName}
                                    </Typography>
                                </TableCell>
                                <TableCell>{request.labrequest.requestDescription}</TableCell>
                                <TableCell>{formatDate(request.labrequest.createdDate)}</TableCell>
                                <TableCell>{request.labrequest.status}</TableCell>
                                <TableCell>{request.lab.name}
                                </TableCell>
                                <TableCell>
                                    {request.labrequest.labReport ?
                                        <Tooltip title="Download Report">
                                            <Button onClick={(e) => handleDownloadClick(e,request.labrequest.labReport)}><GetAppIcon /></Button>
                                        </Tooltip> : "On the way..."}
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Delete Request">
                                        <Button onClick={(e) => handleDeleteClick(e, request.labrequest._id)}><DeleteIcon /></Button>
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
                            {selectedRequest ? selectedRequest.labrequest.requestName : Request} {t('details')}
                        </Typography>
                        <IconButton aria-label="close" onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {selectedRequest && (
                        <>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1">{t('assigned_to_lab')} {selectedRequest.lab.name}</Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1">{selectedRequest.labrequest.requestDescription}</Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1">{t('on')}{formatDate(selectedRequest.labrequest.createdDate)}</Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1">{t('status')}: {selectedRequest.labrequest.status}</Typography>
                            </Box>
                            {selectedRequest.labrequest.labReport ?
                                <Box sx={{ mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<GetAppIcon />}
                                        onClick={(e) => handleDownloadClick(e, selectedRequest.labrequest.labReport)}
                                    >
                                        {t('download_report')}
                                    </Button>
                                </Box> : null}
                           
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

export default PatientLabRequestList;