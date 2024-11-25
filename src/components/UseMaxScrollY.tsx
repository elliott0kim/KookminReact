import { useState, useEffect, useRef } from 'react';

const useMaxScrollY = () => {
    const [maxScrollY, setMaxScrollY] = useState(0);
    const maxScrollYRef = useRef(maxScrollY);  // useRef로 최신 값을 저장

    const updateMaxScrollY = () => {
        const currentScrollY = window.scrollY || document.documentElement.scrollTop;
        // 현재 스크롤 위치와 기록된 최대값을 비교
        // console.log("현재 스크롤", currentScrollY);
        // console.log("기록된 최대 스크롤", maxScrollY); // 여기서 maxScrollY는 이전 값일 수 있음

        // 상태 업데이트가 비동기적이라면, `maxScrollY`를 직접 비교하는 대신, currentScrollY와 비교
        setMaxScrollY(prevMaxScrollY => {
            if (currentScrollY > prevMaxScrollY) {
                // console.log("최댓값 갱신댐..");
                return currentScrollY; // 이전 상태값을 기준으로 최댓값을 갱신
            }
            return prevMaxScrollY; // 상태가 바뀌지 않도록 반환
        });
    };

    useEffect(() => {
        // useRef를 최신 값으로 업데이트
        maxScrollYRef.current = maxScrollY;

        // 스크롤 이벤트 리스너 추가
        window.addEventListener('scroll', updateMaxScrollY);

        // 컴포넌트 언마운트 시 리스너 제거
        return () => {
            window.removeEventListener('scroll', updateMaxScrollY);
        };
    }, [maxScrollY]); // maxScrollY가 변경될 때마다 maxScrollYRef를 업데이트

    return [maxScrollY, maxScrollYRef]; // Ref와 State를 함께 반환
};

export default useMaxScrollY;
