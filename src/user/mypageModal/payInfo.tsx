type MyModalProps = {
    isOpen:boolean;
    onClose: () => void;
};

export const PayInfo = ({isOpen, onClose}:MyModalProps) => {
    const closeCurrentModal = async () => {
        try {
            await navigator.clipboard.writeText("신한은행 110-454-977350");
            alert("계좌번호가 클립보드에 복사되었습니다!");
        } catch (err) {
            console.error("클립보드 복사 실패:", err);
            alert("계좌번호 복사를 실패했습니다.");
        }
        onClose();
    };

    return (
        <div className="subpage-wrap mypage modal-common modal-pay-info">
            <div className="modal-title-wrap">
                <p className="page-title">멘토링 입금 정보</p>
                <button className="btn-ico-only" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <p className="page-title visual-txt-sm more-small pb-0">입금을 위한 계좌번호를 확인해주세요.</p>
            <br />
            <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                <a className="btn btn-line-white btn-refund btn-refund-edit black-info-card">
                    <div>입금 계좌정보</div>
                    <div className="txt-orange pt-2">신한은행 110-454-977350  4,500원  닉네임</div>
                </a>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                <div className="txt-alert-danger">🚨<span className="font-weight-bold">입금자명은 <span style={{textDecoration:"underline"}}>닉네임</span></span>을 적어주세요!🚨</div>
                <div className="txt-alert-danger">🚨닉네임이 없을 시에는 입금 확인이 불가능합니다.🚨</div>
                <div className="txt-alert-danger">🚨닉네임이 기입되어있는지 꼭! 확인해주세요!🚨</div>
                
            </div>
            
            <div className="btns-wrap bottom-btns-wrap pb-3 mt-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => closeCurrentModal()} style={{backgroundColor:"#F68536", color:"#fff"}}>계좌번호 및 금액 복사하기</a>
            </div>
        </div>
    );
};


export default PayInfo;