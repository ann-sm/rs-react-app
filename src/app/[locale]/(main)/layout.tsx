import { Suspense } from 'react';
import Header from '../../../components/Header/Header';
import Loader from './loading';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="root" className="flex flex-col h-screen">
      <Header />
        <Suspense fallback={<Loader />}>
          {children}
        </Suspense>
    </div>
  );
};

export default MainLayout;
