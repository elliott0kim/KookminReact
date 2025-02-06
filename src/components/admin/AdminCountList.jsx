import DepositCountBox from "./DepositCountBox.jsx";
import RemitCountBox from "./RemitCountBox.jsx";
import RefundCountBox from "./RefundCountBox.jsx";
import MentorApplyCountBox from "./MentorApplyCountBox.jsx";

import { useEffect, useState } from "react";

const AdminCountList = ()=>{
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
            <DepositCountBox />
            <RemitCountBox />
            <RefundCountBox />
            {/* <MentorApplyCountBox /> */}
        </div>
    </>)
}
export default AdminCountList;