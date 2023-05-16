import React from "react";

export interface MessageData {
  id: number;
  text: string;
  chatroom: string;
  author: string;
  timestamp: string;
}

interface MessageProps {
  message: MessageData;
  ownMessage: boolean;
}

function Message(props: MessageProps) {
  const messageAlignment = props.ownMessage ? "self-end" : "self-start";
  const messageColor = props.ownMessage ? "bg-green-200" : "bg-blue-300";

  return (
    <div
      className={`flex flex-col ${messageAlignment} max-w-[80%] break-words mx-3 my-2 p-2 rounded-lg ${messageColor}`}
    >
      <div className="w-full flex justify-between">
        <div className="font-semibold text-sm text-gray-700">
          {props.message.author}
        </div>
        <div className="text-sm text-gray-500">
          {new Date(props.message.timestamp).toLocaleString()}
        </div>
      </div>
      <div className="mt-2 text-[16px] text-gray-800">{props.message.text}</div>
    </div>
  );
}

export default Message;
