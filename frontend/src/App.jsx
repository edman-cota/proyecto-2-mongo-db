import './App.css';
import Navigation from './Navigation';
import Restaurants from './Restaurants';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <div className='main'>
      <Navigation />

      <Routes>
        <Route path='restaurants' element={<Restaurants />} />
      </Routes>
    </div>
  );
}

export default App;
