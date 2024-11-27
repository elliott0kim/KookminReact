import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useContext, useRef } from 'react'
import { LoginContext } from '../user/auth'

import useMaxScrollY from '../components/UseMaxScrollY.js'
import { PageTracking } from '../components/pageTracking.js'
import { getTokenUserId } from '../components/jwtUtil.js'
import { ButtonTracking } from '../components/ButttonTracking.js'

export function CommonErrorPage() {
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
            const logUri = "/mypage";
            PageTracking(startTime, containerHeightRef.current, maxScrollYRef.current, logUri);
        })
        return () => {
        }
    }, []);
    /* 페이지 로그 수집부분 end */


    const handleButtonHome = () => {
        ButtonTracking(`/mypage`, "홈으로");
        navigate("/");
    }

    return (
        <div ref={containerRef}>
            <div lang='ko'>
            <Title title="멘토 정보"/>
            <Header />
            <div className="subpage-wrap step3-wrap">
                <div className="container-fluid">
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="/images/fixed.png" alt="success" style={{width:"50px", height:"auto", paddingBottom:"10px"}}/>
                    </div>
                    <div style={{fontSize:"14px", display:"flex", lineHeight:'2', justifyContent: 'center', alignItems: 'center'}}>앗! 불편을 드려 죄송합니다.</div>
                    <div style={{fontSize:"14px", display:"flex", lineHeight:'2', justifyContent: 'center', alignItems: 'center'}}>해당 서비스는 아직 제작 중이에요!</div>
                    <div style={{fontSize:"14px", display:"flex", lineHeight:'2', justifyContent: 'center', alignItems: 'center'}}>완성되면 알려드릴게요.</div>
                </div>
            </div>
            <div className="btns-wrap bottom-btns-wrap" style={{padding: "0 20px 10px 20px"}}>
                <button onClick={() => handleButtonHome()} className="btn btn-primary" style={{backgroundColor : "#303030", color : "#F68536"}}>홈으로</button>
            </div>
            </div>
        </div>
    );
}
export default CommonErrorPage