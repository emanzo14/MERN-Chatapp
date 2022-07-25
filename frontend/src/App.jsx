import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';

function App() {
  return(
  <div className="App">
    {/* hello */}
    <Routes>
      <Route path='/' element={<Homepage />} />
    </Routes>

    {/* <Route path='/chats' /> */}
  
  </div>
  
  );

}

export default App;
