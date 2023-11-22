import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import Home from '@/pages/Home';
import Results from '@/pages/Results';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/results',
        element: <Results />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
