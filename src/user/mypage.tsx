import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext, useRef } from 'react'
import axios from 'axios';
import { checkTokenValidity } from '../components/jwtUtil.js'
import { LoginContext } from '../user/auth'
import Modal from 'react-modal';
import EditMyInfo from './mypageModal/editMyInfo.js';
import { Cancel } from './mypageModal/cancelReservation.js';
import PayInfo from './mypageModal/payInfo.js';
import ReviewWrite from './mypageModal/reviewWrite.js';
import ChoiceReservationDate from './mypageModal/choiceReservationDate.js';
import ReviewCheck from './mypageModal/reviewCheck.js';
import ChangeRefundInfo from './mypageModal/changeRefundInfo.js';

import useMaxScrollY from '../components/UseMaxScrollY.js'
import { PageTracking } from '../components/pageTracking.js'
import { getTokenUserId } from '../components/jwtUtil.js'
import { getDecadeLabel } from 'react-calendar/src/shared/dates.js'


interface responseData {
    data: any[];
}

interface mypageTopNumber {
    label: string;
    count: number;
}


interface userInfoImpl {
    nickname:string;
    department: string;
    studentNumber: string;
    grade: number;
    birthYear: number;
    phone: string;
    currentStatus:string; 
    bankAccount: string;
    bankName: string;
}



interface menteeWaitForConfirmImpl {
    reservationId: number;
    applyDate: string;
    wishDates: string[];
    planPrice: number;
    mentorNickname: string;
    menteeNickname: string;
    mentorDepartment: string;
    questionCategory: string;
    hopeDepartment: string;
    questionContent: string;
    wishPosition: string;
}

interface menteeWaitForDepositImpl {
    reservationId: number;
    applyDate: string;
    confirmDate: string;
    mentorDepartment: string;
    planPrice: number;
    mentorNickname: string;
    menteeNickname: string;
    questionCategory: string;
    hopeDepartment: string;
    questionContent: string;
    wishPosition: string;
}

interface menteeReservationSuccessImpl {
    mentoringId: number;
    applyDate: string;
    confirmDate: string;
    mentorDepartment: string;
    planPrice: number;
    mentorNickname: string;
    menteeNickname: string;
    questionCategory: string;
    menteeOK: boolean;
    questionContent: string;
    wishPosition: string;
}

interface menteeRefundImpl {
    requestDate: string;
    menteeNickname: string;
    menteeUsername: string;
    refundBankName: string;
    refundBankAcoount: string;
    refundReason: string;
    refundAmount: number;
    applicant: string;
}




interface mentoNotCheckImpl {
    reservationId: number;
    applyDate: string;
    wishDates: string[];
    planPrice: number;
    mentorNickname: string;
    menteeNickname: string;
    mentorDepartment: string;
    questionCategory: string;
    hopeDepartment: string;
    questionContent: string;
    wishPosition: string;
}

interface mentoWaitForDepositImpl {
    reservationId: number;
    applyDate: string;
    confirmDate: string;
    mentorDepartment: string;
    planPrice: number;
    mentorNickname: string;
    menteeNickname: string;
    questionCategory: string;
    hopeDepartment: string;
    questionContent: string;
    wishPosition: string;
}

interface mentoReservationSuccessImpl {
    mentoringId: number;
    applyDate: string;
    confirmDate: string;
    mentorDepartment: string;
    planPrice: number;
    mentorNickname: string;
    menteeNickname: string;
    questionCategory: string;
    questionContent: string;
    wishPosition: string;
}


interface mentoringInfoImpl {
    mentoringId: number;
    applyDate: string;
    confirmDate: string;
    mentorDepartment: string;
    planPrice: number;
    mentorNickname: string;
    menteeNickname: string;
    questionCategory: string;
    hopeDepartment: string;
    questionContent: string;
    wishPosition: string;
}




interface reviewCheckInfoImpl {
    reviewScore: number;
    reviewTitle: string;
    reviewContent: string;
    reviewDate: string;
}


export function Mypage() {
    const navigate = useNavigate();
    const context = useContext(LoginContext);

    const handleRefresh = () => {
        navigate(0); // 현재 페이지로 다시 이동
    };
    const token = checkTokenValidity();
    // context가 undefined일 가능성에 대비하여 기본값 설정
    if (!context) {
        throw new Error('useContext must be used within a LoginProvider');
    }
    
    const { loginStatus, setLoginStatus } = context;

    if (loginStatus == false)
    {
        alert('로그인 후에 예약이 가능합니다.')
        navigate('/login');
        return null;
    }

    useEffect(() => {
        // 페이지 진입 시 스크롤 위치를 맨 위로 이동
        window.scrollTo(0, 0);
        // 사용 예시
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
            containerHeightRef.current = containerRef.current.scrollHeight; // ref에 height 값 저장
        }
    }, []); // 로딩 상태가 변경될 때마다 ref를 확인

    useEffect(() => {
        window.addEventListener('beforeunload', (event) => {
            const userId = getTokenUserId();
            const logUri = "/mypage" + "?userId=" + userId;
            PageTracking(startTime, containerHeightRef.current, maxScrollYRef.current, logUri);
        })
        return () => {
        }
    }, []);
    /* 페이지 로그 수집부분 end */




    const [mypageTopNumbers, setMypageTopNumbers] = useState<mypageTopNumber[] | null>(null);
    const [userInfo, setUserInfo] = useState<userInfoImpl | null>(null);

    const [menteeWaitForConfirm, setMenteeWaitForConfirm] = useState<menteeWaitForConfirmImpl[] | null>(null);
    const [menteeWaitForDeposit, setMenteeWaitForDeposit] = useState<menteeWaitForDepositImpl[] | null>(null);
    const [menteeReservationSuccess, setMenteeReservationSuccess] = useState<menteeReservationSuccessImpl[] | null>(null);
    const [menteeMentoringInfo, setMenteeMentoringInfo] = useState<mentoringInfoImpl[] | null>(null);
    const [menteeRefund, setMenteeRefund] = useState<menteeRefundImpl[] | null>(null);

    const [mentoNotCheck, setMentoNotCheck] = useState<mentoNotCheckImpl[] | null>(null);
    const [mentoWaitForDeposit, setMentoWaitForDeposit] = useState<mentoWaitForDepositImpl[] | null>(null);
    const [mentoReservationSuccess, setMentoReservationSuccess] = useState<mentoReservationSuccessImpl[] | null>(null);
    const [mentoMentoringInfo, setMentoMentoringInfo] = useState<mentoringInfoImpl[] | null>(null);

    const [tabKinds, setTabKinds] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const [tabForMentee, setTabForMentee] = useState<number>(0);
    const [tabForMento, setTabForMento] = useState<number>(0);

    let userId = null;

    const [stayApproveCount, setStayApproveCount] = useState<number | null>(null);
    const [stayMoneyCount, setStayMoneyCount] = useState<number | null>(null);
    const [noReviewCount, setNoReview] = useState<number | null>(null);
    const [stayRefundCount, setStayRefund] = useState<number | null>(null);

    const handleTabForMenteeClick = (tab: number) => {
        setTabForMentee(tab);
    };

    const handleTabForMentoClick = (tab: number) => {
        setTabForMento(tab);
    };



/* --------------- start --------------- 기본적인 정보요청 쪽 part --------------- start --------------- */
// const [tabKinds, setTabKinds] = useState<number>(0);
const handleTabClick = (tabNumber:number) => {
    setTabKinds(tabNumber); // 선택된 시간 업데이트
};

const fetchMypageTopNumbers = async () => {
    try {
        const response = await fetch('/back/api/bigNums', {
            method: 'GET', // POST 요청
            headers: {
            'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
            'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
            },
        });
        const res:responseData = await response.json();
        console.log("mypageTopNums");
        console.log(res);
        setMypageTopNumbers(res.data);
    } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        console.error(err);
    } finally {
    }
};

const fetchUserInfo = async () => {
    try {
        const response = await fetch('/back/api/userInfo', {
            method: 'GET', // POST 요청
            headers: {
            'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
            'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
            },
        });
        const res:responseData = await response.json();
        console.log("UserInfo");
        console.log(res);
        setUserInfo(res.data[0]);
    } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        console.error(err);
    } finally {
    }
};

const fetchMenteeWaitForConfirm = async () => {
    try {
        const response = await fetch('/back/api/menteeWaitForConfirm', {
            method: 'GET', // POST 요청
            headers: {
              'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
              'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
            },
        });
        const res:responseData = await response.json();
        console.log("MenteeWaitForConfirm");
        console.log(res);
        setMenteeWaitForConfirm(res.data);
    } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        console.error(err);
    } finally {
    }
};

const fetchMenteeWaitForDeposit = async () => {
    try {
        const response = await fetch('/back/api/menteeWaitForDeposit', {
            method: 'GET', // POST 요청
            headers: {
              'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
              'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
            },
        });
        const res:responseData = await response.json();
        console.log("MenteeWaitForDeposit");
        console.log(res);
        setMenteeWaitForDeposit(res.data);
    } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        console.error(err);
    } finally {
    }
};

const fetchMenteeReservationSuccess = async () => {
    try {
        const response = await fetch('/back/api/menteeReservationSuccess', {
            method: 'GET', // POST 요청
            headers: {
              'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
              'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
            },
        });
        const res:responseData = await response.json();
        console.log("MenteeReservationSuccess");
        console.log(res);
        setMenteeReservationSuccess(res.data);
    } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        console.error(err);
    } finally {
    }
};

const fetchMenteeMentoringInfo = async () => {
    try {
        const response = await fetch('/back/api/menteeMentoringInfo', {
            method: 'GET', // POST 요청
            headers: {
              'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
              'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
            },
        });
        const res:responseData = await response.json();
        console.log("MenteeMentoringInfo");
        console.log(res);
        setMenteeMentoringInfo(res.data);
    } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        console.error(err);
    } finally {
    }
};

const fetchMenteeRefund = async () => {
    try {
        const response = await fetch('/back/api/menteeRefund', {
            method: 'GET', // POST 요청
            headers: {
              'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
              'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
            },
        });
        const res:responseData = await response.json();
        console.log("MenteeRefund");
        console.log(res);
        setMenteeRefund(res.data);
    } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        console.error(err);
    } finally {
    }
};

const fetchMentoNotCheck = async () => {
    try {
        const response = await fetch('/back/api/mentoring/mentor/notChk', {
            method: 'GET', // POST 요청
            headers: {
              'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
              'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
            },
        });
        const res:responseData = await response.json();
        console.log("MentoNotCheck");
        console.log(res);
        setMentoNotCheck(res.data);
    } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        console.error(err);
    } finally {
    }
};

const fetchMentoWaitForDeposit = async () => {
    try {
        const response = await fetch('/back/api/mentoring/mentor/noMoney', {
            method: 'GET', // POST 요청
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
                'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
            },
        });
        const res:responseData = await response.json();
        console.log("MentoWaitForDeposit");
        console.log(res);
        setMentoWaitForDeposit(res.data);
    } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        console.error(err);
    } finally {
    }
};

const fetchMentoReservationSuccess = async () => {
    try {
        const response = await fetch('/back/api/mentoring/mentor/complete', {
            method: 'GET', // POST 요청
            headers: {
              'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
              'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
            },
        });
        const res:responseData = await response.json();
        console.log("MentoReservationSuccess");
        console.log(res);
        setMentoReservationSuccess(res.data);
    } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        console.error(err);
    } finally {
    }
};

const fetchMentoMentoringInfo = async () => {
    try {
        const response = await fetch('/back/api/mentoring/mentor/history', {
            method: 'GET', // POST 요청
            headers: {
              'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
              'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
            },
        });
        const res:responseData = await response.json();
        console.log("MentoringInfo");
        console.log(res);
        setMentoMentoringInfo(res.data);
    } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        console.error(err);
    } finally {
    }
};

useEffect(() => {
    if (token == null)
    {
        alert("로그인 먼저 수행해주세요!");
        navigate("/");
        return;
    }

    fetchMypageTopNumbers();

    fetchUserInfo(); // 컴포넌트가 처음 렌더링될 때만 fetchData 실행

    fetchMenteeWaitForConfirm();
    fetchMenteeWaitForDeposit();
    fetchMenteeReservationSuccess();
    fetchMenteeMentoringInfo();
    fetchMenteeRefund();

    fetchMentoNotCheck();
    fetchMentoWaitForDeposit();
    fetchMentoReservationSuccess();
    fetchMentoMentoringInfo();
}, []);

useEffect(() => {
    if (mypageTopNumbers)
    {
        mypageTopNumbers.forEach(topNum => {
            if (topNum["label"] == "stayApprove")
            {
                setStayApproveCount(topNum["count"]);
            }
            else if (topNum["label"] == "stayMoney")
            {
                setStayMoneyCount(topNum["count"]);
            }
            else if (topNum["label"] == "noReview")
            {
                setNoReview(topNum["count"]);
            }
            else if (topNum["label"] == "stayRefund")
            {
                setStayRefund(topNum["count"]);
            }
        });
    }
}, [mypageTopNumbers]);

/* --------------- end --------------- 기본적인 정보요청 쪽 part --------------- end --------------- */






/* --------------- start --------------- 모달 커스텀 css --------------- start --------------- */
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
            width:"95%",
            overflowY: 'auto', // 세로 스크롤 가능
            // paddingTop: '10px',
            padding: '5px 8px 5px 8px',
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
/* --------------- end --------------- 모달 커스텀 css --------------- end --------------- */


/* --------------- start --------------- 내정보 수정 모달 --------------- start --------------- */
    const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState<userInfoImpl | null>(null);
    const openMyInfoModal = () => {
        setIsMyInfoModalOpen(true); // 모달 열기
    };
    const closeMyInfoModal = () => {
        setIsMyInfoModalOpen(false);
    }

    useEffect(() => {
        if (newUserInfo)
        {
            const fetchData = async () => {
                try {
                    const response = await fetch('/back/api/userInfo', {
                        method: 'PUT',
                        headers: {
                        'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
                        'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
                        },
                        body: JSON.stringify({
                            nickname: newUserInfo.nickname,
                            department: newUserInfo.department,
                            studentNumber: newUserInfo.studentNumber,
                            grade: newUserInfo.grade,
                            birthYear: newUserInfo.birthYear,
                            phone: newUserInfo.phone,
                            currentStatus: newUserInfo.currentStatus,
                            bankAccount: newUserInfo.bankAccount,
                            bankName: newUserInfo.bankName
                        })
                    });
                    if (response.status != 200)
                    {
                        throw new Error("response status not 200");
                    }
                    else
                    {
                        alert("내정보 수정이 완료되었습니다.");
                        fetchUserInfo();
                    }
                    return true;
                } catch (err) {
                    setError('데이터를 가져오는 중 오류가 발생했습니다.');
                    console.error(err);
                    return false;
                } finally {
                }
            };
            fetchData();
        }
    }, [newUserInfo]);
/* --------------- end --------------- 내정보 수정 모달 --------------- end --------------- */


/* --------------- start --------------- 취소 및 거절 모달 --------------- start --------------- */
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [cancelOrRefusalReservaionId, setCancelOrRefusalReservaionId] = useState<number | null>(null);
    const [cancelReason, setCancelReason] = useState<number | null>(null);
    const [refusalReason, setRefusalReason] = useState<number | null>(null);
    const [cancelRefundBankNum, setCancelRefundBankNum] = useState<string | null>(null);
    const [cancelRefundBank, setCancelRefundBank] = useState<string | null>(null);
    const openCancelModal = () => {
        setIsCancelModalOpen(true); // 모달 열기
    };
    const closeCancelModal = (reservationId:number) => {
        setCancelOrRefusalReservaionId(reservationId);
        setIsCancelModalOpen(false);
    }

    useEffect(() => {
        if (cancelReason)
        {
            const fetchData = async () => {
                try {
                    let response = null;
                    let responseBankInfo = null;
                    if (cancelRefundBankNum && cancelRefundBank)
                    {
                        response = await fetch(`/back/api/reservations/${cancelOrRefusalReservaionId}`, {
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
                            'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
                            },
                            body: JSON.stringify({
                                reason: cancelReason
                            })
                        });

                        responseBankInfo = await fetch(`/back/api/bank-info`, {
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
                            'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
                            },
                            body: JSON.stringify({
                                bankName: cancelRefundBankNum,
                                bankAccount:cancelRefundBank
                            })
                        });

                        if (response == null || responseBankInfo == null)
                        {
                            throw new Error("not have response");
                        }
                        if (response.status != 200 || responseBankInfo.status != 200)
                        {
                            throw new Error("response status not 200");
                        }
                    }
                    else
                    {
                        response = await fetch(`/back/api/reservations/${cancelOrRefusalReservaionId}`, {
                            method: 'DELETE',
                            headers: {
                            'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
                            'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
                            },
                            body: JSON.stringify({
                                reason: cancelReason
                            })
                        });

                        if (response == null)
                        {
                            throw new Error("not have response");
                        }
                        if (response.status != 200)
                        {
                            throw new Error("response status not 200");
                        }
                    }

                    alert("취소가 완료되었습니다.");
                    fetchMypageTopNumbers();
    
                    fetchMenteeWaitForConfirm();
                    fetchMenteeWaitForDeposit();
                    fetchMenteeReservationSuccess();
                    fetchMenteeMentoringInfo();
                    fetchMenteeRefund();
                    return true;
                } catch (err) {
                    setError('데이터를 가져오는 중 오류가 발생했습니다.');
                    console.error(err);
                    return false;
                } finally {
                }
            };
            fetchData();
        }

        else if (refusalReason)
        {
            console.log(refusalReason);
            console.log(cancelOrRefusalReservaionId);
            const fetchData = async () => {
                try {
                    const response = await fetch(`/back/api/reservations/${cancelOrRefusalReservaionId}`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
                        'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
                        },
                        body: JSON.stringify({
                            reason: refusalReason
                        })
                    });

                    if (response.status != 200)
                    {
                        throw new Error("response status not 200");
                    }

                    alert("거절이 완료되었습니다.");
                    fetchMypageTopNumbers();

                    fetchMentoNotCheck();
                    fetchMentoWaitForDeposit();
                    fetchMentoReservationSuccess();
                    fetchMentoMentoringInfo();
                } catch (err) {
                    setError('데이터를 가져오는 중 오류가 발생했습니다.');
                    console.error(err);
                } finally {
                }
            };
            fetchData();
        }

        setCancelRefundBankNum(null);
        setCancelRefundBank(null);
        setCancelReason(null);
        setRefusalReason(null);
    }, [cancelOrRefusalReservaionId]);
/* --------------- end --------------- 취소 및 거절 모달 --------------- end --------------- */


/* --------------- start --------------- 입금하기 모달 --------------- start --------------- */
    const [isPayInfoModalOpen, setIsPayInfoModalOpen] = useState(false);
    const openPayInfoModal = () => {
        setIsPayInfoModalOpen(true); // 모달 열기
    };
    const closePayInfoModal = () => {
        setIsPayInfoModalOpen(false);
    }
/* --------------- end --------------- 입금하기 모달 --------------- end --------------- */


/* --------------- start --------------- 지금 현재 날짜와 비교하기 함수 --------------- start --------------- */
    const completeMentoring = (dateString: string) => {
        // 문자열을 Date 객체로 변환
        const targetDate = new Date(dateString);

        // 현재 시간
        const now = new Date();

        // 비교
        if (targetDate > now) {
            return false;
        } else if (targetDate <= now) {
            return true;
        }
    };
/* --------------- end --------------- 지금 현재 날짜와 비교하기 함수 --------------- end --------------- */


/* --------------- start --------------- 멘토링 완료 alert --------------- start --------------- */
    const alertComplete = (reservationId:number, menteeOk:boolean) => {
        if (menteeOk)
        {
            alert("이미 완료처리 된 건입니다.");
            return;
        }
        if (confirm("실제 멘토와 만나 모든 이야기를 나누었고 금액까지 입금하였다면, 아래 확인 버튼을 눌러주세요."))
        {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/back/api/mentoring/${reservationId}/completed`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
                        'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
                        }
                    });
                    if (response.status != 200)
                    {
                        throw new Error("response status not 200");
                    }
                    else
                    {
                        alert("멘토링 완료 처리 되었습니다.");
                        fetchMypageTopNumbers();
    
                        fetchMenteeWaitForConfirm();
                        fetchMenteeWaitForDeposit();
                        fetchMenteeReservationSuccess();
                        fetchMenteeMentoringInfo();
                        fetchMenteeRefund();
                    }
                    return true;
                } catch (err) {
                    setError('데이터를 가져오는 중 오류가 발생했습니다.');
                    console.error(err);
                    return false;
                } finally {
                }
            };
            fetchData();
        }

    }
/* --------------- end --------------- 멘토링 완료 alert --------------- end --------------- */


/* --------------- start --------------- 리뷰 작성하기 모달 --------------- start --------------- */
    const [isReviewWriteModalOpen, setIsReviewWriteModalOpen] = useState(false);
    const [reviewReservaionId, setReviewReservaionId] = useState<number | null>(null);
    const [reviewTitle, setReviewTitle] = useState<string | null>(null);
    const [reviewContent, setReviewContent] = useState<string | null>(null);
    const [reviewScore, setReviewScore] = useState<number | null>(null);

    const openReviewWriteModal = () => {
        setIsReviewWriteModalOpen(true); // 모달 열기
    };
    const closeReviewWriteModal = (reviewWriteReservaionId:number) => {
        setReviewReservaionId(reviewWriteReservaionId);
        setIsReviewWriteModalOpen(false);
    }

    useEffect(() => {
        if (reviewTitle && reviewContent && reviewScore)
        {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/back/api/mentoring/${reviewReservaionId}/review`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
                        'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
                        },
                        body: JSON.stringify({
                            reviewTitle: reviewTitle,
                            reviewContent: reviewContent,
                            reviewScore: reviewScore
                        })
                    });
                    if (response.status != 200)
                    {
                        throw new Error("response status not 200");
                    }
                    else
                    {
                        alert("리뷰 작성이 완료되었습니다.");
                        fetchMypageTopNumbers();
    
                        fetchMenteeWaitForConfirm();
                        fetchMenteeWaitForDeposit();
                        fetchMenteeReservationSuccess();
                        fetchMenteeMentoringInfo();
                        fetchMenteeRefund();
                    }
                    return true;
                } catch (err) {
                    setError('데이터를 가져오는 중 오류가 발생했습니다.');
                    console.error(err);
                    return false;
                } finally {
                }
            };
            fetchData();
        }

        setReviewReservaionId(null);
        setReviewContent(null);
        setReviewScore(null);
    }, [reviewReservaionId]);
/* --------------- end --------------- 리뷰 작성하기 모달 --------------- end --------------- */


/* --------------- start --------------- 멘토링 날짜선택 모달 --------------- start --------------- */
    const [isChoiceReservationModalOpen, setIsChoiceReservationModalOpen] = useState(false);
    const [choiceReservation, setChoiceReservation] = useState<string | null>(null);
    const [choiceReservationId, setChoiceReservationId] = useState<number | null>(null);

    const openChoiceReservationModal = () => {
        setIsChoiceReservationModalOpen(true); // 모달 열기
    };
    const closeChoiceReservatioModal = (reservationId:number) => {
        setChoiceReservationId(reservationId);
        setIsChoiceReservationModalOpen(false);
    }

    useEffect(() => {
        if (choiceReservation && choiceReservationId)
        {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/back/api/reservations/${choiceReservationId}/accept`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
                        'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
                        },
                        body: JSON.stringify({
                            date: choiceReservation
                        })
                    });
                    if (response.status != 200)
                    {
                        throw new Error("response status not 200");
                    }
                    else
                    {
                        alert("날짜 선택이 완료되었습니다.");
                        fetchMypageTopNumbers();
    
                        fetchMentoNotCheck();
                        fetchMentoWaitForDeposit();
                        fetchMentoReservationSuccess();
                        fetchMentoMentoringInfo();
                    }
                    return true;
                } catch (err) {
                    setError('데이터를 가져오는 중 오류가 발생했습니다.');
                    console.error(err);
                    return false;
                } finally {
                }
            };
            fetchData();
        }

        setChoiceReservation(null);
        setChoiceReservationId(null);
    }, [choiceReservationId]);

/* --------------- end --------------- 멘토링 날짜선택 모달 --------------- end --------------- */


/* --------------- start --------------- 리뷰확인 모달 --------------- start --------------- */
    const [reviewCheckInfo, setReviewCheckInfo] = useState<reviewCheckInfoImpl | null>(null);

    const [isReviewCheckModalOpen, setIsReviewCheckModalOpen] = useState(false);
    const openReviewCheckModal = (mentoringId:number) => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/back/api/mentoring/${mentoringId}/review`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
                    'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
                    }
                });
                if (response.status != 200)
                {
                    setReviewCheckInfo(null);
                    throw new Error("response status not 200");
                }
                else
                {
                    const res:responseData = await response.json();
                    if (res.data[0].reviewScore == 0)
                    {
                        alert("리뷰 작성 이전입니다.");
                        setReviewCheckInfo(null);
                        return;
                    }
                    else
                    {
                        setReviewCheckInfo(res.data[0]);
                    }
                }
                
            } catch (err) {
                setError('데이터를 가져오는 중 오류가 발생했습니다.');
                console.error(err);
            } finally {
            }
        };
        // const [reviewCheckInfo, setReviewCheckInfo] = useState<reviewCheckInfImpl[] | null>(null);
        fetchData();
    };

    useEffect(() => {
        let previousValue = null; // 이전 값을 저장할 변수

        if (reviewCheckInfo !== null && reviewCheckInfo !== previousValue) {
            setIsReviewCheckModalOpen(true);
            previousValue = reviewCheckInfo; // 새로운 값으로 업데이트
        }
    }, [reviewCheckInfo])

    const closeReviewCheckModal = () => {
        setIsReviewCheckModalOpen(false);
    }
/* --------------- end --------------- 리뷰확인 모달 --------------- end --------------- */



/* --------------- start --------------- 환불 계좌 정보 변경 모달 --------------- start --------------- */
const [isChangeRefundInfoModalOpen, setIsChangeRefundInfoModalOpen] = useState(false);
const [changeRefundInfoReservationId, setChangeRefundInfoReservationId] = useState<number | null>(null);
const [newRefundBank, setNewRefundBank] = useState<number | null>(null);
const [newRefundBankNum, setNewRefundBankNum] = useState<string | null>(null);

const openChangeRefundInfoModal = () => {
    setIsChangeRefundInfoModalOpen(true); // 모달 열기
};
const closeChangeRefundInfoModal = (reservationId:number) => {
    setChangeRefundInfoReservationId(reservationId);
    setIsChangeRefundInfoModalOpen(false);
}

useEffect(() => {
    if (newRefundBank && newRefundBankNum)
    {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://49.247.41.208:8080/api/changeRefundInfo', {
                    reservaionId:choiceReservationId,
                    newRefundBank:newRefundBank,
                    newRefundBankNum:newRefundBankNum
                });

                if (response.status == 200)
                {
                    alert("취소 정보 변경이 완료되었습니다.");
                    handleRefresh();
                }
            } catch (err) {
                setError('데이터를 가져오는 중 오류가 발생했습니다.');
                console.error(err);
            } finally {
            }
        };
        fetchData();
    }

    setNewRefundBank(null);
    setNewRefundBankNum(null);
}, [changeRefundInfoReservationId]);

/* --------------- end --------------- 환불 계좌 정보 변경 모달 --------------- end --------------- */


    if (error) return <p>{error}</p>; // 오류가 발생했을 때 오류 메시지 표시
    if (!userInfo || !menteeWaitForConfirm || !menteeWaitForDeposit || !menteeReservationSuccess || !menteeMentoringInfo || !menteeRefund
        || !mentoNotCheck || !mentoWaitForDeposit || !mentoReservationSuccess || !mentoMentoringInfo
        || (stayApproveCount == null) || (stayMoneyCount == null) || (noReviewCount == null) || (stayRefundCount == null)) 
    {
        return (<div>Loading...</div>); // 로딩 중일 때는 "Loading..." 메시지 표시
    }


    return (
        <div lang='ko'  ref={containerRef}>
            <Title title="마이페이지"/>
            <Header />
{/* -------------------- start -------------------- 유저 정보부터 상단에 채워주는 부분 -------------------- start -------------------- */}
            <div className="subpage-wrap mypage">
                <div className="container-fluid">
                    <p className="page-title">{userInfo["nickname"]} 님의 마이페이지</p>
                    <div className="content-area my-info-nums">
                        <div className="verticals-list">
                            <div className="list-item">
                                <p className="big-value">{stayApproveCount}</p>
                                <p className="info-label">승인대기</p>
                            </div>
                            <div className="list-item">
                                <p className="big-value">{stayMoneyCount}</p>
                                <p className="info-label">입금대기</p>
                            </div>
                            <div className="list-item">
                                <p className="big-value">{noReviewCount}</p>
                                <p className="info-label">예약완료</p>
                            </div>
                            <div className="list-item">
                                <p className="big-value">{stayRefundCount}</p>
                                <p className="info-label">환불대기</p>
                            </div>
                        </div>
                    </div>
                    <div className="content-area my-info-summary">
                        <p className="page-sub-title">내 정보</p>
                        <div className="card">
                            <div className="card-body">
                                <div className="list-wrap">
                                    <div className="list-item">
                                        <div className="list-label">학과</div>
                                        {userInfo["department"] && userInfo["department"] !== null?
                                        <div className="list-content">
                                            <div>{userInfo["department"]}</div>
                                        </div>
                                        :<div className="list-content">
                                            <div>정보 없음</div>
                                        </div>
                                        }
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">학번</div>
                                        {userInfo["studentNumber"] && userInfo["studentNumber"] !== null?
                                        <div className="list-content">
                                            <div>{userInfo["studentNumber"]}</div>
                                        </div>
                                        :<div className="list-content">
                                            <div>정보 없음</div>
                                        </div>
                                        }
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">학년</div>
                                        {userInfo["grade"] && userInfo["grade"] !== null?
                                        <div className="list-content">
                                            <div>{userInfo["grade"]}</div>
                                        </div>
                                        :<div className="list-content">
                                            <div>정보 없음</div>
                                        </div>
                                        }
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">출생년도</div>
                                        {userInfo["birthYear"] && userInfo["birthYear"] !== null?
                                        <div className="list-content">
                                            <div>{userInfo["birthYear"]}</div>
                                        </div>
                                        :<div className="list-content">
                                            <div>정보 없음</div>
                                        </div>
                                        }
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">신분상태</div>
                                        {userInfo["currentStatus"] && userInfo["currentStatus"] !== null?
                                        <div className="list-content">
                                            <div>{userInfo["currentStatus"]}</div>
                                        </div>
                                        :<div className="list-content">
                                            <div>정보 없음</div>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btns-wrap bottom-btns-wrap">
                            <a className="btn btn-line-white" onClick={() => openMyInfoModal()}>정보 수정</a>
                        </div>
                        <Modal isOpen={isMyInfoModalOpen} onRequestClose={closeMyInfoModal} style={customStyle}>
                                <EditMyInfo setNewUserInfo={setNewUserInfo} existingUserInfo={userInfo} isOpen={isMyInfoModalOpen} onClose={closeMyInfoModal}/>
                        </Modal>
                    </div>
{/* -------------------- end -------------------- 유저 정보부터 상단에 채워주는 부분 -------------------- end -------------------- */}


{/* -------------------- start -------------------- 상단 멘티 멘토 변경 버튼 -------------------- start -------------------- */}
                    <div>
                        {tabKinds === 0 ?
                        <div style={{display:"flex", alignItems:"center", flexDirection:"row", justifyContent:"center"}}>
                            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", borderBottom: "1px solid #F68536", width: "80%", padding: "10px 20px", margin:"0 10px 0 10px" }}><button onClick={() => handleTabClick(0)} style={{color:"#F68536"}}>신청 내역</button></div>
                            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", borderBottom: "1px solid #D9D9D9", width: "80%", padding: "10px 20px", margin:"0 10px 0 10px" }}><button onClick={() => handleTabClick(1)} style={{color:"#fff"}}>멘토 정보</button></div>
                        </div>
                        :<div style={{display:"flex", alignItems:"center", flexDirection:"row", justifyContent:"center"}}>
                            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", borderBottom: "1px solid #D9D9D9", width: "80%", padding: "10px 20px", margin:"0 10px 0 10px" }}><button onClick={() => handleTabClick(0)} style={{color:"#fff"}}>신청 내역</button></div>
                            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", borderBottom: "1px solid #F68536", width: "80%", padding: "10px 20px", margin:"0 10px 0 10px" }}><button onClick={() => handleTabClick(1)} style={{color:"#F68536"}}>멘토 정보</button></div>
                        </div>}
                    </div>
{/* -------------------- end -------------------- 상단 멘티 멘토 변경 버튼 -------------------- end -------------------- */}


{/* -------------------- start -------------------- 멘티 탭 관련 부분 -------------------- start -------------------- */}
                    {tabKinds === 0 ?
                    <div>
                        <div className="content-area refund-stay">
                            <p className="page-sub-title border-bottom border-secondary">멘토링 현황<br /><br />
                                <div>
                                    {tabForMentee === 0
                                    ? <div style={{display:"flex", alignItems:"center", flexDirection:"row"}}>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px", backgroundColor: "#F68536" }}><button onClick={() => handleTabForMenteeClick(0)} style={{color:"#fff", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>승인대기 {menteeWaitForConfirm.length}건</button></div>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px" }}><button onClick={() => handleTabForMenteeClick(1)} style={{color:"#F68536", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>입금대기 {menteeWaitForDeposit.length}건</button></div>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px" }}><button onClick={() => handleTabForMenteeClick(2)} style={{color:"#F68536", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>예약완료 {menteeReservationSuccess.length}건</button></div>
                                    </div>
                                    : tabForMentee === 1
                                    ? <div style={{display:"flex", alignItems:"center", flexDirection:"row"}}>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px" }}><button onClick={() => handleTabForMenteeClick(0)} style={{color:"#F68536", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>승인대기 {menteeWaitForConfirm.length}건</button></div>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px", backgroundColor: "#F68536" }}><button onClick={() => handleTabForMenteeClick(1)} style={{color:"#fff", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>입금대기 {menteeWaitForDeposit.length}건</button></div>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px" }}><button onClick={() => handleTabForMenteeClick(2)} style={{color:"#F68536", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>예약완료 {menteeReservationSuccess.length}건</button></div>
                                    </div>
                                    : tabForMentee === 2
                                    ? <div style={{display:"flex", alignItems:"center", flexDirection:"row"}}>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px" }}><button onClick={() => handleTabForMenteeClick(0)} style={{color:"#F68536", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>승인대기 {menteeWaitForConfirm.length}건</button></div>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px" }}><button onClick={() => handleTabForMenteeClick(1)} style={{color:"#F68536", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>입금대기 {menteeWaitForDeposit.length}건</button></div>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px", backgroundColor: "#F68536" }}><button onClick={() => handleTabForMenteeClick(2)} style={{color:"#fff", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>예약완료 {menteeReservationSuccess.length}건</button></div>
                                    </div>
                                    : <div>unknown error</div>
                                    }
                                </div>
                            </p>
                        </div>
                        {tabForMentee === 0
                        ? (menteeWaitForConfirm && menteeWaitForConfirm !== null && menteeWaitForConfirm.length > 0?
                            (menteeWaitForConfirm.map((item, index) => (
                                <li key={index}>
                                    <br/>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="list-wrap">
                                                <div className="list-item">
                                                    <div className="list-label">등록일자</div>
                                                    <div className="list-content">{item.applyDate.slice(0,16)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">멘토명</div>
                                                    <div className="list-content">{item.mentorNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청일자1</div>
                                                    <div className="list-content">{item.wishDates[0].slice(0,16)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청일자2</div>
                                                    <div className="list-content">{item.wishDates[1].slice(0,16)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청일자3</div>
                                                    <div className="list-content">{item.wishDates[2].slice(0,16)}</div>
                                                </div>   
                                                <div className="list-item">
                                                    <div className="list-label">신청자</div>
                                                    <div className="list-content">{item.menteeNickname}</div>
                                                </div>                                            
                                                <div className="list-item">
                                                    <div className="list-label">플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">재학중인 학과</div>
                                                    <div className="list-content">{item.mentorDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 종류</div>
                                                    <div className="list-content">{item.questionCategory}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 내용</div>
                                                    <div className="list-content">{item.questionContent}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">약속 장소</div>
                                                    <div className="list-content">{item.wishPosition}</div>
                                                </div>
                                                {/* 여기에서 버튼 누르면 각 요청에 맞는 모달 구현해야함 */}
                                                <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                                    <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openCancelModal()} style={{backgroundColor:"#FF4D4D", color:"#fff"}}>취소하기</a>
                                                </div>
                                                <Modal isOpen={isCancelModalOpen} onRequestClose={closeCancelModal} style={customStyle}>
                                                    <Cancel afterPaid={false} setCancelRefundBankNum={setCancelRefundBankNum} setCancelRefundBank={setCancelRefundBank} setReason={setCancelReason} isOpen={isCancelModalOpen} onClose={() => closeCancelModal(item.reservationId)}/>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                <br/><br/>
                                </li>))
                            )
                            :
                            <p><br/> 승인대기 이력이 없습니다.</p>
                        )
                        : tabForMentee === 1
                        ? (menteeWaitForDeposit && menteeWaitForDeposit !== null && menteeWaitForDeposit.length > 0?
                            (menteeWaitForDeposit.map((item, index) => (
                                <li key={index}>
                                    <br/>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="list-wrap">
                                                <div className="list-item">
                                                    <div className="list-label">등록일자</div>
                                                    <div className="list-content">{item.applyDate.slice(0,16)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">멘토명</div>
                                                    <div className="list-content">{item.mentorNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정날짜</div>
                                                    <div className="list-content">{item.confirmDate.split(" ")[0]}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정시간</div>
                                                    <div className="list-content">{item.confirmDate.split(" ")[1].slice(0,5)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청자</div>
                                                    <div className="list-content">{item.menteeNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">재학중인 학과</div>
                                                    <div className="list-content">{item.mentorDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 종류</div>
                                                    <div className="list-content">{item.questionCategory}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 내용</div>
                                                    <div className="list-content">{item.questionContent}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">약속 장소</div>
                                                    <div className="list-content">{item.wishPosition}</div>
                                                </div>
                                                {/* 여기에서 버튼 누르면 각 요청에 맞는 모달 구현해야함 */}
                                                <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "10px 0 0 0", margin:"0 0 0 0"}}>
                                                    <a className="btn btn-line-white btn-erfund btn-refund-edit" onClick={() => openPayInfoModal()} style={{backgroundColor:"#000", color:"#fff"}}>입금하기</a>
                                                </div>
                                                <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                                    <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openCancelModal()} style={{backgroundColor:"#FF4D4D", color:"#fff"}}>취소하기</a>
                                                </div>
                                                <Modal isOpen={isPayInfoModalOpen} onRequestClose={closePayInfoModal} style={customStyle}>
                                                    <PayInfo isOpen={isPayInfoModalOpen} onClose={closePayInfoModal}/>
                                                </Modal>
                                                <Modal isOpen={isCancelModalOpen} onRequestClose={closeCancelModal} style={customStyle}>
                                                    <Cancel afterPaid={false} setCancelRefundBankNum={setCancelRefundBankNum} setCancelRefundBank={setCancelRefundBank} setReason={setCancelReason} isOpen={isCancelModalOpen} onClose={() => closeCancelModal(item.reservationId)}/>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                <br/><br/>
                                </li>))
                            )
                            :
                            <p><br/> 입금대기 이력이 없습니다.</p>
                        )
                        : tabForMentee === 2
                        ? (menteeReservationSuccess && menteeReservationSuccess !== null && menteeReservationSuccess.length > 0?
                            (menteeReservationSuccess.map((item, index) => (
                                <li key={index}>
                                    <br/>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="list-wrap">
                                                <div className="list-item">
                                                    <div className="list-label">등록일자</div>
                                                    <div className="list-content">{item.applyDate.slice(0,16)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">멘토명</div>
                                                    <div className="list-content">{item.mentorNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정날짜</div>
                                                    <div className="list-content">{item.confirmDate.split(" ")[0]}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정시간</div>
                                                    <div className="list-content">{item.confirmDate.split(" ")[1].slice(0,5)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청자</div>
                                                    <div className="list-content">{item.menteeNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">재학중인 학과</div>
                                                    <div className="list-content">{item.mentorDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 종류</div>
                                                    <div className="list-content">{item.questionCategory}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 내용</div>
                                                    <div className="list-content">{item.questionContent}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">약속 장소</div>
                                                    <div className="list-content">{item.wishPosition}</div>
                                                </div>
                                                {/* 여기에서 버튼 누르면 각 요청에 맞는 모달 구현해야함 */}
                                                {!completeMentoring(item.confirmDate)?
                                                <div>
                                                    <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "10px 0 0 0", margin:"0 0 0 0"}}>
                                                        <a className="btn btn-line-white btn-erfund btn-refund-edit" style={{borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536"}}>예약완료</a>
                                                    </div>
                                                    <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                                        <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openCancelModal()} style={{backgroundColor:"#FF4D4D", color:"#fff"}}>취소하기</a>
                                                    </div>
                                                </div>:
                                                <div>
                                                    <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "10px 0 0 0", margin:"0 0 0 0"}}>
                                                        <a className="btn btn-line-white btn-erfund btn-refund-edit" onClick={() => alertComplete(item.mentoringId, item.menteeOK)} style={{borderColor:"#000", backgroundColor:"#000", color:"#fff"}}>멘토링 완료</a>
                                                    </div>
                                                    <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                                        <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openReviewWriteModal()} style={{backgroundColor:"#F68536", color:"#fff"}}>후기 작성하기</a>
                                                    </div>
                                                </div>
                                                }
                                                <Modal isOpen={isReviewWriteModalOpen} onRequestClose={closeReviewWriteModal} style={customStyle}>
                                                    <ReviewWrite adminOkDate={item.confirmDate} mentoNickname={item.mentorNickname} questionCategory={item.questionCategory} planPrice={item.planPrice} setReviewTitle={setReviewTitle} setReviewContent={setReviewContent} setReviewScore={setReviewScore} isOpen={isReviewWriteModalOpen} onClose={() => closeReviewWriteModal(item.mentoringId)}/>
                                                </Modal>
                                                <Modal isOpen={isCancelModalOpen} onRequestClose={closeCancelModal} style={customStyle}>
                                                    <Cancel afterPaid={true} setCancelRefundBankNum={setCancelRefundBankNum} setCancelRefundBank={setCancelRefundBank} setReason={setCancelReason} isOpen={isCancelModalOpen} onClose={() => closeCancelModal(item.mentoringId)}/>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                <br/><br/>
                                </li>))
                            )
                            :
                            <p><br/> 예약완료 이력이 없습니다.</p>
                        )
                        : <div>unknown error</div>
                        }
{/* -------------------- end -------------------- 멘티 탭 관련 부분 -------------------- end -------------------- */}


{/* -------------------- start -------------------- 멘티 멘토링 내역 부분 -------------------- start -------------------- */}
                        <div className="content-area refund-stay">
                            <p className="page-sub-title border-bottom border-secondary">멘토링 내역</p>
                            {menteeMentoringInfo && menteeMentoringInfo !== null && menteeMentoringInfo.length > 0?
                            (menteeMentoringInfo.map((item, index) => (
                                <li key={index}>
                                    <br/>
                                    <div className="card mb-3" style={{backgroundColor:"#303030", borderColor:"#303030", color:"#fff", padding:"0px", margin:"0px"}}>
                                        <div className="card-body" style={{backgroundColor:"#303030", borderColor:"#303030", color:"#fff", padding:"0px", margin:"0px"}}>
                                            <div className="list-wrap">
                                                <div className="list-item">
                                                    <div className="list-label">등록일자</div>
                                                    <div className="list-content">{item.applyDate.slice(0,16)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">멘토명</div>
                                                    <div className="list-content">{item.mentorNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정날짜</div>
                                                    <div className="list-content">{item.confirmDate.split(" ")[0]}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정시간</div>
                                                    <div className="list-content">{item.confirmDate.split(" ")[1].slice(0,5)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청자</div>
                                                    <div className="list-content">{item.menteeNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">재학중인 학과</div>
                                                    <div className="list-content">{item.mentorDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 종류</div>
                                                    <div className="list-content">{item.questionCategory}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 내용</div>
                                                    <div className="list-content">{item.questionContent}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">약속 장소</div>
                                                    <div className="list-content">{item.wishPosition}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 여기에서 버튼 누르면 환불 요청 수정 모달 구현해야함 */}
                                    <div className="btns-wrap bottom-btns-wrap pb-3">
                                        <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openReviewCheckModal(item.mentoringId)} style={{backgroundColor:"#303030", borderColor:"#F68536", color:"#F68536"}}>후기 확인하기</a>
                                    </div>
                                    <Modal isOpen={isReviewCheckModalOpen} onRequestClose={closeReviewCheckModal} style={customStyle}>
                                        <ReviewCheck mentoringInfo={item} reviewCheckInfo={reviewCheckInfo} isOpen={isReviewCheckModalOpen} onClose={closeReviewCheckModal}/>
                                    </Modal>
                                <br/><br/>
                                </li>))
                            )
                            :
                            <p><br/> 멘토링 내역이 없습니다.</p>
                            }
                        </div>
{/* -------------------- end -------------------- 멘티 멘토링 내역 부분 -------------------- end -------------------- */}


{/* -------------------- start -------------------- 멘티 환불 내역 부분 -------------------- start -------------------- */}
                        <div className="content-area refund-stay">
                            <p className="page-sub-title border-bottom border-secondary">환불 대기</p>
                            {menteeRefund && menteeRefund !== null && menteeRefund.length > 0?
                            (menteeRefund.map((item, index) => (
                                <li key={index}>
                                    <br/>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="list-wrap">
                                                <div className="list-item">
                                                    <div className="list-label">요청 일자</div>
                                                    <div className="list-content">{item.requestDate.slice(0,16)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">멘티 닉네임</div>
                                                    <div className="list-content">{item.menteeNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">환불 은행명</div>
                                                    <div className="list-content">{item.refundBankName}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">환불 계좌</div>
                                                    <div className="list-content">{item.refundBankAcoount}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">환불 사유</div>
                                                    <div className="list-content">{item.refundReason}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">환불 금액</div>
                                                    <div className="list-content">{item.refundAmount}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 여기에서 버튼 누르면 환불 요청 수정 모달 구현해야함 */}
                                    {/* <div className="btns-wrap bottom-btns-wrap pb-3">
                                        <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openChangeRefundInfoModal()} >환불 정보 변경</a>
                                    </div>
                                    <Modal isOpen={isChangeRefundInfoModalOpen} onRequestClose={closeChangeRefundInfoModal} style={customStyle}>
                                        <ChangeRefundInfo setNewRefundBank={setNewRefundBank} setNewRefundBankNum={setNewRefundBankNum} refundBank={item.refundBank} refundBankNum={item.refundBankNum} isOpen={isChangeRefundInfoModalOpen} onClose={() => closeChangeRefundInfoModal(item.reservationId)}/>
                                    </Modal> */}
                                <br/><br/>
                                </li>))
                            )
                            :
                            <p><br/> 환불 대기 중인 이력이 없습니다.</p>
                            }
                        </div>
{/* -------------------- end -------------------- 멘티 환불 내역 부분 -------------------- end -------------------- */}
                    </div>

                    :<div>
{/* -------------------- start -------------------- 멘토 탭 관련 부분 -------------------- start -------------------- */}
                        <div className="content-area refund-stay">
                            <p className="page-sub-title border-bottom border-secondary">멘토링 신청 요청<br /><br />
                                <div>
                                    {tabForMento === 0
                                    ? <div style={{display:"flex", alignItems:"center", flexDirection:"row"}}>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px", backgroundColor: "#F68536" }}><button onClick={() => handleTabForMentoClick(0)} style={{color:"#fff", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>미확인 {mentoNotCheck.length}건</button></div>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px" }}><button onClick={() => handleTabForMentoClick(1)} style={{color:"#F68536", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>입금대기 {mentoWaitForDeposit.length}건</button></div>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px" }}><button onClick={() => handleTabForMentoClick(2)} style={{color:"#F68536", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>예약완료 {mentoReservationSuccess.length}건</button></div>
                                    </div>
                                    : tabForMento === 1
                                    ? <div style={{display:"flex", alignItems:"center", flexDirection:"row"}}>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px" }}><button onClick={() => handleTabForMentoClick(0)} style={{color:"#F68536", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>미확인 {mentoNotCheck.length}건</button></div>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px", backgroundColor: "#F68536" }}><button onClick={() => handleTabForMentoClick(1)} style={{color:"#fff", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>입금대기 {mentoWaitForDeposit.length}건</button></div>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px" }}><button onClick={() => handleTabForMentoClick(2)} style={{color:"#F68536", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>예약완료 {mentoReservationSuccess.length}건</button></div>
                                    </div>
                                    : tabForMento === 2
                                    ? <div style={{display:"flex", alignItems:"center", flexDirection:"row"}}>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px" }}><button onClick={() => handleTabForMentoClick(0)} style={{color:"#F68536", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>미확인 {mentoNotCheck.length}건</button></div>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px" }}><button onClick={() => handleTabForMentoClick(1)} style={{color:"#F68536", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>입금대기 {mentoWaitForDeposit.length}건</button></div>
                                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", border: "1px solid #F68536", padding: "5px 5px 5px 5px", margin:"0 5px 0 5px", borderRadius: "8px", backgroundColor: "#F68536" }}><button onClick={() => handleTabForMentoClick(2)} style={{color:"#fff", fontFamily: "Noto Sans KR", fontStyle: "normal", fontSize: "13px", fontWeight: "500"}}>예약완료 {mentoReservationSuccess.length}건</button></div>
                                    </div>
                                    : <div>unknown error</div>
                                    }
                                </div>
                            </p>
                        </div>
                        {tabForMento === 0
                        ? (mentoNotCheck && mentoNotCheck !== null && mentoNotCheck.length > 0?
                            (mentoNotCheck.map((item, index) => (
                                <li key={index}>
                                    <br/>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="list-wrap">
                                            <div className="list-item">
                                                    <div className="list-label">등록일자</div>
                                                    <div className="list-content">{item.applyDate.slice(0,16)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">멘토명</div>
                                                    <div className="list-content">{item.mentorNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청일자1</div>
                                                    <div className="list-content">{item.wishDates[0].slice(0,16)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청일자2</div>
                                                    <div className="list-content">{item.wishDates[1].slice(0,16)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청일자3</div>
                                                    <div className="list-content">{item.wishDates[2].slice(0,16)}</div>
                                                </div>   
                                                <div className="list-item">
                                                    <div className="list-label">신청자</div>
                                                    <div className="list-content">{item.menteeNickname}</div>
                                                </div>                                            
                                                <div className="list-item">
                                                    <div className="list-label">플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">재학중인 학과</div>
                                                    <div className="list-content">{item.mentorDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 종류</div>
                                                    <div className="list-content">{item.questionCategory}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 내용</div>
                                                    <div className="list-content">{item.questionContent}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">약속 장소</div>
                                                    <div className="list-content">{item.wishPosition}</div>
                                                </div>                                                {/* 여기에서 버튼 누르면 각 요청에 맞는 모달 구현해야함 */}
                                                <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "10px 0 0 0", margin:"0 0 0 0"}}>
                                                    <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openChoiceReservationModal()} style={{backgroundColor:"#000", color:"#fff"}}>날짜 확정하기</a>
                                                </div>
                                                <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                                    <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openCancelModal()} style={{backgroundColor:"#FF4D4D", color:"#fff"}}>거절하기</a>
                                                </div>
                                                <Modal isOpen={isChoiceReservationModalOpen} onRequestClose={closeChoiceReservatioModal} style={customStyle}>
                                                    <ChoiceReservationDate reservationList={item.wishDates} setChoiceReservation={setChoiceReservation} isOpen={isChoiceReservationModalOpen} onClose={() => closeChoiceReservatioModal(item.reservationId)}/>
                                                </Modal>
                                                <Modal isOpen={isCancelModalOpen} onRequestClose={closeCancelModal} style={customStyle}>
                                                    <Cancel afterPaid={false} setCancelRefundBankNum={setCancelRefundBankNum} setCancelRefundBank={setCancelRefundBank} setReason={setRefusalReason} isOpen={isCancelModalOpen} onClose={() => closeCancelModal(item.reservationId)}/>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                <br/><br/>
                                </li>))
                            )
                            :
                            <p><br/> 미확인 이력이 없습니다.</p>
                        )
                        : tabForMento === 1
                        ? (mentoWaitForDeposit && mentoWaitForDeposit !== null && mentoWaitForDeposit.length > 0?
                            (mentoWaitForDeposit.map((item, index) => (
                                <li key={index}>
                                    <br/>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="list-wrap">
                                            <div className="list-item">
                                                    <div className="list-label">등록일자</div>
                                                    <div className="list-content">{item.applyDate.slice(0,16)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">멘토명</div>
                                                    <div className="list-content">{item.mentorNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정날짜</div>
                                                    <div className="list-content">{item.confirmDate.split(" ")[0]}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정시간</div>
                                                    <div className="list-content">{item.confirmDate.split(" ")[1].slice(0,5)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청자</div>
                                                    <div className="list-content">{item.menteeNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">재학중인 학과</div>
                                                    <div className="list-content">{item.mentorDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 종류</div>
                                                    <div className="list-content">{item.questionCategory}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 내용</div>
                                                    <div className="list-content">{item.questionContent}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">약속 장소</div>
                                                    <div className="list-content">{item.wishPosition}</div>
                                                </div>
                                                {/* 여기에서 버튼 누르면 각 요청에 맞는 모달 구현해야함 */}
                                                <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "10px 0 0 0", margin:"0 0 0 0"}}>
                                                    <a className="btn btn-line-white btn-erfund btn-refund-edit" style={{borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536"}}>입금대기중</a>
                                                </div>
                                                <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                                    <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openCancelModal()} style={{backgroundColor:"#FF4D4D", color:"#fff"}}>거절하기</a>
                                                </div>
                                                <Modal isOpen={isCancelModalOpen} onRequestClose={closeCancelModal} style={customStyle}>
                                                    <Cancel afterPaid={false} setCancelRefundBankNum={setCancelRefundBankNum} setCancelRefundBank={setCancelRefundBank} setReason={setRefusalReason} isOpen={isCancelModalOpen} onClose={() => closeCancelModal(item.reservationId)}/>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                <br/><br/>
                                </li>))
                            )
                            :
                            <p><br/> 입금대기 이력이 없습니다.</p>
                        )
                        : tabForMento === 2
                        ? (mentoReservationSuccess && mentoReservationSuccess !== null && mentoReservationSuccess.length > 0?
                            (mentoReservationSuccess.map((item, index) => (
                                <li key={index}>
                                    <br/>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="list-wrap">
                                            <div className="list-item">
                                                    <div className="list-label">등록일자</div>
                                                    <div className="list-content">{item.applyDate.slice(0,16)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">멘토명</div>
                                                    <div className="list-content">{item.mentorNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정날짜</div>
                                                    <div className="list-content">{item.confirmDate.split(" ")[0]}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정시간</div>
                                                    <div className="list-content">{item.confirmDate.split(" ")[1].slice(0,5)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청자</div>
                                                    <div className="list-content">{item.menteeNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">재학중인 학과</div>
                                                    <div className="list-content">{item.mentorDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 종류</div>
                                                    <div className="list-content">{item.questionCategory}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 내용</div>
                                                    <div className="list-content">{item.questionContent}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">약속 장소</div>
                                                    <div className="list-content">{item.wishPosition}</div>
                                                </div>

                                                {/* 여기에서 버튼 누르면 각 요청에 맞는 모달 구현해야함 */}
                                                <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "10px 0 0 0", margin:"0 0 0 0"}}>
                                                    <a className="btn btn-line-white btn-erfund btn-refund-edit" style={{borderColor:"#F68536", backgroundColor:"#fff", color:"#F68536"}}>예약완료</a>
                                                </div>
                                                {!completeMentoring(item.confirmDate)?
                                                <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                                    <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openCancelModal()} style={{backgroundColor:"#FF4D4D", color:"#fff"}}>거절하기</a>
                                                </div>:
                                                <></>
                                                }
                                                <Modal isOpen={isCancelModalOpen} onRequestClose={closeCancelModal} style={customStyle}>
                                                    <Cancel afterPaid={false} setCancelRefundBankNum={setCancelRefundBankNum} setCancelRefundBank={setCancelRefundBank} setReason={setRefusalReason} isOpen={isCancelModalOpen} onClose={() => closeCancelModal(item.mentoringId)}/>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                <br/><br/>
                                </li>))
                            )
                            :
                            <p><br/> 예약완료 이력이 없습니다.</p>
                        )
                        : <div>unknown error</div>
                        }
{/* -------------------- end -------------------- 멘토 탭 관련 부분 -------------------- end -------------------- */}


{/* -------------------- start -------------------- 멘토 멘토링 내역 부분 -------------------- start -------------------- */}
                        <div className="content-area refund-stay">
                            <p className="page-sub-title border-bottom border-secondary">멘토링 내역</p>
                            {mentoMentoringInfo && mentoMentoringInfo !== null && mentoMentoringInfo.length > 0?
                            (mentoMentoringInfo.map((item, index) => (
                                <li key={index}>
                                    <br/>
                                    <div className="card mb-3" style={{backgroundColor:"#303030", borderColor:"#303030", color:"#fff", padding:"0px", margin:"0px"}}>
                                        <div className="card-body" style={{backgroundColor:"#303030", borderColor:"#303030", color:"#fff", padding:"0px", margin:"0px"}}>
                                            <div className="list-wrap">
                                            <div className="list-item">
                                                    <div className="list-label">등록일자</div>
                                                    <div className="list-content">{item.applyDate.slice(0,16)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">멘토명</div>
                                                    <div className="list-content">{item.mentorNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정날짜</div>
                                                    <div className="list-content">{item.confirmDate.split(" ")[0]}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정시간</div>
                                                    <div className="list-content">{item.confirmDate.split(" ")[1].slice(0,5)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청자</div>
                                                    <div className="list-content">{item.menteeNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">재학중인 학과</div>
                                                    <div className="list-content">{item.mentorDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 종류</div>
                                                    <div className="list-content">{item.questionCategory}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 내용</div>
                                                    <div className="list-content">{item.questionContent}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">약속 장소</div>
                                                    <div className="list-content">{item.wishPosition}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 여기에서 버튼 누르면 환불 요청 수정 모달 구현해야함 */}
                                    <div className="btns-wrap bottom-btns-wrap pb-3">
                                        <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openReviewCheckModal(item.mentoringId)} style={{backgroundColor:"#303030", borderColor:"#F68536", color:"#F68536"}}>후기 확인하기</a>
                                    </div>
                                    <Modal isOpen={isReviewCheckModalOpen} onRequestClose={closeReviewCheckModal} style={customStyle}>
                                        <ReviewCheck mentoringInfo={item} reviewCheckInfo={reviewCheckInfo} isOpen={isReviewCheckModalOpen} onClose={closeReviewCheckModal}/>
                                    </Modal>
                                <br/><br/>
                                </li>))
                            )
                            :
                            <p><br/> 멘토링 내역이 없습니다.</p>
                            }
                        </div>
{/* -------------------- end -------------------- 멘토 멘토링 내역 부분 -------------------- end -------------------- */}
                    </div>
                }
                </div>
            </div>
        </div>
    )
}

export default Mypage
