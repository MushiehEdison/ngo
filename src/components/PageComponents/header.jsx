import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGovernanceOpen, setIsGovernanceOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'News & Publications', path: '/news' },
    { name: 'Take Action', path: '/action' },
    { name: 'Shop', path: '/shop' },
  ];



  return (
    <header className="bg-white border-b-2 border-gray-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <div className="flex items-center space-x-3">
                {/* Logo Image */}
                <div className="relative">
                  <img 
                    src="/logo.jpg" 
                    alt="  Logo" 
                    className="h-12 w-auto border-2 border-red-600 rounded-lg p-1" 
                  />
                </div>
                
                {/* Organization Name */}
                <div className="hidden md:block">
                  <h1 className="text-xl font-bold text-gray-800 leading-tight">
                    I'm  Human
                  </h1>
                  <p className="text-sm font-semibold text-red-600 -mt-1">
                    Org
                  </p>
                </div>
              </div>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <a
                key={item.name} 
                href={item.path} 
                className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium border border-transparent hover:border-red-600 rounded-lg transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
            <a href="/donate" className="ml-4 border-2 border-red-600 text-red-600 px-6 py-2 rounded-lg hover:bg-red-600 hover:text-white font-semibold transition-all duration-300">
              DONATE
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600 p-2 border border-gray-300 rounded-lg hover:border-red-600 transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t-2 border-gray-200 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.name} 
                  href={item.path} 
                  className="block px-3 py-2 text-gray-700 hover:text-red-600 border border-transparent hover:border-red-600 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
          
              <a
                href="/donate" 
                className="block w-full mt-4 border-2 border-red-600 text-red-600 px-6 py-2 rounded-lg hover:bg-red-600 hover:text-white font-semibold transition-all duration-300 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                DONATE
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
