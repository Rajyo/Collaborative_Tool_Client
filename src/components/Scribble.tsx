import { useEffect, useState, useRef } from 'react';
import Canvas from "./Canvas"
import ScribbleBar from "./ScribbleBar"
import ScribbleBody from "./ScribbleBody"
import ScribbleFooter from './ScribbleFooter';
import { useNavigate } from 'react-router-dom';


const Sribble = ({ socket }: SocketType) => {
    const [messages, setMessages] = useState<[] | MessageData[]>([]);
    const [typingStatus, setTypingStatus] = useState<string>('');
    const lastMessageRef = useRef<null | HTMLDivElement>(null);
    const navigate = useNavigate();


    window.onload = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('roomName');
        navigate('/');
        window.location.reload();
    }

    useEffect(() => {
        socket.on('messageResponse', (data: MessageData) => setMessages([...messages, data]));
    }, [socket, messages]);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        socket.on('typingResponse', (data: UserTyping) => {
            data.room == localStorage.getItem("roomName") && setTypingStatus(data.userTyping)
        });
    }, [socket]);



    return (
        <main className='grid grid-cols-12 max-w-[95%] m-auto my-10 overflow-clip '>

            <section className="col-span-2 border bg-gray-200">
                <ScribbleBar socket={socket} />
            </section>

            <section className="col-span-7 border max-h-[91vh] bg-white">
                <Canvas socket={socket} />
            </section>

            <div className='flex flex-col col-span-3 bg-gray-200'>
                <section className="border">
                    <ScribbleBody
                        messages={messages}
                        lastMessageRef={lastMessageRef}
                    />
                </section>
                <ScribbleFooter typingStatus={typingStatus} socket={socket}/>
            </div>

        </main>
    )
}

export default Sribble