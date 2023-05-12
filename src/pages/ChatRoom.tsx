import React, { useState, useEffect } from "react";
import axios from "axios";
import Message from "./Message";

interface ChatRoomProps {
  chatRoomId: string;
}

function ChatRoom({ chatRoomId }: ChatRoomProps) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    axios
      .get(`/api/chatrooms/${chatRoomId}/messages`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error(
          "Es gab einen Fehler beim Abrufen der Nachrichten",
          error
        );
      });
  }, [chatRoomId]);

  /** 
  const handleSendMessage = () => {
    axios
      .post(`/api/chatrooms/${chatRoomId}/messages`, { text: newMessage })
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Es gab einen Fehler beim Senden der Nachricht", error);
      });
  }; 

  */

  /** 
    <div>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Senden</button>
    </div>

    */

  return (
    <div>
      <h1>Chat Room</h1>
    </div>
  );
}

export default ChatRoom;
