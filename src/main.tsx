import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './pages/About/About.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import Details from './pages/Details/Details.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: 'details',
        element: <Details />,
      },
    ],
  },
  {
    path: 'about',
    element: <About />,
    errorElement: <NotFound />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
