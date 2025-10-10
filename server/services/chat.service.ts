import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository.js';
import template from '../llm/prompts/chatbot.txt';
import { llmClient } from '../llm/client.js';

const parkInfo = fs.readFileSync(
    path.join(__dirname, '..', 'llm', 'prompts', 'WonderWorld.md'),
    'utf-8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

type ChatResponse = {
    id: string;
    message: string;
};

// The public interface
export const chatService = {
    async sendMessage(
        prompt: string,
        conversationId: string
    ): Promise<ChatResponse> {
        const response = await llmClient.generateText({
            instructions,
            prompt,
            maxTokens: 300,
            previousResponseId:
                conversationRepository.getLastResponseId(conversationId),
        });

        conversationRepository.setLastResponseId(conversationId, response.id);

        return {
            id: response.id,
            message: response.text,
        };
    },
};
