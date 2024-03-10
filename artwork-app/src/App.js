import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ArtWorkList from "./view/art-work-list/ArtWorkList";
import ArtWorkDetails from "./view/art-details/ArtWorkDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<ArtWorkList />} />
          <Route exact path="/art-details/:id" element={<ArtWorkDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
