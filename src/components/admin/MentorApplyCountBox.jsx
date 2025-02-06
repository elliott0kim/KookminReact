import { useContext, memo } from "react";
import { TodoListCountContext } from "./TodoListContent.jsx";

const MentorApplyCountBox=memo(()=>{
    const {mentorApplyCount} = useContext(TodoListCountContext);

    return(
    <>
    <a href="#" className="CountBox DepositCountBox">
        <span className="num">{mentorApplyCount}</span>
        <span className="label">멘토 신청</span>
    </a>
    </>
    )
})

export default MentorApplyCountBox;