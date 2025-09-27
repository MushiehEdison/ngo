import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/PageComponents/header';
import HomePage from './components/home';
import AboutUsPage from './components/about';
import TakeActionPage from './components/action';
import ShopPage from './components/shop';
import NewsPublicationsPage from './components/news';
import DonatePage from './components/donate';
import GalleryPage from './components/PageComponents/gallery';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/news" element={< NewsPublicationsPage />} />
        <Route path="/action" element={<TakeActionPage />} />
        <Route path="/shop" element={<ShopPage /> } />
        <Route path="/donate" element={<DonatePage /> } />
        <Route path="/gallery" element={<GalleryPage /> } />
        {/* 404 fallback route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;