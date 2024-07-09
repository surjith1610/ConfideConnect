import React, { useEffect, useState } from 'react';
import { Button, Paper, CircularProgress, Grid, Typography, IconButton, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import userService from '../../services/userService';

// AdminUsers component
const AdminUsers = () => {
    // State variables
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [userDetails, setUserDetails] = useState({ username: '', password: '', email: '', role: '' });

    // Fetch all users
    const fetchUsers = async () => {
        setLoading(true);
        userService.AdminGetAllUsers().then((res) => {
            setUsers(res);
            setLoading(false);
        }).catch((err)=>{
            console.error('Something went wrong:', err);
            setLoading(false);
        });
    }
    // Fetch all users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Open new user form
    const openNewUserForm = () => {
        setUserDetails({ username: '', password: '', email: '', role: '' });
        setIsNewUser(true);
        setOpen(true);
    };

    // Open edit user form
    const openEditForm = (user) => {
        setUserDetails(user);
        setIsNewUser(false);
        setOpen(true);
    };

    // Close form
    const handleClose = () => {
        setOpen(false);
    };

    // Save user
    const handleSave = () => {
        const action = isNewUser ? userService.AdminCreateUser : userService.AdminUpdateUser;
        console.log(`${isNewUser ? 'Creating' : 'Updating'} user...`, userDetails);
        action(userDetails)
            .then(() => {
                fetchUsers();
                handleClose();
            })
            .catch(err => {
                console.error('Operation failed:', err);
            });
    };

    // Delete user
    const handleDelete = (id) => (e) => {
        e.stopPropagation();
        console.log('Deleting user...', id);
        userService.AdminDeleteUser(id)
            .then(() => {
                fetchUsers();
            })
            .catch(err => {
                console.error('Delete failed:', err);
            });
    };

    // Handle form input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
        <Box sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                // height: 'calc(100vh - 64px)',
                height: '750px',
                width: 'calc(100vw - 15vw)',
                // width: '1000px',
                backgroundColor: '#dec8c3',
                overflow: 'hidden',
                marginLeft: '-28px'
            }}>
                
            <Paper sx={{ width: '96%', margin: 0, overflow: 'auto', marginBottom: 2, marginTop:2, marginLeft:1, padding:2 }}>
                <Grid container spacing={2} sx={{ alignItems: 'center', fontFamily:'sans-serif', minWidth: 1000  }}>
                     {/* Table Headers */}
                    <Grid item xs={12}>
                        <Grid container spacing={1} sx={{ fontWeight: 'bold', borderBottom: '2px solid white'}}>
                            <Grid item xs={3}>User ID</Grid>
                            <Grid item xs={2}>Username</Grid>
                            <Grid item xs={2}>Password</Grid>
                            <Grid item xs={2}>Email</Grid>
                            <Grid item xs={2}>Role</Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                    </Grid>
                     {/* User rows */}
                    {loading ? (
                        <CircularProgress />
                    ) :  (
                        users.map((user) => (
                            <Grid item xs={12} key={user._id} onClick={() => openEditForm(user)} sx={{ cursor: 'pointer', borderBottom: '2px solid white', padding: 1  }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={3}>{user._id}</Grid>
                                    <Grid item xs={2}>{user.username}</Grid>
                                    <Grid item xs={2}>{user.password}</Grid>
                                    <Grid item xs={2}>{user.email}</Grid>
                                    <Grid item xs={2}>{user.role}</Grid>
                                    <Grid item xs={1}>
                                        <IconButton onClick={handleDelete(user._id)}><DeleteIcon /></IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))
                    )}
                </Grid>
               
            </Paper>
            <Button sx={{ alignSelf:'flex-end', mt: 2, marginRight: 6, marginBottom: 5}} variant="contained" color="primary" onClick={openNewUserForm}>
                    Create New User
                </Button>
            {/* User form dialog */}
            {open && (
                <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                    <DialogTitle>{isNewUser ? 'Create New User' : 'Edit User'}</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" name="username" label="Username" type="text" fullWidth value={userDetails.username} onChange={handleChange} />
                        <TextField margin="dense" name="password" label="Password" type="text" fullWidth value={userDetails.password} onChange={handleChange} />
                        <TextField margin="dense" name="email" label="Email" type="email" fullWidth value={userDetails.email} onChange={handleChange} />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Role</InputLabel>
                            <Select name="role" value={userDetails.role} onChange={handleChange}>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="patient">Patient</MenuItem>
                                <MenuItem value="doctor">Doctor</MenuItem>
                                <MenuItem value="lab">Lab</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                       {/* Save and Cancel buttons */}
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleSave} color="primary">{isNewUser ? 'Create' : 'Save'}</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
        </>
    );
}


export default AdminUsers;
