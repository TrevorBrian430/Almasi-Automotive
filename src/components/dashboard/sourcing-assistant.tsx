"use client";

import { useChat, Message } from 'ai/react';
import { Bot, Send, User, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function SourcingAssistant() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
        initialMessages: [
            {
                id: 'welcome',
                role: 'assistant',
                content: "Welcome to Almasi Automotive Concierge. What specs are you looking for in your next import?"
            }
        ]
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-[500px] border border-white/5 bg-[#0A0A0A] rounded-sm overflow-hidden relative shadow-2xl">
            {/* Header */}
            <div className="bg-[#050505] p-4 border-b border-white/[0.06] flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/[0.08] flex items-center justify-center border border-gold/20">
                        <Bot className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                        <h4 className="text-sm tracking-widest text-platinum" style={{ fontFamily: "var(--font-heading)" }}>
                            Sourcing Assistant
                        </h4>
                        <p className="text-[10px] text-emerald-400 tracking-wider">ONLINE</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[url('/noise.png')] bg-repeat opacity-95">
                {messages.map((m: Message) => (
                    <div
                        key={m.id}
                        className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 border ${m.role === 'user'
                            ? 'bg-white/5 border-white/10'
                            : 'bg-gold/[0.08] border-gold/20'
                            }`}>
                            {m.role === 'user' ? (
                                <User className="w-4 h-4 text-white/70" />
                            ) : (
                                <Bot className="w-4 h-4 text-gold" />
                            )}
                        </div>
                        <div className={`p-3 text-sm leading-relaxed rounded-sm ${m.role === 'user'
                            ? 'bg-white/5 border border-white/10 text-platinum'
                            : 'bg-[#111] border border-gold/10 text-platinum/90'
                            }`}>
                            {m.content}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-gold/[0.08] flex items-center justify-center shrink-0 border border-gold/20">
                            <Bot className="w-4 h-4 text-gold" />
                        </div>
                        <div className="p-3 bg-[#111] border border-gold/10 rounded-sm flex items-center">
                            <Loader2 className="w-4 h-4 text-gold animate-spin" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#050505] border-t border-white/[0.06] z-10">
                <form onSubmit={handleSubmit} className="relative flex items-center">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="E.g., I'm looking for a 2024 G63 AMG under 40M KES"
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm py-3 pl-4 pr-12 text-sm text-platinum placeholder:text-muted/50 focus:outline-none focus:border-gold/30 transition-colors"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input?.trim()}
                        className="absolute right-2 p-2 text-gold/70 hover:text-gold disabled:opacity-50 disabled:hover:text-gold/70 transition-colors bg-white/5 hover:bg-white/10 rounded-sm"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
