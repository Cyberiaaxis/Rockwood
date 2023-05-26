import React, { useState } from 'react';
// import { makeStyles } from '@mui/styles';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     height: '100%',
//   },
//   messageList: {
//     flexGrow: 1,
//     overflowY: 'scroll',
//     padding: theme.spacing(2),
//   },
//   messageInput: {
//     display: 'flex',
//     padding: theme.spacing(2),
//   },
// }));

const Chat = () => {
//   const classes = useStyles();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div sx={{ display: 'flex', flexDirection: 'column', height: '100%',}}>
      <List sx={{ flexGrow: 1, overflowY: 'scroll', padding: 2}}>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={msg} />
          </ListItem>
        ))}
      </List>
      <div sx={{display: 'flex', padding: 2}}>
        <TextField
          variant="outlined"
          label="Type your message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
          autoFocus
        />
        <Button variant="contained" color="primary" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
