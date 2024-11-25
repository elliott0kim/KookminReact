import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { checkTokenValidity } from '../components/jwtUtil';

// 로그인 상태의 타입 정의
interface LoginContextType {
    loginStatus: boolean;
    userId: string;
    setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

// Context의 기본 값 설정
const LoginContext = createContext<LoginContextType | undefined>(undefined);

interface LoginProviderProps {
    children: React.ReactNode;
}

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState<boolean | null>(null);
    useEffect(() => {
        const checkLoginStatus = async () => {
            // `checkTokenValidity`를 호출하여 로그인 상태를 체크
            const isValid = checkTokenValidity();  // 실제로 checkTokenValidity 함수로 값을 확인
            if (isValid == null)
            {
                setLoginStatus(false);
            }
            else
            {
                setLoginStatus(true);
            }
        };

        checkLoginStatus(); // 컴포넌트 마운트 시 로그인 상태 체크

    }, []);  // 빈 배열을 넣으면 컴포넌트가 처음 렌더링될 때만 실행됨

    if (loginStatus === null)
    {
      // loginStatus가 아직 설정되지 않았다면 로딩 상태를 보여줌
        return <div>Loading...</div>;
    }

    return (
        <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
            {children}
        </LoginContext.Provider>
    );
};

export { LoginProvider, LoginContext };
