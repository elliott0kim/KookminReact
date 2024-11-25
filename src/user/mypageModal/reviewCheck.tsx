import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import { useState } from 'react';

interface mentoringInfoImpl {
    reservationId: string;
    applyDate: string;
    adminOkDate: string;
    adminOkTime: string;
    planPrice: number;
    currentDepartment: string;
    questionCategory: number;
    hopeDepartment: string;
    questionContent: string;
    wishPosition: string;
    menteeNickname:string;
    reviewTitle:string;
    reviewContent:string;
    reviewScore:string;
}

type MyModalProps = {
    mentoringInfo:mentoringInfoImpl;
    isOpen:boolean;
    onClose: () => void;
};

export const ReviewCheck = ({mentoringInfo, isOpen, onClose}:MyModalProps) => {
    console.log(mentoringInfo);
    const closeCurrentModal = () => {
        onClose();
    }

    let questionCategoryString = "";
    switch (mentoringInfo.questionCategory) {
        case 1:
            questionCategoryString = "전과";
            break;
        case 2:
            questionCategoryString = "복수전공";
            break;
        case 3:
            questionCategoryString = "부전공";
            break;
        case 4:
            questionCategoryString = "그외";
            break;

        default:
            questionCategoryString = "알수없음";
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
        <div className="subpage-wrap mypage">
            <p className="page-title" style={titleStyle}>{mentoringInfo.menteeNickname} 님이 남겨주신<br/> 소중한 후기입니다.</p>
            <div className="table-wrap">
                <table className="table table-borderless table-act mb-0">
                    <tr>
                        <td style={topStyle}>질문종류</td>
                        <td style={topStyle}>멘토링 일시</td>
                        <td style={topStyle}>만족도</td>
                        <td style={topStyle}>신청금액</td>
                    </tr>
                    <tr>
                        <td style={contentStyle}>{questionCategoryString}</td>
                        <td style={contentStyle}>{mentoringInfo.adminOkDate}&nbsp;{mentoringInfo.adminOkTime}</td>
                        <td style={contentStyle}>{mentoringInfo.reviewScore} %</td>
                        <td style={contentStyle}>{mentoringInfo.planPrice}</td>
                    </tr>
                </table>
            </div>
            <br/>
            <div style={{borderBottom: '1px solid #000'}}></div>
            <br/>
            <p className="page-title" style={subTitleStyle}>{mentoringInfo.reviewTitle}</p>
            <p className="page-title" style={subContentStyle}>{mentoringInfo.reviewContent}</p>
        </div>
    );
};


export default ReviewCheck;