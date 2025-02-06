import { useContext, memo } from "react";
import { TodoListCountContext } from "./TodoListContent.jsx";

const RemitCountBox=memo(()=>{
    const {remitCount} = useContext(TodoListCountContext);

    return(
    <>
    <a href="#remit" className="CountBox DepositCountBox">
        <span className="num">{remitCount}</span>
        <span className="label">멘토링 완료</span>
    </a>
    </>
    )
})

export default RemitCountBox;