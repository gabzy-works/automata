import React from 'react';
import RegexTable from '../components/RegexTable';
import Visualization from '../components/Visualization';
import StringValidation from '../components/StringValidation';
import Simulation from '../components/Simulation';
import { useAutomata } from '../context/AutomataContext';
import { Code2, BookOpen, Cpu } from 'lucide-react';

const Home: React.FC = () => {
  const { selectedType } = useAutomata();

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Automata Theory Explorer
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
            Explore the fascinating world of formal languages and automata theory through our interactive visualization tool.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Code2 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-800">DFA</h3>
            </div>
            <p className="text-gray-600">
              Deterministic Finite Automata for precise pattern matching and state transitions.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-800">CFG</h3>
            </div>
            <p className="text-gray-600">
              Context-Free Grammar for generating and analyzing complex language patterns.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Cpu className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-800">PDA</h3>
            </div>
            <p className="text-gray-600">
              Pushdown Automata for handling nested structures and context-sensitive patterns.
            </p>
          </div>
        </div>
        
        <div className="space-y-8">
          <RegexTable />
          <Visualization />
          <Simulation />
          {selectedType === 'DFA' && <StringValidation />}
        </div>
      </section>
    </div>
  );
};

export default Home;