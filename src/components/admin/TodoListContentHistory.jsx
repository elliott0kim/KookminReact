import { useState } from "react";
import { createContext } from "react";

import HistoryCountList from './HistoryCountList.jsx';
import DepositCardListHistory from './DepositCardListHistory.jsx';
import RemitCardListHistory from './RemitCardListHistory.jsx';
import RefundCardListHistory from './RefundCardListHistory.jsx';

export const TodoListCountHistoryContext = createContext();

const TodoListContentHistory = ()=>{
    const [depositCount, setDepositCount] = useState(0);
    const [remitCount, setRemitCount] = useState(0);
    const [refundCount, setRefundCount] = useState(0);

    return(
        <>
            <TodoListCountHistoryContext.Provider
                    value={{
                        depositCount, setDepositCount, 
                        remitCount, setRemitCount,
                        refundCount, setRefundCount
                    }}
                        >
            <HistoryCountList />
            <div className="card-list-area">
                <DepositCardListHistory />
                <RemitCardListHistory />
                <RefundCardListHistory />
            </div>
            </TodoListCountHistoryContext.Provider>
        </>
    )
}

export default TodoListContentHistory;