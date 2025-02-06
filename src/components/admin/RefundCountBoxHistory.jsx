import { useContext, memo } from "react";
import { TodoListCountHistoryContext } from "./TodoListContentHistory.jsx";

const RefundCountBoxHistory=memo(()=>{
    const {refundCount} = useContext(TodoListCountHistoryContext);

    return(
    <>
    <a href="#refund" className="CountBox DepositCountBox">
        <span className="num">{refundCount}</span>
        <span className="label">환불 대기</span>
    </a>
    </>
    )
})

export default RefundCountBoxHistory;