import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AutomataProvider } from './context/AutomataContext';
import Header from './components/Header';
import Home from './pages/Home';
import Members from './pages/Members';
import Contact from './pages/Contact';
import { Github } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';

function App() {
  return (
    <Router>
      <AutomataProvider>
        <CustomCursor />
        <LoadingScreen />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/members" element={<Members />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <footer className="bg-gradient-to-r from-indigo-700 to-purple-700 py-6">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <p className="text-white">© 2024 Automata Theory Explorer</p>
              <a
                href="https://github.com/yourusername/automata-theory-explorer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-indigo-200 transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                <span>View on GitHub</span>
              </a>
            </div>
          </footer>
        </div>
      </AutomataProvider>
    </Router>
  );
}

export default App;