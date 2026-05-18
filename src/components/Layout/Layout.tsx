import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

function Layout() {
  return (
    <ErrorBoundary>
      <Header />
      <Outlet />
    </ErrorBoundary>
  );
}

export default Layout;
