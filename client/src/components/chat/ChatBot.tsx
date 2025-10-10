import { useRef, useState } from 'react';
import axios from 'axios';
import TypingIndicator from '../TypingIndicator';
import type { Message } from './ChatMessages';
import ChatMessages from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';
import popSound from '@/assets/sounds/pop.mp3';
import notificationSound from '@/assets/sounds/notification.mp3';

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

            const { data } = await axios.post<ChatResponse>('/api/chat', {
                prompt: data2.prompt,
                conversationId: conversationId.current,
            });

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
        <div className="flex flex-col h-full">
            <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
                <ChatMessages messages={messages} />
                {isBotTyping && <TypingIndicator />}
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <ChatInput onSubmit={botOnSubmit} />
        </div>
    );
};

export default ChatBot;
