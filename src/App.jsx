import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./App.css";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Paste from './Components/Paste';
import ViewPaste from './Components/ViewPaste';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
