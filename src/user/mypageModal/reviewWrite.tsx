import { useState, useRef } from 'react';
import { ButtonTracking } from '../../components/ButttonTracking.js'

type MyModalProps = {
    adminOkDate:string;
    mentoNickname: string;
    questionCategory:string;
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
        <div className="subpage-wrap review-write modal-common modal-review-check">
            <div className="modal-title-wrap">
                <p className="page-title">후기 작성</p>
                <button className="btn-ico-only" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <div className="write-area">
                    <p className="page-title visual-txt-sm">멘토링 리뷰작성</p>

                    <div className="table-wrap table-summary-wrap">
                        <table className="table table-borderless table-act mb-0 table-summary">
                            <tr>
                                <td>멘토링 일자</td>
                                <td>멘토링 아이디</td>
                                <td>질문 종류</td>
                                <td>신청 금액</td>
                            </tr>
                            <tr>
                                <td>{adminOkDate.slice(0,16)}</td>
                                <td>{mentoNickname}</td>
                                <td>{questionCategory}</td>
                                <td>{planPrice}</td>
                            </tr>
                        </table>
                    </div>

                    <div className="form-group">
                        <label htmlFor="reviewText" className='form-label w-100 pt-3'>1. {mentoNickname} 멘토에게 리뷰 남기기</label>
                        <textarea ref={reviewTitle} className="form-control default-txt" name="reviewTitle" id="reviewText" placeholder="리뷰 제목을 입력하세요(50자 제한)" rows={1} maxLength={50}></textarea>
                        <textarea ref={reviewContent} className="form-control default-txt mt-2" name="reviewContent" id="reviewText" placeholder="리뷰 내용을 작성해주세요. (400자 제한) 두서 없이 작성해도 되니, 부담없이 작성해주세요." rows={7} maxLength={400}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reviewText" className='form-label w-100 pt-0 mb-1'>2. {mentoNickname} 멘토가 제공한 멘토링에 얼마나 만족하셨나요?</label>
                        <label htmlFor="reviewText" className='form-label w-100'>(1: 매우 불만족 / 4: 보통 / 7: 매우 만족)</label>
                        <br/>
                        <div className="custom-chk-btns" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                        {currentReviewScore === 1?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(1)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>1</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(1)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>1</a>
                                }
                                {currentReviewScore === 2?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(2)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>2</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(2)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>2</a>
                                }
                                {currentReviewScore === 3?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(3)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>3</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(3)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>3</a>
                                }
                                {currentReviewScore === 4?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(4)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>4</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(4)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>4</a>
                                }
                                {currentReviewScore === 5?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(5)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>5</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(5)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>5</a>
                                }
                                {currentReviewScore === 6?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(6)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>6</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(6)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>6</a>
                                }
                                {currentReviewScore === 7?
                                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(7)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#F68536", color:"#fff", height:"30px", width:"30px"}}>7</a>
                                :<a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => handleReviewScore(7)} style={{display: "flex", textAlign: "center", borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536", height:"30px", width:"30px"}}>7</a>
                                }
                        </div>
                    </div>
                    <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                        <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => closeCurrentModal()} style={{backgroundColor:"#F68536", color:"#fff"}}>리뷰 제출</a>
                    </div>
                </div>
        </div>
    );
};


export default ReviewWrite;