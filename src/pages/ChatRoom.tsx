import React, { useState, useEffect } from "react";
import axios from "axios";
import Message, { MessageData } from "./Message";

interface ChatRoomProps {
  chatRoomId: string;
}

function ChatRoom(props: ChatRoomProps) {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}api/chatrooms/${props.chatRoomId}/messages`
      )
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Failed to receive messages for chatroom", error);
      });
  }, [props.chatRoomId]);

  const handleSendMessage = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/chatrooms/${props.chatRoomId}/messages/`,
        {
          chatroom: props.chatRoomId,
          text: messageText,
          timestamp: new Date().toISOString(),
        }
      );
      setMessageText("");
    } catch (error) {
      console.error("Failed to send message: ", error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="overflow-y-auto">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <div className="flex items-center bg-gray-800 rounded-md py-3 px-4 mb-4">
        <input
          className="flex-grow rounded px-3 py-2 mr-4 text-gray-600"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button
          className="py-2 px-4 rounded-lg bg-blue-700 text-white"
          onClick={handleSendMessage}
        >
          send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
