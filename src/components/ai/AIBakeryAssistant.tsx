import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User as UserIcon, Cake, ShoppingBag } from 'lucide-react';
import { AIChatMessage, Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface AIBakeryAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateDetails: (productId: string) => void;
}

export const AIBakeryAssistant: React.FC<AIBakeryAssistantProps> = ({
  isOpen,
  onClose,
  onNavigateDetails
}) => {
  const { addToCart } = useCart();
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content:
        "Namaste! 🍰 Welcome to Velvet Crumbs Bakery. I'm your AI Bakery Concierge. Ask me anything about flavor pairings, portion recommendations, custom cake orders, or dietary needs (Eggless, Vegan, Sugar-free)!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Suggest a 100% eggless anniversary cake',
    'Portion size recommendation for 15 guests',
    'Which sourdough bread goes best with avocado?',
    'What are your top bestseller luxury gift hampers?'
  ];

  const handleSendPrompt = async (textToSend?: string) => {
    const promptText = textToSend || inputPrompt;
    if (!promptText.trim() || isLoading) return;

    const userMsg: AIChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      });
      const data = await res.json();

      if (data.success) {
        const aiMsg: AIChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedProducts: data.suggestedProducts
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error(data.message || 'Failed');
      }
    } catch (err) {
      const errorMsg: AIChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          "I apologize, I experienced a brief connectivity hiccup. However, our signature Belgian Dark Chocolate Velvet Truffle Cake and Royal Kashmiri Saffron Tres Leches are outstanding choices today! How else can I guide your pastry selection?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-[#FFF8F0] dark:bg-[#1E1715] rounded-3xl shadow-2xl border border-[#D4AF37]/40 flex flex-col h-[650px] max-h-[90vh] overflow-hidden text-stone-900 dark:text-stone-100">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#5D4037] to-[#3D2B25] text-white flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-stone-950 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-stone-950 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#F3E5AB]">Velvet AI Concierge</h3>
              <p className="text-[11px] text-stone-300">Powered by Gemini 3.6 Flash • AI Bakery Sommelier</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-3 bg-[#FFF8F0]/80 dark:bg-[#201815] border-b border-stone-200 dark:border-stone-800 flex gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(qp)}
              className="px-3 py-1.5 rounded-full bg-white dark:bg-[#2A1D19] border border-[#D4AF37]/30 text-stone-700 dark:text-stone-300 text-xs font-medium shrink-0 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-stone-950 flex items-center justify-center shrink-0 text-xs font-bold shadow-xs mt-1">
                  AI
                </div>
              )}

              <div className="max-w-[85%]">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-[#5D4037] text-white rounded-br-none'
                      : 'bg-white dark:bg-[#2A1D19] border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>

                {/* Suggested Product Cards embedded inside Assistant message */}
                {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {msg.suggestedProducts.map(p => (
                      <div
                        key={p.id}
                        className="p-3 rounded-2xl bg-white dark:bg-[#201815] border border-[#D4AF37]/30 flex gap-2.5 items-center shadow-sm"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            onClick={() => {
                              onClose();
                              onNavigateDetails(p.id);
                            }}
                            className="text-xs font-bold truncate text-stone-900 dark:text-stone-100 hover:text-[#D4AF37] cursor-pointer"
                          >
                            {p.name}
                          </p>
                          <p className="text-[11px] font-bold text-[#D4AF37]">₹{p.price}</p>
                        </div>
                        <button
                          onClick={() => addToCart(p)}
                          className="p-2 rounded-xl bg-[#5D4037] text-[#D4AF37] hover:bg-[#4A322B]"
                          title="Quick Add"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-stone-400 mt-1 block px-1">
                  {msg.timestamp}
                </span>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#5D4037] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                  You
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-stone-500">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-stone-950 flex items-center justify-center font-bold">
                AI
              </div>
              <div className="flex gap-1.5 p-3 rounded-2xl bg-white dark:bg-[#2A1D19]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-white dark:bg-[#201815] border-t border-[#D4AF37]/20">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendPrompt();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={e => setInputPrompt(e.target.value)}
              placeholder="Ask Velvet AI Concierge (e.g. 'Eggless cake for 10 guests')..."
              className="flex-1 px-4 py-3 rounded-2xl bg-stone-100 dark:bg-[#2A1D19] border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="px-5 py-3 rounded-2xl bg-[#5D4037] text-[#D4AF37] font-bold text-xs hover:bg-[#4A322B] disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
