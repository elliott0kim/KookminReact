import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { LoginContext } from '../user/auth'

export function Logout() {
    const context = useContext(LoginContext);
    const navigate = useNavigate();

    // context가 undefined일 가능성에 대비하여 기본값 설정
    if (!context) {
        throw new Error('useContext must be used within a LoginProvider');
    }
    
    const { loginStatus, setLoginStatus } = context;

    setLoginStatus(false);
    localStorage.removeItem('kookminToken');
    navigate('/');
}

export default Logout
