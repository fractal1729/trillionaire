import React, { useState } from 'react';
import Confetti from 'react-confetti';

import { Box, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Header from './components/Header';
import Chatbox from './components/Chatbox';
import Input from './components/Input';
import { Configuration, OpenAIApi } from "openai";

let configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
delete configuration.baseOptions.headers['User-Agent'];
const openai = new OpenAIApi(configuration);
console.log(openai);

const App = () => {
  const [chat, setChat] = useState([]);
  const [numMessages, setNumMessages] = useState(0);
  const [won, setWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);


  const handleSend = async (message) => {
    setChat([...chat, { message, sender: 'user' }]);
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {role: "system", content: "You are a helpful assistant."},
          ...chat.map((message) => ({ role: message.sender, content: message.message })),
        ],
        temperature: 0.8,
      });
      const { choices } = response.data;
      const message = choices[0].message.content;
      setChat((prevChat) => [...prevChat, { message: message, sender: 'assistant' }]);
      setNumMessages(numMessages + 1);
      
      // Check if the user won
      if (message.includes('you won')) {
        setWon(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000); // Confetti for 2 seconds
      }
    }
    catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#242525', height: '100%', width: '100%', position: 'absolute' }}>
      <Header />
      <Chatbox chat={chat} />
      <Divider sx={{ height: '2px', bgcolor: 'primary.main' }} />
      <Input onSend={handleSend} />
      {showConfetti && <Confetti />}
      <Dialog open={won}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>You won after {numMessages} messages!</DialogContent>
      </Dialog>
    </Box>
  );
};

export default App;