import React from 'react';
import { useAutomata } from '../context/AutomataContext';
import { CFG_1, CFG_2 } from '../automata';

const CFGVisualizer: React.FC = () => {
  const { selectedSample } = useAutomata();
  const cfg = selectedSample === 'sample1' ? CFG_1 : CFG_2;

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl mt-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        CFG Visualization
        <span className="ml-2 text-lg font-normal text-gray-600">
          ({selectedSample === 'sample1' ? 'a/b pattern' : '0/1 pattern'})
        </span>
      </h2>
      <div className="w-full border border-gray-200 rounded-lg p-6 bg-gray-50">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Production Rules</h3>
        <div className="space-y-2 font-mono">
          {cfg.productions.map((production, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg ${
                index % 2 === 0 ? 'bg-white' : 'bg-indigo-50'
              } hover:bg-indigo-100 transition-colors duration-200`}
            >
              {production}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Start Symbol</h3>
          <div className="p-4 bg-indigo-100 rounded-lg inline-block font-mono text-lg">
            {cfg.start_symbol}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CFGVisualizer;