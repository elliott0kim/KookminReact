// Hotjar.js

import React, { useEffect } from 'react';

export function GAHeader () {
    useEffect(() => {
        // GA 스크립트 추가
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-Z6R1XSR92V';

        const script2 = document.createElement('script');
        script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-Z6R1XSR92V');
        `;
        document.head.appendChild(script2);
        document.head.appendChild(script1);

        return () => {
            // Cleanup (필요하면 제거 가능)
            document.head.removeChild(script1);
            document.head.removeChild(script2);
        };
    }, []);

    return null;
};

export default GAHeader;