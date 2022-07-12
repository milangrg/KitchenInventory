import React from 'react';
import './App.css';
import Nav from './Nav';
import Home from './Home';
import ZoneManagement from './ZoneManagement';
import FoodRegister from './FoodRegister';
import FoodSearch from './FoodSearch';
import QuantityManagement from './QuantityManagement';
import ShoppingList from './ShoppingList';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/zonemanagement" element={<ZoneManagement />} />
          <Route path="/foodregister" element={<FoodRegister />} />
          <Route path="/foodsearch" element={<FoodSearch />} />
          <Route path="/quantitymanagement/:food" element={<QuantityManagement />} />
          {/* <Route path="/foodsearch" element={<FoodSearch />}>
            <Route path="quantitymanagement" element={<QuantityManagement />} />
          </Route> */}
          <Route path="/shoppinglist" element={<ShoppingList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
