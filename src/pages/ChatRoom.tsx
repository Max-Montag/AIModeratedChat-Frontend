import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Message, { MessageData } from "./Message";
import { PaperAirplaneIcon } from "@heroicons/react/outline";

interface ChatRoomProps {
  chatRoomId: string;
}

function ChatRoom(props: ChatRoomProps) {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [messageText, setMessageText] = useState("");

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now(), // TODO replace with real id
          chatroom: props.chatRoomId,
          text: messageText,
          timestamp: new Date().toISOString(),
          author: "me", // TODO get from auth
        },
      ]);

      setMessageText("");
    } catch (error) {
      console.error("Failed to send message: ", error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="overflow-y-auto mt-5 mb-2">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center bg-gray-700 px-2 py-2 rounded-md mb-4">
        <input
          className="flex-grow bg-gray-700 rounded px-3 py-2 mr-4 text-gray-100"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <div
          onClick={handleSendMessage}
          className="cursor-pointer transform rotate-45 mx-2"
        >
          <PaperAirplaneIcon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
