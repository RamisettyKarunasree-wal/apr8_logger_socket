import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import SocketDemo from './SocketDemo';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <BrowserRouter>
      <div className="nav fluid-container bg-dark">
        <div className="row w-100 p-2 m-2">
          <div className="col">
            <NavLink activeClassName="active" className="links" to="/">
              Home
            </NavLink>
          </div>
          <div className="col">
            <NavLink activeClassName="active" className="links" to="/socket">
              Socket Connection
            </NavLink>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" />
        <Route path="/socket" element={<SocketDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
