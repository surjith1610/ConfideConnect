import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import { useTranslation } from 'react-i18next';

import SubNavBar from "../userscommon/subnavbar";
import PatientLabRequestList from '../patient/PatientLabRequestList';
import PatientMedicalRequestList from '../patient/PatientMedicalRequestList';
import DoctorMedicalRequestList from '../doctor/DoctorMedicalRequestList';
import LabRequestList from '../lab/LabRequestList';
import EventList from './EventList';
import BlogList from './BlogList';
import PatientCreateLabRequestModal from '../patient/PatientCreateLabRequestModal';
import PatientCreateMedicalRequestModal from '../patient/PatientCreateMedicalRequestModal';
import CreateEventModal from './CreateEventModal';
import CreateBlogModal from './CreateBlogModal';
import labRequestService from '../../services/labrequestService';
import labService from '../../services/labService';
import medicalRequestService from '../../services/medicalrequestService';
import doctorService from "../../services/doctorService";
import eventService from '../../services/eventService';
import blogService from "../../services/blogService";
import ChatWindow from './ChatWindow';
import { setLoading } from '../../store/slices/loading-slice';


const tabMappings = {
    patient: ['Medical Requests', 'Lab Requests'],
    doctor: ['Medical Requests', 'Events', 'Blogs'],
    lab: ['Lab Requests', 'Events', 'Blogs']
};

const MainContent = ({ currentUser }) => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    console.log("Redux user: ",user);

    const [labRequestsForPatient, setLabRequestsForPatient] = useState([]);
    const [medicalRequestsForPatients, setMedicalRequestsForPatients] = useState([]);
    const [medicalRequestsForDoctor, setMedicalRequestsForDoctor] = useState([]);
    const [eventsForDoctor, setEventsForDoctor] = useState([]);
    const [blogsForDoctor, setBlogsForDoctor] = useState([]);
    const [labRequestsForLab, setLabRequestsForLab] = useState([]);
    const [eventsForLab, setEventsForLab] = useState([]);
    const [blogsForLab, setBlogsForLab] = useState([]);

    // Function to handle internationalization
    const { t } = useTranslation('common');

    const fetchData = async (type) => {
        dispatch(setLoading(true));
        if(type=="patient_medical_requests")
        {
            try {
                const medicalrequests = await medicalRequestService.getMedicalRequestsForPatient(user.user.patientId);
                const medicalRequestsWithDoctorDetails = await Promise.all(
                    medicalrequests.map(async medicalrequest => {
                        const doctor = await doctorService.getDoctor(medicalrequest.doctorId);
                        return { medicalrequest, doctor };
                    })
                );
                console.log("requestsWithDoctorsDetails : ", medicalRequestsWithDoctorDetails);
                setMedicalRequestsForPatients(medicalRequestsWithDoctorDetails);
            } catch (error) {
                console.error('Error fetching medical requests or doctors:', error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        else if(type=="patient_lab_requests")
        {
            try {
                const labrequests = await labRequestService.getLabRequestsForPatient(user.user.patientId);
                const requestsWithLabsDetails = await Promise.all(
                    labrequests.map(async labrequest => {
                        const lab = await labService.getLab(labrequest.labId);
                        return { labrequest, lab };
                    })
                );
                console.log("requestsWithLabsDetails : ", requestsWithLabsDetails);
                setLabRequestsForPatient(requestsWithLabsDetails);
            } catch (error) {
                console.error('Error fetching lab requests or labs:', error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        else if(type=="doctor_medical_requests")
        {
            try {
                const medicalrequests = await medicalRequestService.getMedicalRequestsForDoctor(user.user.doctorId);
                const medicalRequestsWithDoctorDetails = await Promise.all(
                    medicalrequests.map(async medicalrequest => {
                        const doctor = await doctorService.getDoctor(medicalrequest.doctorId);
                        return { medicalrequest, doctor };
                    })
                );
                console.log("requestsWithDoctorsDetails : ", medicalRequestsWithDoctorDetails);
                setMedicalRequestsForDoctor(medicalRequestsWithDoctorDetails);
            } catch (error) {
                console.error('Error fetching medical requests or doctors:', error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        else if(type=="doctor_events")
        {
            try {
                const eventsData = await eventService.getEventsForCreator(user.user.doctorId);
                console.log("eventsData : ", eventsData);
                setEventsForDoctor(eventsData);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        else if(type=="doctor_blogs")
        {
            try {
                const blogsData = await blogService.getBlogs(user.user.doctorId);
                console.log("blogsData : ", blogsData);
                setBlogsForDoctor(blogsData);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        else if(type=="lab_lab_requests")
        {
            try {
                const labrequests = await labRequestService.getLabRequestsForLab(user.user.labId);
                const labRequestsWithLabDetails = await Promise.all(
                  labrequests.map(async labrequest => {
                        const lab = await labService.getLab(labrequest.labId);
                        return { labrequest, lab };
                    })
                );
                console.log("labRequestsWithLabDetails : ", labRequestsWithLabDetails);
                setLabRequestsForLab(labRequestsWithLabDetails);
            } catch (error) {
                console.error('Error fetching medical requests or doctors:', error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        else if(type=="lab_events")
        {
            try {
                const eventsData = await eventService.getEventsForCreator(user.user.labId);
                console.log("eventsData : ", eventsData);
                setEventsForLab(eventsData);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        else if(type=="lab_blogs")
        {
            try {
                const blogsData = await blogService.getBlogs(user.user.labId);
                console.log("blogsData : ", blogsData);
                setBlogsForLab(blogsData);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    const [tabIndex, setTabIndex] = useState(0);
    const [openPatientCreateMedicalRequestModal, setOpenPatientCreateMedicalRequestModal] = useState(false);
    const [openPatientCreateLabRequestModal, setOpenPatientCreateLabRequestModal] = useState(false);
    const [openCreateEventModal, setOpenCreateEventModal] = useState(false);
    const [openCreateBlogModal, setOpenCreateBlogModal] = useState(false);
    
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    const handlePatientCreateRequestClick = (type) => {
        if(type=='medical'){
            setOpenPatientCreateMedicalRequestModal(true);
        }
        else if(type=='lab'){
            setOpenPatientCreateLabRequestModal(true);
        }
    };

    const handleCreateEventClick = () => {
        setOpenCreateEventModal(true);
    };

    const handleCreateBlogClick = () => {
        setOpenCreateBlogModal(true);
    };

    const [showChatWindow, setShowChatWindow] = useState(false);

    const toggleChatWindow = () => {
        setShowChatWindow(!showChatWindow);
      };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                height: 'calc(100% - 50px)'
            }}
        >   

            <SubNavBar items={tabMappings[currentUser.user.role]} handleTabChange={handleTabChange} tabIndex={tabIndex} />

            {currentUser.user.role == 'patient' &&
                tabMappings[currentUser.user.role].map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            {(index == tabIndex && index == 0) &&
                                <>
                                    <PatientMedicalRequestList key={index} fetchData={fetchData} medicalRequests={medicalRequestsForPatients}/>
                                    <Button variant="contained" color="primary" 
                                        onClick={()=>handlePatientCreateRequestClick("medical")}
                                        sx={{marginTop: 'auto', marginBottom: '50px'}}>
                                        {t('create_a_medical_request')}
                                    </Button>
                                </>
                            }
                            {(index == tabIndex && index == 1) && 
                                <>
                                    <PatientLabRequestList key={index} fetchData={fetchData} labRequests={labRequestsForPatient} />
                                    <Button variant="contained" color="primary" 
                                        onClick={()=>handlePatientCreateRequestClick("lab")}
                                        sx={{marginTop: 'auto', marginBottom: '50px'}}>
                                        {t('create_a_lab_request')}
                                    </Button>
                                </>
                            }
                        </React.Fragment>)
                })
            }

            {currentUser.user.role == 'doctor' &&
                tabMappings[currentUser.user.role].map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            {(index == tabIndex && index == 0) && 
                                <DoctorMedicalRequestList 
                                    key={index} 
                                    fetchData={fetchData} 
                                    medicalRequests={medicalRequestsForDoctor}
                                />
                            }
                            {(index == tabIndex && index == 1) &&
                                <>
                                    <EventList 
                                        key={index} 
                                        fetchData={fetchData} 
                                        events={eventsForDoctor}
                                        user={currentUser}
                                    />
                                    <Button variant="contained" color="primary" 
                                        onClick={() => handleCreateEventClick()}
                                        sx={{marginTop: 'auto', marginBottom: '50px'}}>
                                        {t('create_an_event')}
                                    </Button>
                                </>
                            }
                            {(index == tabIndex && index == 2) &&
                                <>
                                    <BlogList
                                        key={index}
                                        fetchData={fetchData}
                                        blogs={blogsForDoctor}
                                        user={currentUser}
                                    />
                                    <Button variant="contained" color="primary" 
                                        onClick={() => handleCreateBlogClick()}
                                        sx={{marginTop: 'auto', marginBottom: '50px'}}>
                                       {t('create_a_blog')}
                                    </Button>
                                </>
                            }
                        </React.Fragment>)
                })
            }

            {currentUser.user.role == 'lab' &&
                tabMappings[currentUser.user.role].map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            {(index == tabIndex && index == 0) && 
                                <LabRequestList 
                                    key={index} 
                                    fetchData={fetchData} 
                                    labRequests={labRequestsForLab}
                                />
                            }
                            {(index == tabIndex && index == 1) &&
                                <>
                                    <EventList 
                                        key={index} 
                                        fetchData={fetchData} 
                                        events={eventsForLab}
                                        user={currentUser}
                                    />

                                    <Button variant="contained" color="primary" 
                                        onClick={() => handleCreateEventClick()}
                                        sx={{marginTop: 'auto', marginBottom: '50px'}}>
                                        {t('create_an_event')}
                                    </Button>
                                </>
                            }
                            {(index == tabIndex && index == 2) &&
                                <>
                                    <BlogList
                                        key={index}
                                        fetchData={fetchData}
                                        blogs={blogsForLab}
                                        user={currentUser}
                                    />
                                    <Button variant="contained" color="primary" 
                                        onClick={() => handleCreateBlogClick()}
                                        sx={{marginTop: 'auto', marginBottom: '50px'}}>
                                        {t('create_a_blog')}
                                    </Button>
                                </>
                            }
                        </React.Fragment>)
                })
            }
            
            <PatientCreateMedicalRequestModal 
                user={currentUser}
                open={openPatientCreateMedicalRequestModal}
                setOpen={setOpenPatientCreateMedicalRequestModal}
                fetchData={fetchData}
            />
            
            <PatientCreateLabRequestModal 
                user={currentUser}
                open={openPatientCreateLabRequestModal}
                setOpen={setOpenPatientCreateLabRequestModal}
                fetchData={fetchData}
            />

            <CreateEventModal 
                user={currentUser}
                open={openCreateEventModal}
                setOpen={setOpenCreateEventModal}
                fetchData={fetchData}
            />

            <CreateBlogModal
                user={currentUser}
                open={openCreateBlogModal}
                setOpen={setOpenCreateBlogModal}
                fetchData={fetchData}
            />
            
            {!showChatWindow && (
                <Tooltip title="Talk to Our Community">
                    <IconButton
                        sx={{
                            position: 'fixed',
                            bottom: 40,
                            right: 40,
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            '&:hover': {
                                transform: 'translateY(-10px)',
                                backgroundColor: 'primary.dark',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            },
                            zIndex: 9997,
                            transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease', // Add transition for smooth animation
                        }}
                        onClick={toggleChatWindow}
                    >
                        <ForumIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            )}

            {showChatWindow && (
                <ChatWindow
                    userId={user.user._id}
                    name={user.user.role === 'patient' ? `Patient_${(user.user._id.toString()).slice(-3)}` : user.user.name}
                    onClose={toggleChatWindow}
                />
            )}

        </Box>
    );
};

export default MainContent;