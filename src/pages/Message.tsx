export interface MessageData {
  id: string;
  chatroom: string;
  text: string;
}

interface MessageProps {
  message: MessageData;
}

function Message({ message }: MessageProps) {
  return (
    <div>
      <h5>{"userName"}</h5>
      <p>{message.text}</p>
      {/**<small>{new Date(message.timestamp).toLocaleString()}</small>*/}
    </div>
  );
}

export default Message;
