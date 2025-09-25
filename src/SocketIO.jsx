import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Select, Input, Button } from 'antd';
import ChatBubble from './assets/chat_bubble';
import { io } from "socket.io-client";

function SocketIO() {
  const [channel, setChannel] = useState('Justin');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // ref for scrolling
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("https://backsocket.onrender.com");

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    const handleMessage = (sender) => ({ type, data }) => {
      if (channel === sender) {
        setMessages(prev => [...prev, { message: `${sender}: ${data}` }]);
      }
    };

    // Register listeners once
    socket.on("Justin", handleMessage("Justin"));
    socket.on("Tahlia", handleMessage("Tahlia"));
    socket.on("Lungelo", handleMessage("Lungelo"));
    socket.on("Don", handleMessage("Don"));

    return () => {
      socket.off("Justin");
      socket.off("Tahlia");
      socket.off("Lungelo");
      socket.off("Don");
      socket.disconnect();
    };
  }, [channel]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = value => setChannel(value);

  const renderMessages = () => {
    return messages.map((msg, index) => (
      <ChatBubble key={index} message={msg.message} />
    ));
  };

  const onSubmit = () => {
    if (!message.trim()) return;
    socketRef.current.emit(channel, { type: "message", data: message });
    setMessage("");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', color: 'white', width: '100vw', height: '100vh', padding: '20px' }}>
      <h1 style={{ color: 'black', textAlign: 'center' }}>Socket.IO</h1>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
        <Select
          value={channel}
          placeholder="Select Socket Channel"
          style={{ width: 300 }}
          onChange={handleChange}
          options={[
            { value: 'Justin', label: 'Justin' },
            { value: 'Tahlia', label: 'Tahlia' },
            { value: 'Lungelo', label: 'Lungelo' },
            { value: 'Don', label: 'Don' },
          ]}
        />

        <div style={{ height: '20px' }}></div>

        <div style={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "300px",
          width: "300px",
          borderRadius: "20px",
          border: "2px solid black",
          display: 'flex',
          flexDirection: 'column'
        }}>
          {renderMessages()}
          <div ref={messagesEndRef} /> {/* Scroll target */}
        </div>

        <div style={{ height: '5px' }}></div>

        <Input.TextArea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter your message"
          style={{ width: "300px" }}
        />

        <div style={{ height: '5px' }}></div>

        <Button style={{ width: "300px" }} onClick={onSubmit} type="primary">Send</Button>
      </div>
    </div>
  );
}

export default SocketIO;
