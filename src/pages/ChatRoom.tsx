import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Message, { MessageData } from "./Message";

interface ChatRoomProps {
  chatRoomId: string;
}

function ChatRoom({ chatRoomId }: ChatRoomProps) {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}api/chatrooms/${chatRoomId}/messages`
      )
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

  const handleSendMessage = () => {
    axios
      .post(`/api/chatrooms/${chatRoomId}/messages`, { text: newMessage })
      .then((response: AxiosResponse<MessageData>) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Es gab einen Fehler beim Senden der Nachricht", error);
      });
  };

  const createChatRoom = () => {
    axios.post(`/api/chatrooms/create`, { chatRoomId: 3 }).catch((error) => {
      console.error("Es gab einen Fehler beim Erstellen des Raums", error);
    });
  };

  return (
    <>
      <div>
        <button onClick={createChatRoom}>Neuen ChatRoom erstellen</button>
      </div>
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
    </>
  );
}

export default ChatRoom;
