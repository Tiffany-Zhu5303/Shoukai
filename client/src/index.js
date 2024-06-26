import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Navbar from './components/Navbar';
import Anime from './pages/Anime';
import Character from './pages/Character';
import reportWebVitals from './reportWebVitals';
import Favorites from './pages/Favorites';
import AnimeInfo from './pages/AnimeInfo';
import History from './pages/History';
import CharacterInfo from './pages/CharacterInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/Shoukai'>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index={true} element={<App />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/anime" element={<Anime />}></Route>
          <Route path="/character" element={<Character />}></Route>
          <Route path="/anime/:id/:from" element={<AnimeInfo />}></Route>
          <Route path="/character/:id" element={<CharacterInfo />}></Route>
          <Route path="/history" element={<History />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
