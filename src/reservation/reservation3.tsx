import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useContext } from 'react'
import axios from 'axios';
import { LoginContext } from '../user/auth'

import useMaxScrollY from '../components/UseMaxScrollY.js'
import { PageTracking } from '../components/pageTracking.js'
import { getTokenUserId } from '../components/jwtUtil.js'
import { checkTokenValidity } from '../components/jwtUtil.js'
import { ButtonTracking } from '../components/ButttonTracking.js'


export function Reservation3() {
    const checkboxRef1 = useRef<HTMLInputElement>(null);
    const checkboxRef2 = useRef<HTMLInputElement>(null);
    const checkboxRef3 = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const context = useContext(LoginContext);

    // context가 undefined일 가능성에 대비하여 기본값 설정
    if (!context) {
        throw new Error('useContext must be used within a LoginProvider');
    }
    
    const { loginStatus, setLoginStatus } = context;
    
    const token = checkTokenValidity();

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

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const cardMentoId = query.get('mentoId'); // 쿼리 파라미터에서 cardMentoId 가져오기
    const { mentoInfos, mentoDate, confirmReservation1Info, confirmSelectedMentoringDateTimeList, selectedMentoringOption} = location.state || {}; // 기본값으로 빈 객체 제공


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
            const logUri = "/reservation3?mentoId=" + cardMentoId + "?userId=" + userId;
            PageTracking(startTime, containerHeightRef.current, maxScrollYRef.current, logUri);
        })
        return () => {
        }
    }, []);
    /* 페이지 로그 수집부분 end */



    const handleButtonPrev = () => {
        ButtonTracking(`/reservation3?mentoId=${cardMentoId}`, "이전으로");
        navigate(`/reservation2?mentoId=${cardMentoId}`, { state: {mentoInfos: mentoInfos, mentoDate: mentoDate, confirmReservation1Info:confirmReservation1Info, confirmSelectedMentoringDateTimeList:confirmSelectedMentoringDateTimeList}});
    }

    console.log(confirmReservation1Info);
    console.log(confirmSelectedMentoringDateTimeList);
    console.log(selectedMentoringOption);

    const convertToDateFormat = (dateStr: string) => {
        // 1. 날짜와 시간을 정규 표현식으로 추출
        console.log(dateStr);
        const dateRegex = /(\d{1,2})월 (\d{1,2})일 ([\uac00-\ud7af]+) (오전|오후)\s*(\d{1,2})시/;
        const matches = dateStr.match(dateRegex);
        console.log(matches);
        if (!matches) return null;
      
        // 2. 추출된 값을 변수에 할당
        const month = matches[1];
        const day = matches[2];
        const period = matches[4]; // 오전 또는 오후
        let hour = parseInt(matches[5]);
      
        // 3. 오후일 경우 12시간을 더해주기
        if (period === "오후" && hour < 12) {
          hour += 12;
        } else if (period === "오전" && hour === 12) {
          hour = 0; // 오전 12시는 자정으로 처리
        }
      
        // 4. 현재 연도를 사용하거나 직접 연도를 지정할 수 있음
        const year = new Date().getFullYear();
      
        // 5. 새로운 Date 객체 생성 (YYYY-MM-DD HH:mm:ss 포맷)
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:00:00`;
      
        return formattedDate;
      };

    const handleButtonNext = () => {
        ButtonTracking(`/reservation3?mentoId=${cardMentoId}`, "내용 동의 및 예약완료");
        // 체크박스가 체크되었는지 확인
        const isChecked1 = checkboxRef1.current?.checked;
        const isChecked2 = checkboxRef2.current?.checked;
        const isChecked3 = checkboxRef3.current?.checked;

        if (isChecked1 && isChecked2 && isChecked3) {
            // 모든 체크박스가 체크된 경우
            // 여기서 백엔드한테 여태 예약정보 모은거 전송도 해줘야함
            let category = "";
            if (confirmReservation1Info.selectedAskTopic == "1")
            {
                category = "전과";
            }
            else if (confirmReservation1Info.selectedAskTopic == "2")
            {
                category = "복수전공";
            }
            else if (confirmReservation1Info.selectedAskTopic == "3")
            {
                category = "부전공";
            }
            else if (confirmReservation1Info.selectedAskTopic == "4")
            {
                category = "그 외";
            }
            else if (confirmReservation1Info.selectedAskTopic == "5")
            {
                category = "잘 모르겠음";
            }

            const requestBody = {
                mentorId: cardMentoId,
                department: confirmReservation1Info.selectedCurrentDepartment,
                questionCategory: category,
                questionContent: confirmReservation1Info.selectedFreeAskText,
                wishDates: [
                    convertToDateFormat(confirmSelectedMentoringDateTimeList[0]),
                    convertToDateFormat(confirmSelectedMentoringDateTimeList[1]),
                    convertToDateFormat(confirmSelectedMentoringDateTimeList[2])
                ],
                wishPosition: confirmReservation1Info.selectedPosition,
                phone: confirmReservation1Info.selectedPhone,
                planId: selectedMentoringOption
            }

            console.log(token);
            console.log(requestBody);

            const fetchData = async () => {
                try {
                    const response = await fetch('/back/api/reservations', {
                        method: 'POST', // POST 요청
                        headers: {
                          'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
                          'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
                        },
                        body: JSON.stringify(requestBody), // JSON.stringify로 본문을 문자열로 변환하여 전송
                    });
                    if (response.status == 200)
                    {
                        return true;
                    }
                    else
                    {
                        alert("신청 도중 문제가 발생하였습니다. 관리자에게 문의하여 주십시오.");
                        return false;
                    }
                } catch (err) {
                    console.error(err);
                    alert("신청 도중 문제가 발생하였습니다. 관리자에게 문의하여 주십시오.");
                    return false;
                } finally {
                    // setLoading(false); // 로딩 상태 종료
                }
            };
            fetchData().then((success) => {
                if (success) {
                    navigate(`/reservationSuccess?mentoId=${cardMentoId}`);
                }

            });
        } else {
            alert('모든 체크박스를 체크해 주세요.');
        }
    }
    // JAR_NAME=$(ls -tr $REPOSITORY/$PROJECT_NAME/*.jar | tail -n 1)
    // nohup java -jar -Dspring.config.location=classpath:/application.yml,classpath:/application-operation.yml -Dspring.profiles.active=operation $JAR_NAME 2>&1 &

    const handleButtonClick = async () => {
        ButtonTracking(`/reservation3?mentoId=${cardMentoId}`, "네이버 페이(준비중)");
    };

    return (
        <div ref={containerRef}>{!cardMentoId ? (<Navigate to="/" replace />):(
            <div lang='ko'>
            <Title title="멘토 정보"/>
            <Header />
            <div className="subpage-wrap step3-wrap">
                <div className="container-fluid">
                    <div className="btns-wrap">
                        {/* 이거 수정좀 해주고 */}
                        <button onClick={handleButtonPrev} id="btnPrev" className="btn btn-link btn-inline"><i className="bi bi-chevron-left"></i><span>이전으로</span></button>
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
                        <div className="step on">
                            <div className="bar"></div>
                            <span className="step-label">결제</span>
                        </div>
                    </div>
                    <div>
                        <p className="visual-txt visual-txt-sm">
                            결제 방법을 선택해주세요
                        </p>
                        <div className="top-btns-wrap btns-wrap-hr">
                            <button className="btn btn-line-orange">무통장 입금</button>
                            <button className="btn btn-line-white disabled" onClick={() => handleButtonClick()}>네이버 페이(준비중)</button>
                        </div>
                        <div className="write-area">
                            {/* <input type="hidden" name="mentoId"/> */}
                            {/* <div className="form-group"> */}
                                {/* <p>계좌정보</p> */}
                                {/* <div className="card mt-2 bank-info-wrap"> */}
                                    {/* <div className="card-body"> */}
                                        {/* <button onClick={() => handleCopyClick("110454977350")} className="btn btn-line-orange btn-inline btn-xs" id="btnCopy" >복사</button> */}
                                        {/* <p className="bank-info-txt">신한은행 <span id="bankNums">110-454-977350</span></p> */}
                                    {/* </div> */}
                                {/* </div> */}
                            {/* </div> */}
                            
                            <div className="">
                                <div className="th-box">
                                    <span className="very-small-txt">확인</span>
                                    <span className="very-small-txt">내역</span>
                                </div>
                                
                                <div className="form-check default-form-check">
                                    <input className="form-check-input" type="checkbox" id="defaultCheck11" ref={checkboxRef1} required/>
                                    <label className="form-check-label" htmlFor="defaultCheck11" style={{fontSize : "14px"}}>
                                        멘토에 대한 비인격적 행위(인신공격, 비방, 폭력 등)로 학교의 명예를 실추시키지 않겠습니다.
                                    </label>
                                </div>
                                <div className="form-check default-form-check">
                                    <input className="form-check-input" type="checkbox" id="defaultCheck22" ref={checkboxRef2} required/>
                                    <label className="form-check-label" htmlFor="defaultCheck22" style={{fontSize : "14px"}}>
                                        멘토링 날짜 확정 후 <span className='txt-imple'>48시간 이내 취소시 멘토링 금액의 50% 까지만 환불됨</span>을 인지하였습니다.
                                    </label>
                                </div>
                                <div className="form-check default-form-check">
                                    <input className="form-check-input" type="checkbox" id="defaultCheck33" ref={checkboxRef3} required/>
                                    <label className="form-check-label" htmlFor="defaultCheck33" style={{fontSize : "14px"}}>
                                        멘토링 날짜 확정 후 <span className='txt-imple'>24시간 이내 취소시 멘토링 금액 환불은 불가</span>함을 인지하였습니다.
                                        <br/>
                                    </label>
                                </div>
                                <div className='tf-box'>
                                    <span className="very-small-txt">모든 내용 확인 필요</span>
                                </div>
                            </div>
                            <div className="btns-wrap bottom-btns-wrap">
                                <button onClick={() => handleButtonNext()} className="btn btn-primary" style={{backgroundColor : "#303030", color : "#F68536"}}>내용 동의 및 예약 완료</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )}</div>
    );
}
export default Reservation3
