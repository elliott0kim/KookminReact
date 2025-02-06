import DepositCountBoxHistory from "./DepositCountBoxHistory.jsx";
import RemitCountBoxHistory from "./RemitCountBoxHistory.jsx";
import RefundCountBoxHistory from "./RefundCountBoxHistory.jsx";

import { useEffect, useState } from "react";

const HistoryCountList = ()=>{
    const [isFloating, setIsFloating] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY; // 현재 스크롤 위치
            if (scrollPosition > 100) { // 200px 이상이면 floating 추가
                setIsFloating(true);
            } else {
                setIsFloating(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return(
    <>
        <div className={`AdminCountList ${isFloating ? "floating" : ""}`}>
            <DepositCountBoxHistory />
            <RemitCountBoxHistory />
            <RefundCountBoxHistory />
        </div>
    </>)
}
export default HistoryCountList;