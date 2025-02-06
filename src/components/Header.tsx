import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../user/auth'
import { ButtonTracking } from '../components/ButttonTracking.js'
import axios from 'axios';
import { checkTokenValidity } from './jwtUtil';

function Header() {
    const context = useContext(LoginContext);
    const [banInfo, setBanInfo] = useState(null);
    const token = checkTokenValidity();
    const navigate = useNavigate();

    // context가 undefined일 가능성에 대비하여 기본값 설정
    if (!context) {
        throw new Error('useContext must be used within a LoginProvider');
    }
    
    const { loginStatus, setLoginStatus } = context;
    
    useEffect(()=>{
        if(loginStatus){
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/back/admin/banned/${localStorage.memberId}`,
                        {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setBanInfo(null);
                    if(response.data.data.length === 1){
                        setBanInfo(response.data.data[0]);
                    }
                } catch (err) {
                    console.error(err);
                }
            };
            fetchData();
        }
    },[loginStatus]);

    useEffect(()=>{
        if(banInfo?.currentBanned === true){
            alert("해당 계정은 현재 차단 중입니다.")
            navigate("/logout");
        }
    },[banInfo])

    return (
        <header className="header">
            <div className="container-fluid">
                <h1 className="logo-wrap">
                    <Link className="logo" to="/">
                        <img src="/images/logo_white.svg" alt="COWEEF" />
                    </Link>
                </h1>
                <nav>
                    <ul className="menu-list">
                        <li className="menu-item">
                            <Link to="/boards">아티클</Link>
                        </li>
                        {loginStatus ?
                        <>
                        <li className="menu-item">
                            <Link to="/logout">로그아웃</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/mypage">마이페이지</Link>
                        </li>
                        </>
                        :<>
                        <li className="menu-item">
                            <Link to="/login">로그인</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/signup" onClick={() => ButtonTracking("/Header", "회원가입")}>회원가입</Link>
                        </li>
                        </>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
