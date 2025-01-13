import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import '/css/fix_cmr.css'
import '/css/board.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link  } from "react-router-dom";


export function BoardDetail() {
    const { boardId } = useParams<BoardDetailParams>();
    const [board, setBoard] = useState<Board | null>(null);

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`/back/boards/${boardId}`);
            console.log(response.data.data[0]);
            setBoard(response.data.data[0]);
            // console.log(response.data);
        } catch (err) {
            setError('데이터를 가져오는 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
        }
        };

        fetchData(); // 컴포넌트가 처음 렌더링될 때만 fetchData 실행
    }, [boardId]);
    if (!board) {
        return <p>잠시만 기다려주세요..</p>;
    }

    return (
        <>
            
        <div lang='ko'>
            <Title title="게시판 상세"/>
            <Header />
            <div className="board-wrap board-detail-wrap">
                <div className="container-fluid">
                    <div className="btns-wrap pt-4">
                        {/* 이전 버튼 구현하기 */}
                        <a href="/boards" className="btn btn-link btn-inline"><i className="bi bi-chevron-left"></i><span>이전으로</span></a>
                    </div>
                    <div className="mentor-card">
                        <div className="card">
                            <div className="card-body">
                                <div className='card-body-content'>
                                    <div className='info-wrap'>
                                        <p className='card-title writer-nickname'>{board.writer.nickname} 멘토</p>
                                        <p>{board.writer.grade}학년</p>
                                        <p>[{board.writer.major}] 주전공</p>
                                        <p>[{board.writer.minor}] 부전공</p>
                                    </div>
                                    <div>
                                        <Link to={`/reservation1?mentoId=1`} className='btn btn-primary btn-xs btn-reservation'>멘토링 예약하기</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="title-wrap visual-txt visual-txt-sm mt-5 pb-4 mb-4 border-bottom">
                        {board.title}
                        <p className='created-date'>{board.createdDate}</p>
                    </div>
                    <div className="board-content-wrap">
                        <p>
                            {board.content}
                        </p>
                    </div>
                    <div className="board-bottom pb-1">
                        <p className='sub-txt'>이 글을 쓴 멘토에게<br />고민을 상담받고 싶다면?</p>
                        <div className="mentor-card mb-5">
                            <div className="card">
                                <div className="card-body">
                                    <div className='card-body-content'>
                                        <div className='info-wrap'>
                                            <p className='card-title writer-nickname'>{board.writer.nickname} 멘토</p>
                                            <p>{board.writer.grade}학년</p>
                                            <p>[{board.writer.major}] 주전공</p>
                                            <p>[{board.writer.minor}] 부전공</p>
                                        </div>
                                        <div>
                                            <Link to={`/reservation1?mentoId=1`} className='btn btn-primary btn-xs btn-reservation'>멘토링 예약하기</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>            
            </div>
        </div>
        
        
        </>
    )
}
export default BoardDetail
