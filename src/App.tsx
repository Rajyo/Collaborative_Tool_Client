import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { io } from 'socket.io-client';
import Scribble from './components/Scribble';

export const socket = io(import.meta.env.VITE_SERVER_URL);

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/scribble" element={<Scribble socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;