import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>rs-react-app</title>
      </head>
      <body>
        <div id="root" className="flex flex-col h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}