import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import '/css/fix_cmr.css'
import '/css/board.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from 'axios'

interface BoardItem {
    boardId: number;
    createdDate: string;
    writer: string;
    title: string;
    imgUrl: string;
}

export function Board() {
    const [boards, setBoards] = useState<BoardItem[]>([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            //const response = await axios.get(`/back/boards`);
            const response = await axios.get("/back/boards");
            //console.log(response.data.data);
            
            // console.log(response.data);
            const updatedImage = response.data.data.map(s=>{
                if (s.imgData) {
                    const url =  `data:image/jpeg;base64,${s.imgData}`;
                    console.log(s);
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
                                                    <div className="no-thumnail opacity-50">썸네일 이미지 없음</div>
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
            <Link to="/api/boards" className='btn btn-primary btn-board-write'><i className="bi bi-pencil-square"></i></Link>
        </div>
        </>
    )
}
export default Board
