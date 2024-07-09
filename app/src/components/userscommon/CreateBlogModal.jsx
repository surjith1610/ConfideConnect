import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormHelperText, Alert, Modal, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import blogService from "../../services/blogService";


const createBlogModal = ({ user, open, setOpen, fetchData }) => {

  const [error, setError] = useState(null);

  const createBlog = async (blogInfo) => {
    try {
      const createdBlog = await blogService.createBlog(blogInfo);
      console.log("Blog created:", createdBlog);
      setError(null);
      setOpen(false);
      if(user.user.role=="doctor"){
        fetchData('doctor_blogs');
      }
      else if(user.user.role=="lab"){
        fetchData('lab_blogs');
      }
    } catch (error) {
      console.error(`Error creating blog: ${error}`);
      setError("Blog creation failed. Please try again.");
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
            Blog
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}
          <Formik
            initialValues={{
              name: '',
              content: '',
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Name is required'),
              content: Yup.string().required('Content is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Register form values: ", values);
              const requestInfo = {
                "creatorId": user.user._id,
                "name": values.name,
                "content": values.content
              }
              createBlog(requestInfo);
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

                <Field name="content">
                    {({ field }) => (
                        <TextField
                            {...field}
                            label="Content"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    )}
                </Field>
                <FormHelperText error>
                    <ErrorMessage name="content" />
                </FormHelperText>

              <Button type="submit" variant="contained" color="primary">
                Create Blog
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </ Box>
  );
};

export default createBlogModal;
