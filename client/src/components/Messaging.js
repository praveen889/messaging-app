import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/message.css'

function Message({ selectedUser }) {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    axios.get(`http://localhost:5000/messages/${loggedInUser.id}/${selectedUser.id}`)
      .then(response => {
        setConversation(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, [loggedInUser.id, selectedUser.id]);

  const handleSendMessage = () => {
    const newMessage = {
      senderId: loggedInUser.id,
      receiverId: selectedUser.id,
      message
    };

    axios.post('http://localhost:5000/messages', newMessage)
      .then(response => {
        setConversation([...conversation, response.data]);
        setMessage('');
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <div className='chat'>
      <h4 className='user-n'>{selectedUser.name}</h4>
      <div className='chat-box'>
        {conversation.map((msg, index) => (
          <div key={index} style={{ margin: '10px 0' }}>
            <strong>{msg.sender_id === loggedInUser.id ? 'You' : selectedUser.name}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className='bottom'>
        <textarea className='textarea'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          rows="4"
          cols="50"
        />
        <br/>
        <button className='send-btn' onClick={handleSendMessage}>Send Message</button>
      </div>
      
    </div>
  );
}

export default Message;
