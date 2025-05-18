import { DFA, PDA, CFG } from '../automata';

export type AutomataType = 'DFA' | 'CFG' | 'PDA';
export type SampleType = 'sample1' | 'sample2';

export interface AutomataViewProps {
  type: AutomataType;
  sample: SampleType;
}

export interface SimulationState {
  isRunning: boolean;
  currentStep: number;
  steps: string[];
  result: boolean | null;
}

export interface ValidationResult {
  string: string;
  isValid: boolean;
  stateChecks?: { state: string; isValid: boolean }[];
}

export interface SampleData {
  regex: string;
  dfa: DFA;
  cfg: CFG;
  pda: PDA;
}

export const regexSamples = {
  sample1: "(aa+bb) (aba+bab+bbb) (a+b)* (aa+bb) (aa+bb)* (ababa) (ababa)* (bbb+aaa) (a+b)*",
  sample2: "(1* 0 1* 0 1) (11+00) (10+01) (1+0) (11+00) (1+0+11+00+101+111+000) (11+00)* (10* 10* 1) (11+00)*"
};