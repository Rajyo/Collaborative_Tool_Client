import { createContext, useMemo, useContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<null | Socket>(null);

export const useSocket = () => {
  const socket = useContext<null | Socket>(SocketContext);
  return socket;
};

export const SocketProvider = ({children}: {children: ReactNode}) => {
  const socket = useMemo(() => io(import.meta.env.VITE_SERVER_URL), []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};