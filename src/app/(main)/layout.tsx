import Header from '../../components/Header/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="root" className="flex flex-col h-screen">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
