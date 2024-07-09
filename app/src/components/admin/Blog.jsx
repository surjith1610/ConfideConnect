import React, { useEffect, useState } from 'react';
import { Button, Paper, CircularProgress, Grid, Typography,IconButton, Box,Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import blogService from '../../services/blogService';

// AdminBlogs component
const AdminBlogs = () => {
    // State variables
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    // Fetch all blogs
    const fetchBlogs = async () => {
        setLoading(true);
        blogService.adminGetBlogs().then((data) => {
            setBlogs(data);
            setLoading(false);
        }).catch((err) => {
            console.error('Something went wrong:', err);
            setLoading(false);
        });
    };

    // Fetch all blogs on component mount
    useEffect(() => {
        fetchBlogs();
    }, []);

    // Open blog form
    const handleOpen = (blog) => {
        setEditingBlog(blog);
        setOpen(true);
    }

    // Close form
    const handleClose = () => {
        setOpen(false);
        setEditingBlog(null);
    }

    // Save blog
    const handleSave = () => {
        console.log('Updating blog...',editingBlog);
        blogService.adminUpdateBlog(editingBlog).then(() => {
            fetchBlogs();
            handleClose();
        }).catch((error) => {
            console.error('Something went wrong:', error);
        });
    };

    // Delete blog
    const handleDelete = (id) => (e) =>{
        e.stopPropagation(); // Prevent opening the edit dialog or any other click propagation issues
        console.log('Deleting blog...',id);
        blogService.adminDeleteBlog(id).then(() => {
            fetchBlogs();
        }).catch((error) => {
            console.error('Something went wrong:', error);
        });
    }

    // Handle form input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        const keys = name.split('.');
        
        setEditingBlog(prev => {
            let updated = {...prev}; // Copy the current state
            let current = updated;
            
            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    current[key] = value; // Set the value at the final key
                } else {
                    if (!current[key]) current[key] = {}; // Ensure nested object exists
                    current = current[key]; // Move reference down to the nested object
                }
            });
            
            return updated;
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return [date.getFullYear(), (date.getMonth() + 1).toString().padStart(2, '0'), date.getDate().toString().padStart(2, '0')].join('-');
    };

    return (
        <>
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '750px',
            width: 'calc(100vw - 15vw)',
            backgroundColor: '#dec8c3',
            overflow: 'hidden',
            marginLeft: '-28px'
        }}>
             <Paper sx={{ width: '96%',height:'92%', overflowX: 'auto', padding: 2, marginLeft:1, marginTop:1 }}>
                <Grid container spacing={2} sx={{ minWidth: 1600, alignItems: 'center' }}>
                    {/* Header Row for table */}
                    <Grid item xs={12}>
                        <Grid container spacing={1} sx={{ fontWeight: 'bold', borderBottom: '2px solid white' }}>
                        <Grid item xs={2}><Typography>Blog ID</Typography></Grid>
                        <Grid item xs={2}><Typography>Blog Name</Typography></Grid>
                        <Grid item xs={3}><Typography>Content</Typography></Grid>
                        <Grid item xs={2}><Typography>Creation Time</Typography></Grid>
                        <Grid item xs={2}><Typography>Creator Id</Typography></Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                    </Grid>
                    {/* Blog Data Rows */}
                    {loading ? (
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Grid>
                    ) : (
                        blogs.map(blog => (
                            <Grid item xs={12} key={blog._id} onClick={() => handleOpen(blog)} sx={{ cursor: 'pointer', borderBottom: '2px solid white', padding: 1 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2}><Typography>{blog._id}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{blog.name}</Typography></Grid>
                                    <Grid item xs={3}><Typography>{blog.content}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{formatDate(blog.createdDate)}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{blog.creatorId}</Typography></Grid>
                                    <Grid item xs={1}>
                                    <IconButton  onClick={handleDelete(blog._id)} aria-label="delete"><DeleteIcon /></IconButton></Grid>           
                                </Grid>
                            </Grid>
                        ))
                    )}
        </Grid>
        </Paper> 
        {/* Edit Blog Dialog */}
        {
            editingBlog && (
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Edit Blog</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        margin="dense"
                                        label="Blog Name"
                                        name="name"
                                        value={editingBlog.name || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Content"
                                        name="content"
                                        multiline
                                        rows={4}
                                        value={editingBlog.content|| ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            </DialogContent>
                            {/* Save and Cancel buttons */}
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={handleSave} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>
                )}
        </Box>
        </>
    );

}

export default AdminBlogs;