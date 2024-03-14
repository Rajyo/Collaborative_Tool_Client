import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';


const ScribbleBar = ({ socket }: SocketType) => {
  const [users, setUsers] = useState<[] | UserData[]>([]);

  useEffect(() => {
    socket.on('newUserResponse', (data: UserData[]) => setUsers(data));
  }, [socket, users]);

  return (
    <>
      <h2 className='h-20 border-b md:text-2xl lg:text-3xl flex justify-center items-center font-bold'>SCRIBBLE</h2>
      <div className='p-2 h-full bg-gray-50'>
        <h4 className="font-semibold text-center mt-4 underline">ACTIVE USERS</h4>
        <div className="mt-4">
          {users?.map((user: UserData) => (
            <div key={user.socketID} className='my-2'>
              {user.roomName == localStorage.getItem('roomName') && 
                <p className='flex border px-1 py-2 text-white break-words bg-green-400 rounded-md font-bold items-center' key={user.socketID}>
                  <span className='mx-1 text-2xl'><FontAwesomeIcon icon={faCircleUser} /></span>
                  <span className='mx-1'>{user.userName}</span>
                </p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScribbleBar;