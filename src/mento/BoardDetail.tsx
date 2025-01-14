import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import '/css/fix_cmr.css'
import '/css/board.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate,useParams, Link, useNavigate  } from "react-router-dom";
import { checkTokenValidity } from '../components/jwtUtil.js'
import { LoginContext } from '../user/auth.js'

interface userInfoImpl{
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
export function BoardDetail() {
    const navigate = useNavigate();
    const context = useContext(LoginContext);

    // context가 undefined일 가능성에 대비하여 기본값 설정
    if (!context) {
        throw new Error('useContext must be used within a LoginProvider');
    }
    
    const { loginStatus, setLoginStatus } = context;
    const token = checkTokenValidity();
    

    //member 데이터 가져와서 작성자인지 확인하기
    const [userInfo, setUserInfo] = useState<userInfoImpl>();
    useEffect(() => {
        const fetchData = async () => {
        if(loginStatus == false){
            return;
        }
        try {
            const response = await axios.get(`/back/api/userInfo`,{
                headers: {
                    'Authorization': `Bearer ${token}`,// Bearer Token을 Authorization 헤더에 포함
                }});
            setUserInfo(response.data.data[0]);
        } catch (err) {
            setError('데이터를 가져오는 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
        }
        };

        fetchData(); // 컴포넌트가 처음 렌더링될 때만 fetchData 실행
    },[]);
    

    //board 데이터 가져오기
    const { boardId } = useParams<BoardDetailParams>();
    const [board, setBoard] = useState<Board | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`/back/boards/${boardId}`);
            setBoard(response.data.data[0]);
            // console.log(response.data);
            console.log(board);
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

    //수정이나 삭제 버튼 작성자만
    // 조건: 로그인 상태가 true이고, 사용자 닉네임이 작성자 닉네임과 같아야 보임
    const canEditOrDelete =
    loginStatus && userInfo?.nickname === board.writer.nickname;


    //게시글 삭제
    const handleDelete=(e: React.MouseEvent<HTMLButtonElement>) =>{
        if(!confirm("정말로 게시글을 삭제하시겠습니까?\n(이 작업은 되돌릴 수 없습니다.)")){
            e.preventDefault();
            return;
        }

        axios.delete('/back/api/boards/'+boardId, {
        headers: {
            'Authorization': `Bearer ${token}`,// Bearer Token을 Authorization 헤더에 포함
        }})
        .then(response => {
            console.log('성공적으로 보냈습니다:', response.data);
            window.location.href = '/boards';
        })
        .catch(error => {
            console.error('데이터 전송 중 에러 발생:', error);
            alert("글 삭제에 문제가 생겼습니다. 관리자에게 문의해주세요.")
        });
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
                         
                        {canEditOrDelete && (
                            <div className='btns-wrap pt-5'>
                                <Link to={`/api/boards/${boardId}`} className='btn btn-line-white'>수정</Link>
                                <button className='btn btn-danger' onClick={handleDelete}>삭제</button>
                            </div>
                        )}
                        
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
function setError(arg0: string) {
    throw new Error('Function not implemented.')
}

