import React, { useState } from 'react';
import { useAutomata } from '../context/AutomataContext';
import { X, Play, AlertCircle } from 'lucide-react';

const StringValidation: React.FC = () => {
  const { 
    inputStrings, 
    setInputStrings, 
    validateStrings, 
    validationResults,
    selectedType,
    selectedSample,
    startSimulation
  } = useAutomata();
  
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleValidate = () => {
    const strings = inputStrings.split('\n').filter(s => s.trim());
    const validChars = selectedSample === 'sample1' ? /^[ab]*$/ : /^[01]*$/;
    
    const invalidStrings = strings.filter(str => !validChars.test(str));
    
    if (invalidStrings.length > 0) {
      setErrorMessage(`Invalid characters detected. Please use only ${
        selectedSample === 'sample1' ? '"a" and "b"' : '"0" and "1"'
      } characters.`);
      setShowError(true);
      return;
    }
    
    validateStrings();
  };

  const handleSimulate = (input: string) => {
    startSimulation(input);
  };

  return (
    <>
      <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
          <Play className="h-5 w-5 mr-2 text-indigo-600" />
          String Validation
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <textarea
                className="w-full h-48 p-4 border border-gray-200 rounded-xl font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder={`Enter strings to validate (one per line)\nUse only ${
                  selectedSample === 'sample1' ? '"a" and "b"' : '"0" and "1"'
                } characters`}
                value={inputStrings}
                onChange={(e) => setInputStrings(e.target.value)}
              ></textarea>
              <div className="absolute bottom-4 right-4">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
                  onClick={handleValidate}
                >
                  Validate
                </button>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            {validationResults.length > 0 ? (
              <div className="space-y-3">
                {validationResults.map((result, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      result.isValid 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-mono">{result.string}</span>
                        <span className={`ml-3 px-3 py-1 text-xs rounded-full font-medium ${
                          result.isValid 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {result.isValid ? 'Valid' : 'Invalid'}
                        </span>
                      </div>
                      <button
                        className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors shadow-sm hover:shadow border border-indigo-200 flex items-center gap-2"
                        onClick={() => handleSimulate(result.string)}
                      >
                        <Play className="h-4 w-4" />
                        Simulate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-gray-500 border border-gray-200 rounded-xl bg-gray-50">
                <div className="text-center">
                  <AlertCircle className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                  <p>No validation results yet</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showError && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-red-600 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Invalid Input
              </h3>
              <button 
                onClick={() => setShowError(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <button
              onClick={() => setShowError(false)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StringValidation;