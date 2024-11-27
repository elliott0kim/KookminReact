import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import { useState } from 'react';

interface mentoringInfoImpl {
    mentoringId: number;
    applyDate: string;
    confirmDate: string;
    mentorDepartment: string;
    planPrice: number;
    mentorNickname: string;
    menteeNickname: string;
    questionCategory: string;
    hopeDepartment: string;
    questionContent: string;
    wishPosition: string;
}

interface reviewCheckInfoImpl {
    reviewScore: number;
    reviewTitle: string;
    reviewContent: string;
    reviewDate: string;
}


type MyModalProps = {
    mentoringInfo:mentoringInfoImpl;
    reviewCheckInfo:reviewCheckInfoImpl;
    isOpen:boolean;
    onClose: () => void;
};

export const ReviewCheck = ({mentoringInfo, reviewCheckInfo, isOpen, onClose}:MyModalProps) => {
    const closeCurrentModal = () => {
        onClose();
    }

    const titleStyle = {
        color:"#F68536", 
        textAlign:"left",
        fontFamily: "Noto Sans KR", 
        fontSize: "18px", 
        fontStyle: "normal", 
        fontWeight: "700", 
        lineHeight: "28px", 
        letterSpacing: "-0.9px"
    }

    const topStyle = {
        color:"#303030", 
        fontFamily: "Noto Sans KR", 
        fontSize: "12px", 
        fontStyle: "normal", 
        fontWeight: "300", 
        lineHeight: "20px", 
        letterSpacing: "-0.6px"
    }

    const contentStyle = {
        color:"#303030", 
        fontFamily: "Noto Sans KR", 
        fontSize: "12px", 
        fontStyle: "normal", 
        fontWeight: "360", 
        lineHeight: "20px", 
        letterSpacing: "-0.6px"
    }


    const subTitleStyle = {
        color:"#000", 
        textAlign:"left",
        fontFamily: "Noto Sans KR", 
        fontSize: "13px", 
        fontStyle: "normal", 
        fontWeight: "700", 
        lineHeight: "28px", 
        letterSpacing: "-0.9px"
    }

    const subContentStyle = {
        color:"#303030", 
        textAlign:"left",
        fontFamily: "Noto Sans KR", 
        fontSize: "12px", 
        fontStyle: "normal", 
        fontWeight: "360", 
        lineHeight: "20px", 
        letterSpacing: "-0.6px"
    }

    return (
        <div className="subpage-wrap mypage modal-common modal-review-check">
            <div className="modal-title-wrap">
                <p className="page-title">후기 확인</p>
                <button className="btn-ico-only" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <p className="page-title visual-txt">{mentoringInfo.menteeNickname} 님이 남겨주신<br/> 소중한 후기입니다.</p>
            <div className="table-wrap table-summary-wrap">
                <table className="table table-borderless table-act mb-0 table-summary">
                    <tr>
                        <td>질문종류</td>
                        <td>멘토링 일시</td>
                        <td>만족도</td>
                        <td>신청금액</td>
                    </tr>
                    <tr>
                        <td>{mentoringInfo.questionCategory}</td>
                        <td>{mentoringInfo.confirmDate.slice(0,16)}&nbsp;{mentoringInfo.adminOkTime}</td>
                        <td>{Math.floor((reviewCheckInfo.reviewScore / 7) * 100)} %</td>
                        <td>{mentoringInfo.planPrice}</td>
                    </tr>
                </table>
            </div>
            <p className="review-title">{reviewCheckInfo.reviewTitle}</p>
            <p className="review-content">{reviewCheckInfo.reviewContent}</p>
        </div>
    );
};


export default ReviewCheck;