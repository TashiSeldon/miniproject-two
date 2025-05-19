'use client';

import { usePathname } from 'next/navigation';
import Header from './component/header/page';
import Footer from './component/footer/page';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Only hide nav/footer on login and register pages
  const noNavAndFooter = ['/login', '/register'];
  const hideNavFooter = noNavAndFooter.includes(pathname);

  return (
    <>
      {!hideNavFooter && <Header />}
      <main style={{ flex: 1 }}>{children}</main>
      {!hideNavFooter && <Footer />}
    </>
  );
}