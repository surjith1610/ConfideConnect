import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { TextField, Button, FormHelperText, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import userService from "../../services/userService";
import { setLoading } from "../../store/slices/loading-slice";


const Signup = () => {

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  const register = async (newUserInfo) => {
    dispatch(setLoading(true));
    try {
      const createdUser = await userService.createUser(newUserInfo);
      console.log("User created:", createdUser);
      if(createdUser){
        navigate(`/login`);
      }
      else{
        console.log("User created in else:", createdUser);
        setError("Registration failed. Please try again."); // not working :(
      }
      setError(null);
    } catch (error) {
      console.error(`Error creating user: ${error}`);
      setError("Registration failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
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
        <Typography variant="h2" color="primary">{t('signup')}</Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={Yup.object({
            username: Yup.string().required('Username is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
              .min(6, 'Password must be at least 6 characters')
              .required('Password is required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Confirm Password is required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Register form values: ", values);
            const newUserInfo = {
              "role": "patient",
              "email": values.email,
              "username": values.username,
              "password": values.password
            }
            register(newUserInfo);
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

            <Field name="email">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>
            <FormHelperText error>
              <ErrorMessage name="email" />
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

            <Field name="confirmPassword">
              {({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>
            <FormHelperText error>
              <ErrorMessage name="confirmPassword" />
            </FormHelperText>

            <Button type="submit" variant="contained" color="primary">
              {t('signup')}
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default Signup;
