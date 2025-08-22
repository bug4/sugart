import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Heart, Star, Twitter, ShoppingBag } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import { getChatResponse, isOpenAIConfigured } from './services/openai';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hey there, sugar! 🍭✨ Welcome to the Sugar Terminal! I'm your sweet AI companion powered by ${isOpenAIConfigured() ? 'the latest Sugar AI version' : 'pure sugar crystals'}! Ready to chat about anything your sweet heart desires! What's cooking in your wonderful world today? 💖`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 second loading screen

    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Prepare conversation history for OpenAI
      const conversationHistory = messages
        .slice(-10) // Keep last 10 messages for context
        .map(msg => ({
          role: msg.isUser ? 'user' as const : 'assistant' as const,
          content: msg.text
        }));
      
      // Add the new user message
      conversationHistory.push({
        role: 'user' as const,
        content: inputValue
      });

      const aiResponse = await getChatResponse(conversationHistory);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oh sugar! 🍭 Something sweet went wrong with my circuits! But don't worry, I'm still here to brighten your day! Try sending another message, honey! 💖✨",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Candy Elements */}
        <div className="absolute top-10 left-10 text-4xl animate-bounce opacity-70" style={{animationDelay: '0s'}}>🍭</div>
        <div className="absolute top-32 right-20 text-3xl animate-pulse opacity-60" style={{animationDelay: '0.5s'}}>🍬</div>
        <div className="absolute bottom-40 left-1/4 text-5xl animate-bounce opacity-50" style={{animationDelay: '1s'}}>🧁</div>
        <div className="absolute top-1/2 right-10 text-2xl animate-pulse opacity-80" style={{animationDelay: '1.5s'}}>🍪</div>
        <div className="absolute bottom-20 right-1/3 text-4xl animate-bounce opacity-60" style={{animationDelay: '2s'}}>🍰</div>
        <div className="absolute top-20 left-1/2 text-3xl animate-pulse opacity-70" style={{animationDelay: '2.5s'}}>🍩</div>
        <div className="absolute top-60 left-20 text-2xl animate-bounce opacity-50" style={{animationDelay: '3s'}}>🧁</div>
        <div className="absolute bottom-60 right-40 text-3xl animate-pulse opacity-60" style={{animationDelay: '3.5s'}}>🍭</div>
        <div className="absolute top-80 right-60 text-4xl animate-bounce opacity-40" style={{animationDelay: '4s'}}>🍫</div>
        <div className="absolute bottom-80 left-40 text-2xl animate-pulse opacity-70" style={{animationDelay: '4.5s'}}>🍬</div>
        <div className="absolute top-40 left-60 text-3xl animate-bounce opacity-50" style={{animationDelay: '5s'}}>🍪</div>
        <div className="absolute bottom-40 right-80 text-5xl animate-pulse opacity-30" style={{animationDelay: '5.5s'}}>🍰</div>
        <div className="absolute top-96 left-80 text-2xl animate-bounce opacity-60" style={{animationDelay: '6s'}}>🍩</div>
        <div className="absolute bottom-96 right-20 text-4xl animate-pulse opacity-40" style={{animationDelay: '6.5s'}}>🧁</div>
        <div className="absolute top-1/3 left-1/3 text-3xl animate-bounce opacity-50" style={{animationDelay: '7s'}}>🍭</div>
        <div className="absolute bottom-1/3 right-1/3 text-2xl animate-pulse opacity-70" style={{animationDelay: '7.5s'}}>🍬</div>
        <div className="absolute top-2/3 left-2/3 text-4xl animate-bounce opacity-40" style={{animationDelay: '8s'}}>🍫</div>
        <div className="absolute bottom-2/3 right-2/3 text-3xl animate-pulse opacity-60" style={{animationDelay: '8.5s'}}>🍪</div>
        <div className="absolute top-1/4 right-1/4 text-5xl animate-bounce opacity-30" style={{animationDelay: '9s'}}>🍰</div>
        <div className="absolute bottom-1/4 left-3/4 text-2xl animate-pulse opacity-80" style={{animationDelay: '9.5s'}}>🍩</div>
      </div>

      <div className="container mx-auto px-4 py-6 h-screen flex flex-col max-w-4xl">
        {/* Social Buttons - Top Right */}
        <div className="absolute top-6 right-6 z-10 flex gap-3">
          <a
            href="https://sugar.money/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 backdrop-blur-md rounded-full p-3 shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-110 active:scale-95 group"
            title="Buy on Sugar"
          >
            <ShoppingBag className="w-6 h-6 text-white group-hover:text-pink-100 transition-colors duration-300" />
          </a>
          <a
            href="https://twitter.com/terminalofsugar"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 backdrop-blur-md rounded-full p-3 shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-110 active:scale-95 group"
            title="Follow us on Twitter"
          >
            <Twitter className="w-6 h-6 text-white group-hover:text-pink-100 transition-colors duration-300" />
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-6 relative">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-8 py-4 shadow-lg border border-white/30">
            <Sparkles className="w-8 h-8 text-white animate-spin" />
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
              Sugar Terminal
            </h1>
            <Heart className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <Star className="w-4 h-4 text-white/80 animate-pulse" />
            <p className="text-white/90 text-sm md:text-base font-medium">
              Your sweet AI companion awaits!
            </p>
            <Star className="w-4 h-4 text-white/80 animate-pulse" />
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ec4899 transparent' }}>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-xs md:max-w-md lg:max-w-lg px-6 py-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 ${
                  message.isUser 
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white ml-4' 
                    : 'bg-white/90 backdrop-blur-sm text-gray-800 mr-4 border border-pink-200'
                }`}>
                  <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 opacity-75 ${message.isUser ? 'text-pink-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white/90 backdrop-blur-sm text-gray-800 mr-4 px-6 py-4 rounded-2xl shadow-lg border border-pink-200">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">Sugar is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/20 bg-white/5 backdrop-blur-sm p-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type something sweet..."
                  className="w-full px-6 py-4 bg-white/90 backdrop-blur-sm border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-base transition-all duration-300 shadow-lg"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={inputValue.trim() === ''}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-2xl hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #ec4899;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #db2777;
        }
      `}</style>
    </div>
  );
}

export default App;