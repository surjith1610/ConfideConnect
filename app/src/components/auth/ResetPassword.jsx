import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormHelperText, Link, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import userService from "../../services/userService";
import { setLoading } from "../../store/slices/loading-slice";


const ResetPassword = () => {

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { token } = useParams();

  const resetPassword = async (userInfo) => {
    dispatch(setLoading(true));
    try {
      if (userInfo.password != userInfo.confirmPassword) {
        throw Error("Password and Confirm Password should match.") 
      }
      console.log("userInfo ", userInfo)
      const authInfo = await userService.resetPassword(userInfo, token);
      if (authInfo.success == false) {
        throw ErrorMessage("Password change failed")
      }
      console.log(authInfo);
      alert("Password Change successfull")
      navigate(`/login`);
      setError(null);
    } catch (error) {
      console.error(`Error Reset password: ${error}`);
      setError("Passwords does not match");
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
        <Typography variant="h2" color="primary">Reset password</Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}
        <Formik
          initialValues={{
            password: '',
            confirmPassword: ''
          }}
          validationSchema={Yup.object({
            password: Yup.string().required('Input required'),
            confirmPassword: Yup.string().required('Input required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Password: ", values);
            const info = {
              "password": values.password,
              "confirmPassword": values.confirmPassword
            }
            resetPassword(info);
          }}
        >
          <Form>
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
              Confirm New Password
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default ResetPassword;
