import { useContext, memo } from "react";
import { TodoListCountHistoryContext } from "./TodoListContentHistory.jsx";

const DepositCountBoxHistory=memo(()=>{
    const {depositCount} = useContext(TodoListCountHistoryContext);

    return(
    <>
    <a href="#deposit" className="CountBox DepositCountBox">
        <span className="num">{depositCount}</span>
        <span className="label">입금 대기</span>
    </a>
    </>
    )
})

export default DepositCountBoxHistory;