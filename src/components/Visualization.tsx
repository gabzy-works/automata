import React, { useEffect, useRef } from 'react';
import { graphviz } from 'd3-graphviz';
import { useAutomata } from '../context/AutomataContext';
import { generateDotGraph } from '../automata';
import CFGVisualizer from './CFGVisualizer';
import { SimulationState, SampleType } from '../types/automata';

interface DFAVisualizationProps {
  automaton: any; // Using any since the automaton type could be complex
  simulationState: SimulationState;
}

interface PDAVisualizationProps {
  selectedSample: SampleType;
}

const DFAVisualization: React.FC<DFAVisualizationProps> = ({ automaton, simulationState }) => {
  const graphRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!graphRef.current || !automaton) return;
    
    const currentState = simulationState.isRunning && simulationState.steps.length > 0
      ? simulationState.steps[simulationState.currentStep]
      : undefined;
    
    // Determine color based on result and if it's the last step
    let color = '#fbbf24'; // Default yellow color
    const isLastStep = simulationState.isRunning && 
                     simulationState.currentStep === simulationState.steps.length - 1;
    
    if (isLastStep) {
      color = simulationState.result ? '#22c55e' : '#ef4444'; // Green for valid, red for invalid
    }
    
    const dotGraph = generateDotGraph(automaton, currentState, color);
    
    try {
      // Clear any previous visualization
      graphRef.current.innerHTML = '';
      
      graphviz(graphRef.current)
        .width(graphRef.current.clientWidth)
        .height(600)
        .fit(true)
        .zoom(false)
        .renderDot(dotGraph);
    } catch (error) {
      console.error('Error rendering graph:', error);
    }
  }, [automaton, simulationState.currentStep, simulationState.isRunning]);

  return (
    <div 
      ref={graphRef} 
      id="dfa-visualization"
      className="w-full h-[600px] bg-gray-50 rounded-lg transition-all duration-300"
    />
  );
};

const PDAVisualization: React.FC<PDAVisualizationProps> = ({ selectedSample }) => {
  return (
    <div className="w-full flex justify-center items-center bg-gray-50 rounded-lg p-4">
      <img 
        src={selectedSample === 'sample1' ? './images/PDA1.png' : './images/PDA2.png'} 
        alt="PDA visualization"
        className="max-w-full h-auto rounded-lg shadow-md"
      />
    </div>
  );
};

const Visualization: React.FC = () => {
  const { selectedType, selectedSample, simulationState, getCurrentAutomaton } = useAutomata();
  
  if (selectedType === 'CFG') {
    return <CFGVisualizer />;
  }
  
  const automaton = selectedType === 'DFA' ? getCurrentAutomaton() : null;

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl mt-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        {selectedType} Visualization 
        <span className="ml-2 text-lg font-normal text-gray-600">
          ({selectedSample === 'sample1' ? 'a/b pattern' : '0/1 pattern'})
        </span>
      </h2>
      
      {selectedType === 'PDA' ? (
        <PDAVisualization selectedSample={selectedSample} />
      ) : (
        <DFAVisualization automaton={automaton} simulationState={simulationState} />
      )}
    </div>
  );
};

export default Visualization