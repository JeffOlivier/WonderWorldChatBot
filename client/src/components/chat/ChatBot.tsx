import { useRef, useState } from 'react';
import axios from 'axios';
import type { Message } from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';
import ChatOutput from './ChatOutput';
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
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages scroller with sticky fade */}
            <ChatOutput
                messages={messages}
                isBotTyping={isBotTyping}
                error={error}
            />

            {/* ChatInput stays anchored at the bottom (no scroll) */}
            <ChatInput onSubmit={botOnSubmit} />
        </div>
    );
};

export default ChatBot;
