import { useRef } from 'react';

type MyModalProps = {
    setNewRefundBank: (newRefundBank:string) => void;
    setNewRefundBankNum: (newRefundBankNum:string) => void;
    refundBank:string;
    refundBankNum:string;
    isOpen:boolean;
    onClose: () => void;
};

export const ChangeRefundInfo = ({setNewRefundBank, setNewRefundBankNum, refundBank, refundBankNum, isOpen, onClose}:MyModalProps) => {
    const newRefundBank = useRef<HTMLSelectElement>(null);
    const newRefundBankNum = useRef<HTMLSelectElement>(null);
    
    const closeCurrentModal = () => {
        if (newRefundBank.current?.value && newRefundBankNum.current?.value)
        {
            setNewRefundBank(newRefundBank.current?.value);
            setNewRefundBankNum(newRefundBankNum.current?.value);
        }
        
        onClose();
    }

    return (
        <div className="subpage-wrap mypage">
            <p className="page-title" style={{color:"#000", textAlign:"left"}}>환불 정보 변경</p>
            <br />
            <div className="card-body">
                <div className="list-wrap">
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">환불 은행명</div>
                        {refundBank && refundBank !== null?
                        <div className="list-content">
                            <input ref={newRefundBank} defaultValue={refundBank} type="text" name="department" className="form-control" style={{height:"20px", fontSize:"15px"}}/>
                            {/* <div>{department}</div> */}
                        </div>
                        :<div className="list-content">
                            <input ref={newRefundBank} type="text" name="department" className="form-control" style={{height:"20px", fontSize:"15px"}}/>
                        </div>
                        }
                    </div>
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">환불 계좌번호</div>
                        {refundBankNum && refundBankNum !== null?
                        <div className="list-content">
                            <input ref={newRefundBankNum} defaultValue={refundBankNum} type="number" name="department" className="form-control" style={{height:"20px", fontSize:"15px"}}/>
                        </div>
                        :<div className="list-content">
                            <input ref={newRefundBankNum} type="number" name="department" className="form-control" style={{height:"20px", fontSize:"15px"}}/>
                        </div>
                        }
                    </div>
                </div>
            </div>
            <br /><br /><br />
            <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => closeCurrentModal()} style={{backgroundColor:"#F68536", color:"#fff"}}>저장하기</a>
            </div>
        </div>
    );
};


export default ChangeRefundInfo;