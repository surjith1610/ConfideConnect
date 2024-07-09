import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Paper } from '@mui/material';

import Sidebar from "../userscommon/sidebar";
import MainContent from "../userscommon/maincontent";


const DoctorDashboard = () => {

  const currentUser = useSelector((state) => state.user);

  return (
    <Box sx={{
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      // alignItems: 'center',
      height: 'calc(100vh - 64px)',
      flexGrow: 1,
    }}>
      {currentUser.user ?
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Paper elevation={3} sx={{ height: 'calc(100% - 20px)', margin: '10px 0px 10px 10px' }}>
              <Sidebar currentUser={currentUser} />
            </Paper>
          </Grid>
          <Grid item xs={9} >
            <Paper elevation={3} sx={{ height: 'calc(100% - 20px)', margin: '10px 10px 10px 0px' }}>
              <MainContent currentUser={currentUser} />
            </Paper>
          </Grid>
        </Grid>
        : null}
    </Box>
  );
};

export default DoctorDashboard;
