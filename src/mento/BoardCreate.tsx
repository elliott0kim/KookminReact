import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import '/css/fix_cmr.css'
import '/css/board.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { getTokenUserId } from '../components/jwtUtil.js'
import { checkTokenValidity } from '../components/jwtUtil.js'
import { LoginContext } from '../user/auth'


export function BoardCreate() {
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


    // 데이터 전송 코드
    const [imgData, setImageData] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [content, setContent]  = useState<string>('');
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        if(imgData){
            formData.append("imgData", imgData);
        }
        
        const boardText = {
            title: title,
            content : content
        };
        
        formData.append("boardText", new Blob([JSON.stringify(boardText)], { type: "application/json" }));
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        
        axios.post('/back/api/boards', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,// Bearer Token을 Authorization 헤더에 포함
        }})
        .then(response => {
            console.log('성공적으로 보냈습니다:', response.data);
            window.location.href = '/boards';
        })
        .catch(error => {
            console.error('데이터 전송 중 에러 발생:', error);
            alert("글 생성에 문제가 생겼습니다. 관리자에게 문의해주세요.")
        });
    };
   
    return (
        <>  
        <div lang='ko'>
            <Title title="게시글 작성"/>
            <Header />
            <div className="board-wrap">
                <div className="container-fluid">
                <form method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
                
                    <div className="form-group pt-5">
                        <label htmlFor="imgData" className="with-file">이미지 업로드</label>
                        <div className="input-wrap file">
                            <input
                            className="form-control"
                            type="file"
                            name="imgData"
                            id="imgData"
                            onChange={(e) => {
                                if(e.target.files != null){
                                    setImageData(e.target.files[0]);
                                }
                            }}
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3">
                    <label htmlFor="title" className="">제목</label>
                        <div className="input-wrap">
                            <input type="text" className="form-control" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="form-group mb-5">
                        <label htmlFor="content" className="">내용</label>
                        <div className="input-wrap">
                            <textarea className="form-control" id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} rows={10} required/>
                        </div>
                    </div>
                    
                    <button type="submit" className='btn btn-primary'>전송</button>
                    </form>
                </div>            
            </div>
        </div>
        </>
    )
}
export default BoardCreate
