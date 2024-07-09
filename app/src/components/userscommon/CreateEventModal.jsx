import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormHelperText, Alert, Modal, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import eventService from "../../services/eventService";


const createEventModal = ({ user, open, setOpen, fetchData }) => {

  const [error, setError] = useState(null);

  const createEvent = async (eventInfo) => {
    try {
      const createdEvent = await eventService.createEvent(eventInfo);
      console.log("Event created:", createdEvent);
      setError(null);
      setOpen(false);
      if(user.user.role=="doctor"){
        fetchData('doctor_events');
      }
      else if(user.user.role=="lab"){
        fetchData('lab_events');
      }
    } catch (error) {
      console.error(`Error creating event: ${error}`);
      setError("Event creation failed. Please try again.");
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
            Event
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}
          <Formik
            initialValues={{
              name: '',
              description: '',
              street: '',
              city: '',
              state: '',
              country: '',
              zip: ''
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Name is required'),
              description: Yup.string().required('Description is required'),
              street: Yup.string().required('Street is required'),
              city: Yup.string().required('City is required'),
              state: Yup.string().required('State is required'),
              country: Yup.string().required('Country is required'),
              zip: Yup.string().required('Zip code is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Register form values: ", values);
              const requestInfo = {
                "creatorId": user.user._id,
                "name": values.name,
                "description": values.description,
                "address": {
                  "street": values.street,
                  "city": values.city,
                  "state": values.state,
                  "country": values.country,
                  "zip": values.zip
                }
              }
              createEvent(requestInfo);
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
                Create Event
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </ Box>
  );
};

export default createEventModal;
