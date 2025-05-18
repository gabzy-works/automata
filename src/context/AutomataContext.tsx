import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AutomataType, SampleType, ValidationResult, SimulationState } from '../types/automata';
import { DFA_1, DFA_2, CFG_1, CFG_2, PDA_1, PDA_2 } from '../automata';

interface AutomataContextType {
  selectedSample: SampleType;
  setSelectedSample: (sample: SampleType) => void;
  selectedType: AutomataType;
  setSelectedType: (type: AutomataType) => void;
  validationResults: ValidationResult[];
  setValidationResults: (results: ValidationResult[]) => void;
  simulationState: SimulationState;
  setSimulationState: (state: SimulationState) => void;
  inputStrings: string;
  setInputStrings: (strings: string) => void;
  validateStrings: () => void;
  startSimulation: (input: string) => void;
  stopSimulation: () => void;
  stepSimulation: () => void;
  stepBackward: () => void;
  getCurrentAutomaton: () => any;
}

const defaultSimulationState: SimulationState = {
  isRunning: false,
  currentStep: 0,
  steps: [],
  result: null
};

const AutomataContext = createContext<AutomataContextType | undefined>(undefined);

export const AutomataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSample, setSelectedSample] = useState<SampleType>('sample1');
  const [selectedType, setSelectedType] = useState<AutomataType>('DFA');
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [simulationState, setSimulationState] = useState<SimulationState>(defaultSimulationState);
  const [inputStrings, setInputStrings] = useState<string>('');

  const getCurrentAutomaton = () => {
    if (selectedType === 'DFA') {
      return selectedSample === 'sample1' ? DFA_1 : DFA_2;
    } else if (selectedType === 'CFG') {
      return selectedSample === 'sample1' ? CFG_1 : CFG_2;
    } else {
      return selectedSample === 'sample1' ? PDA_1 : PDA_2;
    }
  };

  const validateStrings = () => {
    if (!inputStrings.trim()) return;
    
    const strings = inputStrings.split('\n').filter(s => s.trim());
    const automaton = getCurrentAutomaton();
    const results: ValidationResult[] = [];

    strings.forEach(str => {
      const trimmedStr = str.trim();
      if (!trimmedStr) return;

      if (selectedType === 'DFA') {
        const validationResult = validateDFA(automaton, trimmedStr);
        results.push({
          string: trimmedStr,
          isValid: validationResult.isValid,
          stateChecks: validationResult.stateChecks
        });
      } else if (selectedType === 'PDA') {
        const validationResult = validatePDA(automaton, trimmedStr);
        results.push({
          string: trimmedStr,
          isValid: validationResult.isValid,
          stateChecks: validationResult.stateChecks
        });
      } else {
        // CFG validation
        results.push({
          string: trimmedStr,
          isValid: validateCFG(automaton, trimmedStr)
        });
      }
    });

    setValidationResults(results);
  };

  const validateDFA = (dfa: any, input: string) => {
    const stateChecks: { state: string; isValid: boolean }[] = [];
    let currentState = dfa.start_state;
    stateChecks.push({ state: currentState, isValid: true });

    for (const char of input) {
      const transition = `${currentState},${char}`;
      if (!dfa.transitions[transition]) {
        stateChecks.push({ state: currentState, isValid: false });
        return { isValid: false, stateChecks };
      }
      currentState = dfa.transitions[transition];
      stateChecks.push({ state: currentState, isValid: true });
    }

    const isValid = dfa.end_states.includes(currentState);
    stateChecks[stateChecks.length - 1].isValid = isValid;

    return { isValid, stateChecks };
  };

  const validatePDA = (pda: any, input: string) => {
    const stateChecks: { state: string; isValid: boolean }[] = [];
    let currentState = pda.start_state;
    stateChecks.push({ state: currentState, isValid: true });

    for (const char of input) {
      const transition = `${currentState},${char}`;
      if (!pda.transitions[transition]) {
        const epsilonTransition = `${currentState},`;
        if (!pda.transitions[epsilonTransition]) {
          stateChecks.push({ state: currentState, isValid: false });
          return { isValid: false, stateChecks };
        }
        currentState = pda.transitions[epsilonTransition];
      } else {
        currentState = pda.transitions[transition];
      }
      stateChecks.push({ state: currentState, isValid: true });
    }

    // Check for epsilon transitions at the end
    const epsilonTransition = `${currentState},`;
    if (pda.transitions[epsilonTransition]) {
      currentState = pda.transitions[epsilonTransition];
      stateChecks.push({ state: currentState, isValid: true });
    }

    const isValid = pda.accept_states.includes(currentState);
    stateChecks[stateChecks.length - 1].isValid = isValid;

    return { isValid, stateChecks };
  };

  const validateCFG = (cfg: any, input: string) => {
    // Simplified validation for CFG
    const firstProd = cfg.productions[0];
    if (firstProd.includes('1') || firstProd.includes('0')) {
      return /^[01]+$/.test(input);
    } else {
      return /^[ab]+$/.test(input);
    }
  };

  const startSimulation = (input: string) => {
    if (!input.trim()) return;
    
    const automaton = getCurrentAutomaton();
    const steps: string[] = [];
    let currentState = '';
    let result = false;

    if (selectedType === 'DFA') {
      currentState = automaton.start_state;
      steps.push(currentState);
      
      for (const char of input) {
        const transition = `${currentState},${char}`;
        if (!automaton.transitions[transition]) {
          break;
        }
        currentState = automaton.transitions[transition];
        steps.push(currentState);
      }
      
      result = automaton.end_states.includes(currentState);
    } else if (selectedType === 'PDA') {
      currentState = automaton.start_state;
      steps.push(currentState);
      
      for (const char of input) {
        const transition = `${currentState},${char}`;
        if (!automaton.transitions[transition]) {
          const epsilonTransition = `${currentState},`;
          if (!automaton.transitions[epsilonTransition]) {
            break;
          }
          currentState = automaton.transitions[epsilonTransition];
        } else {
          currentState = automaton.transitions[transition];
        }
        steps.push(currentState);
      }
      
      // Check for final epsilon transitions
      const epsilonTransition = `${currentState},`;
      if (automaton.transitions[epsilonTransition]) {
        currentState = automaton.transitions[epsilonTransition];
        steps.push(currentState);
      }
      
      result = automaton.accept_states.includes(currentState);
    } else {
      // For CFG, simply validate
      result = validateCFG(automaton, input);
      steps.push(result ? 'Valid' : 'Invalid');
    }

    setSimulationState({
      isRunning: true,
      currentStep: 0,
      steps,
      result
    });
  };

  const stopSimulation = () => {
    setSimulationState(defaultSimulationState);
  };

  const stepSimulation = () => {
    if (!simulationState.isRunning || simulationState.currentStep >= simulationState.steps.length - 1) {
      return;
    }

    setSimulationState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }));
  };

  const stepBackward = () => {
    if (!simulationState.isRunning || simulationState.currentStep <= 0) {
      return;
    }

    setSimulationState(prev => ({
      ...prev,
      currentStep: prev.currentStep - 1
    }));
  };

  return (
    <AutomataContext.Provider
      value={{
        selectedSample,
        setSelectedSample,
        selectedType,
        setSelectedType,
        validationResults,
        setValidationResults,
        simulationState,
        setSimulationState,
        inputStrings,
        setInputStrings,
        validateStrings,
        startSimulation,
        stopSimulation,
        stepSimulation,
        stepBackward,
        getCurrentAutomaton
      }}
    >
      {children}
    </AutomataContext.Provider>
  );
};

export const useAutomata = () => {
  const context = useContext(AutomataContext);
  if (context === undefined) {
    throw new Error('useAutomata must be used within an AutomataProvider');
  }
  return context;
};