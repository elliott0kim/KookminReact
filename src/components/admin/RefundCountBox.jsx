import { useContext, memo } from "react";
import { TodoListCountContext } from "./TodoListContent.jsx";

const RefundCountBox=memo(()=>{
    const {refundCount} = useContext(TodoListCountContext);

    return(
    <>
    <a href="#refund" className="CountBox DepositCountBox">
        <span className="num">{refundCount}</span>
        <span className="label">환불 대기</span>
    </a>
    </>
    )
})

export default RefundCountBox;