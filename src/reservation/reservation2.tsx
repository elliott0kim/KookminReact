import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext, useRef } from 'react'
import { LoginContext } from '../user/auth'

import useMaxScrollY from '../components/UseMaxScrollY.js'
import { PageTracking } from '../components/pageTracking.js'
import { getTokenUserId } from '../components/jwtUtil.js'
import { ButtonTracking } from '../components/ButttonTracking.js'

export function Reservation2() {
    const navigate = useNavigate();
    const context = useContext(LoginContext);

    // context가 undefined일 가능성에 대비하여 기본값 설정
    if (!context) {
        throw new Error('useContext must be used within a LoginProvider');
    }
    
    const { loginStatus, setLoginStatus } = context;

    useEffect(() => {
        if (loginStatus == false)
        {
            alert('로그인 후에 예약이 가능합니다.')
            navigate('/login');
        }
        // 페이지 진입 시 스크롤 위치를 맨 위로 이동
        window.scrollTo(0, 0);
      }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행


    /* 페이지 로그 수집부분 */
    const startTime = Date.now();
    const [maxScrollY, maxScrollYRef] = useMaxScrollY(); // 커스텀 훅 호출하여 상태와 ref 값 가져오기
    const containerRef = useRef(null);
    const containerHeightRef = useRef(0); // containerHeight 값을 관리할 ref

    // 로딩이 끝난 후에 containerRef 사용
    useEffect(() => {
        if (containerRef.current) {
            // 로딩이 끝난 후 containerRef 사용
            // console.log("containerRef.current scrollHeight:", containerRef.current.scrollHeight);
            containerHeightRef.current = containerRef.current.scrollHeight; // ref에 height 값 저장
        }
    }, []); // 로딩 상태가 변경될 때마다 ref를 확인

    useEffect(() => {
        window.addEventListener('beforeunload', (event) => {
            const userId = getTokenUserId();
            const logUri = "/reservation2?mentoId=" + cardMentoId + "?userId=" + userId;
            PageTracking(startTime, containerHeightRef.current, maxScrollYRef.current, logUri);
        })
        return () => {
        }
    }, []);
    /* 페이지 로그 수집부분 end */

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const cardMentoId = query.get('mentoId'); // 쿼리 파라미터에서 cardMentoId 가져오기
    const { mentoInfos, mentoDate, confirmReservation1Info, confirmSelectedMentoringDateTimeList } = location.state || {}; // 기본값으로 빈 객체 제공

    useEffect(() => {
        // selectedMentoInfo가 없으면 메인 페이지로 이동
        if (!confirmReservation1Info || !confirmSelectedMentoringDateTimeList) {
            navigate("/", { replace: true }); // replace: true를 사용하여 뒤로 가기 방지
        }
    }, [confirmReservation1Info, confirmSelectedMentoringDateTimeList, navigate]);
    if (!confirmReservation1Info || !confirmSelectedMentoringDateTimeList) {
        return null; // selectedMentoInfo가 없으면 아무것도 렌더링하지 않음
    }

    const handleButtonPrev = () => {
        ButtonTracking(`/reservation2?mentoId=${cardMentoId}`, "이전으로");
        navigate(`/reservation1?mentoId=${cardMentoId}`, { state: {mentoInfos: mentoInfos, mentoDate: mentoDate, confirmReservation1Info:confirmReservation1Info, confirmSelectedMentoringDateTimeList:confirmSelectedMentoringDateTimeList}});
    }

    const handleButtonNext = (mentoringOption:number) => {
        if (mentoringOption == 0)
        {
            ButtonTracking(`/reservation2?mentoId=${cardMentoId}`, "굼긍해요 플랜 결제");
        }
        else if (mentoringOption == 1)
        {
            ButtonTracking(`/reservation2?mentoId=${cardMentoId}`, "도와줘요 플랜 결제");
        }
        else if (mentoringOption == 2)
        {
            ButtonTracking(`/reservation2?mentoId=${cardMentoId}`, "살려줘요 플랜 결제");
        }
        navigate(`/reservation3?mentoId=${cardMentoId}`, { state: {mentoInfos: mentoInfos, mentoDate: mentoDate, confirmReservation1Info:confirmReservation1Info, confirmSelectedMentoringDateTimeList:confirmSelectedMentoringDateTimeList, selectedMentoringOption:mentoringOption}});
    }

    const [isOpenDetailOption0, setIsOpenDetailOption0] = useState(false);
    const [isOpenDetailOption1, setIsOpenDetailOption1] = useState(false);
    const [isOpenDetailOption2, setIsOpenDetailOption2] = useState(false);

    const handleOpenDetail = (detailOption:number) => {
        if (detailOption == 0)
        {
            setIsOpenDetailOption0((prevState) => !prevState);
            ButtonTracking(`/reservation2?mentoId=${cardMentoId}`, "궁금해요 플랜 자세히 알아보기");
        }
        else if (detailOption == 1)
        {
            setIsOpenDetailOption1((prevState) => !prevState);
            ButtonTracking(`/reservation2?mentoId=${cardMentoId}`, "도와줘요 플랜 자세히 알아보기");
        }
        else if (detailOption == 2)
        {
            setIsOpenDetailOption2((prevState) => !prevState);
            ButtonTracking(`/reservation2?mentoId=${cardMentoId}`, "살려줘요 플랜 자세히 알아보기");
        }
    }

    return (
        <div ref={containerRef}>{!cardMentoId ? (<Navigate to="/" replace />):(
            <div lang='ko'>
            <Title title="멘토 정보"/>
            <Header />
            <div className="subpage-wrap step2-wrap">
                <div className="container-fluid">
                    <div className="btns-wrap">
                        {/* 이전 버튼 구현하기 */}
                    <button id="btnPrev" className="btn btn-link btn-inline" onClick={handleButtonPrev}><i className="bi bi-chevron-left"></i><span>이전으로</span></button>
                    </div>
                    <div className="steps-wrap">
                        <div className="step on">
                            <div className="bar"></div>
                            <span className="step-label">기본정보</span>
                        </div>
                        <div className="step on">
                            <div className="bar"></div>
                            <span className="step-label">플랜선택</span>
                        </div>
                        <div className="step">
                            <div className="bar"></div>
                            <span className="step-label">결제</span>
                        </div>
                    </div>
                    <div className="visual-txt visual-txt-sm" style={{lineHeight: '1.5', fontSize:"18px"}}>
                        {mentoInfos.nickname} 멘토와 함께<br/><span className="implement-txt">알뜰하게,</span> 기프티콘 값으로<br />약 3천 만원 어치 고민을 풀어보세요.
                    </div>
                    <div className="summary-bottom" >
                        <div className={isOpenDetailOption0? "mento-info mento-info-summary recommand-box-gap d-none":"mento-info mento-info-summary recommand-box-gap"} >
                            <div className="mento-info mento-info-summary recommand-box">
                                <div className="mento-info mento-info-summary recommand-box circle-direct card min-card" style={{marginBottom:"10px"}}>
                                    <div className="card-content">
                                        <div style={{flex:"1 0 auto"}}>
                                            <a className='mento-info mento-info-summary recommand-box-visual-txt card-title'>궁금해요 플랜</a>
                                            <div className='li-chk'>
                                                <img src="/images/circle-direct.svg" alt="circle-direct" className='ico-chk'/>
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt'>25분</p>
                                            </div>
                                            <div className='li-chk'>
                                                <img src="/images/circle-direct.svg" alt="circle-direct" className='ico-chk'/>
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt'>비대면</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => handleButtonNext(0)} className="mento-info mento-info-summary recommand-box btn btn-payment">
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt'>커피 한 잔 전달</p>
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt small-txt'>₩ 6,500 결제</p>
                                            </button>
                                            <button onClick={() => handleOpenDetail(0)} className="mento-info mento-info-summary recommand-box btn btn-detail">
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt'>자세히 알아보기</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isOpenDetailOption0 ? (
                            <div className='mento-info mento-info-summary recommand-box-gap'>
                                <div className="mento-info mento-info-summary recommand-box">
                                    <div className="mento-info mento-info-summary recommand-box circle-direct card card-detail">
                                        <div className='card-content'>
                                            <div className='pr-3' style={{flex:"1 1 auto"}}>
                                                <a className='mento-info mento-info-summary recommand-box-visual-txt card-title'>궁금해요 플랜</a>
                                                <div>
                                                    <p className='mento-info mento-info-summary recommand-box-visual-txt card-txt pt-1'>
                                                        간단한 질문이 있으신 분들에게 추천드립니다. 멘토님에게 프라푸치노 한 잔을사드리고, 25분간 구글밋, 줌을 통해 비대면 멘토링을 받아보세요.</p>
                                                </div>
                                                <div className="col-list-wrap">
                                                    <div className='col-list-row'>
                                                        <div className='col-list-li'>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-label'>방식</p>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-value'>비대면</p>
                                                        </div>
                                                        <div className='col-list-li'>
                                                            
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-label'>시간</p>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-value'>25분</p>
                                                        </div>
                                                    </div>
                                                    <div className='col-list-row'>
                                                        <div className='col-list-li'>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-label'>횟수</p>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-value'>1회</p>
                                                        </div>
                                                        <div className='col-list-li'>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-label'>가격</p>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-value'>₩ 6,500</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='img-coffee-wrap'>
                                                    <img src="/images/starbucksOnlyDrink.png" className='img-coffee' alt="starbucksOnlyDrink"/>
                                                </div>
                                                <button onClick={() => handleButtonNext(0)} className="mento-info mento-info-summary recommand-box btn btn-payment">
                                                    <p className='mento-info mento-info-summary recommand-box-visual-txt'>구매하고 전달하기</p>
                                                </button>
                                                <button onClick={() => handleOpenDetail(0)} className="mento-info mento-info-summary recommand-box btn btn-detail-close">
                                                    <p className='mento-info mento-info-summary recommand-box-visual-txt'>상세정보 닫기</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : <div></div>}
                        <div className={isOpenDetailOption1 ?"mento-info mento-info-summary recommand-box-gap d-none":"mento-info mento-info-summary recommand-box-gap"}>
                            <div className="mento-info mento-info-summary recommand-box">
                                <div className="mento-info mento-info-summary recommand-box circle-direct card min-card" style={{marginBottom:"10px"}}>
                                    <div className="card-content">
                                        <div style={{flex:"1 0 auto"}}>
                                            <a className='mento-info mento-info-summary recommand-box-visual-txt card-title'>도와줘요 플랜</a>
                                            <div className='li-chk'>
                                                <img src="/images/circle-direct.svg" alt="circle-direct" className='ico-chk'/>
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt'>1시간</p>
                                            </div>
                                            <div className='li-chk'>
                                                <img src="/images/circle-direct.svg" alt="circle-direct" className='ico-chk'/>
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt'>대면</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => handleButtonNext(1)} className="mento-info mento-info-summary recommand-box btn btn-payment">
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt'>커피 + 디저트 전달</p>
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt small-txt'>₩ 12,500 결제</p>
                                            </button>
                                            <button onClick={() => handleOpenDetail(1)} className="mento-info mento-info-summary recommand-box btn btn-detail">
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt'>자세히 알아보기</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isOpenDetailOption1 ? (
                            <div className='mento-info mento-info-summary recommand-box-gap'>
                                <div className="mento-info mento-info-summary recommand-box">
                                    <div className="mento-info mento-info-summary recommand-box circle-direct card card-detail">
                                        <div className='card-content'>
                                            <div className='pr-3' style={{flex:"1 1 auto"}}>
                                                <a className='mento-info mento-info-summary recommand-box-visual-txt card-title'>도와줘요 플랜</a>
                                                <div>
                                                    <p className='mento-info mento-info-summary recommand-box-visual-txt card-txt pt-1'>
                                                    직접 만나서, 풀리지 않는 고민을 얘기해보고 싶은 분들에게 추천드립니다. 멘토님에게 디저트와 커피를 사드리고, 약 1시간 동안 학교 카페에서 만나 멘토링을 받아보세요.</p>
                                                </div>
                                                <div className="col-list-wrap">
                                                    <div className="col-list-row">
                                                        <div className="col-list-li">
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-label'>방식</p>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-value'>대면</p>
                                                            
                                                        </div>
                                                        <div className="col-list-li">
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-label'>시간</p>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-value'>1시간</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-list-row">        
                                                        <div className="col-list-li">
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-label'>횟수</p>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-value'>1회</p>
                                                            
                                                        </div>
                                                        <div className="col-list-li">
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-label'>가격</p>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-value'>₩ 12,500</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='img-coffee-wrap'>
                                                    <img src="/images/starbucksSet.jpeg" alt="starbucksSet" className='img-coffee img-coffee-2' />
                                                </div>
                                                <button onClick={() => handleButtonNext(1)} className="mento-info mento-info-summary recommand-box btn btn-payment">
                                                    <p className='mento-info mento-info-summary recommand-box-visual-txt'>구매하고 전달하기</p>
                                                </button>
                                                <button onClick={() => handleOpenDetail(1)} className="mento-info mento-info-summary recommand-box btn btn-detail-close">
                                                    <p className='mento-info mento-info-summary recommand-box-visual-txt'>상세정보 닫기</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : <div></div>}
                        <div  className={isOpenDetailOption2 ?"mento-info mento-info-summary recommand-box-gap d-none":"mento-info mento-info-summary recommand-box-gap"}>
                            <div className="mento-info mento-info-summary recommand-box">
                                <div className="mento-info mento-info-summary recommand-box circle-direct card min-card" style={{marginBottom:"10px"}}>
                                    <div className="card-content">
                                        <div style={{flex:"1 0 auto"}}>
                                            <a className='mento-info mento-info-summary recommand-box-visual-txt card-title'>살려줘요 플랜</a>
                                            <div className='li-chk'>
                                                <img src="/images/circle-direct.svg" alt="circle-direct" className='ico-chk'/>
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt'>1시간</p>
                                            </div>
                                            <div className='li-chk'>
                                                <img src="/images/circle-direct.svg" alt="circle-direct" className='ico-chk'/>
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt'>대면, 2회</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => handleButtonNext(2)} className="mento-info mento-info-summary recommand-box btn btn-payment">
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt'>배달 기프티콘 전달</p>
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt small-txt'>₩ 20,000 결제</p>
                                            </button>
                                            <button onClick={() => handleOpenDetail(2)} className="mento-info mento-info-summary recommand-box btn btn-detail">
                                                <p className='mento-info mento-info-summary recommand-box-visual-txt'>자세히 알아보기</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isOpenDetailOption2 ? (
                            <div className='mento-info mento-info-summary recommand-box-gap'>
                                <div className="mento-info mento-info-summary recommand-box">
                                    <div className="mento-info mento-info-summary recommand-box circle-direct card card-detail">
                                        <div className='card-content'>
                                            <div className='pr-3' style={{flex:"1 1 auto"}}>
                                                <a className='mento-info mento-info-summary recommand-box-visual-txt card-title'>살려줘요 플랜</a>
                                                <div>
                                                    <p className='mento-info mento-info-summary recommand-box-visual-txt card-txt pt-1'>
                                                    직접 만나서 포트폴리오 피드백, 학과 고민부터 진로 고민까지 준비하는 것들에 대해 더 깊은 피드백을 받고 싶은 분들에게 추천드립니다. 멘토님에게 배달 쿠폰을 드리고 총 2번, 약 1시간 동안 학교 카페에서 만나 멘토링을 받아보세요.</p>
                                                </div>
                                                <div className="col-list-wrap">
                                                    <div className="col-list-row">
                                                        <div className="col-list-li">
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-label'>방식</p>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-value'>비대면</p>
                                                            
                                                        </div>
                                                        <div className="col-list-li">
                                                        <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-label'>시간</p>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-value'>1시간</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-list-row">
                                                        <div className="col-list-li">
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-label'>횟수</p>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-value'>2회</p>
                                                            
                                                        </div>
                                                        <div className="col-list-li">
                                                        <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-label'>가격</p>
                                                            <p className='mento-info mento-info-summary recommand-box-visual-txt col-list-value'>₩ 20,000</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='img-coffee-wrap'>
                                                    <img src="/images/baemin.png" alt="baemin" className='img-coffee img-coffee-3'/>
                                                </div>
                                                <button onClick={() => handleButtonNext(2)} className="mento-info mento-info-summary recommand-box btn btn-payment">
                                                    <p className='mento-info mento-info-summary recommand-box-visual-txt'>구매하고 전달하기</p>
                                                </button>
                                                <button onClick={() => handleOpenDetail(2)} className="mento-info mento-info-summary recommand-box btn btn-detail-close">
                                                    <p className='mento-info mento-info-summary recommand-box-visual-txt'>상세정보 닫기</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : <div></div>}
                    </div>
                </div>
            </div>
            </div>
        )}</div>
    );
}
export default Reservation2
