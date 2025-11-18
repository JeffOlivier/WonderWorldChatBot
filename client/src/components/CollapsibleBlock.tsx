import React, { useEffect, useRef, useState } from 'react';
import { ChevronUp, ChevronDown } from './ui/chevrons.tsx';

type CollapsibleBlockProps = {
    introLabel?: string;
    closeLabel?: string;
    children: React.ReactNode; // the ideas content
    defaultOpen?: boolean;
    className?: string; // optional outer overrides
};

export default function CollapsibleBlock({
    introLabel = 'Click to meet Botty, our friendly AI concierge', //'Click to see a few ideas to get you started',
    closeLabel = 'Close',
    children,
    defaultOpen = false,
    className = '',
}: CollapsibleBlockProps) {
    const [open, setOpen] = useState(defaultOpen);
    const [maxH, setMaxH] = useState<number>(0);
    const regionRef = useRef<HTMLDivElement | null>(null);

    const regionId = 'ideas-region';

    // Measure inner content for smooth height animation.
    useEffect(() => {
        if (!regionRef.current) return;
        const el = regionRef.current;
        const resize = () => {
            // compute the natural height of the content
            const content = el.firstElementChild as HTMLElement | null;
            setMaxH(content ? content.scrollHeight + 18 : 0);
        };
        resize();
        // Recompute on resize/font loads
        const ro = new ResizeObserver(resize);
        ro.observe(el);
        return () => ro.disconnect();
    }, [children]);

    return (
        <section className={['mt-2', className].join(' ')}>
            {/* TOP trigger appears only when closed */}
            {!open && (
                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        aria-expanded={open}
                        aria-controls={regionId}
                        className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 underline underline-offset-4"
                    >
                        {introLabel}
                        {ChevronDown}
                    </button>
                </div>
            )}

            {/* Animated region */}
            <div
                id={regionId}
                role="region"
                aria-hidden={!open}
                ref={regionRef}
                style={{
                    maxHeight: open ? `${maxH}px` : '0px',
                    opacity: open ? 1 : 0,
                }}
                className={`
                    overflow-hidden transition-[max-height,opacity]
                    duration-300 ease-out
                `}
            >
                {/* Inner wrapper (measured) */}
                <div className="mt-1 md:mt-3 mb-2 md:mb-4 rounded-xl border-2 border-amber-400 bg-white/70 p-2 md:p-4 shadow-sm">
                    {children}

                    {/* BOTTOM trigger appears only when open */}
                    <div className="flex justify-end -mr-2">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-expanded={open}
                            aria-controls={regionId}
                            className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 underline underline-offset-4"
                        >
                            {closeLabel}
                            {ChevronUp}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
