import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';

// Placeholder components for other pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="py-32 container mx-auto px-4 text-center">
    <h1 className="text-4xl font-bold mb-4">{title}</h1>
    <p className="text-slate-600">This page is currently under construction.</p>
  </div>
);

// ScrollToTop component to reset scroll on route change
const ScrollToTopHandler = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopHandler />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Placeholder title="About Us" />} />
          <Route path="/pillars" element={<Placeholder title="Our Pillars" />} />
          <Route path="/news" element={<Placeholder title="News & Events" />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
