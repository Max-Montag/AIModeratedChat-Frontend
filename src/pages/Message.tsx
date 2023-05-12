export interface MessageData {
  id: string;
  author: {
    username: string;
  };
  content: string;
  timestamp: string;
}

interface MessageProps {
  message: MessageData;
}

function Message({ message }: MessageProps) {
  return (
    <div>
      <h5>{message.author.username}</h5>
      <p>{message.content}</p>
      <small>{new Date(message.timestamp).toLocaleString()}</small>
    </div>
  );
}

export default Message;
