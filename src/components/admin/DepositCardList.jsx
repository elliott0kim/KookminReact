import { useContext, memo, useEffect, useState } from "react";
import { TodoListCountContext } from "./TodoListContent.jsx";
import { checkTokenValidity } from '../jwtUtil'
import axios from "axios";

const DepositCardList = memo(()=>{
    const {setDepositCount} = useContext(TodoListCountContext);
    const token = checkTokenValidity();
    const [cardList, setCardList] = useState([]);
    const [detailInfo, setDetailInfo] = useState(null);
    
    //카드 리스트들을 불러옴.
    const fetchCardListData = async () => {
        try {
            const response = await axios.get(`/back/admin/stayDeposit`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }});
            setCardList(response.data.data);
            setDepositCount(response.data.data.length);
        } catch (err) {
            console.error(err);
        } finally {
        }
    };

    //처음 리렌더링 때 실행
    useEffect(() => {
        fetchCardListData();
    },[]);
    
    //입금 확인 처리
    const handleBtnDeposit = (id)=>{
        const fetchData = async () => {
            try {
                if(!confirm(
                    `멘티님의 입금을 확인하셨습니까?`
                )){
                    console.log("멘티 입금 완료 작업이 취소되었습니다.");
                    return false;
                }
                const response = await axios.put(`/back/admin/reservation/${id}`,{}, {
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

    const handleBtnDetail = (id) =>{
        const fetchData = async () => {
            try {
                const response = await axios.get(`/back/admin/stayDeposit/${id}`,
                    {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDetailInfo(response.data.data[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }

    return(
        <>
            <div className="card-list-wrap" id="deposit">
                <div className="card-title-wrap">
                    <p className="title">입금대기</p>
                    <p className="discript">멘티 입금을 확인하는 작업 필요</p>
                </div>
                <div className="DepositCardList CardList">
                {cardList.map(card => (
                    <div className="card deposit-card" key={card.reservationId}>
                        <div className="card-body">
                            <div className="list-wrap">
                                <div className="list-item">
                                    <div className="list-label">입금자명</div>
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
                                    <div className="list-label">플랜가격</div>
                                    <div className="list-content">{`${card.planPrice.toLocaleString()} 원`}</div>
                                </div>
                            </div>
                            <div className="btns-wrap-hr">
                                <button className="btn btn-default" data-toggle="modal" data-target="#depositModal" onClick={()=>handleBtnDetail(card.reservationId)}>상세보기</button>
                                <button className="btn btn-primary" onClick={() => handleBtnDeposit(card.reservationId)}>입금 확인</button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>

                {/* Scrollable modal */}
                <div className="modal fade" id="depositModal">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">멘티 입금 대기 정보</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="list-wrap">
                                    <p className="list-title">입금할 멘티 정보</p>
                                    <div className="list-item">
                                        <div className="list-label">입금자명</div>
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
                                        <div className="list-label">플랜가격</div>
                                        <div className="list-content">{`${detailInfo?.planPrice.toLocaleString()} 원`}</div>
                                    </div>
                                </div>
                                <div className="list-wrap">
                                    <p className="list-title">멘토링 내용</p>
                                    <div className="list-item">
                                        <div className="list-label">플랜명</div>
                                        <div className="list-content">{detailInfo?.planName}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">질문 타입</div>
                                        <div className="list-content">{detailInfo?.questionCategory}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">질문 내용</div>
                                        <div className="list-content">{detailInfo?.questionContent}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">신청한 날짜</div>
                                        <div className="list-content">{detailInfo?.applyDate}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">희망한 날짜</div>
                                        <div className="list-content">
                                            {detailInfo?.wishDates[0]}<br />
                                            {detailInfo?.wishDates[1]}<br />
                                            {detailInfo?.wishDates[2]}<br />
                                        </div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">멘토링 위치</div>
                                        <div className="list-content">{detailInfo?.wishPosition}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">예약 상태</div>
                                        <div className="list-content">입금대기</div>
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

export default DepositCardList;