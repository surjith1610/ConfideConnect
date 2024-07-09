import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormHelperText, Alert, Modal, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import labRequestService from "../../services/labrequestService";
import { useTranslation } from 'react-i18next';

import labService from "../../services/labService";


const PatientCreateLabRequestModal = ({ user, open, setOpen, fetchData }) => {

  const [error, setError] = useState(null);
  const [allLabIds, setAllLabIds] = useState([]);

  // Function to handle internationalization
  const { t } = useTranslation('common');

  const fetchLabIds = async () => {
    try {
      const allLabs = await labService.getLabs();
      const labIds = allLabs.map(lab => lab.labId);
      setAllLabIds(labIds);
      console.log("All lab IDs: ", allLabIds);
    } catch (error) {
      console.error(`Error fetching lab IDs: ${error}`);
    }
  }

  useEffect(() => { 
    fetchLabIds();
  },[]);
  

  // Generate a random index to select a Lab ID
  const randomIndex = Math.floor(Math.random() * allLabIds.length);
  
  // Retrieve the randomly selected Lab ID
  const randomLabId = allLabIds[randomIndex];

  console.log("Random Lab ID: ", randomLabId);

  const createRequest = async (requestInfo) => {
    try {
      const createdRequest = await labRequestService.createLabRequest(requestInfo);
      console.log("Request created:", createdRequest);
      setError(null);
      setOpen(false);
      fetchData('patient_lab_requests');
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
            {t('lab_request')}
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
              preExistingConditions: '',
              street: '',
              city: '',
              state: '',
              country: '',
              zip: ''
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Name is required'),
              description: Yup.string().required('Description is required'),
              email: Yup.string().email('Invalid email address'),
              phone: Yup.string().matches(/^\+?[0-9]{1,3}[0-9]{10}$/, 'Invalid phone number'),
              street: Yup.string().required('Street is required'),
              city: Yup.string().required('City is required'),
              state: Yup.string().required('State is required'),
              country: Yup.string().required('Country is required'),
              zip: Yup.string().required('Zip code is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Register form values: ", values);
              const requestInfo = {
                "patientId": user.user.patientId,
                "labId": randomLabId, // random for now. TO DO algo to match lab
                "requestName": values.name,
                "requestDescription": values.description,
                "labReport": "wdch",
                "status": "REQUESTED",
                "notificationEmail": values.email || null,
                "notificationPhone": values.phone || null,
                "preExistingConditions": ["Hypertension", "Diabetes"], // TD DO use mui chip
                "modifiedTime": Date.now(),
                "patientAddress": {
                  "street": values.street,
                  "city": values.city,
                  "state": values.state,
                  "country": values.country,
                  "zip": values.zip
                }
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

              <Field name="street">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Street"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <FormHelperText error>
                <ErrorMessage name="street" />
              </FormHelperText>

              <Field name="city">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <FormHelperText error>
                <ErrorMessage name="city" />
              </FormHelperText>

              <Field name="state">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="State"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <FormHelperText error>
                <ErrorMessage name="state" />
              </FormHelperText>

              <Field name="country">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <FormHelperText error>
                <ErrorMessage name="country" />
              </FormHelperText>

              <Field name="zip">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Zip"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <FormHelperText error>
                <ErrorMessage name="zip" />
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

export default PatientCreateLabRequestModal;
