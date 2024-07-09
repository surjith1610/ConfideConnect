import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import FullScreenDialog from './dialog';
import { fetchBlogs } from '../../services/blogService';

export default function Blog() {
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    const images = [
      '/src/assets/blogImages/image0.jpg',
      '/src/assets/blogImages/image1.jpg',
      '/src/assets/blogImages/image2.jpg',
      '/src/assets/blogImages/image3.jpg',
      '/src/assets/blogImages/image4.jpg',
      '/src/assets/blogImages/image5.jpg',
      '/src/assets/blogImages/image6.jpg',
      '/src/assets/blogImages/image7.jpg',
      '/src/assets/blogImages/image8.jpg',
      '/src/assets/blogImages/image9.jpg',
      '/src/assets/blogImages/image10.jpg'
  ];
  

    useEffect(() => {
        const fetchData = async () => {
            let blogData = await fetchBlogs();
            blogData = blogData.map((blog, index) => ({
                ...blog,
                imageUrl: images[index % images.length]  // Loop through images sequentially
            }));
            setData(blogData);
        };
        fetchData();
    }, []);

    const handleCardClick = (item) => {
        setSelectedItem(item);
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
        setSelectedItem(null);
    };

    return (
      <Box sx={{
          backgroundColor: 'black', 
          display: 'flex',
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center', 
          height: 'calc(100vh - 64px)',
          color: 'text.primary',
          overflowY: 'auto', 
          '&::-webkit-scrollbar': {
              width: '0.4em'
          },
          '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderRadius: '4px'
          }
      }}>
          {data.map((item, index) => (
              <Card
                  sx={{
                      minWidth: '80%', 
                      bgcolor: 'grey.800', 
                      boxShadow: 3,
                      m: 2, 
                      borderRadius: '10px',
                      height: '1000px',
                      '&:hover': {
                          boxShadow: 6,
                      },
                      transition: 'transform 0.3s ease',
                      
                  }}
                  key={item.id || index} 
                  onClick={() => handleCardClick(item)}
              >
                  <CardMedia
                      component="img"
                      height="140" 
                      image={item.imageUrl || 'defaultImage.jpg'}
                      alt={item.name}
                      sx={{
                          width: '100%', 
                          objectFit: 'cover', 
                      }}
                  />
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                          {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                          {item.content.slice(0, 100)}...
                      </Typography>
                  </CardContent>
              </Card>
          ))}
          {showDialog && selectedItem && (
              <FullScreenDialog item={selectedItem} onClose={handleCloseDialog} />
          )}
      </Box>
  );
}

