// src/app/layout.js 
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import HeaderFooterLayout from './HeaderFooterLayout';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Your Site Title</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
        <title>Your Site Title</title>
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AuthProvider>
          <HeaderFooterLayout>{children}</HeaderFooterLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
