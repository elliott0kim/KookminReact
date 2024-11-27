import { useState, useRef } from 'react';

type MyModalProps = {
    afterPaid:boolean;
    setCancelRefundBankNum: (reason:string) => void;
    setCancelRefundBank: (reason:string) => void;
    setReason: (reason:number) => void;
    isOpen:boolean;
    onClose: () => void;
};

export const Cancel = ({afterPaid, setCancelRefundBankNum, setCancelRefundBank, setReason, isOpen, onClose}:MyModalProps) => {
    const refundBankNum = useRef<HTMLSelectElement>(null);
    const refundBank = useRef<HTMLSelectElement>(null);

    const [selectedReason, setSelectedReason] = useState<number | null>(null); // 선택된 시간 상태

    const handleSelectedReason = (reason:number) => {
        setSelectedReason(reason);
    }

    const closeCurrentModal = () => {
        if (selectedReason == null)
        {
            alert("취소 사유를 선택하여주세요.");
            return;
        }

        if (afterPaid)
        {
            if (refundBank.current?.value && refundBankNum.current?.value)
            {
                setCancelRefundBankNum(refundBankNum.current?.value);
                setCancelRefundBank(refundBank.current?.value);
            }
            else
            {
                alert("환불 계좌번호와 환불 은행명을 입력하여주세요");
                return;
            }
        }

        setReason(selectedReason);
        onClose();
    }

    return (
        <div className="subpage-wrap mypage modal-common modal-cancel">
            <div className="modal-title-wrap">
                <p className="page-title">멘토링 취소</p>
                <button className="btn-ico-only" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <p className="page-title visual-txt-sm">멘토링 취소 사유를 선택해주세요</p>
            <div className="btns-wrap bottom-btns-wrap pb-2" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                {selectedReason === 0?
                <a className="btn btn-line-white btn-refund btn-refund-edit choice-list on" onClick={() => handleSelectedReason(0)} >1. 수업 참석</a>
                :<a className="btn btn-line-white btn-refund btn-refund-edit choice-list" onClick={() => handleSelectedReason(0)}>1. 수업 참석</a>
                }
            </div>
            <div className="btns-wrap bottom-btns-wrap pb-2" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                {selectedReason === 1?
                <a className="btn btn-line-white btn-refund btn-refund-edit choice-list on" onClick={() => handleSelectedReason(1)} >2. 알바 및 인턴</a>
                :<a className="btn btn-line-white btn-refund btn-refund-edit choice-list" onClick={() => handleSelectedReason(1)}>2. 알바 및 인턴</a>
                }
            </div>
            <div className="btns-wrap bottom-btns-wrap pb-2" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                {selectedReason === 2?
                <a className="btn btn-line-white btn-refund btn-refund-edit choice-list on" onClick={() => handleSelectedReason(2)} >3. 개인 사정 (친구, 애인, 가족 등)</a>
                :<a className="btn btn-line-white btn-refund btn-refund-edit choice-list" onClick={() => handleSelectedReason(2)}>3. 개인 사정 (친구, 애인, 가족 등)</a>
                }
            </div>
            <div className="btns-wrap bottom-btns-wrap pb-2" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                {selectedReason === 3?
                <a className="btn btn-line-white btn-refund btn-refund-edit choice-list on" onClick={() => handleSelectedReason(3)} >4. 질병 및 질환</a>
                :<a className="btn btn-line-white btn-refund btn-refund-edit choice-list" onClick={() => handleSelectedReason(3)}>4. 질병 및 질환</a>
                }
            </div>
            <div className="btns-wrap bottom-btns-wrap pb-2" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                {selectedReason === 4?
                <a className="btn btn-line-white btn-refund btn-refund-edit choice-list on" onClick={() => handleSelectedReason(4)} >5. 예약 내용 작성 실수 / 오류</a>
                :<a className="btn btn-line-white btn-refund btn-refund-edit choice-list" onClick={() => handleSelectedReason(4)}>5. 예약 내용 작성 실수 / 오류</a>
                }
            </div>
            <div className="btns-wrap bottom-btns-wrap pb-2" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                {selectedReason === 5?
                <a className="btn btn-line-white btn-refund btn-refund-edit choice-list on" onClick={() => handleSelectedReason(5)} >6. 날짜 선택 실수 / 오류</a>
                :<a className="btn btn-line-white btn-refund btn-refund-edit choice-list" onClick={() => handleSelectedReason(5)}>6. 날짜 선택 실수 / 오류</a>
                }
            </div>
            <div className='default-txt mt-2 mb-3'>
                선택해주신 내용을 토대로<br/>신청하신 멘토/멘티 님에게<br/>취소 사유를 전달드릴 예정입니다.
            </div>

            {afterPaid?
            <div className="card-body">
                <div className="list-wrap">
                    <div className="list-item">
                        <div className="list-label">환불 계좌번호</div>
                        <input ref={refundBankNum} type="text" name="department" className="form-control"/>
                    </div>
                    <div className="list-item">
                        <div className="list-label">환불 은행명</div>
                        <input ref={refundBank} type="text" name="department" className="form-control"/>
                    </div>
                    <div className="list-item">
                        <div className="refund-alert-txt mt-2 mb-3">
                            *환불 정책<br/>
                            &nbsp;&nbsp;-  예약 확정 48시간 이내 취소시 50% 환불<br/>
                            &nbsp;&nbsp;-  예약 확정 24시간 이내 취소시 환불 불가<br/>
                            &nbsp;&nbsp;-  관련 문의: 010-4059-3741 (박현준PM)
                        </div>
                    </div>
                </div>
            </div>
            :<div></div>
            }

            <div className="btns-wrap bottom-btns-wrap pb-2" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => closeCurrentModal()} style={{backgroundColor:"#FF4D4D", color:"#fff"}}>취소하기</a>
            </div>
        </div>
    );
};


export default Cancel;