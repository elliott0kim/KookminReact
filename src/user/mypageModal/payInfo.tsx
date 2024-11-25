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
        <div className="subpage-wrap mypage">
            <p className="page-title" style={{color:"#000", textAlign:"left"}}>입금을 위한 계좌번호를 확인해주세요.</p>
            <br />
            <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                <a className="btn btn-line-white btn-refund btn-refund-edit" style={{backgroundColor:"#303030", color:"#fff", display: "flex", flexDirection: "column", alignItems: "flex-start", height:"60px"}}>
                    <div style={{color: "#FFF", fontFamily: "Noto Sans KR", fontSize: "13px", fontStyle: "normal", fontWeight: "500", lineHeight: "22px", letterSpacing: "-0.56px"}}>입금 계좌정보</div>
                    <div style={{color: "#F68536", fontFamily: "Noto Sans KR", fontSize: "13px", fontStyle: "normal", fontWeight: "500", lineHeight: "22px", letterSpacing: "-0.56px"}}>신한은행 110-454-977350  4,500원  닉네임</div>
                </a>
            </div>
            <br/><br/>
            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                <div style={{color: "#FF4D4D", fontFamily: "Noto Sans KR", fontSize: "11px", fontStyle: "normal", fontWeight: "400", lineHeight: "22px", letterSpacing: "-0.56px"}}>🚨입금자명은 닉네임을 적어주세요!🚨</div>
                <div style={{color: "#FF4D4D", fontFamily: "Noto Sans KR", fontSize: "11px", fontStyle: "normal", fontWeight: "400", lineHeight: "22px", letterSpacing: "-0.56px"}}>🚨닉네임이 없을 시에는 입금 확인이 불가능합니다.🚨</div>
                <div style={{color: "#FF4D4D", fontFamily: "Noto Sans KR", fontSize: "11px", fontStyle: "normal", fontWeight: "400", lineHeight: "22px", letterSpacing: "-0.56px"}}>🚨닉네임이 기입되어있는지 꼭! 확인해주세요!🚨</div>
                <br/>
            </div>
            <br/><br/>
            <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => closeCurrentModal()} style={{backgroundColor:"#F68536", color:"#fff"}}>계좌번호 및 금액 복사하기</a>
            </div>
        </div>
    );
};


export default PayInfo;