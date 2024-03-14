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
        socket.on('messageResponse', (data: MessageData) => {
            setMessages([...messages, data])
            setTypingStatus("")
        });
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
        <>
            <div className='md:hidden w-full h-screen flex flex-col gap-10 justify-center items-center sm:px-10 px-4 '>
                <h1 className='w-full text-2xl text-[#ff0000] min-[300px]:text-4xl sm:text-5xl text-center font-bold break-words '>This application is available on Desktops/Laptops Only
                </h1>
                <h1 className='w-full text-2xl text-center font-bold break-words '>Please switch to Desktop/Laptop
                </h1>
            </div>

            <main className='hidden md:grid grid-cols-12 max-w-[95%] m-auto my-10 overflow-clip rounded-md'>

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
                    <ScribbleFooter typingStatus={typingStatus} socket={socket} />
                </div>

            </main>
        </>
    )
}

export default Sribble