import { useContext, memo, useEffect, useState } from "react";
import { TodoListCountContext } from "./TodoListContent.jsx";
import { checkTokenValidity } from '../jwtUtil'
import axios from "axios";

const RefundCardList = memo(()=>{
    const {setRefundCount} = useContext(TodoListCountContext);
    const token = checkTokenValidity();
    const [cardList, setCardList] = useState([]);
    const [detailInfo, setDetailInfo] = useState(null);
    
    //카드 리스트들을 불러옴.
    const fetchCardListData = async () => {
        try {
            const response = await axios.get(`/back/admin/stayRefund`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }});
            setCardList(response.data.data);
            setRefundCount(response.data.data.length);
        } catch (err) {
            console.error(err);
        } finally {
        }
    };

    //처음 리렌더링 때 실행
    useEffect(() => {
        fetchCardListData();
    },[]);
    
    //환불 완료 처리
    const handleBtnDeposit = (id)=>{
        const fetchData = async () => {
            try {
                if(!confirm(
                    `멘티님께 환불을 완료하였습니까?`
                )){
                    console.log("멘티 환불 완료 작업이 취소되었습니다.");
                    return false;
                }
                const response = await axios.put(`/back/admin/refund/${id}`,{}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                //입금 확인 처리 이후로도 한번 다시 카드 리스트를 불러옴.
                fetchCardListData();
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    };

    //상세보기
    const handleBtnDetail = (id) =>{
        const fetchData = async () => {
            try {
                const response = await axios.get(`/back/admin/stayRefund/${id}`,
                    {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data.data[0]);
                setDetailInfo(response.data.data[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }

    return(
        <>
            <div className="card-list-wrap" id="refund">
                <div className="card-title-wrap">
                    <p className="title">환불 대기</p>
                    <p className="discript">멘티에게 환불해주는 작업 필요</p>
                </div>
                <div className="DepositCardList CardList">
                {cardList.map(card => (
                    <div className="card deposit-card" key={card.refundId}>
                        <div className="card-body">
                            <div className="list-wrap">
                                <div className="list-item">
                                    <div className="list-label">멘티 이름</div>
                                    <div className="list-content">{card.menteeName}</div>
                                </div>
                                <div className="list-item">
                                    <div className="list-label">은행명</div>
                                    <div className="list-content">{card.bankName}</div>
                                </div>
                                <div className="list-item">
                                    <div className="list-label">계좌번호</div>
                                    <div className="list-content">{card.bankAccount}</div>
                                </div>
                                <div className="list-item">
                                    <div className="list-label">환불할 금액</div>
                                    <div className="list-content">{`${card.refundAmount.toLocaleString()} 원`}</div>
                                </div>
                                <div className="list-item">
                                    <div className="list-label">결제된 금액</div>
                                    <div className="list-content">{`${card.planPrice.toLocaleString()} 원`}</div>
                                </div>
                                <div className="list-item">
                                    <div className="list-label">신청한 날짜</div>
                                    <div className="list-content">{card.requestDate}</div>
                                </div>
                                <div className="list-item">
                                    <div className="list-label">멘토링 날짜</div>
                                    <div className="list-content">{card.mentorOkDate}</div>
                                </div>
                            </div>
                            <div className="btns-wrap-hr">
                                <button className="btn btn-default" data-toggle="modal" data-target="#refundModal" onClick={()=>handleBtnDetail(card.refundId)}>상세보기</button>
                                <button className="btn btn-primary" onClick={() => handleBtnDeposit(card.refundId)}>환불 완료</button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>

                {/* Scrollable modal */}
                <div className="modal fade" id="refundModal">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">환불 대기 정보</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="list-wrap">
                                    <p className="list-title">환불 정보</p>
                                    <div className="list-item">
                                        <div className="list-label">멘티 이름</div>
                                        <div className="list-content">{detailInfo?.menteeName}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">은행명</div>
                                        <div className="list-content">{detailInfo?.bankName}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">계좌번호</div>
                                        <div className="list-content">{detailInfo?.bankAccount}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">환불할 금액</div>
                                        <div className="list-content">{`${detailInfo?.refundAmount.toLocaleString()} 원`}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">결제된 금액</div>
                                        <div className="list-content">{`${detailInfo?.planPrice.toLocaleString()} 원`}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">신청한 날짜</div>
                                        <div className="list-content">{detailInfo?.requestDate}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">멘토링 날짜</div>
                                        <div className="list-content">{detailInfo?.mentorOkDate}</div>
                                    </div>
                                </div>
                                <div className="list-wrap">
                                    <p className="list-title">취소 신청자 정보</p>
                                    <div className="list-item">
                                        <div className="list-label">환불 주체</div>
                                        <div className="list-content">{detailInfo?.applicant}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">취소사유</div>
                                        <div className="list-content">{detailInfo?.reason}</div>
                                    </div>
                                </div>
                                <div className="list-wrap">
                                    <p className="list-title">멘티정보</p>
                                    <div className="list-item">
                                        <div className="list-label">닉네임</div>
                                        <div className="list-content">{detailInfo?.menteeNickname}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">이메일</div>
                                        <div className="list-content">{detailInfo?.menteeEmail}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">연락처</div>
                                        <div className="list-content">{detailInfo?.menteePhone}</div>
                                    </div>
                                </div>
                                <div className="list-wrap">
                                    <p className="list-title">멘토정보</p>
                                    <div className="list-item">
                                        <div className="list-label">닉네임</div>
                                        <div className="list-content">{detailInfo?.mentorNickname}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">이메일</div>
                                        <div className="list-content">{detailInfo?.mentorEmail}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">연락처</div>
                                        <div className="list-content">{detailInfo?.mentorPhone}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" aria-label="Close">확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default RefundCardList;