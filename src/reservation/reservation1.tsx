import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import CalendarSelect from './calendarModal.js'
import Modal from 'react-modal';
import { useLocation, Navigate, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react'
import { LoginContext } from '../user/auth'

import useMaxScrollY from '../components/UseMaxScrollY.js'
import { PageTracking } from '../components/pageTracking.js'
import { getTokenUserId } from '../components/jwtUtil.js'
import { ButtonTracking } from '../components/ButttonTracking.js'


export function Reservation1() {
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
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const cardMentoId = query.get('mentoId'); // 쿼리 파라미터에서 cardMentoId 가져오기


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
            const logUri = "/reservation1?mentoId=" + cardMentoId + "?userId=" + userId;
            PageTracking(startTime, containerHeightRef.current, maxScrollYRef.current, logUri);
        })
        return () => {
        }
    }, []);
    /* 페이지 로그 수집부분 end */



    const { mentoInfos, mentoDate, confirmReservation1Info, confirmSelectedMentoringDateTimeList} = location.state || {}; // 기본값으로 빈 객체 제공
    useEffect(() => {
        // selectedMentoInfo가 없으면 메인 페이지로 이동
        if (!cardMentoId || !mentoInfos || !mentoDate) {
            navigate("/", { replace: true }); // replace: true를 사용하여 뒤로 가기 방지
        }
    }, [mentoInfos, mentoDate, navigate]);
    if (!mentoInfos || !mentoDate) {
        return null; // selectedMentoInfo가 없으면 아무것도 렌더링하지 않음
    }

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null); // 어떤 버튼이 눌렸는지 저장

    const openModal = (option: number) => {
        setSelectedOption(option); // 어떤 버튼이 눌렸는지 설정
        ButtonTracking(`/reservation1?mentoId=${cardMentoId}`, `날짜선택 모달 ${option}번 버튼`);
        setIsOpen(true); // 모달 열기
        //console.log(option);
    };

    const [mentoringDate, setMentoringDate] = useState<string>("");
    const [mentoringDate1, setMentoringDate1] = useState<string>(confirmSelectedMentoringDateTimeList?.[0] || "");
    const [mentoringDate2, setMentoringDate2] = useState<string>(confirmSelectedMentoringDateTimeList?.[1] || "");
    const [mentoringDate3, setMentoringDate3] = useState<string>(confirmSelectedMentoringDateTimeList?.[2] || "");

    const closeModal = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if (isOpen == false)
        {
            if (selectedOption == 1)
            {
                setMentoringDate1(mentoringDate);
                //console.log(mentoringDate1);
            }
            else if (selectedOption == 2)
            {
                setMentoringDate2(mentoringDate);
                //console.log(mentoringDate2);
            }
            else if (selectedOption == 3)
            {
                setMentoringDate3(mentoringDate);
                //console.log(mentoringDate3);
            }
        }
    })

    let reservation1Info: {[key:string]: string} = {};
    const currentDepartmentRef = useRef<HTMLSelectElement>(null); // select 요소에 대한 ref 생성
    const askTopicRef = useRef<HTMLSelectElement>(null); // select 요소에 대한 ref 생성
    const freeAskTextRef = useRef<HTMLSelectElement>(null); // select 요소에 대한 ref 생성
    let selectedMentoringDateTimeList = [];
    const positionRef = useRef<HTMLSelectElement>(null); // select 요소에 대한 ref 생성
    const phoneRef = useRef<HTMLSelectElement>(null); // select 요소에 대한 ref 생성

    
    const handleNextReservation = () => {
        ButtonTracking(`/reservation1?mentoId=${cardMentoId}`, "다음단계");
        const selectedCurrentDepartment = currentDepartmentRef.current?.value;
        const selectedAskTopic = askTopicRef.current?.value;
        const selectedFreeAskText = freeAskTextRef.current?.value;
        const selectedPosition = positionRef.current?.value;
        const selectedPhone = phoneRef.current?.value;

        const isEmpty = (selectedCurrentDepartment == "" || selectedCurrentDepartment == null || 
        selectedAskTopic == "" || selectedAskTopic == null ||
        selectedFreeAskText == "" || selectedFreeAskText == null ||
        selectedPosition == "" || selectedPosition == null ||
        selectedPhone == "" || selectedPhone == null)

        if (isEmpty)
        {
            alert("재학중인 학과, 궁금한 분야, 핸드폰 번호를 반드시 기입하여주세요!");
            return;
        }
        else
        {
            reservation1Info['selectedCurrentDepartment'] = selectedCurrentDepartment;
            reservation1Info['selectedAskTopic'] = selectedAskTopic;
            reservation1Info['selectedFreeAskText'] = selectedFreeAskText;
            reservation1Info['selectedPosition'] = selectedPosition;
            reservation1Info['selectedPhone'] = selectedPhone;
        }

        // 멘토링 날짜가 비어있는지 체크하는것
        // 비어있으면은 true
        // 모두다 true 이어야 판단문을 true로 취급
        
        const isEmptyDate1 = (mentoringDate1 == null || mentoringDate1 == "");
        const isEmptyDate2 = (mentoringDate2 == null || mentoringDate2 == "");
        const isEmptyDate3 = (mentoringDate3 == null || mentoringDate3 == "");

        // 만약 3개다 채워야 한다면은 &&대신에 || 쓰면 될 듯
        if (isEmptyDate1 || isEmptyDate2 || isEmptyDate3)
        {
            alert("멘토링 날짜 선택 옵션을 모두 골라주세요");
            return;
        }

        if (!isEmptyDate1)
        {
            selectedMentoringDateTimeList.push(mentoringDate1);
            console.log(mentoringDate1);
            console.log(selectedMentoringDateTimeList);
        }

        if (!isEmptyDate2)
        {
            selectedMentoringDateTimeList.push(mentoringDate2);
            console.log(mentoringDate2);
            console.log(selectedMentoringDateTimeList);
        }

        if (!isEmptyDate3)
        {
            selectedMentoringDateTimeList.push(mentoringDate3);
            console.log(mentoringDate3);
            console.log(selectedMentoringDateTimeList);
        }
    
        try {
            navigate(`/reservation2?mentoId=${cardMentoId}`, { state: {mentoInfos:mentoInfos, mentoDate:mentoDate, confirmReservation1Info: reservation1Info, confirmSelectedMentoringDateTimeList: selectedMentoringDateTimeList}});
        } catch (err) {
          // 오류 발생 시 오류 메시지 설정
            alert("다음페이지로 이동하는데 실패하였습니다...")
        } finally {
        }
    };

    
    const customStyle = {
        overlay: {
            backgroundColor : "rgba(0,0,0,0.5)",
        },
        content:{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: "65%",
            width:"80%",
            overflowY: 'auto', // 세로 스크롤 가능
            paddingTop: '10px',
            borderRadius: "10px",
            justifyContent: "center",      // 수평 가운데 정렬
            alignItems: "center",          // 수직 가운데 정렬
            textAlign: "center"            // 텍스트 가운데 정렬
        },

        innerContent: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%', // 높이를 100%로 설정하여 부모 요소의 가운데 정렬
        }
    }

    return (
        <div  ref={containerRef}>{!cardMentoId ? (<Navigate to="/" replace />):(
            <div lang='ko'>
            <Title title="멘토 정보"/>
            <Header />
            <div className="subpage-wrap step1-wrap">
                <div className="container-fluid">
                    <div className="btns-wrap">
                        <Link to={`/mento?mentoId=${cardMentoId}`} id="btnPrev" className="btn btn-link btn-inline" onClick={() => ButtonTracking(`/reservation1?mentoId=${cardMentoId}`, "이전으로")} ><i className="bi bi-chevron-left"></i><span>이전으로</span></Link>
                    </div>
                    <div className="steps-wrap">
                        <div className="step on">
                            <div className="bar"></div>
                            <span className="step-label">기본정보</span>
                        </div>
                        <div className="step">
                            <div className="bar"></div>
                            <span className="step-label">플랜선택</span>
                        </div>
                        <div className="step">
                            <div className="bar"></div>
                            <span className="step-label">결제</span>
                        </div>
                    </div>
                    <div className="visual-txt visual-txt-sm">공강 시간에 학교 안에서 <br /><br />멘토와 이야기를 나누기 위한<br /><br />기본 정보를 입력해주세요.</div>

                    <div className="write-area">
                        <input type="hidden" name="mentoId" value={mentoInfos.mentoId} />
                        <div className="form-group">
                            <label htmlFor="currentDepartment">재학 중인 학과</label>
                            {!confirmReservation1Info?.selectedCurrentDepartment ?
                            <input ref={currentDepartmentRef} type="text" className="form-control" id="currentDepartment" name="department" placeholder="-학과 형식으로 작성해주세요." required maxLength={16} />
                            :<input ref={currentDepartmentRef} type="text" defaultValue={confirmReservation1Info['selectedCurrentDepartment']} className="form-control" id="currentDepartment" name="department" placeholder="-학과 형식으로 작성해주세요." required maxLength={16} />
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="askTopic">묻고싶은 주제</label>
                            {!confirmReservation1Info?.selectedAskTopic ?
                            <select ref={askTopicRef} id="askTopic" name="askType" className="form-control" >
                                <option value="1">전과</option>
                                <option value="2">복수전공</option>
                                <option value="3">부전공</option>
                                <option value="4">그 외</option>
                                <option value="5">잘 모르겠음</option>
                            </select>
                            :<select ref={askTopicRef} defaultValue={confirmReservation1Info['selectedAskTopic']} id="askTopic" name="askType" className="form-control" >
                                <option value="1">전과</option>
                                <option value="2">복수전공</option>
                                <option value="3">부전공</option>
                                <option value="4">그 외</option>
                                <option value="5">잘 모르겠음</option>
                            </select>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="freeAskText">궁금한 분야 / 학과 / 내용 (자유 작성)</label>
                            {!confirmReservation1Info?.selectedFreeAskText ?
                            <textarea ref={freeAskTextRef} className="form-control" id="freeAskText" name="askContent" placeholder="두서 없이 작성해도 되니, 부담없이 작성해주세요." rows={10} required maxLength={100} ></textarea>
                            :<textarea ref={freeAskTextRef} defaultValue={confirmReservation1Info['selectedFreeAskText']} className="form-control" id="freeAskText" name="askContent" placeholder="두서 없이 작성해도 되니, 부담없이 작성해주세요." rows={10} required maxLength={100} ></textarea>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="wishDate">멘토링 희망 날짜를<br />최대 3개까지 골라주세요.</label>
                            <div className="btns-wrap">
                                <button className="btn btn-primary" onClick={() => openModal(1)} style={{
                                    backgroundColor: mentoringDate1 === "" ? '#303030' : '#F68536',
                                    color:'#fff', justifyContent: 'flex-start'}}>
                                    {mentoringDate1 === "" ? "옵션 1 - 날짜를 선택해주세요" : mentoringDate1}
                                    </button>
                            </div><br />
                            {/* <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyle}>
                                <CalendarSelect mentoDate={mentoDate}/>
                            </Modal><br /> */}
                            <div className="btns-wrap">
                                <button className="btn btn-primary" onClick={() => openModal(2)} style={{
                                    backgroundColor: mentoringDate2 === "" ? '#303030' : '#F68536',
                                    color:'#fff', justifyContent: 'flex-start'}}>
                                    {mentoringDate2 === "" ? "옵션 2 - 날짜를 선택해주세요" : mentoringDate2}
                                    </button>
                            </div><br />
                            {/* <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyle}>
                                <CalendarSelect mentoDate={mentoDate}/>
                            </Modal><br /> */}
                            <div className="btns-wrap">
                                <button className="btn btn-primary" onClick={() => openModal(3)} style={{
                                    backgroundColor: mentoringDate3 === "" ? '#303030' : '#F68536',
                                    color:'#fff', justifyContent: 'flex-start'}}>
                                    {mentoringDate3 === "" ? "옵션 3 - 날짜를 선택해주세요" : mentoringDate3}
                                    </button>
                            </div>
                            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyle}>
                                <CalendarSelect mentoDate={mentoDate} setMentoringDate={setMentoringDate} isOpen={isOpen} onClose={closeModal}/>
                            </Modal><br />
                            <label htmlFor="wishDate" style={{fontSize:'13px'}}>*선택하신 3개의 날짜를 멘토님께 전달드린 뒤,<br />가능한 날짜에 예약을 확정해드립니다.</label><br />
                        </div>
                        <div className="form-group">
                            <label htmlFor="wishPosition">희망 멘토링 위치</label>
                            {!confirmReservation1Info?.selectedPosition ?
                            <select ref={positionRef} id="wishPosition" className="form-control" name="position">
                                <option value="본부관 카페">본부관 카페</option>
                                <option value="북악관 로비">북악관 로비</option>
                            </select>
                            :<select ref={positionRef} defaultValue={confirmReservation1Info['selectedPosition']} id="wishPosition" className="form-control" name="position">
                                <option value="본부관 카페">본부관 카페</option>
                                <option value="북악관 로비">북악관 로비</option>
                            </select>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">전화번호</label>
                            {!confirmReservation1Info?.selectedPhone ?
                            <input ref={phoneRef} type="tel" className="form-control" id="phone" name="phone" placeholder="-없이 입력해주세요" required maxLength={16} />
                            :<input ref={phoneRef} defaultValue={confirmReservation1Info['selectedPhone']} type="tel" className="form-control" id="phone" name="phone" placeholder="-없이 입력해주세요" required maxLength={16} />
                            }
                        </div>
                        <div className="btns-wrap">
                            <div>
                                <button onClick={() => handleNextReservation()}  className="btn btn-primary" style={{fontSize:'16px'}}>
                                    다음단계
                                </button>
                                {/* 오류 메시지 표시 */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )}</div>
    )
}
export default Reservation1
