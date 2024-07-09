import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import AdminNav from './AdminNav';
import './../../App.css'
import { Grid, Paper } from "@mui/material";
import AdminPatients from "./Patient";
import AdminDoctors from "./Doctor";
import AdminLabs from "./Lab";
import AdminMedicalRequests from "./MedicalRequest";
import AdminLabRequests from "./LabRequest";
import AdminEvents from "./Event";
import AdminBlogs from "./Blog";
import AdminDonations from "./Donation";
import AdminUsers from "./User";

// AdminDashboard component
const AdminDashboard = () => {

  // Get current user
  const currentUser = useSelector((state) => state.user);
  // State variable
  const [tabClicked, setTabClicked] = useState('user');

  return (

    <Box sx={{ flexGrow: 1 }}>

    <Grid container spacing={2}>
        <Grid item xs={2}>
            <AdminNav setTabClicked={setTabClicked}/>
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={3}>
            {/* State management for each clicks */}
            {
              tabClicked === 'user' ? <AdminUsers/> : null
            }
          {
            tabClicked === 'patient' ? <AdminPatients/> : null
          }
          {
            tabClicked === 'doctor' ? <AdminDoctors/> : null
          }
          {
            tabClicked === 'lab' ? <AdminLabs/> : null
          }
          {
            tabClicked === 'medicalRequest' ? <AdminMedicalRequests/>: null
          }
          {
            tabClicked === 'labRequest' ? <AdminLabRequests/>: null
          }
          {
            tabClicked === 'donation' ? <AdminDonations/> : null
          }
          {
            tabClicked === 'event' ? <AdminEvents/> : null
          }
          {
            tabClicked === 'blog' ? <AdminBlogs/> : null
          }
          </Paper>
        </Grid>
      </Grid>

      </Box>

  );
};

export default AdminDashboard;
