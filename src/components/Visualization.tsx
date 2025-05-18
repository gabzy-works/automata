import React, { useEffect, useRef } from 'react';
import { graphviz } from 'd3-graphviz';
import { useAutomata } from '../context/AutomataContext';
import { generateDotGraph } from '../automata';
import CFGVisualizer from './CFGVisualizer';

const Visualization: React.FC = () => {
  const { selectedType, selectedSample, simulationState, getCurrentAutomaton } = useAutomata();
  const graphRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (selectedType === 'CFG') return;
    
    const automaton = getCurrentAutomaton();
    if (!automaton || !graphRef.current) return;
    
    const currentState = simulationState.isRunning && simulationState.steps.length > 0
      ? simulationState.steps[simulationState.currentStep]
      : undefined;
    
    const dotGraph = generateDotGraph(automaton, currentState, '#fbbf24');
    
    try {
      if (graphRef.current) {
        graphviz(graphRef.current)
          .width(graphRef.current.clientWidth)
          .height(selectedType === 'PDA' ? 1200 : 600)
          .fit(true)
          .zoom(false)
          .renderDot(dotGraph);
      }
    } catch (error) {
      console.error('Error rendering graph:', error);
    }
  }, [selectedType, selectedSample, simulationState.currentStep, simulationState.isRunning]);

  if (selectedType === 'CFG') {
    return <CFGVisualizer />;
  }

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl mt-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        {selectedType} Visualization 
        <span className="ml-2 text-lg font-normal text-gray-600">
          ({selectedSample === 'sample1' ? 'a/b pattern' : '0/1 pattern'})
        </span>
      </h2>
      <div 
        ref={graphRef} 
        className={`w-full ${selectedType === 'PDA' ? 'h-[1200px]' : 'h-[600px]'} bg-gray-50 rounded-lg transition-all duration-300`}
      />
    </div>
  );
};

export default Visualization