import React,{useState,} from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { ArtDetail, ArtList } from './components';




function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/home' Component={ArtList} />
          <Route path='/home/:id' Component={ArtDetail} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
