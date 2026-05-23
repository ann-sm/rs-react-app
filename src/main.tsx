import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './pages/About/About.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import Details from './pages/Details/Details.tsx';
import Layout from './components/Layout/Layout.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

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
            path: '/',
            Component: Details,
          },
        ],
      },
      {
        path: 'about',
        Component: About,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
