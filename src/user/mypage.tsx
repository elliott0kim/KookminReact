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


interface responseData {
    data: any[];
}

interface mypageTopNumbers {
    label: string;
    count: number;
}


interface userInfoImpl {
    nickname:string;
    department: string;
    studentNumber: string;
    grade: number;
    birtYear: number;
    phone: string;
    currentStatus:string; 
    bankAccount: string;
    bankName: string;
}



interface menteeWaitForConfirmImpl {
    reservationId: number;
    applyDate: string;
    wishDate1: string;
    wishDate2: string;
    wishDate3: string;
    planPrice: number;
    mentoNickname: string;
    currentDepartment: string;
    questionCategory: number;
    hopeDepartment: string;
    questionContent: string;
    wishPosition: string;
}

interface menteeWaitForDepositImpl {
    reservationId: number;
    applyDate: string;
    adminOkDate: string;
    adminOkTime: string;
    planPrice: number;
    mentoNickname: string;
    currentDepartment: string;
    questionCategory: number;
    hopeDepartment: string;
    questionContent: string;
    wishPosition: string;
}

interface menteeReservationSuccessImpl {
    reservationId: number;
    mentoringId: number;
    applyDate: string;//
    menteeOkDate: string;
    //adminOkTime: string;// 이것도.. 안찢어줫어ㅠ 동현이 살려줘 제발...
    planPrice: number;
    mentoNickname: string;
    mentorDepartment: string; // 현재 학과는 있는데 또 희망학과는 없어...
    questionCategory: number;
    hopeDepartment: string; // 유기된 항목
    questionContent: string;
    wishPosition: string;
}

interface menteeRefundImpl {
    reservationId: number;
    applyDate: string;
    mentoNickname: string;
    refundBank: string;
    refundBankNum: string;
}




interface mentoNotCheckImpl {
    reservationId: number;
    applyDate: string;
    wishDate1: string;
    wishDate2: string;
    wishDate3: string;
    planPrice: number;
    currentDepartment: string;
    questionCategory: number;
    hopeDepartment: string;
    questionContent: string;
    wishPosition: string;
}

interface mentoWaitForDepositImpl {
    reservationId: number;
    mentoringId: number;
    applyDate: string;
    mentorOkDate: string;
    adminOkTime: string;
    planPrice: number;
    menteeDepartment: string;
    questionCategory: number;
    hopeDepartment: string; // 역시 유기
    questionContent: string;
    wishPosition: string;
}

interface mentoReservationSuccessImpl {
    reservationId: number;
    applyDate: string;
    adminOkDate: string;
    adminOkTime: string;
    planPrice: number;
    currentDepartment: string;
    questionCategory: number;
    hopeDepartment: string;
    questionContent: string;
    wishPosition: string;
}



interface mentoringInfoImpl {
    reservationId: number;
    applyDate: string;
    adminOkDate: string;
    adminOkTime: string;
    planPrice: number;
    currentDepartment: string;
    questionCategory: number;
    hopeDepartment: string;
    questionContent: string;
    wishPosition: string;
    menteeNickname:string;
    reviewTitle:string;
    reviewContent:string;
    reviewScore:string;
}




interface mypageInfo {
    userInfo: userInfoImpl;
    menteeWaitForConfirm: menteeWaitForConfirmImpl[];
    menteeWaitForDeposit: menteeWaitForDepositImpl[];
    menteeReservationSuccess: menteeReservationSuccessImpl[];
    menteeMentoringInfo: mentoringInfoImpl[];
    menteeRefund: menteeRefundImpl[];
    mentoNotCheck: mentoNotCheckImpl[];
    mentoWaitForDeposit: mentoWaitForDepositImpl[];
    mentoReservationSuccess: mentoReservationSuccessImpl[];
    mentoMentoringInfo: mentoringInfoImpl[];
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
            // console.log("containerRef.current scrollHeight:", containerRef.current.scrollHeight);
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





    const [mypageTopNumbers, setMypageTopNumbers] = useState<mypageTopNumbers[] | null>(null);
    const [mypageInfo, setMypageInfo] = useState<mypageInfo | null>(null);
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

    const [waitForConfirmCount, setWaitForConfirmCount] = useState<number | null>(null);
    const [confirmReservationCount, setConfirmReservationCount] = useState<number | null>(null);
    const [reviewNotWriteCount, setReviewNotWriteCount] = useState<number | null>(null);
    const [waitForRefundCount, setWaitForRefundCount] = useState<number | null>(null);

    const handleTabClick = (tab: number) => {
        setTabKinds(tab);
    };

    const handleTabForMenteeClick = (tab: number) => {
        setTabForMentee(tab);
    };

    const handleTabForMentoClick = (tab: number) => {
        setTabForMento(tab);
    };

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
            width:"80%",
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
            console.log("mypage");
            console.log(newUserInfo);
            const fetchData = async () => {
                try {
                    const response = await axios.post('http://49.247.41.208:8080/api/editUserInfo', {
                        userNickname:newUserInfo?.nickname,
                        department: newUserInfo?.department,
                        studentNumber: newUserInfo?.studentNumber,
                        grade: newUserInfo?.grade,
                        birtYear: newUserInfo?.birtYear,
                        currentStatus: newUserInfo?.currentStatus
                    });
                    if (response.status == 200)
                    {
                        alert("내정보 수정이 완료되었습니다.");
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
    }, [newUserInfo]);
/* --------------- end --------------- 내정보 수정 모달 --------------- end --------------- */


/* --------------- start --------------- 취소 및 거절 모달 --------------- start --------------- */
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [cancelOrRefusalReservaionId, setCancelOrRefusalReservaionId] = useState<number | null>(null);
    const [cancelReason, setCancelReason] = useState<string | null>(null);
    const [refusalReason, setRefusalReason] = useState<string | null>(null);
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
                    if (cancelRefundBankNum && cancelRefundBank)
                    {
                        response = await axios.post('http://49.247.41.208:8080/api/cancel', {
                            reservationId:cancelOrRefusalReservaionId,
                            cancelReason: cancelReason,
                            cancelRefundBankNum: cancelRefundBankNum,
                            cancelRefundBank:cancelRefundBank
                        });
                    }
                    else
                    {
                        response = await axios.post('http://49.247.41.208:8080/api/cancel', {
                            reservationId:cancelOrRefusalReservaionId,
                            cancelReason: cancelReason
                        });
                    }
                    if (response == null)
                    {
                        throw new Error("not have response");
                    }
                    if (response.status == 200)
                    {
                        alert("취소되었습니다.");
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

        else if (refusalReason)
        {
            const fetchData = async () => {
                try {
                    const response = await axios.post('http://49.247.41.208:8080/api/refusal', {
                        reservationId:cancelOrRefusalReservaionId,
                        refusalReason: refusalReason
                    });
                    if (response.status == 200)
                    {
                        alert("취소되었습니다.");
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
                    const response = await axios.post('http://49.247.41.208:8080/api/review', {
                        reservaionId:reviewReservaionId,
                        reviewContent:reviewContent,
                        reviewScore:reviewScore
                    });

                    if (response.status == 200)
                    {
                        alert("리뷰작성이 완료되었습니다.");
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
                const response = await axios.post('http://49.247.41.208:8080/api/choiceReservation', {
                    reservaionId:choiceReservationId,
                    adminOkDate:choiceReservation
                });

                if (response.status == 200)
                {
                    alert("날짜 선택이 완료되었습니다.");
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

    setChoiceReservation(null);
    setChoiceReservationId(null);
}, [choiceReservationId]);

/* --------------- end --------------- 멘토링 날짜선택 모달 --------------- end --------------- */


/* --------------- start --------------- 리뷰확인 모달 --------------- start --------------- */
const [isReviewCheckModalOpen, setIsReviewCheckModalOpen] = useState(false);
const openReviewCheckModal = () => {
    setIsReviewCheckModalOpen(true); // 모달 열기
};
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


    useEffect(() => {
        if (token == null)
        {
            alert("로그인 먼저 수행해주세요!");
            navigate("/");
            return;
        }
        // else
        // {
        //     userId = token['userId'];
        // }
            // const response = await axios.post('http://localhost:8080/api/mypage', {
            // userId: userId,
            // });
            // const response = await axios.get('http://49.247.41.208:8080/api/mypage', {
            //     params: {
            //         userId: userId,
            //     },
            // });

        const fetchMypageTopNumbers = async () => {
            try {
                const response = await fetch('/back/api/mentorTabNums', {
                    method: 'GET', // POST 요청
                    headers: {
                    'Content-Type': 'application/json', // JSON 형식으로 요청 본문 전송
                    'Authorization': `Bearer ${token}`, // Bearer Token을 Authorization 헤더에 포함
                    },
                });
                const res:responseData = await response.json();
                console.log(res);
                setMypageTopNumbers(res.data[0]);
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
                console.log(res);
                setMenteeWaitForConfirm(res.data[0]);
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
                console.log(res);
                setMenteeWaitForDeposit(res.data[0]);
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
                console.log(res);
                setMenteeReservationSuccess(res.data[0]);
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
                console.log(res);
                setMenteeMentoringInfo(res.data[0]);
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
                console.log(res);
                setMenteeRefund(res.data[0]);
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
                console.log(res);
                setMentoNotCheck(res.data[0]);
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
                console.log(res);
                setMentoWaitForDeposit(res.data[0]);
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
                console.log(res);
                setMentoReservationSuccess(res.data[0]);
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
                console.log(res);
                setMentoMentoringInfo(res.data[0]);
            } catch (err) {
                setError('데이터를 가져오는 중 오류가 발생했습니다.');
                console.error(err);
            } finally {
            }
        };


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

    // useEffect(() => {
    //     if (mypageInfo)
    //     {
    //         setUserInfo(mypageInfo["userInfo"]);
            
    //         setMenteeWaitForConfirm(mypageInfo["menteeWaitForConfirm"]);
    //         setMenteeWaitForDeposit(mypageInfo["menteeWaitForDeposit"]);
    //         setMenteeReservationSuccess(mypageInfo["menteeReservationSuccess"]);
    //         setMenteeMentoringInfo(mypageInfo["menteeMentoringInfo"]);
    //         setMenteeRefund(mypageInfo["menteeRefund"]);

    //         setMentoNotCheck(mypageInfo["mentoNotCheck"]);
    //         setMentoWaitForDeposit(mypageInfo["mentoWaitForDeposit"]);
    //         setMentoReservationSuccess(mypageInfo["mentoReservationSuccess"]);
    //         setMentoMentoringInfo(mypageInfo["mentoMentoringInfo"]);
    //     }
    // }, [mypageInfo]);

    useEffect(() => {
        if (menteeReservationSuccess)
        {
            setConfirmReservationCount(menteeReservationSuccess.length);
            setReviewNotWriteCount(menteeReservationSuccess.length);
        }
    }, [menteeReservationSuccess]);

    useEffect(() => {
        if (menteeWaitForConfirm)
        {
            setWaitForConfirmCount(menteeWaitForConfirm.length);
        }
    }, [menteeWaitForConfirm]);

    useEffect(() => {
        if (menteeRefund)
        {
            setWaitForRefundCount(menteeRefund.length);
        }
    }, [menteeRefund]);


    if (error) return <p>{error}</p>; // 오류가 발생했을 때 오류 메시지 표시
    if (!mypageInfo || !userInfo || !menteeWaitForConfirm || !menteeWaitForDeposit || !menteeReservationSuccess || !menteeMentoringInfo || !menteeRefund
        || !mentoNotCheck || !mentoWaitForDeposit || !mentoReservationSuccess || !mentoMentoringInfo
        || (waitForConfirmCount == null) || (confirmReservationCount == null) || (reviewNotWriteCount == null) || (waitForRefundCount == null)) 
    {
        return (<div>unknown error</div>); // 로딩 중일 때는 "Loading..." 메시지 표시
    }

    return (
        <div lang='ko'  ref={containerRef}>
            <Title title="로그인"/>
            <Header />
{/* -------------------- start -------------------- 유저 정보부터 상단에 채워주는 부분 -------------------- start -------------------- */}
            <div className="subpage-wrap mypage">
                <div className="container-fluid">
                    <p className="page-title">{userInfo["nickname"]} 님의 마이페이지</p>
                    <div className="content-area my-info-nums">
                        <div className="verticals-list">
                            <div className="list-item">
                                <p className="big-value">{waitForConfirmCount}</p>
                                <p className="info-label">확정 대기</p>
                            </div>
                            <div className="list-item">
                                <p className="big-value">{confirmReservationCount}</p>
                                <p className="info-label">예약 확정</p>
                            </div>
                            <div className="list-item">
                                <p className="big-value">{reviewNotWriteCount}</p>
                                <p className="info-label">리뷰 미작성</p>
                            </div>
                            <div className="list-item">
                                <p className="big-value">{waitForRefundCount}</p>
                                <p className="info-label">환불 대기</p>
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
                                            <div>{mypageInfo["userInfo"]["department"]}</div>
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
                                        {userInfo["birtYear"] && userInfo["birtYear"] !== null?
                                        <div className="list-content">
                                            <div>{userInfo["birtYear"]}</div>
                                        </div>
                                        :<div className="list-content">
                                            <div>정보 없음</div>
                                        </div>
                                        }
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">신분상태</div>
                                        <div className="list-content">
                                        {userInfo["currentStatus"] && userInfo["currentStatus"] !== null?
                                        <div className="list-content">
                                            {(() => {
                                                if (userInfo["currentStatus"] == "INSCHOOL")
                                                {
                                                    return <div>재학</div>;
                                                }
                                                else if (userInfo["currentStatus"] == "a")
                                                {
                                                    return <div>휴학</div>;
                                                }
                                                else if (userInfo["currentStatus"] == "b")
                                                {
                                                    return <div>졸업</div>;
                                                }
                                                else
                                                {
                                                    return <div>졸업유예</div>;
                                                }
                                            })()}
                                        </div>
                                        :<div className="list-content">
                                            <div>정보 없음</div>
                                        </div>
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btns-wrap bottom-btns-wrap">
                            <a className="btn btn-line-white" onClick={() => openMyInfoModal()}>정보 수정</a>
                        </div>
                        <Modal isOpen={isMyInfoModalOpen} onRequestClose={closeMyInfoModal} style={customStyle}>
                                <EditMyInfo setNewUserInfo={setNewUserInfo} userNickname={userInfo["nickname"]} department={userInfo["department"]} studentNumber={userInfo["studentNumber"]} grade={userInfo["grade"]} birtYear={userInfo["birtYear"]} currentStatus={userInfo["currentStatus"]} isOpen={isMyInfoModalOpen} onClose={closeMyInfoModal}/>
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
                                                    <div className="list-content">{item.applyDate}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청일자1</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청일자2</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청일자3</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>                                                    
                                                <div className="list-item">
                                                    <div className="list-label">플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">재학중인 학과</div>
                                                    <div className="list-content">{item.currentDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 종류</div>
                                                    <div className="list-content">
                                                        {item.questionCategory === 1
                                                        ? "전과"
                                                        : item.questionCategory === 2
                                                        ? "복수전공"
                                                        : item.questionCategory === 3
                                                        ? "부전공"
                                                        : item.questionCategory === 4
                                                        ? "그외"
                                                        : "알 수 없음"}
                                                    </div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">목표 학과</div>
                                                    <div className="list-content">{item.hopeDepartment}</div>
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
                                                    <div className="list-content">{item.applyDate}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정날짜</div>
                                                    <div className="list-content">{item.adminOkDate}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정시간</div>
                                                    <div className="list-content">{item.adminOkTime}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">재학중인 학과</div>
                                                    <div className="list-content">{item.currentDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 종류</div>
                                                    <div className="list-content">
                                                        {item.questionCategory === 1
                                                        ? "전과"
                                                        : item.questionCategory === 2
                                                        ? "복수전공"
                                                        : item.questionCategory === 3
                                                        ? "부전공"
                                                        : item.questionCategory === 4
                                                        ? "그외"
                                                        : "알 수 없음"}
                                                    </div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">목표 학과</div>
                                                    <div className="list-content">{item.hopeDepartment}</div>
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
                                                    <div className="list-content">{item.applyDate}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정날짜</div>
                                                    <div className="list-content">{item.menteeOkDate.split(" ")[0]}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정시간</div>
                                                    <div className="list-content">{item.menteeOkDate.split(" ")[1].substring(0, 5)}</div>
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
                                                    <div className="list-content">
                                                        {item.questionCategory === 1
                                                        ? "전과"
                                                        : item.questionCategory === 2
                                                        ? "복수전공"
                                                        : item.questionCategory === 3
                                                        ? "부전공"
                                                        : item.questionCategory === 4
                                                        ? "그외"
                                                        : "알 수 없음"}
                                                    </div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">목표 학과</div>
                                                    <div className="list-content">{item.hopeDepartment}</div>
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
                                                    <a className="btn btn-line-white btn-erfund btn-refund-edit" onClick={() => openReviewWriteModal()} style={{borderColor:"#000", backgroundColor:"#000", color:"#fff"}}>예약완료</a>
                                                </div>
                                                <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                                    <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openCancelModal()} style={{backgroundColor:"#FF4D4D", color:"#fff"}}>취소하기</a>
                                                </div>
                                                <Modal isOpen={isReviewWriteModalOpen} onRequestClose={closeReviewWriteModal} style={customStyle}>
                                                    <ReviewWrite adminOkDate={item.menteeOkDate} mentoNickname={item.mentoNickname} questionCategory={item.questionCategory} planPrice={item.planPrice} setReviewTitle={setReviewTitle} setReviewContent={setReviewContent} setReviewScore={setReviewScore} isOpen={isReviewWriteModalOpen} onClose={() => closeReviewWriteModal(item.reservationId)}/>
                                                </Modal>
                                                <Modal isOpen={isCancelModalOpen} onRequestClose={closeCancelModal} style={customStyle}>
                                                    <Cancel afterPaid={true} setCancelRefundBankNum={setCancelRefundBankNum} setCancelRefundBank={setCancelRefundBank} setReason={setCancelReason} isOpen={isCancelModalOpen} onClose={() => closeCancelModal(item.reservationId)}/>
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
                                                    <div className="list-label" style={{color:"#fff"}}>등록일자</div>
                                                    <div className="list-content">{item.applyDate}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>확정날짜</div>
                                                    <div className="list-content">{item.adminOkDate}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>확정시간</div>
                                                    <div className="list-content">{item.adminOkTime}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>재학중인 학과</div>
                                                    <div className="list-content">{item.currentDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>질문종류</div>
                                                    <div className="list-content">{item.questionCategory}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>목표학과</div>
                                                    <div className="list-content">{item.hopeDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>질문내용</div>
                                                    <div className="list-content">{item.questionContent}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>약속장소</div>
                                                    <div className="list-content">{item.wishPosition}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 여기에서 버튼 누르면 환불 요청 수정 모달 구현해야함 */}
                                    <div className="btns-wrap bottom-btns-wrap pb-3">
                                        <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openReviewCheckModal()} style={{backgroundColor:"#303030", borderColor:"#F68536", color:"#F68536"}}>후기 확인하기</a>
                                    </div>
                                    <Modal isOpen={isReviewCheckModalOpen} onRequestClose={closeReviewCheckModal} style={customStyle}>
                                        <ReviewCheck mentoringInfo={item} isOpen={isReviewCheckModalOpen} onClose={closeReviewCheckModal}/>
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
                                                    <div className="list-label">신청일자</div>
                                                    <div className="list-content">{item.applyDate}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">멘토닉네임</div>
                                                    <div className="list-content">{item.mentoNickname}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">환불 은행명</div>
                                                    <div className="list-content">{item.refundBank}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">환불 계좌</div>
                                                    <div className="list-content">{item.refundBankNum}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 여기에서 버튼 누르면 환불 요청 수정 모달 구현해야함 */}
                                    <div className="btns-wrap bottom-btns-wrap pb-3">
                                        <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openChangeRefundInfoModal()} >환불 정보 변경</a>
                                    </div>
                                    <Modal isOpen={isChangeRefundInfoModalOpen} onRequestClose={closeChangeRefundInfoModal} style={customStyle}>
                                        <ChangeRefundInfo setNewRefundBank={setNewRefundBank} setNewRefundBankNum={setNewRefundBankNum} refundBank={item.refundBank} refundBankNum={item.refundBankNum} isOpen={isChangeRefundInfoModalOpen} onClose={() => closeChangeRefundInfoModal(item.reservationId)}/>
                                    </Modal>
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
                                                    <div className="list-content">{item.applyDate}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청일자1</div>
                                                    <div className="list-content">{item.wishDate1}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청일자2</div>
                                                    <div className="list-content">{item.wishDate2}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">신청일자3</div>
                                                    <div className="list-content">{item.wishDate3}</div>
                                                </div>                                                    
                                                <div className="list-item">
                                                    <div className="list-label">플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">재학중인 학과</div>
                                                    <div className="list-content">{item.currentDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 종류</div>
                                                    <div className="list-content">
                                                        {item.questionCategory === 1
                                                        ? "전과"
                                                        : item.questionCategory === 2
                                                        ? "복수전공"
                                                        : item.questionCategory === 3
                                                        ? "부전공"
                                                        : item.questionCategory === 4
                                                        ? "그외"
                                                        : "알 수 없음"}
                                                    </div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">목표 학과</div>
                                                    <div className="list-content">{item.hopeDepartment}</div>
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
                                                    <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openChoiceReservationModal()} style={{backgroundColor:"#000", color:"#fff"}}>날짜 확정하기</a>
                                                </div>
                                                <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                                                    <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openCancelModal()} style={{backgroundColor:"#FF4D4D", color:"#fff"}}>거절하기</a>
                                                </div>
                                                <Modal isOpen={isChoiceReservationModalOpen} onRequestClose={closeChoiceReservatioModal} style={customStyle}>
                                                    <ChoiceReservationDate reservationList={[item.wishDate1, item.wishDate2, item.wishDate3]} setChoiceReservation={setChoiceReservation} isOpen={isChoiceReservationModalOpen} onClose={() => closeChoiceReservatioModal(item.reservationId)}/>
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
                                                    <div className="list-content">{item.applyDate}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정날짜</div>
                                                    <div className="list-content">{item.mentorOkDate.split(" ")[0]}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정시간</div>
                                                    <div className="list-content">{item.mentorOkDate.split(" ")[1].substring(0, 5)}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">재학중인 학과</div>
                                                    <div className="list-content">{item.menteeDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 종류</div>
                                                    <div className="list-content">
                                                        {item.questionCategory === 1
                                                        ? "전과"
                                                        : item.questionCategory === 2
                                                        ? "복수전공"
                                                        : item.questionCategory === 3
                                                        ? "부전공"
                                                        : item.questionCategory === 4
                                                        ? "그외"
                                                        : "알 수 없음"}
                                                    </div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">목표 학과</div>
                                                    <div className="list-content">{item.hopeDepartment}</div>
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
                                                    <div className="list-content">{item.applyDate}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정날짜</div>
                                                    <div className="list-content">{item.adminOkDate}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">확정시간</div>
                                                    <div className="list-content">{item.adminOkTime}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">재학중인 학과</div>
                                                    <div className="list-content">{item.currentDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">질문 종류</div>
                                                    <div className="list-content">
                                                        {item.questionCategory === 1
                                                        ? "전과"
                                                        : item.questionCategory === 2
                                                        ? "복수전공"
                                                        : item.questionCategory === 3
                                                        ? "부전공"
                                                        : item.questionCategory === 4
                                                        ? "그외"
                                                        : "알 수 없음"}
                                                    </div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label">목표 학과</div>
                                                    <div className="list-content">{item.hopeDepartment}</div>
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
                                                    <div className="list-label" style={{color:"#fff"}}>등록일자</div>
                                                    <div className="list-content">{item.applyDate}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>확정날짜</div>
                                                    <div className="list-content">{item.adminOkDate}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>확정시간</div>
                                                    <div className="list-content">{item.adminOkTime}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>플랜금액</div>
                                                    <div className="list-content">{item.planPrice}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>재학중인 학과</div>
                                                    <div className="list-content">{item.currentDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>질문종류</div>
                                                    <div className="list-content">{item.questionCategory}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>목표학과</div>
                                                    <div className="list-content">{item.hopeDepartment}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>질문내용</div>
                                                    <div className="list-content">{item.questionContent}</div>
                                                </div>
                                                <div className="list-item">
                                                    <div className="list-label" style={{color:"#fff"}}>약속장소</div>
                                                    <div className="list-content">{item.wishPosition}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 여기에서 버튼 누르면 환불 요청 수정 모달 구현해야함 */}
                                    <div className="btns-wrap bottom-btns-wrap pb-3">
                                        <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => openReviewCheckModal()} style={{backgroundColor:"#303030", borderColor:"#F68536", color:"#F68536"}}>후기 확인하기</a>
                                    </div>
                                    <Modal isOpen={isReviewCheckModalOpen} onRequestClose={closeReviewCheckModal} style={customStyle}>
                                        <ReviewCheck mentoringInfo={item} isOpen={isReviewCheckModalOpen} onClose={closeReviewCheckModal}/>
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