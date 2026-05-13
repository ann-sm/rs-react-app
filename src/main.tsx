import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './pages/About/About.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import Details from './pages/Details/Details.tsx';
import Layout from './components/Layout/Layout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        Component: App,
        children: [
          {
            path: 'details/:id',
            Component: Details,
          },
        ],
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: '404',
        Component: NotFound,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
