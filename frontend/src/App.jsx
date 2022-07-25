import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import Chatpage from './Pages/Chatpage';

function App() {
  return(
  <div className="App">
    {/* hello */}
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/chats' element={<Chatpage />} />
    </Routes>

    {/* <Route path='/chats' /> */}
  
  </div>
  
  );

}

export default App;
