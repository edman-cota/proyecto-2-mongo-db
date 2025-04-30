import './App.css';
import MenuItems from './MenuItems';
import Navigation from './Navigation';
import Restaurant from './Restaurant';
import Restaurants from './Restaurants';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <div className='main'>
      <Navigation />

      <Routes>
        <Route path='restaurants' element={<Restaurants />} />¨
        <Route path='restaurant/:id' element={<Restaurant />} />
        <Route path='menu-items' element={<MenuItems />} />
      </Routes>
    </div>
  );
}

export default App;
