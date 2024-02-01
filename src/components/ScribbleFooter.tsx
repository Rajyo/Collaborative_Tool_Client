import { useState, SyntheticEvent } from "react";
import { socket } from "../App";

const ScribbleFooter = ({ typingStatus }: ScribbleFooter) => {

  const [message, setMessage] = useState<string>('');

  const handleTyping = () => {
    const data = { userTyping: `${localStorage.getItem('userName')} is typing`, room: localStorage.getItem('roomName') }
    socket.emit('typing', data);
  }

  const handleSendMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    if (message?.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        room: localStorage.getItem('roomName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  return (
    <div className="bg-white">
      {typingStatus ? <p className="pl-2 py-1 text-blue-900 text-base italic animate-pulse">{typingStatus}...</p> : <p className="pl-2 py-1 text-base italic animate-pulse text-white">...</p>}
      <form className="flex justify-between flex-wrap gap-2 p-[7px] border" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Guess word"
          className="border-black rounded-md p-1 border-2 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        {/* <button className=" bg-blue-500 text-white px-3 py-1 w-full rounded-md">SEND</button> */}
      </form>
    </div>
  );
};

export default ScribbleFooter;