import { useNavigate } from 'react-router-dom';


const ScribbleBody = ({ messages, lastMessageRef }: ScribbleBody) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('roomName');
    navigate('/');
    window.location.reload();
  };

  const roomName = localStorage.getItem('roomName')

  return (
    <>
      <header className="px-2 flex justify-between py-4 h-20 ">
        <p className='text-2xl py-1 font-bold'>{roomName}</p>
        <button className="p-2 bg-red-700 text-white rounded-md" onClick={handleLeaveChat}>
          LEAVE ROOM
        </button>
      </header>

      <p className='border-b'></p>


      <div className="overflow-y-scroll h-[70vh] px-2 py-3 bg-gray-50">
        {messages.map((message: MessageData) => {
          if (message.name === localStorage.getItem('userName')) {
            return (
              <div className="m-2" key={message.id}>
                <p className="bg-cyan-200 p-1 rounded-md bottom-0"><span className='font-bold'>You:</span> <span className='break-words'>{message.text}</span></p>
              </div>
            )
          } else {
            return (
              <div className="m-2" key={message.id}>
                <p className="bg-violet-300 p-1 rounded-md"><span className='font-bold'>{message.name}:</span> <span className='break-words'>{message.text}</span></p>
              </div>
            )
          }
        }
        )}
        <div ref={lastMessageRef}></div>
      </div>


    </>
  );
};

export default ScribbleBody;