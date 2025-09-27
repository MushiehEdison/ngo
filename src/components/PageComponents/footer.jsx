import React from 'react';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo Column */}
          <div className="md:col-span-1">
            <div className="border-2 border-red-600 px-4 py-2 rounded-lg inline-block mb-6">
              <h4 className="text-xl font-bold text-gray-900">I’m Human Org</h4>
            </div>
            
            {/* Contact Info */}
            <div className="mt-8 text-sm text-gray-600 space-y-2">
              <p>Douala , Cameroon</p>
              <p>Tel: <a href="tel:+13024423506" className="hover:text-red-600 transition-colors duration-300">+237 6 75 54 37 73</a></p>
              <p>Email: <a href="mailto:info@imhumanorg.org" className="hover:text-red-600 transition-colors duration-300">info@imhumanorg.org</a></p>
            </div>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2 inline-block">
              About Us
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="/vision" className="hover:text-red-600 transition-colors duration-300" aria-label="Learn about our vision">Vision</a></li>
              <li><a href="/mission" className="hover:text-red-600 transition-colors duration-300" aria-label="Learn about our mission">Mission</a></li>
              <li><a href="/objectives" className="hover:text-red-600 transition-colors duration-300" aria-label="Learn about our objectives">Objectives</a></li>
            </ul>
          </div>

          {/* Newsroom Column */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2 inline-block">
              Newsroom
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="/news" className="hover:text-red-600 transition-colors duration-300" aria-label="View news bulletin">News Bulletin</a></li>
              <li><a href="/press" className="hover:text-red-600 transition-colors duration-300" aria-label="View press statements">Press Statements</a></li>
              <li><a href="/blogs" className="hover:text-red-600 transition-colors duration-300" aria-label="Read our blogs">Blogs</a></li>
            </ul>
          </div>

          {/* For Media Column */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2 inline-block">
              For Media
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="/contact" className="hover:text-red-600 transition-colors duration-300" aria-label="Contact us">Contact</a></li>
              <li><a href="/get-involved" className="hover:text-red-600 transition-colors duration-300" aria-label="Get involved with us">Get Involved</a></li>
              <li><a href="/governance" className="hover:text-red-600 transition-colors duration-300" aria-label="Learn about our governance structure">Governance Structure</a></li>
            </ul>
          </div>

          {/* More Resources Column */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2 inline-block">
              More Resources
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="/shop" className="hover:text-red-600 transition-colors duration-300" aria-label="Visit our shop">Shop</a></li>
              <li><a href="/donate" className="hover:text-red-600 transition-colors duration-300" aria-label="Make a donation">Donate</a></li>
            </ul>
            <div className="mt-6">
              <a 
                href="/donate" 
                className="border-2 border-red-600 text-red-600 px-6 py-2 rounded-lg hover:bg-red-600 hover:text-white font-semibold transition-all duration-300"
                aria-label="Donate to support our mission"
              >
                DONATE NOW
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-8 pb-8 border-b-2 border-gray-200">
          <a 
            href="https://instagram.com/imhumanorg" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="border-2 border-gray-300 p-3 rounded-lg hover:border-red-600 hover:text-red-600 transition-all duration-300"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a 
            href="https://facebook.com/imhumanorg" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="border-2 border-gray-300 p-3 rounded-lg hover:border-red-600 hover:text-red-600 transition-all duration-300"
            aria-label="Follow us on Facebook"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a 
            href="https://twitter.com/imhumanorg" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="border-2 border-gray-300 p-3 rounded-lg hover:border-red-600 hover:text-red-600 transition-all duration-300"
            aria-label="Follow us on Twitter"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a 
            href="https://youtube.com/@imhumanorg" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="border-2 border-gray-300 p-3 rounded-lg hover:border-red-600 hover:text-red-600 transition-all duration-300"
            aria-label="Subscribe to our YouTube channel"
          >
            <Youtube className="h-6 w-6" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2025 I’m Human Org. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;