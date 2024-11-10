import React from 'react';

interface ContentRect {
    width: number;
    height: number;
}

const useWatchResize = function<T extends React.RefObject<HTMLElement>>(ref: T, callback?: (args: ContentRect) => void): ContentRect {
    const [ contentRect, setContentRect ] = React.useState<ContentRect>({  width: 0, height: 0 });

    React.useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            const contentRect = (({ width, height }) => ({ width, height }))(entry.contentRect);
            setContentRect(contentRect);
            callback?.(contentRect);
        });
        if (ref.current) observer.observe(ref.current as HTMLElement);

        return () => observer.disconnect();
    }, [ref]);
    
    return contentRect;
};

export default useWatchResize;
