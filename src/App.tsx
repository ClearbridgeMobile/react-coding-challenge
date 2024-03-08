import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import NotFound from "./pages/NotFound/NotFound";

import "./App.css";
import { useState } from "react";

function App() {
  const [curPg, setCurPg] = useState<number>();
  return (
    <Routes>
      <Route path="/:pg" element={<Home curPg={curPg} setCurPg={setCurPg} />} />
      <Route path="/details/:id" element={<Details curPg={curPg} />} />
      <Route path="/" element={<Home curPg={curPg} setCurPg={setCurPg} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
