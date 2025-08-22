import React from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 flex items-center justify-center z-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-32 right-20 w-3 h-3 bg-white rounded-full animate-pulse opacity-70"></div>
        <div className="absolute bottom-40 left-1/4 w-5 h-5 bg-pink-200 rounded-full animate-bounce opacity-50" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-pink-100 rounded-full animate-pulse opacity-80" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-white rounded-full animate-bounce opacity-60" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-20 left-1/2 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="text-center relative">
        {/* Main Loading Container */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30 max-w-md mx-auto">
          {/* Logo Area */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <Sparkles className="w-12 h-12 text-white animate-spin" />
              <h1 className="text-4xl font-bold text-white tracking-wide">
                Sugar Terminal
              </h1>
              <Heart className="w-12 h-12 text-white animate-pulse" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-4 h-4 text-white/80 animate-pulse" />
              <p className="text-white/90 text-lg font-medium">
                Preparing your sweet experience...
              </p>
              <Star className="w-4 h-4 text-white/80 animate-pulse" />
            </div>
          </div>

          {/* Loading Animation */}
          <div className="mb-6">
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-white to-pink-200 rounded-full animate-pulse loading-bar"></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <p className="text-white/80 text-sm animate-pulse">
              🍭 Mixing sugar crystals...
            </p>
            <p className="text-white/80 text-sm animate-pulse" style={{animationDelay: '0.5s'}}>
              🧁 Preparing sweet responses...
            </p>
            <p className="text-white/80 text-sm animate-pulse" style={{animationDelay: '1s'}}>
              ✨ Adding sparkles and magic...
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
        
        .loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;