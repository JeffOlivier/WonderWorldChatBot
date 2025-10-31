import type { KeyboardEvent } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import botty from '@/assets/images/botty.png';

export type ChatFormData = {
    prompt: string;
};

type Props = {
    onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
    const { register, handleSubmit, reset, formState } =
        useForm<ChatFormData>();

    const submitTheForm = handleSubmit((data) => {
        reset({ prompt: '' });

        // Notify the parent
        onSubmit(data);
    });

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitTheForm();
        }
    };

    return (
        <div className="flex flex-row items-center gap-4 pt-3">
            <img
                src={botty}
                alt="Botty the AI Robot"
                className="h-10 md:h-20 flex-none bg-white"
            />
            <div className="flex-1 min-w-0">
                <form
                    onSubmit={submitTheForm}
                    onKeyDown={handleKeyDown}
                    className="flex flex-row gap-2 items-end border-2 p-3 rounded-3xl"
                >
                    <textarea
                        {...register('prompt', {
                            required: true,
                            validate: (data) => data.trim().length > 0,
                        })}
                        autoFocus
                        className="w-full border-0 focus:outline-0 resize-none h-12"
                        placeholder="Ask me anything about the park"
                        maxLength={1000}
                    />
                    <Button
                        disabled={!formState.isValid}
                        className="rounded-full w-9 h-9"
                    >
                        <FaArrowUp />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatInput;
