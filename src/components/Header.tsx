import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-indigo-700/90 backdrop-blur-sm shadow-lg' : 'bg-indigo-700'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full shadow-md">
              <Code className="h-6 w-6 text-indigo-700" />
            </div>
            <h1 className="text-xl font-bold text-white">Automata Theory</h1>
          </div>
          <nav className="bg-indigo-800/50 rounded-full px-6 py-2 backdrop-blur-sm">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  to="/" 
                  className={`transition-colors text-white hover:text-indigo-200 ${
                    location.pathname === '/' ? 'font-semibold border-b-2 border-white pb-1' : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/members" 
                  className={`transition-colors text-white hover:text-indigo-200 ${
                    location.pathname === '/members' ? 'font-semibold border-b-2 border-white pb-1' : ''
                  }`}
                >
                  Members
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`transition-colors text-white hover:text-indigo-200 ${
                    location.pathname === '/contact' ? 'font-semibold border-b-2 border-white pb-1' : ''
                  }`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;