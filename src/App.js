import React from 'react';
import {
  Routes, Route,
} from "react-router-dom";

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from "./pages/NotFound";

import './scss/app.scss';

const SearchContext = React.createContext('');

function App() {

  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/cart.html" element={<Cart />}/>
            <Route path="/*" element={<NotFound />}/>
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
export {SearchContext};
