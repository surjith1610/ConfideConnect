import React from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide, CardMedia, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ item, onClose }) => {
  return (
    <Dialog fullScreen open={true} onClose={onClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative', backgroundColor: '#333' }}>
        <Toolbar>
          <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }} variant="h6" component="div">
            {item.name}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.5s ease', transform: 'scale(1)' }}>
        <Box sx={{
          height: 300, 
          width: '100%', 
          overflow: 'hidden', 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: 2
        }}>
          <CardMedia
            component="img"
            sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.5s ease', transform: 'scale(1.0)' }}
            image={item.imageUrl}
            alt={`Image for ${item.name}`}
            onLoad={(e) => { e.target.style.transform = 'scale(1.05)'; }} 
          />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
          {item.name}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
          {item.content}
        </Typography>
      </Box>
    </Dialog>
  );
};

export default FullScreenDialog;

