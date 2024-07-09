import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { TextField, Button, FormHelperText, Link, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import userService from "../../services/userService";
import { setUser, setTokens } from "../../store/slices/user-slice";
import { setLoading } from "../../store/slices/loading-slice";


const Login = () => {

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  const login = async (userInfo) => {
    dispatch(setLoading(true));
    try {
      const authInfo = await userService.login(userInfo);
      console.log("AuthInfo: ", authInfo);
      const user = await userService.getUser(authInfo);
      console.log("User details fetched: ", user);
      if (user.role == "admin") {
        dispatch(setUser({
          ...user
        }));
        localStorage.setItem('user', JSON.stringify({
          ...user
        }));
      }
      else {
        const specificUserDetails = await userService.getUserDetails(user, authInfo);
        console.log("Specific User details fetched: ", specificUserDetails);
        dispatch(setUser({
          ...specificUserDetails,
          ...user
        }));
        localStorage.setItem('user', JSON.stringify({
          ...specificUserDetails,
          ...user
        }));
      }
      dispatch(setTokens(authInfo));
      localStorage.setItem('accessToken', authInfo.accessToken);
      localStorage.setItem('refreshToken', authInfo.refreshToken);
      navigate(`/${user.role}`);
      setError(null);
    } catch (error) {
      console.error(`Error logging in user: ${error}`);
      setError("Loggin in failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgotpassword');
  };

  return (
    <Box sx={{
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 64px)',
    }}>
      <Box sx={{ width: '40vw' }}>
        <Typography variant="h2" color="primary"> {t('login')}</Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Login form values: ", values);
            const userInfo = {
              "username": values.username,
              "password": values.password
            }
            login(userInfo);
          }}
        >
          <Form>
            <Field name="username">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>
            <FormHelperText error>
              <ErrorMessage name="username" />
            </FormHelperText>

            <Field name="password">
              {({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>
            <FormHelperText error>
              <ErrorMessage name="password" />
            </FormHelperText>

            <Button type="submit" variant="contained" color="primary">
              {t('login')}
            </Button>
          </Form>
        </Formik>
        <Typography variant="body2" mt={3}>
          {t('forgot_password')}? <Link onClick={handleForgotPasswordClick} underline="hover" sx={{ cursor: 'pointer' }}>
            {t('click_here')}
          </Link>
        </Typography>
        <Typography variant="body2" mt={2}>
          {t('dont_have_an_account')}? <Link onClick={handleSignupClick} underline="hover" sx={{ cursor: 'pointer' }}>
            {t('signup')}
          </Link>
        </Typography>

      </Box>
    </Box>
  );
};

export default Login;
