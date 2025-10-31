import { useRef, useState } from 'react';
import axios from 'axios';
import TypingIndicator from '../TypingIndicator';
import type { Message } from './ChatMessages';
import ChatMessages from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';
import popSound from '@/assets/sounds/pop.mp3';
import notificationSound from '@/assets/sounds/notification.mp3';

const API_URL = import.meta.env.VITE_API_URL ?? '';

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

type ChatResponse = {
    message: string;
};

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [error, setError] = useState('');

    const conversationId = useRef(crypto.randomUUID());

    const botOnSubmit = async (data2: ChatFormData) => {
        try {
            setMessages((prev) => [
                ...prev,
                { content: data2.prompt, role: 'user' },
            ]);
            setIsBotTyping(true);
            setError('');
            popAudio.play();

            const { data } = await axios.post<ChatResponse>(
                `${API_URL}/api/chat`,
                {
                    prompt: data2.prompt,
                    conversationId: conversationId.current,
                }
            );

            setMessages((prev) => [
                ...prev,

                { content: data.message, role: 'bot' },
            ]);
            notificationAudio.play();
        } catch (error) {
            console.error(error);
            setError('Something went wrong. Please try again later.');
        } finally {
            setIsBotTyping(false);
        }
    };

    return (
        <div className="flex-1 p-4 pt-0 flex flex-col overflow-hidden">
            {/* Messages scroller with sticky fade */}
            <div className="relative flex-1 overflow-y-auto">
                {/* iMessage-style fade (stays put while content scrolls) */}
                <div className="pointer-events-none sticky top-0 h-8 bg-gradient-to-b from-white/90 to-white/0 z-10" />

                {/* Messages/content (does the actual scrolling) */}
                <div className="flex flex-col gap-3 mb-4 px-4 -mt-4">
                    <ChatMessages messages={messages} />
                    {isBotTyping && <TypingIndicator />}
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>

            {/* ChatInput stays anchored at the bottom (no scroll) */}
            <ChatInput onSubmit={botOnSubmit} />
        </div>
    );
};

export default ChatBot;
