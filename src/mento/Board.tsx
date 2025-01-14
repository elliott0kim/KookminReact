import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import '/css/fix_cmr.css'
import '/css/board.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { checkTokenValidity } from '../components/jwtUtil.js'
import { LoginContext } from '../user/auth.js'

interface BoardItem {
    boardId: number;
    createdDate: string;
    writer: string;
    title: string;
    imgUrl: string;
}

export function Board() {
    const navigate = useNavigate();
    const context = useContext(LoginContext);

    // context가 undefined일 가능성에 대비하여 기본값 설정
    if (!context) {
        throw new Error('useContext must be used within a LoginProvider');
    }
    
    const { loginStatus, setLoginStatus } = context;
    const token = checkTokenValidity();
    console.log(loginStatus);

    //멘토인지 아닌지 확인하기
    const [memberId, setMemberId] = useState<number>();
    const [mentorOk, setMentorOk] = useState<boolean>(false);
    /*
    useEffect(() => {
        const fetchData = async () => {
        if(loginStatus == false){
            return;
        }
        try {
            const response = await axios.get(`/back/api/mentors/mentorChk`,{
            headers: {
                'Authorization': `Bearer ${token}`,// Bearer Token을 Authorization 헤더에 포함
            }});
            console.log(response.data.data[0]);
            //setMemberId(response.data.data[0]);
        } catch (err) {
            setError('데이터를 가져오는 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
        }
        };

        fetchData(); // 컴포넌트가 처음 렌더링될 때만 fetchData 실행
    },[]);
*/
    //수정이나 삭제 버튼 작성자만
    // 조건: 로그인 상태가 true이고, ...
    const canEditOrDelete = loginStatus;

    //board 목록 조회
    const [boards, setBoards] = useState<BoardItem[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            
        try {
            const response = await axios.get("/back/boards");
            const updatedImage = response.data.data.map(s=>{
                if (s.imgData) {
                    const url =  `data:image/jpeg;base64,${s.imgData}`;
                    return { ...s, imgUrl: url };
                }
                return s;
            })
            setBoards(updatedImage);
        } catch (err) {
            setError('데이터를 가져오는 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
        }
        };

        fetchData(); // 컴포넌트가 처음 렌더링될 때만 fetchData 실행
    }, []);
    if (!boards) {
        return <p>잠시만 기다려주세요..</p>;
    }
    return (
        <>
        <div lang='ko'>
            <Title title="아티클"/>
            <Header />
            <div className="board-wrap">
                <div className="container-fluid">
                    <div className="title-wrap visual-txt visual-txt-sm mt-5 pb-4 mb-4 border-bottom">
                        대학 생활에 대한 고민이 담긴<br />
                        멘토의 글을 소개합니다.
                    </div>
                    <div className="list-wrap">
                    {Array.isArray(boards) && boards.length > 0 ? (
                            boards.map((board) => (
                            <div className="card-wrap" key={board.boardId}>
                                <a href={`/boards/${board.boardId}`} className='card-link-wrap'>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-sub-info d-flex">
                                                <div className="mento-nickname flex-grow-1">{board.writer} 멘토</div>
                                                <div className='created-date'>{board.createdDate.split(" ")[0]}</div>
                                            </div>
                                            <div className="card-title">
                                                <p>{board.title}</p>
                                            </div>
                                            <div className="card-thumnail">
                                                {board.imgUrl ? (
                                                    <img src={board.imgUrl} alt="Blob 이미지" />
                                                ) : (
                                                    <div className="no-thumnail">썸네일 이미지 없음</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            ))
                        ) : (
                            <p>게시글이 없습니다.</p>
                        )}
                    </div>
                </div>            
            </div>
            {canEditOrDelete && (
                <Link to="/api/boards" className='btn btn-primary btn-board-write'><i className="bi bi-pencil-square"></i></Link>
            )}
        </div>
        </>
    )
}
export default Board
