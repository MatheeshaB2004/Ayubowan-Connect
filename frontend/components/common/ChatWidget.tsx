'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, X, Send, Loader2, Mic } from 'lucide-react';
import { getApiUrl } from '@/lib/api';
import './ChatWidget.css';

interface Message {
    sender: 'user' | 'bot';
    text: string;
    navigation?: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'bot',
            text: 'Ayubowan! Welcome to Ayubowan Connect. How can I help you today?',
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const router = useRouter();

    // Initialize state from sessionStorage (but clear on hard refresh)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const navEntries = performance.getEntriesByType?.('navigation') || [];
            const isReload = navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === 'reload';

            if (isReload) {
                sessionStorage.removeItem('chatMessages');
                sessionStorage.removeItem('chatIsOpen');
            } else {
                const savedMessages = sessionStorage.getItem('chatMessages');
                if (savedMessages) {
                    try { setMessages(JSON.parse(savedMessages)); } catch (e) {}
                }
                const savedIsOpen = sessionStorage.getItem('chatIsOpen');
                if (savedIsOpen === 'true') setIsOpen(true);
            }
            setIsInitialized(true);
        }
    }, []);

    // Persist to sessionStorage on change
    useEffect(() => {
        if (isInitialized) {
            sessionStorage.setItem('chatMessages', JSON.stringify(messages));
        }
    }, [messages, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            sessionStorage.setItem('chatIsOpen', isOpen.toString());
        }
    }, [isOpen, isInitialized]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const toggleListening = () => {
        if (isListening) {
            if (recognitionRef.current) recognitionRef.current.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Your browser does not support speech recognition. Please try using Chrome or Edge.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0].transcript)
                .join('');
            setInputText(transcript);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognition.start();
    };

    const sendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        if (isListening && recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }

        const userMessage = inputText.trim();
        setInputText('');

        // Add user message to chat
        setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const webhookUrl = getApiUrl('/chatbot/webhook');

            if (!webhookUrl) {
                throw new Error('Chatbot backend URL is not configured.');
            }

            // Send to backend webhook
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    queryResult: {
                        queryText: userMessage,
                    },
                }),
            });

            const data = await response.json();

            // Add bot response
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: data.fulfillmentText, navigation: data.payload?.navigation },
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) => [
                ...prev,
                {
                    sender: 'bot',
                    text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="chat-widget">
            {/* Chat Window */}
            <div className={`chat-window ${isOpen ? 'open' : 'closed'}`}>
                {/* Header */}
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-header-icon">
                            <MessageCircle size={20} />
                        </div>
                        <div>
                            <h3 className="chat-header-title">Ayubowan Assistant</h3>
                            <p className="chat-header-subtitle">Always here to help</p>
                        </div>
                    </div>
                    <button
                        suppressHydrationWarning
                        onClick={() => setIsOpen(false)}
                        className="chat-close-btn"
                        title="Close chat"
                        aria-label="Close chat"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Messages */}
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`chat-message-row ${message.sender}`}
                        >
                            <div className={`chat-bubble ${message.sender}`}>
                                {message.text}
                                {message.navigation && (
                                    <div style={{ marginTop: '8px' }}>
                                        <a 
                                            href={message.navigation}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsOpen(false);
                                                router.push(message.navigation!);
                                            }}
                                            style={{ 
                                                textDecoration: 'underline', 
                                                color: 'inherit', 
                                                fontWeight: 'bold',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Click here to view
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="chat-message-row bot">
                            <div className="chat-loading-bubble">
                                <Loader2 className="chat-loading-spinner" size={20} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="chat-input-area">
                    <div className="chat-input-row">
                        <input
                            suppressHydrationWarning
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={isListening ? "Listening..." : "Ask me anything..."}
                            disabled={isLoading}
                            className={`chat-input ${isListening ? 'listening' : ''}`}
                        />
                        <button
                            suppressHydrationWarning
                            onClick={toggleListening}
                            type="button"
                            className={`chat-mic-btn ${isListening ? 'active' : ''}`}
                            title={isListening ? "Stop listening" : "Voice input"}
                            aria-label="Voice input"
                        >
                            <Mic size={20} className={isListening ? "animate-pulse text-red-500" : ""} />
                        </button>
                        <button
                            suppressHydrationWarning
                            onClick={sendMessage}
                            disabled={isLoading || !inputText.trim()}
                            className="chat-send-btn"
                            title="Send message"
                            aria-label="Send message"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating Button */}
            <button
                suppressHydrationWarning
                onClick={() => setIsOpen(!isOpen)}
                className="chat-toggle-btn"
                aria-label="Toggle chat"
            >
                {isOpen ? (
                    <X size={28} className="icon-close" />
                ) : (
                    <MessageCircle size={28} className="icon-open" />
                )}
            </button>
        </div>
    );
}
