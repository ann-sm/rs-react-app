import { ThemeProvider } from '../contexts/theme/ThemeProvider';
import { StoreProvider } from '../store/storeProvider';
import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>rs-react-app</title>
      </head>
      <body>
        <StoreProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
