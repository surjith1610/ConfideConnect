import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormHelperText, Alert, Modal, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import medicalRequestService from "../../services/medicalrequestService";
import doctorService from "../../services/doctorService";
import { useTranslation } from 'react-i18next';


const PatientCreateMedicalRequestModal = ({ user, open, setOpen, fetchData }) => {

  const [error, setError] = useState(null);
  const [allDoctorIds, setAllDoctorIds] = useState([]);

  // Function to handle internationalization
  const { t } = useTranslation('common');

  const fetchDoctorIds = async () => {
    try {
      const allDoctors = await doctorService.getDoctors();
      const doctorIds = allDoctors.map(doctor => doctor.doctorId);
      setAllDoctorIds(doctorIds);
      console.log("All doctor IDs: ", allDoctorIds);
    } catch (error) {
      console.error(`Error fetching doctor IDs: ${error}`);
    }
  };

  useEffect(() => {
    fetchDoctorIds();
  }, []);
  // Generate a random index to select a doctor ID
  const randomIndex = Math.floor(Math.random() * allDoctorIds.length);
  
  // Retrieve the randomly selected doctor ID
  const randomDoctorId = allDoctorIds[randomIndex];

  

  const createRequest = async (requestInfo) => {
    try {
      const createdRequest = await medicalRequestService.createMedicalRequest(requestInfo);
      console.log("Request created:", createdRequest);
      setError(null);
      setOpen(false);
      fetchData('patient_medical_requests');
    } catch (error) {
      console.error(`Error creating request: ${error}`);
      setError("Request creation failed. Please try again.");
    }
  };


  return (
    <Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            height: '70%', 
            overflow: 'scroll' 
          }}
         >
          <Typography variant="h4" color="primary">
            {t('medical_request')}
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}
          <Formik
            initialValues={{
                name: '',
                description: '',
                email: '',
                phone: '',
                preExistingConditions: ''
              }}
            validationSchema={Yup.object({
                name: Yup.string().required('Name is required'),
                description: Yup.string().required('Description is required'),
                email: Yup.string().email('Invalid email address'),
                phone: Yup.string().matches(/^\+?[0-9]{1,3}[0-9]{10}$/, 'Invalid phone number'),
                preExistingConditions: Yup.string()
              })}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Register form values: ", values);
              const requestInfo = {
                "patientId": user.user.patientId,
                "doctorId":  randomDoctorId, // random for now. TO DO algo to match doctor
                "requestName": values.name,
                "requestDescription": values.description,
                "doctorPrescription": null,
                "status": "REQUESTED",
                "notificationEmail": values.email || null,
                "notificationPhone": values.phone || null,
                "preExistingConditions": ["Hypertension", "Diabetes"] // TD DO use mui chip
              }
              createRequest(requestInfo);
            }}
            >
            <Form>
                <Field name="name">
                    {({ field }) => (
                        <TextField
                            {...field}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    )}
                </Field>
                <FormHelperText error>
                    <ErrorMessage name="name" />
                </FormHelperText>

                <Field name="description">
                    {({ field }) => (
                        <TextField
                            {...field}
                            label="Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    )}
                </Field>
                <FormHelperText error>
                    <ErrorMessage name="description" />
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

                <Field name="phone">
                    {({ field }) => (
                        <TextField
                            {...field}
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    )}
                </Field>
                <FormHelperText error>
                    <ErrorMessage name="phone" />
                </FormHelperText>

                <Field name="preExistingConditions">
                    {({ field }) => (
                        <TextField
                            {...field}
                            label="Pre-existing Conditions"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    )}
                </Field>
                <FormHelperText error>
                    <ErrorMessage name="preExistingConditions" />
                </FormHelperText>
              <Button type="submit" variant="contained" color="primary">
               {t('create_request')}
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </ Box>
  );
};

export default PatientCreateMedicalRequestModal;
