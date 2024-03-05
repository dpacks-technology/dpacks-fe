'use client';

import { useState, useLayoutEffect } from 'react';

const useDarkMode = () => {
    const isWindowDefined = typeof window !== 'undefined';

    const [isDarkMode, setIsDarkMode] = useState(async () => {
        if (isWindowDefined) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useLayoutEffect(() => {
        if (isWindowDefined) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

            const handleChange = () => {
                setIsDarkMode(mediaQuery.matches);
            };

            mediaQuery.addListener(handleChange);

            return () => {
                mediaQuery.removeListener(handleChange);
            };
        }
    }, [isWindowDefined]);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;

