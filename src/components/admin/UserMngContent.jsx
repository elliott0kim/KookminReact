
import IcoSearch from '../../assets/ico_search.svg';
import IcoTabsBan from '../../assets/ico_tabs_ban.svg';
import IcoTabsMail from '../../assets/ico_tabs_mail.svg';
import IcoTabsComment from '../../assets/ico_tabs_comment.svg';
import IcoDelete from "../../assets/ico_delete.svg";

import { checkTokenValidity } from '../../components/jwtUtil';
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from 'react';

const UserMngContent = ()=>{
    const token = checkTokenValidity();
    const [userList, setUserList] = useState([]);
    const [userCommentList, setUserCommentList] = useState([]);

    const [keyword, setKeyword] = useState("");
    const [comment, setComment] = useState("");
    const [mailTitle, setMailTitle] = useState("");
    const [mailContent, setMailContent] = useState("");
    const [banInfo, setBanInfo] = useState(null);
    const [banReason, setBanReason] = useState("사칭 및 사기");
    const [banReasonInput, setBanReasonInput] = useState("");
    const [banType, setBanType] = useState("CAVEAT");
    const [period, setPeriod] = useState("1");
    const [banEndReason, setBanEndReason] = useState("");
    const [banId, setBanId] = useState(-1);
    
    //회원들을 불러옴
    useEffect(()=>{
        const fetchCardListData = async () => {
            try {
                const response = await axios.get(`/back/admin/members`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
                setUserList(response.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCardListData();
    },[]);

    //조회 input
    const handleUserSearch = (e) =>{
        setKeyword(e.target.value);
    }

    //회원 검색
    const userSearchFunc = () => {
        const fetchCardListData = async () => {
            try {
                const response = await axios.get(`/back/admin/members/search?keyword=${keyword}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
                setUserList(response.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCardListData();
    }
    const handleBtnSearch = () => {
        userSearchFunc();
    }
    const handleUserSearchEnter = (e)=>{
        if (e.key === "Enter") {
            userSearchFunc();
        }
    }

    //해당 회원의 코멘트들을 조회
    const handleUserMng = (id) => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/back/admin/comment/${id}`,
                    {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserCommentList(response.data.data);

                //차단 상태인지도 확인
                handleBtnCheckCurrentBan(id);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }

    //코멘트 지우기 버튼
    const handleBtnCommentReset = () => {
        setComment("");
    }

    //코멘트 쓰기 textarea 높이 설정 및 글자 바꾸기
    const handleComment = (e) => {
        setComment(e.target.value);
    };

    //코멘트 등록
    const handleBtnCommentOk = (memeberId) => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`/back/admin/comment/${memeberId}`,{
                    "content": comment
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                //코멘트 등록 후 코멘트 쓴 것들 지워주기
                setComment("");

                //다시 코멘트 불러오기
                handleUserMng(memeberId);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }

    //코멘트 삭제 버튼
    const handleBtnCommentDel = (commentId, memberId) => {
        const fetchData = async () => {
            try {
                if(!confirm("정보를 삭제하시겠습니까? (이 작업은 되돌릴 수 없습니다)")){
                    return false;
                }

                const response = await axios.delete(`/back/admin/comment/${commentId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                //다시 코멘트 불러오기
                handleUserMng(memberId);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }

    //메일 제목 
    const handleMailTitle = (e) =>{
        setMailTitle(e.target.value);
    }

    //메일 내용
    const handleMailContent = (e) => {
        setMailContent(e.target.value);
    }
    
    //메일 내용 지우기 버튼
    const handleBtnMailReset = () => {
        setMailTitle("");
        setMailContent("");
    }

    //메일 발송 버튼
    const handleBtnMailSend = (memberId) => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`/back/admin/email/${memberId}`,{
                    "title": mailTitle,
                    "content": mailContent
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                //메일 발송 후 내용들 지워주기
                setMailTitle("");
                setMailContent("");
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }

    //먼저 이 사람이 차단 상태인지 확인하기
    const handleBtnCheckCurrentBan = (memberId) => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/back/admin/banned/${memberId}`,
                    {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setBanInfo(null);
                if(response.data.data.length === 1){
                    setBanInfo(response.data.data[0]);
                    setBanId(response.data.data[0].bannedId);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }
    
    //차단 사유 라디오 버튼
    const handleBanReasonInput = (e) => {
        setBanReasonInput(e.target.value);
    }

    const handleBanReason = (e) => {
        setBanReason(e.target.value);
    }

    //차단 타입 라디오 버튼
    const handleBanType = (e) => {
        setBanType(e.target.value);
    }

    //차단 기간 라디오 버튼
    const handlePeriod = (e) =>{
        setPeriod(e.target.value);
    }

    //차단 해제 사유 
    const handleBanEndReason = (e) => {
        setBanEndReason(e.target.value)
    }

    //차단 정보 초기화 버튼
    const handleBtnResetBanInfo = () => {
        setBanReason("사칭 및 사기");
        setBanReasonInput("");
        setBanType("CAVEAT");
        setPeriod("1");
    }

    //차단 하기
    const handleBtnBan = (memberId) =>{
        const fetchData = async () => {
            const reason = banReason === "직접 입력"? banReasonInput : banReason;
            const type = banType;
            const banPeriod = banType === "CAVEAT" ? 0 : Number(period);
            try {
                const response = await axios.post(`/back/admin/banned/${memberId}`,{
                    "reason":reason,
                    "type":type,
                    "period":banPeriod
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                //차단 후, 코멘트 및 차단 상태 업데이트
                handleUserMng(memberId);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }

    // 차단 해제 사유 지우기 버튼
    const handleBtnResetBanEndReason = ()=>{
        setBanEndReason("");
    }

    //차단 해제 하기
    const handleBtnBanEnd = (memberId) =>{
        const fetchData = async () => {
            try {
                const response = await axios.put(`/back/admin/banned/${memberId}`,{
                    "endReason":banEndReason,
                    "bannedId": banId
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                //차단 후, 코멘트 및 차단 상태 업데이트
                handleUserMng(memeberId);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }

    return(
        <div className="UserMngContent">
            <div className="form-group form-group-hr search-user">
                <input 
                type="text" 
                className="form-control" 
                placeholder='이름, 닉네임, 이메일 검색'
                value={keyword}
                onChange={handleUserSearch}
                onKeyDown={handleUserSearchEnter}
                />
                <button className="btn btn-primary btn-icon" onClick={handleBtnSearch}>
                    <img src={IcoSearch} alt="검색 실행"></img>
                </button>
            </div>

            <div className="user-list-wrap">
                <div className="thead">
                    <div className="th">id</div>
                    <div className="th">created<br />date</div>
                    <div className="th">email</div>
                    <div className="th">user<br />name</div>
                </div>

                <div className="tbody accordion" id="UserList">
                    {userList.map(user => (
                        <div className="tr" key={user.memberId}>
                            <a href={`#collapse${user.memberId}`} className="tr-top collapsed" 
                            data-toggle="collapse" aria-expanded="false" 
                            aria-controls={`collapse${user.memberId}`}
                            onClick={()=>handleUserMng(user.memberId)}
                            >
                                <div className="td">{user.memberId}</div>
                                <div className="td">{user.createdDate}</div>
                                <div className="td">{user.email.split('@').join(' @')}</div>
                                <div className="td">{user.username}</div>
                            </a>
                            <div className="tr-bottom">
                                <div className="collapse" id={`collapse${user.memberId}`} data-parent="#UserList">
                                    <div className="user-control-area">
                                        <div className='user-control-title'>{`${user.nickname}(${user.username})`}</div>
                                        <nav>
                                            <div className="nav nav-tabs user-control-tabs" id={`nav-tab-${user.memberId}`} role="tablist">
                                                <button className="nav-link btn-comment active" id={`nav-comment-tab-${user.memberId}`} data-toggle="tab" data-target={`#nav-comment-${user.memberId}`} type="button" role="tab" aria-controls={`nav-comment-${user.memberId}`} aria-selected="true">
                                                    <img src={IcoTabsComment} alt="" />
                                                    <span className='label'>정보 추가</span>
                                                </button>
                                                <button className="nav-link btn-mail" id={`nav-mail-tab-${user.memberId}`} data-toggle="tab" data-target={`#nav-mail-${user.memberId}`} type="button" role="tab" aria-controls={`nav-mail-${user.memberId}`} aria-selected="false">
                                                    <img src={IcoTabsMail} alt="" />
                                                    <span className='label'>메일 발신</span>
                                                </button>
                                                <button className="nav-link btn-ban" id={`nav-ban-tab-${user.memberId}`} data-toggle="tab" data-target={`#nav-ban-${user.memberId}`} type="button" role="tab" aria-controls={`nav-ban-${user.memberId}`} aria-selected="false" 
                                                onClick={()=>handleBtnCheckCurrentBan(user.memberId)}>
                                                <img src={IcoTabsBan} alt="" />
                                                    <span className='label'>경고/차단</span>
                                                </button>
                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
                                            <div className="tab-pane fade show active" id={`nav-comment-${user.memberId}`} role="tabpanel" aria-labelledby={`nav-comment-${user.memberId}`}>
                                                <textarea 
                                                className='textarea-comment' 
                                                placeholder='이 회원에 대한 부가 정보를 자유롭게 입력하세요 (관리자만 볼 수 있습니다)'
                                                value={comment}
                                                onChange={handleComment}
                                                ></textarea>
                                                <div className="btns-wrap btns-wrap-hr in-tab-btns">
                                                    <button className="btn btn-cancel" onClick={handleBtnCommentReset}>지우기</button>
                                                    <button className="btn btn-primary" onClick={()=>handleBtnCommentOk(user.memberId)}>정보등록</button>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id={`nav-mail-${user.memberId}`} role="tabpanel" aria-labelledby={`nav-mail-${user.memberId}`}>
                                                <div className="input-mail-wrap">
                                                    <input 
                                                    type="text" 
                                                    className="input-mail-title" 
                                                    placeholder='제목'
                                                    value={mailTitle}
                                                    onChange={handleMailTitle}
                                                    />
                                                    <span className="input-border"></span>
                                                </div>
                                                <textarea 
                                                className="textarea-mail"
                                                placeholder='이 유저에게 발송할 메일을 작성하세요'
                                                value={mailContent}
                                                onChange={handleMailContent}
                                                ></textarea>
                                                <div className="btns-wrap btns-wrap-hr in-tab-btns">
                                                    <button className="btn btn-cancel" onClick={handleBtnMailReset}>지우기</button>
                                                    <button className="btn btn-primary" onClick={()=>handleBtnMailSend(user.memberId)}>메일발송</button>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id={`nav-ban-${user.memberId}`} role="tabpanel" aria-labelledby={`nav-ban-${user.memberId}`}>
                                                {banInfo == null || banInfo.currentBanned === false ? (
                                                    <>
                                                        <div className='ban-content-area'>
                                                            <p className='discripts'>이 유저에게 경고/차단 사유를 알리세요.<br />
                                                            (차단 및 경고와 동시에 메일이 메일이 전송되며, 아래 정보에 자동 추가됩니다)</p>
                                                            <div className="form-section">
                                                                <div className="radio-group">
                                                                    <div className="form-check">
                                                                        <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        name={`reason-${user.memberId}`} 
                                                                        id={`radia1-${user.memberId}`} 
                                                                        value="사칭 및 사기"
                                                                        checked={banReason === "사칭 및 사기"}
                                                                        onChange={handleBanReason}
                                                                        />
                                                                        <label className="form-check-label" htmlFor={`radia1-${user.memberId}`}>
                                                                            사칭 및 사기
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        name={`reason-${user.memberId}`}
                                                                        id={`radia2-${user.memberId}`}
                                                                        value="멘토링 무단 연락 두절" 
                                                                        checked={banReason === "멘토링 무단 연락 두절"}
                                                                        onChange={handleBanReason}
                                                                        />
                                                                        <label className="form-check-label" htmlFor={`radia2-${user.memberId}`}>
                                                                            멘토링 무단 연락 두절
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        name={`reason-${user.memberId}`}
                                                                        id={`radia3-${user.memberId}`}
                                                                        value="직접 입력" 
                                                                        checked={banReason === "직접 입력"}
                                                                        onChange={handleBanReason}
                                                                        />
                                                                        <label className="form-check-label" htmlFor={`radia3-${user.memberId}`}>
                                                                            사유 직접 입력
                                                                        </label>
                                                                        <div className="hidden-area">
                                                                            <textarea 
                                                                                placeholder='경고/차단 사유'
                                                                                value={banReasonInput}
                                                                                onChange={handleBanReasonInput}
                                                                            ></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="form-section">
                                                                <div className="radio-group">
                                                                    <div className="form-check">
                                                                        <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        name={`type-ban-${user.memberId}`}
                                                                        id={`type-ban1-${user.memberId}`}
                                                                        value="CAVEAT"
                                                                        checked={banType === "CAVEAT"}
                                                                        onChange={handleBanType}
                                                                        />
                                                                        <label className="form-check-label" htmlFor={`type-ban1-${user.memberId}`}>
                                                                            경고만 주기
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input 
                                                                        className="form-check-input" 
                                                                        type="radio" 
                                                                        name={`type-ban-${user.memberId}`} 
                                                                        id={`type-ban2-${user.memberId}`}
                                                                        value="BAN"
                                                                        checked={banType === "BAN"}
                                                                        onChange={handleBanType}
                                                                        />
                                                                        <label className="form-check-label" htmlFor={`type-ban2-${user.memberId}`}>
                                                                            일정 기간 차단하기
                                                                        </label>
                                                                        <div className="hidden-area ban-days-area">
                                                                            <div className="radio-group-hr">
                                                                                <div className="form-check">
                                                                                    <input 
                                                                                    className="form-check-input" 
                                                                                    type="radio" 
                                                                                    name={`period-${user.memberId}`} 
                                                                                    id={`period-1-${user.memberId}`}
                                                                                    value="1" 
                                                                                    onChange={handlePeriod}
                                                                                    checked={period === "1"}
                                                                                     />
                                                                                    <label className="form-check-label" htmlFor={`period-1-${user.memberId}`}>
                                                                                        1일
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input 
                                                                                    className="form-check-input" 
                                                                                    type="radio" 
                                                                                    name={`period-${user.memberId}`} 
                                                                                    id={`period-7-${user.memberId}`} 
                                                                                    onChange={handlePeriod}
                                                                                    value="7"
                                                                                    checked={period === "7"}
                                                                                    />
                                                                                    <label className="form-check-label" htmlFor={`period-7-${user.memberId}`}>
                                                                                        7일
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input 
                                                                                    className="form-check-input" 
                                                                                    type="radio" 
                                                                                    name={`period-${user.memberId}`} 
                                                                                    id={`period-30-${user.memberId}`} 
                                                                                    value="30"
                                                                                    onChange={handlePeriod}
                                                                                    checked={period === "30"}
                                                                                    />
                                                                                    <label className="form-check-label" htmlFor={`period-30-${user.memberId}`}>
                                                                                        30일
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input 
                                                                                    className="form-check-input" 
                                                                                    type="radio" 
                                                                                    name={`period-${user.memberId}`} 
                                                                                    id={`period-0-${user.memberId}`} 
                                                                                    value="-1"
                                                                                    onChange={handlePeriod}
                                                                                    checked={period === "-1"}
                                                                                    />
                                                                                    <label className="form-check-label" htmlFor={`period-0-${user.memberId}`}>
                                                                                        영구
                                                                                    </label>
                                                                                </div>      
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                
                                                        <div className="btns-wrap btns-wrap-hr in-tab-btns">
                                                            <button className="btn btn-cancel" onClick={handleBtnResetBanInfo}>초기화</button>
                                                            <button className="btn btn-danger" onClick={()=>handleBtnBan(user.memberId)}>경고/차단</button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="ban-content-area">
                                                            <p className='discripts'>
                                                                {`[${banInfo?.reason}]의 사유로 [${banInfo?.startedDate}] 부터 [${banInfo?.period === -1? "영구":banInfo?.period+"일간"}] 차단 된 유저입니다. (차단을 풀면 해당 유저에게 메일이 발송됩니다.)`}
                                                            </p>
                                                            <textarea 
                                                            value={banEndReason}
                                                            onChange={handleBanEndReason}
                                                            className="ban-end-reason" placeholder='차단 해제 사유'></textarea>
                                                        </div>
                                                        <div className="btns-wrap btns-wrap-hr in-tab-btns">
                                                            <button className="btn btn-cancel" onClick={handleBtnResetBanEndReason}>지우기</button>
                                                            <button className="btn btn-danger" onClick={()=>handleBtnBanEnd(user.memberId)}>차단 바로 풀기</button>
                                                        </div>
                                                    </>
                                                )}
                                                
                                            </div>
                                        </div>
                                        <div className="comment-area">
                                            {userCommentList.map(comment => (
                                                <div className="comment-box" key={comment.commentId}>
                                                    <div className="comment-top">
                                                        <span className='writer'>{comment.writer}</span>
                                                        <button className="btn btn-ico btn-comment-delete" onClick={()=>handleBtnCommentDel(comment.commentId, user.memberId)}>
                                                            <img src={IcoDelete} alt="" />
                                                        </button>
                                                    </div>
                                                    <div className='comment-body'>
                                                        <p className='content'>{comment.content}</p>
                                                        <p className='created-date'>{comment.createdDate}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default UserMngContent;