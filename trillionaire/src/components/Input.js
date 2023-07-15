// Input.js
import React, { useState } from 'react';
import { Box, TextField, IconButton, Grid } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const Input = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = (event) => {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    onSend(message);
    setMessage('');
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSend} 
      sx={{  
        bottom: 0, 
        width: '50%', 
        display: 'flex',
        justifyContent: 'center', 
        gap: '10px', 
        p: 1, 
        bgcolor: '#242525'
      }}
    >
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={10}>
          <TextField 
            value={message} 
            onChange={e => setMessage(e.target.value)} 
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            multiline 
            rowsMax={4} 
            variant="outlined" 
            fullWidth 
            sx={{ 
              color: '#fff', 
              '& .MuiOutlinedInput-input': {
                color: '#fff'
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '15px',
              },
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton type="submit" color="primary">
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Input;
