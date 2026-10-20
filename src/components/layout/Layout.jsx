import Navbar from './Navbar';
import Footer from './Footer';
import ToastViewport from '../ui/Toast';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-16 pt-8">{children}</main>
      <Footer />
      <ToastViewport />
    </div>
  );
}
