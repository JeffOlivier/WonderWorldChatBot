import ChatBot from './chat/ChatBot';
import CollapsibleBlock from './CollapsibleBlock';
import coverImage from '@/assets/images/wonderworld-cover.png';

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            {/* 1) (above) Full-viewport wrapper that centers your card both vertically & horizontally */}
            {/* 2) (below) Your main container: full height, not full width, rounded, no page scroll */}
            <div className="w-full max-w-3xl h-screen  bg-white rounded-2xl shadow-2xl/30 overflow-hidden">
                {/* Prevent page scroll; build a vertical layout inside */}
                <div className="flex h-full flex-col overflow-hidden ">
                    {/* 2) Image pinned to the top, spans full width of this container */}
                    <img
                        src={coverImage}
                        alt="Header"
                        className="w-full h-64 md:h40 flex-none"
                    />

                    {/* 3) Directions area under the image; sized to content */}
                    <div className="p-4 flex-none bg-amber-200 z-50 border-b-2 border-b-amber-400 text-sm">
                        <h2 className="text-lg font-semibold">
                            Welcome to Wonder World!
                        </h2>
                        <p className="text-slate-600">
                            The happiest place under the sun — where the fun
                            never stops and every visit brings something new to
                            discover.
                        </p>
                        <p className="text-slate-600 mt-4">
                            Meet <b>Botty</b>, our friendly AI concierge! Botty
                            can help you with anything from park hours and ride
                            info to food, restrooms, and nearby hotels. Just
                            type your question below and start exploring.
                        </p>

                        <CollapsibleBlock>
                            <div className="text-slate-600">
                                <b>Here are a few ideas to get you started:</b>
                                <ul className="list-disc ml-12">
                                    <li>
                                        My kids are 8 and 10, what rides would
                                        they like best?
                                    </li>
                                    <li>Where can I get an ice cream?</li>
                                    {/* <li>
                                    Can you tell me where there’s a bathroom
                                    with a changing table?
                                </li> */}
                                    <li>
                                        We love it here and want to come back
                                        tomorrow. What hotel do you recommend?
                                    </li>

                                    <li>What are your hours this weekend?</li>
                                </ul>
                            </div>
                        </CollapsibleBlock>
                    </div>

                    <div className="flex flex-col min-h-0 h-full">
                        <ChatBot />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
