// utils.ts (예시)
export const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) =>
        `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`
    ).join(''));
    return JSON.parse(jsonPayload);
};
export const checkTokenValidity = () => {
    const token = localStorage.getItem('kookminToken');
    
    if (token) 
    {
        const decoded = parseJwt(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime)
        {
            return token;
        } else {
            return null;
        }
    }
    else
    {
        return null;
    }
};

export const getTokenUserId = () => {
    const token = localStorage.getItem('kookminToken');
    
    if (token) 
    {
        const decoded = parseJwt(token);
        return decoded.socialId;
    }
    else
    {
        return null;
    }
};