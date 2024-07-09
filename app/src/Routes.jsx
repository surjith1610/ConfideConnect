import React, {useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Backdrop } from '@mui/material';

import AppNavbar from './components/common/AppNavBar';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ResetPassword from './components/auth/ResetPassword';
import ResetToken from './components/auth/ResetToken';
import AdminPage from './pages/AdminPage';
import PatientPage from './pages/PatientPage';
import DoctorPage from './pages/DoctorPage';
import LabPage from './pages/LabPage';
import { setTokens, setUser } from './store/slices/user-slice';
import EventsPage from './pages/EventPage';
import BlogsPage from './pages/BlogPage';
 import DonationPage from './pages/DonationPage';


const AppRoutes = () => {

  const loading = useSelector((state) => state.loading.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    // If user data exists in localStorage , then set it in state
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = JSON.parse(localStorage.getItem('user'));
    if (accessToken && refreshToken && user) {
      dispatch(setTokens({
        accessToken: accessToken,
        refreshToken: refreshToken
      }));
      dispatch(setUser({
        ...user
      }))
    }
  }, []);

  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ResetToken />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/events" element={<EventsPage />} /> 
        <Route path="/blogs" element={<BlogsPage />} />
         <Route path="/donations" element={<DonationPage />} /> 
        {/* <Route path="*" element={<Navigate to="/Home" />} /> */}
      </Routes>
      <Backdrop open={loading} style={{ zIndex: 9999 }}>
        <CircularProgress  />
      </Backdrop>
    </>
  );
};

export default AppRoutes;
