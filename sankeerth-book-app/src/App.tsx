
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtworkListComponent from './ArtworkListComponent';
import ArtworkDetailComponent from './ArtworkDetailComponent';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"   element={<ArtworkListComponent/>} />
        <Route path="/artwork/:id" element={<ArtworkDetailComponent/>} />
      </Routes>
    </Router>
  );
};

export default App;
