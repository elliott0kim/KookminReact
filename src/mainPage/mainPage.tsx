import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import Slider from '../components/cardSlider.js'
import { PageTracking } from '../components/pageTracking.js'
import { useState, useEffect, useRef } from 'react'
import useMaxScrollY from '../components/UseMaxScrollY.js'
import axios from 'axios'


export function MainPage() {
    const [mentoList, setMentoList] = useState<any>(null); // 받아온 데이터를 저장
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState<string | null>(null); // 오류 상태


/* 페이지 로그 수집부분 */
    const startTime = Date.now();
    const [maxScrollY, maxScrollYRef] = useMaxScrollY(); // 커스텀 훅 호출하여 상태와 ref 값 가져오기
    const containerRef = useRef(null);
    const containerHeightRef = useRef(0); // containerHeight 값을 관리할 ref

    // 로딩이 끝난 후에 containerRef 사용
    useEffect(() => {
        if (containerRef.current && !loading) {
            // 로딩이 끝난 후 containerRef 사용
            // console.log("containerRef.current scrollHeight:", containerRef.current.scrollHeight);
            containerHeightRef.current = containerRef.current.scrollHeight; // ref에 height 값 저장
        }
    }, [loading]); // 로딩 상태가 변경될 때마다 ref를 확인

    useEffect(() => {
        window.addEventListener('beforeunload', (event) => {
            PageTracking(startTime, containerHeightRef.current, maxScrollYRef.current, "/");
        })
        return () => {
        }
    }, []);
/* 페이지 로그 수집부분 end */



    useEffect(() => {
        const fetchData = async () => {
        try {
            // 서버에 요청
            const response = await axios.get('/back/');
            setMentoList(response.data.data); // 데이터를 상태에 저장
            setLoading(false); // 로딩 완료
        } catch (err) {
            setError('데이터를 가져오는 중 오류가 발생했습니다.'); // 오류 메시지 설정
            setLoading(false); // 로딩 종료
            console.log(err);
        }
        };
    
        fetchData(); // useEffect 실행 시 데이터 가져오기

    }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행
    


    // 로딩 중일 때
    if (loading) {
        return <p></p>;
    }
    
    // 오류가 있을 때
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div lang='ko' ref={containerRef} >
            <Title title="메인 페이지"/>
            <Header />
            <div className="main-wrap">
                <div className="content-area intro">
                    <div className="container-fluid">
                        <p className="intro-text-wrap" style={{fontSize:"22px"}}>우리 다 같은 국민대생이잖아요.<br />편하게 궁금한 것들을 물어보세요.</p>
                        <p className="visual-txt">
                            <span className="implement-txt">공강시간</span>에<br />
                            <span className="implement-txt">북악관</span> 카페에서<br />
                            <span className="implement-txt">커피 한잔</span> 마시며<br />
                            진로 고민 끝내기<span className="implement-txt">.</span><br />
                        </p>
                        <div className="row justify-content-end">
                            <div className="col-8 col-lg-6">
                                <div className="bubble bubble-yellow">
                                    <p>저는 2학년 2학기인데... 경영학과를 복수 전공을 지금부터 준비하면 늦었을까요?</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8 col-lg-6">
                                <div className="bubble bubble-orange">
                                    <p>저는 상경계열 학과를 다니고 있긴 하지만 디자인을 배워보려고 합니다! 혹시 디자인과로 전과하려면 그림을 얼마나 잘 그려야하나요?ㅠㅠ</p>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col-8 col-lg-6">
                                <div className="bubble bubble-yellow">
                                    <p>원하는 학과로 전과를 하려고 하는데 부전공도 해보고 싶어요ㅠ 혹시 꼭 추가학기를 해야하는 걸까요?</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="content-area point-3-info">
                    <div className="container-fluid little-gatter">
                        <div className="row full-row">
                            <div className="intro-banner">
                                <p className="visual-txt visual-txt-sm">
                                    이젠 혼자 고민하지 말고<br />
                                    <span className="implement-txt">직접 물어보세요!</span>
                                </p>
                            </div>
                        </div>
                        <div className="row little point-3">
                            <div className="col">
                                <div className="card point-3-card">
                                    <div className="card-body">
                                        <p>학과 인증<br />학부 재학생</p>
                                        <div className="icon-wrap">
                                            <img src="/images/ico_point01.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card point-3-card">
                                    <div className="card-body">
                                        <p>공강시간에<br />학교 안에서</p>
                                        <div className="icon-wrap">
                                            <img src="/images/ico_point02.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card point-3-card">
                                    <div className="card-body">
                                        <p>고민 상담<br />1 : 1 멘토링</p>
                                        <div className="icon-wrap">
                                            <img src="/images/ico_point03.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row little point-3">
                            <div className="col">
                                <p className="point-txt">신원이 확인된 국민대 소속 학부생이 직접 알려드려요.</p>
                            </div>
                            <div className="col">
                                <p className="point-txt">북악관, 본부관 카페 등 공개된 장소에서 공강 시간을 활용해서 만나요.</p>
                            </div>
                            <div className="col">
                                <p className="point-txt">궁금했던 것들을 해당 학과생에게 직접 물어보세요.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-area ex-review">
                    <div className="container-fluid">
                        <p className="visual-txt visual-txt-sm">
                            벌써 <span className="implement-txt">9명</span>의 학우분들과<br />
                            도움을 주고 받았습니다.
                        </p>
                        <div className="review-card-wrap">
                            <div className="card card-separater">
                                <div className="card-body">
                                    <div className="card-top">
                                        <div className="list-wrap">
                                            <div className="list-item">
                                                <div className="list-label">북악관 로비 / 약 1시간 진행</div>
                                                <div className="list-content"><span className="txt-review">7점 / 7점</span></div>
                                            </div>
                                            <div className="list-item">
                                                <div className="list-label">융합전공 복수전공 관련</div>
                                                <div className="list-content">
                                                    <span className="txt-review">
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-bottom">
                                        <p className="card-text">궁금한 점이 좀 많아서 에브리타임 메신저로 묻기가 부담스러웠는데, 커피챗(대면)을 통해 하다보니 세세한 궁금증들을 바로바로 해결할 수  있어 좋았어요.</p>
                                        <p className="card-subtext">2024.05</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-separater">
                                <div className="card-body">
                                    <div className="card-top">
                                        <div className="list-wrap">
                                            <div className="list-item">
                                                <div className="list-label">본부관 / 약 1시간 진행</div>
                                                <div className="list-content"><span className="txt-review">7점 / 7점</span></div>
                                            </div>
                                            <div className="list-item">
                                                <div className="list-label">조형대학 전과 관</div>
                                                <div className="list-content">
                                                    <span className="txt-review">
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-bottom">
                                        <p className="card-text">쉽게 알 수 없었던 정보들을 이런 기회로 듣게 돼서 너무 좋았어요! 쉽게 얻을 수 없는 정보인만큼 선뜻 공유해주시는 것도 쉽지 않았을텐데 정말 감사합니다..</p>
                                        <p className="card-subtext">2024.06</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-area mentos">
                    <div className="container-fluid">
                        <p className="visual-txt visual-txt-sm">
                            당신의 <span className="implement-txt">고민을 들어줄<br />멘토단</span>을 소개합니다.
                        </p>
                        <div className="slider-area">
                            <Slider mentoList={mentoList} />
                        </div>
                    </div>
                </div>
                    <div className="content-area team-section">
                        <div className="container-fluid">
                            <p className="visual-txt" style={{fontSize:"14px"}}>
                                홈페이지에 문제가 있거나<br />Coweef Plan에 궁금한 사항이 있나요?<br />
                                Team Coweef 에 문의하세요!
                            </p>
                            <p style={{fontSize:"12px"}}>
                                elliott<br />
                                job   : SoC(System on Chip) Software Engineer<br />
                                role  : Coweef 홈페이지 장애 관련 대응 담당자<br />
                                문의 email : jeremy22283@gmail.com<br />
                                <br />
                                junjun<br />
                                job   : Product Manager<br />
                                role  : Coweef Plan 기획<br />
                                문의 email : guswns0331@gmail.com<br />
                                <br />
                                morae<br />
                                job   : BackEnd Developer<br />
                                role  : Coweef BackEnd Developer<br />
                                <br />
                                yoon il<br />
                                job   : BackEnd Developer<br />
                                role  : Coweef BackEnd Developer
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    )
}
export default MainPage
