import { useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = ({ socket }: SocketType) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    localStorage.setItem('roomName', roomName);
    //sends the username and socket ID to the Node.js server
    // console.log({ userName, roomName, socketID: socket.id })
    socket.emit('newUser', { userName, roomName, socketID: socket.id });
    navigate(`/scribble/${roomName}`);
  };

  return (
    <>
      <div className='md:hidden w-full h-screen flex flex-col gap-10 justify-center items-center sm:px-10 px-4 '>
        <h1 className='w-full text-2xl text-[#ff0000] min-[300px]:text-4xl sm:text-5xl text-center font-bold break-words '>This application is available on Desktops/Laptops Only
        </h1>
        <h1 className='w-full text-2xl text-center font-bold break-words '>Please switch to Desktop/Laptop
        </h1>
      </div>

      <form className="hidden md:w-full h-screen md:flex flex-col justify-center items-center" onSubmit={handleSubmit}>
        <h2 className="text-3xl mb-10 font-bold">Sign in to Open Scribble</h2>
        <label className='text-xl my-2 font-semibold' htmlFor="username">Username</label>
        <input
          type="text"
          minLength={2}
          maxLength={6}
          name="username"
          id="username"
          className="border-[1px] border-gray-700 p-[6px] w-72 mb-6 rounded-md focus:outline-none focus:border-grey-500 focus:ring-1 focus:ring-grey-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
          value={userName}
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className='text-xl my-2 font-semibold' htmlFor="username">Room Name</label>
        <input
          type="text"
          minLength={2}
          maxLength={6}
          name="roomname"
          id="username"
          className="border-[1px] border-gray-700 p-[6px] w-72 mb-6 rounded-md focus:outline-none focus:border-grey-500 focus:ring-1 focus:ring-grey-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
          value={roomName}
          required
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button className="border text-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-white rounded-md mt-4 py-1 w-72">SIGN IN</button>
      </form>
    </>
  );
};

export default Home;