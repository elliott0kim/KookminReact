import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import '/css/fix_cmr.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext, useRef } from 'react'
import { LoginContext } from '../user/auth'
import axios from 'axios';

import { ResponsiveBar } from '@nivo/bar'

import useMaxScrollY from '../components/UseMaxScrollY.js'
import { PageTracking } from '../components/pageTracking.js'
import { ButtonTracking } from '../components/ButttonTracking.js'


export interface mento {
    mentoId: string;
    mentoImg: string;
    nickname: string;
    grade: number;
    major: string;
    minor: string;
    introduceTitle: string;
    introduceContent: string;
}

interface questionKinds {
    category: string;
    count: number;
}

interface eca {
    year: string;
    job: string;
    company: string;
}

interface ca {
    year: string;
    college: string;
    status: string;
    department: string;
}

interface totalReview {
    questionKind: string;
    mentoringDate: string;
    satisfaction: number;
    requestAmount: number;
    reviewTitle: string;
    reviewContent: string;
}

export interface mentoInfo {
    mentoId: string;
    pfp: string;
    nickname: string;
    grade: number;
    major: string;
    minor: string;
    introduceTitle: string;
    introduceContent: string;
    totalReviewCount: number;
    reviewSatisfaction: number;
    planPriceMode:number;
    recommendContent: string[];
    linkedInURL?: string;
    webSiteURL?: string;
    questionKinds: questionKinds[];
    eca: eca[];
    ca: ca[];
    totalReview: totalReview[];
    tags: string[];
}

interface barChartDataImpl {
    chartKind: string;

}

export function MentoPage() {
    const context = useContext(LoginContext);

    // context가 undefined일 가능성에 대비하여 기본값 설정
    if (!context) {
        throw new Error('useContext must be used within a LoginProvider');
    }
    
    const { loginStatus, setLoginStatus } = context;

    const navigate = useNavigate();
    useEffect(() => {
        // 페이지 진입 시 스크롤 위치를 맨 위로 이동
        window.scrollTo(0, 0);
      }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행
    const location = useLocation();
    // const cardMento = location.state?.getMento; // 전달된 state에서 데이터 가져오기
    const query = new URLSearchParams(location.search);
    const cardMentoId = query.get('mentoId'); // 쿼리 파라미터에서 nickname 가져오기

    const [selectedMentoInfo, setSelectedMentoInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


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
            const logUri = "/mento?mentoId=" + cardMentoId;
            PageTracking(startTime, containerHeightRef.current, maxScrollYRef.current, logUri);
        })
        return () => {
        }
    }, []);
/* 페이지 로그 수집부분 end */



    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`/back/mentors/${cardMentoId}`);

            setSelectedMentoInfo(response.data.data[0]);
            // console.log(response.data);
        } catch (err) {
            setError('데이터를 가져오는 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
        }
        };

        fetchData(); // 컴포넌트가 처음 렌더링될 때만 fetchData 실행
    }, [cardMentoId]);

    useEffect(() => {
        if (selectedMentoInfo) {
            setLoading(false); // 로딩 상태 종료
        }
    }, [selectedMentoInfo]);

    if (loading) return <p>Loading...</p>; // 로딩 중일 때는 "Loading..." 메시지 표시
    if (error) return <p>{error}</p>; // 오류가 발생했을 때 오류 메시지 표시
    
    const handleButtonClick = async (selectedMentoInfo:mentoInfo, topButtomFlag:number) => {
        // setLoading(true);  // 로딩 시작
        if (topButtomFlag == 0)
        {
            ButtonTracking(`/mento?mentoId=${cardMentoId}`, "상단 예약하기 버튼");
        }
        else
        {
            ButtonTracking(`/mento?mentoId=${cardMentoId}`, "하단 예약하기 버튼");
        }
        
        setError(null);    // 기존 오류 상태 초기화
        if (loginStatus == false)
        {
            alert('로그인 후에 예약이 가능합니다.')
            navigate('/login');
            return null;
        }

        try {
            // REST API 요청 (예시 URL과 데이터 형식)
            const response = await axios.get(`/back/mentors/${cardMentoId}/schedule`);
            console.log(response.data.data);
            // 데이터가 성공적으로 받아지면 페이지 이동
            navigate(`/reservation1?mentoId=${cardMentoId}`, { state: {mentoInfos: selectedMentoInfo, mentoDate: response.data.data}});
        } catch (err) {
          // 오류 발생 시 오류 메시지 설정
            setError('데이터를 가져오는 중 오류가 발생했습니다.');
        } finally {
        //   setLoading(false);  // 로딩 종료
        }
    };

    // console.log(selectedMentoInfo);
    const rawQuestionList:[questionKinds] = selectedMentoInfo.questionKinds;
    let questionList:questionKinds[] = [{'category':'전과', 'count':0}, {'category':'복전', 'count':0}, {'category':'부전', 'count':0}, {'category':'기타', 'count':0}];

    // 여기 수정해야함
    for (let i = 0; i < rawQuestionList.length; i++) {
        if (rawQuestionList[i].category === '전과') {
            questionList[0].count += rawQuestionList[i].count;
        }
        else if (rawQuestionList[i].category === '복수전공') {
            questionList[1].count += rawQuestionList[i].count;
        }
        else if (rawQuestionList[i].category === '부전공') {
            questionList[2].count += rawQuestionList[i].count;
        }
        else {
            questionList[3].count += rawQuestionList[i].count;
        }
    }
    // console.log(questionList);
    questionList.sort((a, b) => b.count - a.count);
    // console.log(questionList);
    const totalQuestionCount = questionList.reduce((acc, item) => acc + item.count, 0);

    // console.log(questionList);
    const barChartData = [{"empty": ""}];

    for (let i = 0; i < questionList.length; i++) {
        barChartData[0][questionList[i]['category']] = questionList[i]['count'];
    }
    barChartData[0][questionList[0]['category']] = questionList[0]['count'];
    barChartData[0][questionList[1]['category']] = questionList[1]['count'];
    barChartData[0][questionList[2]['category']] = questionList[2]['count'];
    barChartData[0][questionList[3]['category']] = questionList[3]['count'];
    
    const labelColors = ["#fff, #fff, #f68536", "#f68536"];
    // console.log(barChartData)
    const barChart = () => (
        
        <div style={{ height: '200px' }}>
            <div className='bar-chart-wrap'>
        <ResponsiveBar 
            data={barChartData}
            keys={[
                '전과',
                '복전',
                '부전',
                '기타'
            ]}
            indexBy="empty"
            
            margin={{ top: 0, right: 0, bottom: 100, left: 0}}
            padding={0.3}
            layout="horizontal"
            valueScale={{ type: 'linear'}}
            indexScale={{ type: 'band', round: true }}
            colors={['#F68536', '#FFAF76', '#FFDEC7', '#FFF']} // 여기서 각 항목에 색상 지정
            borderRadius={0}
            theme={{text:{fontSize:12, fontFamily: "Noto Sans KR", fontStyle: 'bold', fontWeight: 700}, tooltip:{container:{ color: "#333333", fontSize: 12}}}}
            //labelTextColor="#795858"
            labelTextColor={(d) => ['#FFF', '#FFF', '#F68536', '#F68536'][d.index % 4]} // 라벨 컬러 순환

            label={d => (
                <>
                <tspan dx="0.3em" dy="-0.5em" text-anchor="middle">{d.id}</tspan>
                <tspan dx="-1.5em" dy="1.2em" text-anchor="middle">{d.value}</tspan>
                </>
            )}
            

            enableGridY={false}
            enableGridX={false}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e => `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`}
        />
        </div>
    </div>
    )



    return (
        <div  ref={containerRef}>{!cardMentoId ? (<Navigate to="/" replace />):(
            <div lang='ko'>
            <Title title="멘토 정보"/>
            <Header />
            <div className="mento-info">
                <div className="mento-profile">
                    <img src={selectedMentoInfo.pfp} alt="mentoImg" />
                </div>
                <div className="content-area mento-info-summary">
                    <div className="container-fluid">
                        <p className="visual-txt">"{selectedMentoInfo.introduceTitle}"</p>
                        <div className="summary-area">
                            <div className="summary-top">
                                <div className="summary-title">
                                    <span className="mento-name">{selectedMentoInfo.nickname}</span>
                                    <span className="mento-grade">{selectedMentoInfo.grade}학년</span>
                                </div>
                                <div className="list-wrap list-specialty">
                                    <div className="list-item">
                                        <div className="list-label">주전공</div>
                                        <div className="list-content">{selectedMentoInfo.major}</div>
                                    </div>
                                    <div className="list-item">
                                        <div className="list-label">부전공</div>
                                        <div className="list-content">{selectedMentoInfo.minor}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-bottom">
                                <div className="verticals-list">
                                    <div className="list-item">
                                        <p className="big-value">{selectedMentoInfo.totalReviewCount}</p>
                                        <p className="info-label">누적 멘토링 횟수</p>
                                    </div>
                                    <div className="list-item">
                                        <p className="big-value"><span>{selectedMentoInfo.reviewSatisfaction}</span>%</p>
                                        <p className="info-label">멘토링 만족도</p>
                                    </div>
                                    <div className="list-item">
                                        <p className="big-value">{selectedMentoInfo.planPriceMode}</p>
                                        <p className="info-label">평균 멘토링 금액</p>
                                    </div>
                                </div>
                                <div className="btns-wrap bottom-btns-wrap">
                                    <div>
                                        <button onClick={() => handleButtonClick(selectedMentoInfo, 0)} disabled={loading} className="btn btn-primary btn-reservation" style={{fontSize:'20px'}}>
                                        {loading ? '로딩 중...' : '예약하기'}
                                        </button>
                                        {/* 오류 메시지 표시 */}
                                        {error && <p style={{ color: 'red' }}>{error}</p>}
                                    </div>
                                    {/* <Link to={`/reservation1?nickname=${getMento.nickname}`} state={{ getMento, mentoInfos }} className="btn btn-primary"></Link> */}
                                </div>
                            </div>
                            
                            <div className="summary-top">
                                <p className="visual-txt-recommand">이런 분들에게<br />{selectedMentoInfo.nickname} 멘토님을 추천해드려요!</p>
                            </div>
                            <div className="summary-bottom">
                            {selectedMentoInfo.recommendContent.map((recommandText, index) => (
                                <div className="recommand-box-gap" key={index}>
                                <div className="recommand-box">
                                    <div className="circle-direct">
                                    <img src="/images/circle-direct.svg" className="ico-bullet" alt="circle-direct" />
                                    <p className="recommand-box-visual-txt">{recommandText}</p>
                                    </div>
                                </div>
                                </div>))}
                                <div className='recommand-bottom-layout'>
                                    <div className='recommand-bottom-visual-txt'>위 내용에 해당되신다면<br />지금 바로 멘토링을 신청하세요!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='new-mento-intro'>
                        <div className='intro-card'>
                            <br />
                            <div className='visual-txt mentor-introduce-txt'>{selectedMentoInfo.nickname} 님을 소개할게요.</div>
                            <div className='bar'></div>
                            <div className='profile-card'>
                                <div className='left'>
                                    <div className='mini-profile-wrap'>
                                        <img src={selectedMentoInfo.pfp} alt="mentoImg" />
                                    </div>
                                    <div className='website-container'>
                                        {selectedMentoInfo.linkedInURL ? 
                                            <div className='website-format'>
                                                <img src='/images/linkedIn.png' className='ico-linked-in' alt="linkedIn" />
                                                <div className='website-text'>  <a 
                                                href={selectedMentoInfo.linkedInURL.startsWith('http') ? selectedMentoInfo.linkedInURL : `http://${selectedMentoInfo.linkedInURL}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer">
                                                {selectedMentoInfo.linkedInURL}</a></div>
                                            </div> :
                                            <div></div>}
                                        {selectedMentoInfo.webSiteURL ? 
                                            <div className='website-format'>
                                                <img src='/images/web.png' alt="web" />
                                                <div className='website-text'><a 
                                                href={selectedMentoInfo.webSiteURL.startsWith('http') ? selectedMentoInfo.webSiteURL : `http://${selectedMentoInfo.webSiteURL}`} 
                                                target="_blank" rel="noopener noreferrer">{selectedMentoInfo.webSiteURL}</a></div>
                                            </div> :
                                            <div></div>}
                                    </div>
                                </div>
                                <div className='right'><div className='visual-txt new-profile-txt'>{selectedMentoInfo.introduceContent}</div></div>
                            </div>
                        </div>
                    </div>


                    <div className="container-fluid">
                        <br /><br /><br /><br /><br />
                        <p className="visual-txt chart-visual-title" style={{fontSize:"26px"}}>다른분들은 {selectedMentoInfo.nickname}에게<br /> 이런 주제를 많이 물어봤어요.</p>
                        <div className="summary-area">
                            <div className="summary-top" style={{paddingBottom:"0px"}}>
                            </div>
                            <div className="summary-bottom chart-small-title" style={{display:"flex", alignItems:"center", flexDirection:"column", fontSize:"13px"}}>
                                질문 주제 1위
                            </div>
                            <div className="summary-bottom chart-big-title" style={{display:"flex", alignItems:"center", flexDirection:"column", fontSize:"24px", color:"#F68536", fontFamily:"Noto Sans KR", fontStyle:"normal" ,fontWeight:"900", paddingBottom:"0px", marginBottom:"0px"}}>
                                {questionList[0]["category"]} {Math.floor((questionList[0]["count"]/totalQuestionCount)*100)}%
                            </div>
                            <div style={{height:"100px"}}>{barChart()}</div>
                            <div className="chart-table">
                            <div className="summary-bottom chart-table-row">
                                <div className='chart-table-th chart-table-col'>차트</div>
                                <div className='chart-table-th chart-table-col'>질문 종류</div>
                                <div className='chart-table-th chart-table-col'>빈도</div>
                                <div className='chart-table-th chart-table-col'>비중</div>
                            </div>
                            <div className="summary-bottom chart-table-row">
                                <div className='chart-table-col'><div className="color-label label-1"></div></div>
                                <div className='chart-table-col'>{questionList[0]["category"]}</div>
                                <div className='chart-table-col'><span className='num-data'>{questionList[0]["count"]}건</span></div>
                                <div className='chart-table-col'><span className='num-data'>{Math.floor((questionList[0]["count"]/totalQuestionCount)*100)}%</span></div>
                            </div>
                            <div className="summary-bottom chart-table-row">
                                <div className='chart-table-col'><div className="color-label label-2"></div></div>
                                <div className='chart-table-col'>{questionList[1]["category"]}</div>
                                <div className='chart-table-col'><span className='num-data'>{questionList[1]["count"]}건</span></div>
                                <div className='chart-table-col'><span className='num-data'>{Math.floor((questionList[1]["count"]/totalQuestionCount)*100)}%</span></div>
                            </div>
                            <div className="summary-bottom chart-table-row">
                                <div className='chart-table-col'><div className="color-label label-3"></div></div>
                                <div className='chart-table-col'>{questionList[2]["category"]}</div>
                                <div className='chart-table-col'><span className='num-data'>{questionList[2]["count"]}건</span></div>
                                <div className='chart-table-col'><span className='num-data'>{Math.floor((questionList[2]["count"]/totalQuestionCount)*100)}%</span></div>
                            </div>
                            <div className="summary-bottom chart-table-row">
                                <div className='chart-table-col'><div className="color-label label-4"></div></div>
                                <div className='chart-table-col'>{questionList[3]["category"]}</div>
                                <div className='chart-table-col'><span className='num-data'>{questionList[3]["count"]}건</span></div>
                                <div className='chart-table-col'><span className='num-data'>{Math.floor((questionList[3]["count"]/totalQuestionCount)*100)}%</span></div>
                            </div>
                            </div>
                            <br />
                        </div>
                    </div>
                    <div className='new-mento-intro add-info'>
                        <div className='intro-card'>
                            <br />
                            <div className='visual-txt'>{selectedMentoInfo.nickname} 님의 추가정보</div>
                            <div className='small-visual-txt'>교내외에서 경험했던 내용들을 살펴보면서<br />
                            멘토님에게 추가적으로 물어볼 수 있는 질문들을 생각해보세요.<br />
                            계약직, 인턴십, 봉사활동, 서포터즈, 스터디 등 <br />해보고싶었거나 하고 있는 것들에 대해<br />
                            자유롭게 고민을 나눠보시는 것도 좋은 방법입니다.</div>
                            <div className='bar'></div>
                            <div className='profile-card'>
                                <div className='profile-card-inout'>
                                    <div className="card card-separater">
                                        <div className="card-body">
                                            <div className="card-top">
                                                <div className="card-label-wrap">
                                                    <span className="card-label" style={{color: '#F68536'}}>교외활동</span>
                                                    <p className="card-title" style={{color: '#F68536'}}>학교 밖에서 이런 것들을 경험해봤으니,<br /> 관련해서 물어봐주셔도 됩니다.</p>
                                                </div>
                                            </div>
                                            <div className="table-wrap">
                                                <table className="table table-borderless table-act mb-0">
                                                    <tr>
                                                        <td>년도</td>
                                                        <td>직무명</td>
                                                        <td>기업이름</td>
                                                    </tr>
                                                    {selectedMentoInfo.eca.map((mentoEca, index) => (
                                                        <tr>
                                                            <td>{mentoEca.year}</td>
                                                            <td>{mentoEca.job}</td>
                                                            <td>{mentoEca.company}</td>
                                                        </tr>
                                                        ))}
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card card-separater">
                                        <div className="card-body">
                                            <div className="card-top">
                                                <div className="card-label-wrap">
                                                    <span className="card-label" style={{color: '#F68536'}}>교내활동</span>
                                                    <p className="card-title" style={{color: '#F68536'}}>학교 안에서는, 이런 경험을 해왔어요.</p>
                                                </div>
                                            </div>
                                            <div className="table-wrap">
                                                <table className="table table-borderless table-act mb-0">
                                                    <tr>
                                                        <td>년도</td>
                                                        <td>소속대학</td>
                                                        <td>학적상태</td>
                                                        <td>학과</td>
                                                    </tr>
                                                    {selectedMentoInfo.ca.map((mentoCa, index) => (
                                                        <tr>
                                                            <td>{mentoCa.year}</td>
                                                            <td>{mentoCa.college}</td>
                                                            <td>{mentoCa.status}</td>
                                                            <td>{mentoCa.department}</td>
                                                        </tr>
                                                        ))}
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='new-mento-intro tag-area' style={{background:'#F68536'}}>
                        <div className='intro-card'>
                            <br />
                            <div className='visual-txt' style={{color:'#fff'}}>{selectedMentoInfo.nickname} 님은 이런 키워드와<br />가까운 사람이에요.</div>
                            <span className='visual-subtxt'>전과나 부전공, 복수전공 같은 학교 이야기가 아닌<br/>
본인이 관심있는 분야의 키워드에 대해 얘기도 가능해요!<br/>
선배에게 궁금한 것을 자유롭게 물어보면서<br/>
서로의 궁금증을 해결해보세요!</span>
                            <div className='bar' style={{borderBottom: '1px solid #fff'}}></div>
                            <div className='word'>
                                {selectedMentoInfo.tags.map((item, index) => {
                                    if (index < 2) {
                                        return (
                                        <div key={index} className='mento-info mento-info-summary recommand-box' style={{border: '0.1px solid #fff', display: 'inline-flex', width: 'max-content'}}>
                                            <div style={{color:'#f68536'}}>#{item}</div>
                                        </div>
                                        );
                                    } else {
                                        return (
                                        <div key={index} className='mento-info mento-info-summary recommand-box' style={{border: '0.1px solid #fff', display: 'inline-flex', width: 'max-content', background:'#F68536'}}>
                                            #{item}
                                        </div>
                                        );
                                    }
                                })}
                            </div>
                            <br /><br />
                        </div>
                    </div>


                    <div className='new-mento-intro review-area'>
                        <div className='intro-card'>
                            <br />
                            <div className='visual-txt' style={{color:'#f68536'}}>실제 멘토링을 받으신 분들은<br />이런 리뷰를 적어주셨어요.</div>
                            <div className='small-visual-txt'  style={{color:'#f68536'}}>
                            멘토링을 실제로 받은 분들의 리뷰들이에요<br />다른 분들의 만족도와 리뷰 주제를 살펴보고<br />본인에게도 맞을지 살펴보세요!</div><br />
                            <div className='small-visual-txt'  style={{color:'#f68536', opacity: '0.5', fontSize:'15px'}}>
                            * 멘티의 신상 보호를 위해 리뷰의 전체 내용을 공개하지 않습니다. <br />* 욕설, 비방 목적으로 작성된 리뷰는 관리자에 의해 삭제됩니다.</div><br />
                            <div className='bar' style={{borderBottom: '1px solid #f68536'}}></div>
                            <br />
                            <div className="carousel-container">
                                <div className="carousel">
                                    {/* 카드를 두 번 이상 복제하여 자연스럽게 연결 */}
                                    {[...selectedMentoInfo.totalReview, ...selectedMentoInfo.totalReview
                                    , ...selectedMentoInfo.totalReview, ...selectedMentoInfo.totalReview
                                    , ...selectedMentoInfo.totalReview, ...selectedMentoInfo.totalReview].map((mentoReview, index) => (
                                    <div key={index} className="card-for-flow">
                                        <div className='card-for-flow-top'>
                                            <div className='card-for-flow-top-style'>질문 종류</div>
                                            <div className='card-for-flow-top-style'>멘토링 일시</div>
                                            <div className='card-for-flow-top-style'>만족도</div>
                                            <div className='card-for-flow-top-style'>신청금액</div>
                                        </div>
                                        <div className='card-for-flow-top'>
                                            <div className='card-for-flow-top-content-style'>{mentoReview.questionKind}</div>
                                            <div className='card-for-flow-top-content-style'>{mentoReview.mentoringDate}</div>
                                            <div className='card-for-flow-top-content-style'>{mentoReview.satisfaction} %</div>
                                            <div className='card-for-flow-top-content-style'>{mentoReview.requestAmount}</div>
                                        </div> 
                                        <div className='card-for-flow-bar'></div>
                                        <div className='card-for-flow-top card-for-flow-bottom-title'>{mentoReview.reviewTitle}</div>
                                        <div className='card-for-flow-top card-for-flow-bottom-content'>{mentoReview.reviewContent}</div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>


                    <div className="container-fluid end-bottom" style={{display: 'flex', justifyContent: 'center' , alignItems: 'center', flexDirection:'column'}}>
                        <br /><br /><br /><br />
                        <div className="visual-txt">멘토링을 받고싶은 마음이 생겼다면?</div>
                    </div>
                    <div className="container-fluid" >
                        <div className="summary-area">
                            <div className='summary-bottom'>
                                <div className="btns-wrap">
                                    <div>
                                        <button onClick={() => handleButtonClick(selectedMentoInfo, 1)} disabled={loading} className="btn btn-primary" style={{fontSize:'20px'}}>
                                        {loading ? '로딩 중...' : '더 알아보기'}
                                        </button>
                                        {/* 오류 메시지 표시 */}
                                        {error && <p style={{ color: 'red' }}>{error}</p>}
                                    </div>
                                    {/* <Link to={`/reservation1?nickname=${getMento.nickname}`} state={{ getMento, mentoInfos }} className="btn btn-primary" style={{fontSize:'20px'}}>{getMento.nickname} 멘토링 약속잡기</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        )}</div>
    )
}
export default MentoPage
