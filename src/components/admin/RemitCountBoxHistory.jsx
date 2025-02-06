import { useContext, memo } from "react";
import { TodoListCountHistoryContext } from "./TodoListContentHistory.jsx";

const RemitCountBoxHistory=memo(()=>{
    const {remitCount} = useContext(TodoListCountHistoryContext);

    return(
    <>
    <a href="#remit" className="CountBox DepositCountBox">
        <span className="num">{remitCount}</span>
        <span className="label">멘토링 완료</span>
    </a>
    </>
    )
})

export default RemitCountBoxHistory;