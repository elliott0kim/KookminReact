import { useState } from "react";
import { createContext } from "react";

import AdminCountList from './AdminCountList.jsx';
import DepositCardList from './DepositCardList.jsx';
import RemitCardList from './RemitCardList.jsx';
import RefundCardList from './RefundCardList.jsx';
import { Link } from "react-router-dom";

export const TodoListCountContext = createContext();

const TodoListContent = ()=>{
    const [depositCount, setDepositCount] = useState(0);
    const [remitCount, setRemitCount] = useState(0);
    const [refundCount, setRefundCount] = useState(0);

    return(
        <>
            <TodoListCountContext.Provider 
                    value={{
                        depositCount, setDepositCount, 
                        remitCount, setRemitCount,
                        refundCount, setRefundCount
                    }}
                        >
                <AdminCountList />
                <Link to="/admin/todoList/history" className="btn btn-line-white btn-todolist-history">처리 완료된 항목 보기</Link>
                <div className="card-list-area">
                    <DepositCardList />
                    <RemitCardList />
                    <RefundCardList />
                </div>
                
            </TodoListCountContext.Provider>
        </>
    )
}

export default TodoListContent;