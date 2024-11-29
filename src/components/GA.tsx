import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export function GAHeader() {
    // <head>에 스크립트 삽입
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M7K37DWS');
        `;
        document.head.appendChild(script);

        return () => {
            // Cleanup (optional)
            document.head.removeChild(script);
        };
    }, []);

    // <body>에 noscript 삽입
    useEffect(() => {
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M7K37DWS"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `;
        document.body.appendChild(noscript);

        return () => {
            // Cleanup (optional)
            document.body.removeChild(noscript);
        };
    }, []);

    return null; // 컴포넌트 자체는 UI를 렌더링하지 않음
}

export default GAHeader;
