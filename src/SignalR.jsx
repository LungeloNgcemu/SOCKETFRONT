import { useState, useEffect, useRef } from "react";
import "./App.css";
import { Select, Input, Button } from "antd";
import ChatBubble from "./assets/chat_bubble";
import * as signalR from "@microsoft/signalr";

function SignalR() {
  const [channel, setChannel] = useState("Justin");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const connectionRef = useRef(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://refactored-yodel-g4q7pvxgprgxh9gvp-5000.app.github.dev/chathub") 
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => {
        console.log("Connected to SignalR Hub");

        // Join current channel
        connection.invoke("JoinChannel", channel);

        // Listen for messages
        connection.on("ReceiveMessage", (user, msg) => {
          setMessages((prev) => [...prev, { message: `${user}: ${msg}` }]);
        });
      })
      .catch((err) => console.error("Connection failed:", err));

    connectionRef.current = connection;

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, [channel]);

  // re-join if channel changes
  useEffect(() => {
    if (connectionRef.current) {
      connectionRef.current.invoke("JoinChannel", channel);
    }
  }, [channel]);

  // scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (value) => setChannel(value);

  const renderMessages = () =>
    messages.map((msg, index) => (
      <ChatBubble key={index} message={msg.message} />
    ));

  const onSubmit = async () => {
    if (!message.trim()) return;
    if (connectionRef.current) {
      await connectionRef.current.invoke(
        "SendMessageToChannel",
        channel,
        `${channel}`, // sender name, can replace with actual user
        message
      );
    }
    setMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: "white",
        width: "100vw",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "black", textAlign: "center" }}>SignalR Chat</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Select
          value={channel}
          placeholder="Select Socket Channel"
          style={{ width: 300 }}
          onChange={handleChange}
          options={[
            { value: "Justin", label: "Justin" },
            { value: "Tahlia", label: "Tahlia" },
            { value: "Lungelo", label: "Lungelo" },
            { value: "Don", label: "Don" },
          ]}
        />

        <div style={{ height: "20px" }}></div>

        <div
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            height: "300px",
            width: "300px",
            borderRadius: "20px",
            border: "2px solid black",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {renderMessages()}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ height: "5px" }}></div>

        <Input.TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          style={{ width: "300px" }}
        />

        <div style={{ height: "5px" }}></div>

        <Button
          style={{ width: "300px" }}
          onClick={onSubmit}
          type="primary"
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default SignalR;
