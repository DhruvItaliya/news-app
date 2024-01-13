import React, { useState } from 'react'
import Navbar from './components/Navbar';
import './App.css';
import News from './components/News';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


export default function App() {
  const [progress, setProgress] = useState(0);
  const apiKey = process.env.REACT_APP_API_KEY3;
  return (
    <BrowserRouter>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Navbar />
      <Routes>
        <Route exact path='/' element={<News key="general" apiKey={apiKey} setProgress={setProgress} country="in" pageSize={6} category="general" />} />
        <Route exact path='/business' element={<News key="business" apiKey={apiKey} setProgress={setProgress} country="in" pageSize={6} category="business" />} />
        <Route exact path='/sports' element={<News key="sports" apiKey={apiKey} setProgress={setProgress} country="in" pageSize={6} category="sports" />} />
        <Route exact path='/health' element={<News key="health" apiKey={apiKey} setProgress={setProgress} country="in" pageSize={6} category="health" />} />
        <Route exact path='/science' element={<News key="science" apiKey={apiKey} setProgress={setProgress} country="in" pageSize={6} category="science" />} />
        <Route exact path='/entertainment' element={<News key="entertainment" apiKey={apiKey} setProgress={setProgress} country="in" pageSize={6} category="entertainment" />} />
        <Route exact path='/technology' element={<News key="technology" apiKey={apiKey} setProgress={setProgress} country="in" pageSize={6} category="technology" />} />
      </Routes>
    </BrowserRouter>
  )
}