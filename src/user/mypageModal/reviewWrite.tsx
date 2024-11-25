import { useState, useRef } from 'react';
import { ButtonTracking } from '../../components/ButttonTracking.js'

type MyModalProps = {
    adminOkDate:string;
    mentoNickname: string;
    questionCategory:number;
    planPrice:number;
    setReviewTitle: (reviewTitle:string) => void;
    setReviewContent: (reviewContent:string) => void;
    setReviewScore: (reviewScore:number) => void;
    isOpen:boolean;
    onClose: () => void;
};

export const ReviewWrite = ({adminOkDate, mentoNickname, questionCategory, planPrice, setReviewTitle, setReviewContent, setReviewScore, isOpen, onClose}:MyModalProps) => {
    const [currentReviewScore, setCurrentReviewScore] = useState<number | null>(null); // 선택된 시간 상태
    const handleReviewScore = (score:number) => {
        switch (score) {
            case 1:
                ButtonTracking(`/reviewWrite?nickname=${mentoNickname}`, "리뷰남기기 1점");
                break;
            case 2:
                ButtonTracking(`/reviewWrite?nickname=${mentoNickname}`, "리뷰남기기 2점");
                break;
            case 3:
                ButtonTracking(`/reviewWrite?nickname=${mentoNickname}`, "리뷰남기기 3점");
                break;
            case 4:
                ButtonTracking(`/reviewWrite?nickname=${mentoNickname}`, "리뷰남기기 4점");
                break;
            case 5:
                ButtonTracking(`/reviewWrite?nickname=${mentoNickname}`, "리뷰남기기 5점");
                break;
            case 6:
                ButtonTracking(`/reviewWrite?nickname=${mentoNickname}`, "리뷰남기기 6점");
                break;
            case 7:
                ButtonTracking(`/reviewWrite?nickname=${mentoNickname}`, "리뷰남기기 7점");
                break;
            default:
                
        }
        
        setCurrentReviewScore(score);
    }

    let questionCategoryString = "";
    switch (questionCategory) {
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

    const reviewTitle = useRef<HTMLTextAreaElement>(null); // ref 생성
    const reviewContent = useRef<HTMLTextAreaElement>(null); // ref 생성

    const closeCurrentModal = () => {
        if (reviewTitle.current?.value && reviewContent.current?.value && currentReviewScore)
        {
            setReviewTitle(reviewTitle.current?.value);
            setReviewContent(reviewContent.current?.value);
            setReviewScore(currentReviewScore);
        }
        else
        {
            alert("리뷰 및 별점을 기록하여 주세요.")
            return;
        }

        onClose();
    };

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
        color:"#F68536", 
        fontFamily: "Noto Sans KR", 
        fontSize: "12px", 
        fontStyle: "normal", 
        fontWeight: "360", 
        lineHeight: "20px", 
        letterSpacing: "-0.6px"
    }

    return (
        <div className="subpage-wrap review-write" style={{color:"#000", margin:"0 0 0 0", padding:"0 0 0 0"}}>
            <div className="container-fluid" style={{margin:"0 0 0 0", padding:"0 3px 0 3px"}}>
                <div className="write-area pt-5">
                    <p className="page-title" style={{color:"#000", textAlign:"left"}}>멘토링 리뷰작성</p>

                    <div className="table-wrap">
                        <table className="table table-borderless table-act mb-0">
                            <tr>
                                <td style={topStyle}>멘토링 일자</td>
                                <td style={topStyle}>멘토링 아이디</td>
                                <td style={topStyle}>질문 종류</td>
                                <td style={topStyle}>신청 금액</td>
                            </tr>
                            <tr>
                                <td style={contentStyle}>{adminOkDate}</td>
                                <td style={contentStyle}>{mentoNickname}</td>
                                <td style={contentStyle}>{questionCategoryString}</td>
                                <td style={contentStyle}>{planPrice}</td>
                            </tr>
                        </table>
                    </div>

                    <div className="form-group">
                        <label htmlFor="reviewText" style={{display: "flex", flexDirection: "column", alignItems: "flex-start", fontSize:"13px"}}>1. {mentoNickname} 멘토에게 리뷰 남기기</label>
                        <textarea ref={reviewTitle} className="form-control" name="reviewTitle" id="reviewText" placeholder="리뷰 제목을 입력하세요(50자 제한)" rows={1} maxLength={50} style={{fontSize:"13px"}}></textarea>
                        <textarea ref={reviewContent} className="form-control" name="reviewContent" id="reviewText" placeholder="리뷰 내용을 작성해주세요. (400자 제한) 두서 없이 작성해도 되니, 부담없이 작성해주세요." rows={10} maxLength={400} style={{fontSize:"13px"}}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reviewText" style={{display: "flex", flexDirection: "column", alignItems: "flex-start", fontSize:"13px"}}>2. {mentoNickname} 멘토가 제공한 멘토링에 얼마나 만족하셨나요?</label>
                        <label htmlFor="reviewText" style={{display: "flex", flexDirection: "column", alignItems: "flex-start", fontSize:"11px"}}>(1: 매우 불만족 / 4: 보통 / 7: 매우 만족)</label>
                        <br/>
                        <div className="custom-chk-btns" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                            <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                {currentReviewScore === 1?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(1)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>1</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(1)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>1</a>
                                }
                            </div>
                            <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                {currentReviewScore === 2?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(2)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>2</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(2)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>2</a>
                                }
                            </div>
                            <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                {currentReviewScore === 3?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(3)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>3</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(3)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>3</a>
                                }
                            </div>
                            <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                {currentReviewScore === 4?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(4)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>4</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(4)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>4</a>
                                }
                            </div>
                            <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                {currentReviewScore === 5?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(5)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>5</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(5)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>5</a>
                                }
                            </div>
                            <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                {currentReviewScore === 6?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(6)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>6</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(6)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>6</a>
                                }
                            </div>
                            <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                {currentReviewScore === 7?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(7)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>7</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(7)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>7</a>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                        <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => closeCurrentModal()} style={{backgroundColor:"#F68536", color:"#fff"}}>리뷰 제출</a>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ReviewWrite;


