import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import {
  Bot,
  User,
  Send,
  Sparkles,
  Info,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  'What are the core obligations in the AES Liptako-Gourma Charter?',
  'Summarize the external debt breakdown for Burkina Faso, Mali, and Niger.',
  'What economic and monetary integration policies are outlined in the Niamey Declaration?',
  'How are transit trade corridors and regional investment banks addressed?'
];

export const SahelDriveChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `Hello! I am the **Sahel Alliance Document Intelligence Bot**. 

I am strictly constrained to answer your questions **only using official PDF documents, charters, and policy reports** regarding Burkina Faso, Mali, Niger, and the AES Confederation.

How can I assist your research today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/sahel-drive/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.answer || 'No response returned.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Error sending chat message:', err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Connection Note**: I was unable to reach the document intelligence service. Please verify your internet connection or setting of DEEPSEEK_API_KEY. All queries remain strictly grounded to official source documents.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        role: 'assistant',
        content: `Conversation reset. I am ready to answer further queries strictly referencing official Sahel Alliance PDF source documents.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="rounded-3xl border border-brand-border bg-white shadow-xl overflow-hidden flex flex-col h-[680px]">
      {/* CHATBOT HEADER */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Bot className="w-6 h-6 shrink-0" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-display tracking-tight text-white">
                Sahel Alliance Document Intelligence Bot
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3 text-amber-400" /> Grounded Source
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Querying Burkina Faso, Mali, Niger & AES official PDF source documents
            </p>
          </div>
        </div>
      </div>

      {/* CHAT MESSAGES AREA */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-3xl ${
              msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            {/* AVATAR */}
            <div
              className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 shadow-xs text-xs font-bold ${
                msg.role === 'user'
                  ? 'bg-slate-800 text-white'
                  : 'bg-amber-600 text-white'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* MESSAGE BUBBLE */}
            <div className="space-y-1 max-w-[85%]">
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-slate-800 text-white rounded-tr-none'
                    : 'bg-white border border-brand-border text-slate-800 shadow-xs rounded-tl-none'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="prose prose-xs max-w-none text-slate-800 space-y-2">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>

              <div
                className={`flex items-center gap-2 text-[10px] text-brand-dim font-mono ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <span>{msg.timestamp}</span>
                {msg.role === 'assistant' && (
                  <span className="text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                    Verified Source
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-xl">
            <div className="w-8 h-8 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="p-4 rounded-2xl bg-white border border-brand-border shadow-xs text-xs text-brand-dim flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span>Analyzing source documents...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* SUGGESTED PROMPTS */}
      {messages.length <= 2 && (
        <div className="p-3 bg-white border-t border-brand-border/60 shrink-0">
          <p className="text-[10px] font-mono uppercase font-bold text-brand-dim mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Sample Grounded Queries:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="text-left text-[11px] bg-slate-100 hover:bg-amber-50 hover:border-amber-300 border border-brand-border rounded-xl px-2.5 py-1.5 text-brand-text transition-all cursor-pointer font-sans"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* INPUT CONTROLS */}
      <div className="p-3 bg-white border-t border-brand-border shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={handleClear}
            className="p-2.5 rounded-xl border border-brand-border bg-slate-100 hover:bg-slate-200 text-brand-dim transition-colors cursor-pointer shrink-0"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about Sahel Alliance PDFs & official policy documents..."
            disabled={isLoading}
            className="flex-1 bg-slate-50 border border-brand-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all placeholder:text-brand-dim"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-semibold transition-all shadow-xs cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between text-[10px] text-brand-dim px-1 font-mono">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-amber-700" />
            Answers strictly derived from official PDF source documents
          </span>
          <span className="text-slate-400">DeepSeek AI Grounded Engine</span>
        </div>
      </div>
    </div>
  );
};

export default SahelDriveChatbot;
