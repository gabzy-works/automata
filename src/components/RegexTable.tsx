import React from 'react';
import { useAutomata } from '../context/AutomataContext';
import { regexSamples } from '../types/automata';
import { Code2, BookOpen, Cpu, Regex, FileCode, BrainCircuit } from 'lucide-react';

const RegexTable: React.FC = () => {
  const { 
    selectedSample, 
    setSelectedSample, 
    selectedType, 
    setSelectedType 
  } = useAutomata();

  const handleViewClick = (sample: 'sample1' | 'sample2', type: 'DFA' | 'CFG' | 'PDA') => {
    setSelectedSample(sample);
    setSelectedType(type);
  };

  const Button: React.FC<{
    sample: 'sample1' | 'sample2';
    type: 'DFA' | 'CFG' | 'PDA';
    children: React.ReactNode;
  }> = ({ sample, type, children }) => {
    const isSelected = selectedSample === sample && selectedType === type;
    
    return (
      <button
        onClick={() => handleViewClick(sample, type)}
        className={`px-6 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
          isSelected
            ? 'bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700'
            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
        }`}
      >
        {type === 'DFA' && <Code2 className="h-4 w-4" />}
        {type === 'CFG' && <BookOpen className="h-4 w-4" />}
        {type === 'PDA' && <Cpu className="h-4 w-4" />}
        {children}
      </button>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white shadow-xl">
          <div className="flex items-center mb-4">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <h3 className="ml-3 text-lg font-semibold">Automata Theory</h3>
          </div>
          <p className="text-white/90 text-sm leading-relaxed">
            Study of abstract machines and their computation capabilities.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-xl text-white shadow-xl">
          <div className="flex items-center mb-4">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <Regex className="h-6 w-6" />
            </div>
            <h3 className="ml-3 text-lg font-semibold">Regular Expressions</h3>
          </div>
          <p className="text-white/90 text-sm leading-relaxed">
            Formal language patterns that define search patterns and string matching rules.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-xl text-white shadow-xl">
          <div className="flex items-center mb-4">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <FileCode className="h-6 w-6" />
            </div>
            <h3 className="ml-3 text-lg font-semibold">Turing Machine</h3>
          </div>
          <p className="text-white/90 text-sm leading-relaxed">
            Mathematical model of computation that defines an abstract machine.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-50">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-4">Regular Expression</th>
              <th className="px-6 py-4 text-center">DFA</th>
              <th className="px-6 py-4 text-center">CFG</th>
              <th className="px-6 py-4 text-center">PDA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="bg-white hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-mono text-sm whitespace-pre-line break-words min-w-[800px] align-middle">
                {regexSamples.sample1.replace(/\s+/g, '')}
              </td>
              <td className="px-2 py-3 text-center align-middle">
                <div className="flex justify-center items-center h-full gap-1"><Button sample="sample1" type="DFA">View</Button></div>
              </td>
              <td className="px-2 py-3 text-center align-middle">
                <div className="flex justify-center items-center h-full gap-1"><Button sample="sample1" type="CFG">View</Button></div>
              </td>
              <td className="px-2 py-3 text-center align-middle">
                <div className="flex justify-center items-center h-full gap-1"><Button sample="sample1" type="PDA">View</Button></div>
              </td>
            </tr>
            <tr className="bg-white hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-mono text-sm whitespace-pre-line break-words min-w-[800px] align-middle">
                {regexSamples.sample2.replace(/\s+/g, '')}
              </td>
              <td className="px-2 py-3 text-center align-middle">
                <div className="flex justify-center items-center h-full gap-1"><Button sample="sample2" type="DFA">View</Button></div>
              </td>
              <td className="px-2 py-3 text-center align-middle">
                <div className="flex justify-center items-center h-full gap-1"><Button sample="sample2" type="CFG">View</Button></div>
              </td>
              <td className="px-2 py-3 text-center align-middle">
                <div className="flex justify-center items-center h-full gap-1"><Button sample="sample2" type="PDA">View</Button></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegexTable;