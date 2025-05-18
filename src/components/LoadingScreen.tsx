import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 z-50 flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        <div className="w-20 h-20 relative">
          <div className="absolute inset-0 border-4 border-white/30 rounded-full" />
          <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="mt-6">
          <span className="text-white text-2xl font-bold tracking-wider">Loading</span>
          <div className="flex space-x-1 mt-2 justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 