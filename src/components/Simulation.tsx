import React, { useEffect, useState } from 'react';
import { useAutomata } from '../context/AutomataContext';
import { Play, Pause, SkipForward, SkipBack, StopCircle } from 'lucide-react';

const Simulation: React.FC = () => {
  const { 
    simulationState, 
    stepSimulation,
    stepBackward,
    stopSimulation, 
    selectedType 
  } = useAutomata();
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (isAutoPlaying && simulationState.isRunning && 
        simulationState.currentStep < simulationState.steps.length - 1) {
      interval = window.setInterval(() => {
        stepSimulation();
      }, 1000); // 1-second interval
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, simulationState, stepSimulation]);
  
  // Stop auto-play when we reach the end
  useEffect(() => {
    if (simulationState.currentStep >= simulationState.steps.length - 1 && isAutoPlaying) {
      setIsAutoPlaying(false);
    }
  }, [simulationState.currentStep, simulationState.steps.length, isAutoPlaying]);
  
  if (!simulationState.isRunning) {
    return null;
  }
  
  return (
    <div className="bg-white p-6 shadow-md rounded-lg mt-6 border border-gray-200 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center justify-between">
        <span>Simulation</span>
        {simulationState.result !== null && (
          <span 
            className={`text-sm px-3 py-1 rounded-full ${
              simulationState.result ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {simulationState.result ? 'Accepted' : 'Rejected'}
          </span>
        )}
      </h2>
      
      <div className="mb-4">
        <div className="bg-gray-100 rounded-md p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Step {simulationState.currentStep + 1} of {simulationState.steps.length}
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={stepBackward}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                disabled={simulationState.currentStep <= 0}
              >
                <SkipBack className="h-5 w-5 text-indigo-600" />
              </button>

              {!isAutoPlaying ? (
                <button 
                  onClick={() => setIsAutoPlaying(true)}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                  disabled={simulationState.currentStep >= simulationState.steps.length - 1}
                >
                  <Play className="h-5 w-5 text-indigo-600" />
                </button>
              ) : (
                <button 
                  onClick={() => setIsAutoPlaying(false)}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Pause className="h-5 w-5 text-indigo-600" />
                </button>
              )}
              
              <button 
                onClick={stepSimulation}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                disabled={simulationState.currentStep >= simulationState.steps.length - 1}
              >
                <SkipForward className="h-5 w-5 text-indigo-600" />
              </button>
              
              <button 
                onClick={stopSimulation}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <StopCircle className="h-5 w-5 text-red-600" />
              </button>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="font-mono p-3 bg-white rounded border border-gray-200 text-center">
              {selectedType !== 'CFG' ? (
                <>Current State: <span className="font-bold text-indigo-600">
                  {simulationState.steps[simulationState.currentStep]}
                </span></>
              ) : (
                <>Result: <span className={`font-bold ${
                  simulationState.result ? 'text-green-600' : 'text-red-600'
                }`}>
                  {simulationState.result ? 'Valid' : 'Invalid'}
                </span></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;