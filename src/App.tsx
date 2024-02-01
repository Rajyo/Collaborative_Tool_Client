import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Scribble from './components/Scribble';
import { useSocket } from './context/SocketProvider';


function App() {

  const socket = useSocket()

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