import React from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';
import { useState } from 'react';

import PatientProfileUpdate from '../patient/PatientProfile';
import DoctorProfileUpdate from '../doctor/DoctorProfile';
import LabProfileUpdate from '../lab/LabProfile';
import { useTranslation } from 'react-i18next';


const Sidebar = ({ currentUser }) => {
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);

  const handleManageProfile = () => {
      setShowProfileUpdate(!showProfileUpdate);
  }

   // Function to handle internationalization
   const { t } = useTranslation('common');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Avatar
        alt={currentUser.user.username}
        // src={currentUser.user.profilepicture}
        sx={{ width: 100, height: 100 }}
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {currentUser.user.username}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {currentUser.user.email}
      </Typography>
     
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleManageProfile}>
        {t('manage_profile')}
      </Button>
      {
        currentUser.user.role === 'patient' && showProfileUpdate? <PatientProfileUpdate user={currentUser} showProfileUpdate={setShowProfileUpdate}/>: null
      }
      {
        currentUser.user.role === 'doctor' && showProfileUpdate? <DoctorProfileUpdate user={currentUser} showProfileUpdate={setShowProfileUpdate}/>: null
      }
      {
        currentUser.user.role === 'lab' && showProfileUpdate? <LabProfileUpdate user={currentUser} showProfileUpdate={setShowProfileUpdate}/>: null
      }
    </Box>
  );
};

export default Sidebar;