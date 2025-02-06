import { useContext, memo, useEffect, useState } from "react";
import { TodoListCountHistoryContext } from "./TodoListContentHistory.jsx";
import { checkTokenValidity } from '../jwtUtil'
import axios from "axios";

const RemitCardListHistory = memo(()=>{
    const {setRemitCount} = useContext(TodoListCountHistoryContext);
    const token = checkTokenValidity();
    const [cardList, setCardList] = useState([]);
    const [detailInfo, setDetailInfo] = useState(null);
    
    //카드 리스트들을 불러옴.
    const fetchCardListData = async () => {
        try {
            const response = await axios.get(`/back/admin/endedMentoring/history`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }});
            setCardList(response.data.data);
            setRemitCount(response.data.data.length);
        } catch (err) {
            console.error(err);
        } finally {
        }
    };

    //처음 리렌더링 때 실행
    useEffect(() => {
        fetchCardListData();
    },[]);
    
    //송금 완료 처리
    const handleBtnDeposit = (id)=>{
        const fetchData = async () => {
            try {
                if(!confirm(
                    `멘토님께 송금 완료를 취소 처리 하시겠습니까?`
                )){
                    console.log("취소 작업이 중단되었습니다.");
                    return false;
                }
                const response = await axios.delete(`/back/admin/endedMentoring/history/${id}`, {
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
                const response = await axios.get(`/back/admin/endedMentoring/${id}`,
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
            <div className="card-list-wrap" id="remit">
                <div className="card-title-wrap">
                    <p className="title">멘토링 완료</p>
                    <p className="discript">멘토에게 송금 처리를 완료한 항목입니다.</p>
                </div>
                <div className="DepositCardList CardList">
                {cardList.map(card => (
                    <div className="card deposit-card" key={card.mentoringId}>
                        <div className="card-body">
                            <div className="list-wrap">
                                <div className="list-item">
                                    <div className="list-label">입금자명</div>
                                    <div className="list-content">{card.mentorName}</div>
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
                                    <div className="list-label">플랜가격</div>
                                    <div className="list-content">{`${card.planPrice.toLocaleString()} 원`}</div>
                                </div>
                            </div>
                            <div className="btns-wrap-hr">
                                <button className="btn btn-default" data-toggle="modal" data-target="#remitModal" onClick={()=>handleBtnDetail(card.mentoringId)}>상세보기</button>
                                <button className="btn btn-secondary" onClick={() => handleBtnDeposit(card.mentoringId)}>송금 완료 취소</button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>

                {/* Scrollable modal */}
                <div className="modal fade" id="remitModal">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">멘토링 완료 정보</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="list-wrap">
                                    <p className="list-title">송금할 멘티 정보</p>
                                    <div className="list-item">
                                        <div className="list-label">입금자명</div>
                                        <div className="list-content">{detailInfo?.mentorName}</div>
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
                                        <div className="list-label">플랜가격</div>
                                        <div className="list-content">{`${detailInfo?.planPrice.toLocaleString()} 원`}</div>
                                    </div>
                                </div>
                                <div className="list-wrap">
                                    <p className="list-title">멘토링 내용</p>
                                    <div className="list-item">
                                        <div className="list-label">멘토링 날짜</div>
                                        <div className="list-content">{detailInfo?.mentorOkDate}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">멘토링 위치</div>
                                        <div className="list-content">{detailInfo?.wishPosition}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">완료된 날짜</div>
                                        <div className="list-content">{detailInfo?.menteeOkDate}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">예약 상태</div>
                                        <div className="list-content">멘토링 완료</div>
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
                                    <div className="list-item">
                                        <div className="list-label">학과</div>
                                        <div className="list-content">{detailInfo?.menteeDepartment}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">학번</div>
                                        <div className="list-content">{detailInfo?.menteeStudentNumber}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">학년</div>
                                        <div className="list-content">{`${detailInfo?.menteeGrade}학년`}</div>
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
                                    <div className="list-item">
                                        <div className="list-label">학과</div>
                                        <div className="list-content">{detailInfo?.mentorDepartment}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">학번</div>
                                        <div className="list-content">{detailInfo?.mentorStudentNumber}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">학년</div>
                                        <div className="list-content">{`${detailInfo?.mentorGrade}학년`}</div>
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

export default RemitCardListHistory;