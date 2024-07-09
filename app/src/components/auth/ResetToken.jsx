import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormHelperText, Link, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import userService from "../../services/userService";
import { setLoading } from "../../store/slices/loading-slice";


const ResetToken = () => {

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetToken = async (userInfo) => {
    dispatch(setLoading(true));
    try {
      console.log("userInfo ", userInfo)
      const authInfo = await userService.getResetToken(userInfo);
      if (authInfo.success == false) {
        throw ErrorMessage("Invalid Email. Please try again.")
      }
      console.log(authInfo)
      alert("Check your email for further instructions.");
      navigate("/login")
      setError(null);
    } catch (error) {
      console.error(`Error Forgot password: ${error}`);
      setError("Invalid Email. Please try again.");
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
        <Typography variant="h2" color="primary">Forgot Password</Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}
        <Formik
          initialValues={{
            email: ''
          }}
          validationSchema={Yup.object({
            email: Yup.string().required('Email is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Email: ", values);
            const userInfo = {
              "email": values.email,
            }
            resetToken(userInfo);
          }}
        >
          <Form>
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
            <Button type="submit" variant="contained" color="primary">
              Reset Password
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default ResetToken;
