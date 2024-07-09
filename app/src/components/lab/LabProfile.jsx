import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormHelperText, Alert, Modal, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import labService from "../../services/labService";

import { useTranslation } from 'react-i18next';


const LabProfileUpdate = ({ user, showProfileUpdate }) => {

    // state variables
    const [open, setOpen] = useState(true);
    const [error, setError] = useState(null);
    const [lab, setLab] = useState({});

    const { t } = useTranslation('common');

    useEffect(() => {
        const fetchLab = async () => {
            try {
                const response = await labService.getLab(user.user._id);
                console.log("response",response);
                setLab(response);
            } catch (error) {
                console.error('Get Lab failed:', error);
                setError('Get Lab failed');
            }
        };
        fetchLab();
    }, [user.user._id]);

    // Update Lab Profile
    const handleSubmit = (values, { setSubmitting }) => {
        console.log("values",values);
        console.log("inside submiittttt")
        labService.updateLab(user.user._id,values)
          .then(() => handleClose())
          .catch(err => {
            console.error('Update failed:', err);
            setError('Failed to update profile');
          })
          .finally(() => setSubmitting(false));
      };
    

    const handleClose = () => {
        setOpen(false);
    }
    
    return (
    <Box>
            <Modal
        open={open}
        onClose={() =>{setOpen(false);
          showProfileUpdate(false)}}
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
                {t('update_profile')}
             </Typography>
             {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}
        
          <Formik
           key={lab.labId || 'new-lab'}
            initialValues={
                {
                    ...lab,
            }}
            validationSchema={Yup.object({
                name: Yup.string(),
                phone: Yup.string().matches(/^\+?[0-9]{1,3}[0-9]{10}$/, 'Invalid phone number'),
                street: Yup.string(),
                city: Yup.string(),
                state: Yup.string(),
                country: Yup.string(),
                zip: Yup.string(),
            })}
            onSubmit={handleSubmit}
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

                    <Field name="phone">
                        {({ field }) => (
                            <TextField
                                {...field}
                                label="Phone"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    </Field>
                    <FormHelperText error>
                        <ErrorMessage name="phone" />
                    </FormHelperText>

                    <Field name="address.street">
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

              <Field name="address.city">
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

              <Field name="address.state">
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

              <Field name="address.country">
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

              <Field name="address.zip">
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
                {t('save_profile')}
              </Button>

                </Form>
            </Formik>
         </Box>
        </Modal>
    </Box>
        
    )
}
export default LabProfileUpdate;
