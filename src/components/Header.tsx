import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { LoginContext } from '../user/auth'
import { ButtonTracking } from '../components/ButttonTracking.js'

function Header() {
    const context = useContext(LoginContext);

    // context가 undefined일 가능성에 대비하여 기본값 설정
    if (!context) {
        throw new Error('useContext must be used within a LoginProvider');
    }
    
    const { loginStatus, setLoginStatus } = context;

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
