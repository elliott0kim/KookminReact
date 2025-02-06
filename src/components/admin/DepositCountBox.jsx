import { useContext, memo } from "react";
import { TodoListCountContext } from "./TodoListContent.jsx";

const DepositCountBox=memo(()=>{
    const {depositCount} = useContext(TodoListCountContext);

    return(
    <>
    <a href="#deposit" className="CountBox DepositCountBox">
        <span className="num">{depositCount}</span>
        <span className="label">입금 대기</span>
    </a>
    </>
    )
})

export default DepositCountBox;