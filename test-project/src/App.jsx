import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import './App.css';
import About from './components/About.jsx';
import TextInput from './components/TextInput.jsx';
import Log from './components/Log.jsx';
import NavBar from './components/Test.jsx';
import NewVoice from './components/NewVoice.jsx';


function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/voice-input" element={<NewVoice />} />
        <Route path="/text-input" element={<TextInput heading="Text Commands"/>} />
        <Route path="/log" element={<Log />} />
      </Routes>
    </Router>
  );
}

export default App;