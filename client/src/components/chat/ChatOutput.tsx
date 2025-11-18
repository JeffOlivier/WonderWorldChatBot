import TypingIndicator from '../TypingIndicator';
import type { Message } from './ChatMessages';
import ChatMessages from './ChatMessages';

export type ChatOutputProps = {
    messages: Message[];
    isBotTyping: boolean;
    error: string;
};

const ChatOutput = ({ messages, isBotTyping, error }: ChatOutputProps) => {
    return (
        <div className="relative flex-1 overflow-y-auto bg-white border-2 border-amber-400 rounded-3xl">
            {/* iMessage-style fade (stays put while content scrolls) */}
            <div className="pointer-events-none sticky top-0 h-8 bg-gradient-to-b from-white/90 to-white/0 z-10" />

            {/* Messages/content (does the actual scrolling) */}
            <div className="flex flex-col gap-3 mb-6 px-4 -mt-4">
                <ChatMessages messages={messages} />
                {isBotTyping && <TypingIndicator />}
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default ChatOutput;
