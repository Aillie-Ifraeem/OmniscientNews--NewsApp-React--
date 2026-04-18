import './App.css';
import React from 'react';

import Navbar from './components/Navbar';
import News from './components/News';

import {
  Routes,
  Route
} from "react-router-dom";

const App = () => {

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<News key="general" pageSize={20} country="us" category="general" />} />

        <Route path="/business" element={<News key="business" pageSize={20} country="us" category="business" />} />

        <Route path="/entertainment" element={<News key="entertainment" pageSize={20} country="us" category="entertainment" />} />

        <Route path="/general" element={<News key="general" pageSize={20} country="us" category="general" />} />

        <Route path="/health" element={<News key="health" pageSize={20} country="us" category="health" />} />

        <Route path="/science" element={<News key="science" pageSize={20} country="us" category="science" />} />

        <Route path="/sports" element={<News key="sports" pageSize={20} country="us" category="sports" />} />

        <Route path="/technology" element={<News key="technology" pageSize={20} country="us" category="technology" />} />
      </Routes>

    </div>
  );
};

export default App;