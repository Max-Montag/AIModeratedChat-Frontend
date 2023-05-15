export interface MessageData {
  id: number;
  text: string;
  chatroom: string;
  author: string;
  timestamp: string;
}

interface MessageProps {
  message: MessageData;
}

function Message({ message }: MessageProps) {
  return (
    <div className="flex flex-col items-start max-w-sm mx-3 my-2 p-2 rounded-lg bg-green-100">
      <div className="w-full flex justify-between">
        <div className="font-semibold text-sm text-gray-700">
          {message.author}
        </div>
        <div className="text-sm text-gray-500">
          {new Date(message.timestamp).toLocaleString()}
        </div>
      </div>
      <div className="mt-2 text-[16px] text-gray-800">{message.text}</div>
    </div>
  );
}

export default Message;
