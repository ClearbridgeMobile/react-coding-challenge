import './App.css';

import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import ArtworkDescription from './components/ArtworkDetails';
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/artwork/:id",
    element: <ArtworkDescription />,
  },
]);

function App() {
  return (
    <div className="App font-serif">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
