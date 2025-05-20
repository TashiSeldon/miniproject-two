import Header from './component/header/page';
import Footer from './component/footer/page';

export default function HeaderFooterLayout({ children }) {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </>
  );
} 