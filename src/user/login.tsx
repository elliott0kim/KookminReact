import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useContext } from 'react'
import { LoginContext } from '../user/auth'
import axios from 'axios';

import { ButtonTracking } from '../components/ButttonTracking.js'

export function Login() {
    const context = useContext(LoginContext);

    // context가 undefined일 가능성에 대비하여 기본값 설정
    if (!context) {
        throw new Error('useContext must be used within a LoginProvider');
    }
    
    const { loginStatus, setLoginStatus } = context;

    const navigate = useNavigate();
    const email = useRef<HTMLSelectElement>(null); // select 요소에 대한 ref 생성
    const pwd = useRef<HTMLSelectElement>(null); // select 요소에 대한 ref 생성

    const handleButtonLogIn = () => {
        if (email == null || email.current?.value == "")
        {
            alert("이메일을 입력하여주세요.");
            return;
        }
        // 여기지금 테스트용도임!!! 나중에 꼭 코드 수정요망
        // 조건식 앞에 ! 느낌표 붙여주기!!
        else if (email.current?.value.includes("kookmin.ac.kr"))
        {
            alert("국민대학교 이메일로만 로그인 가능합니다.");
            return;
        }
        
        else if (pwd == null || pwd.current?.value == "")
        {
            alert("비밀번호를 입력하여주세요.");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.post('/back/signIn', {
                    email:email.current?.value,
                    password:pwd.current?.value
                });
                // 여기서 토큰 받아다가 로컬 스토리지에 저장하는 로직 들어가야함
                // 예시: 로그인 후 JWT 토큰을 로컬 스토리지에 저장
                const token = response.data.data[0]; // 서버로부터 받은 JWT 토큰
                localStorage.setItem('kookminToken', token);
                setLoginStatus(true);
                console.log(token);
                return true;
            } catch (err) {
                console.error(err);
                alert("로그인 도중 문제가 발생하였습니다. 관리자에게 문의하여 주십시오.");
                return false;
            } finally {
                // setLoading(false); // 로딩 상태 종료
            }
        };
        fetchData().then((success) => {
            if (success) {
                navigate("/");
            }
        });
    }

    return (
        <div lang='ko'>
            <Title title="로그인"/>
            <Header />
            <div className="subpage-wrap login-wrap">
                <div className="container-fluid">
                    <p className="page-title">로그인</p>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="loginEmail">이메일</label>
                                <input ref={email} type="email" name="email" className="flex-grow-1 form-control" id="loginEmail" placeholder="국민대학교 이메일로만 가입 가능" required maxLength={40} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="loginPassword">비밀번호</label>
                                <input ref={pwd} type="password" name="pwd" className="form-control" id="loginPassword" placeholder="최소 8자의 영문 / 특수문자 / 숫자 조합" required maxLength={20} />
                            </div>
                            <div className="btns-wrap">
                                <button onClick={() => handleButtonLogIn()} type="submit" id="login" className='btn btn-primary'>로그인</button>
                            </div>
                            <div className="login-sub-txt">
                                <p>아직 계정이 없으신가요? <Link to="/signup" className="btn btn-link btn-signup" onClick={() => ButtonTracking("/login", "회원가입")}>회원가입</Link></p>
                            </div>
                            <div className="login-sub-txt">
                                <p>비밀번호를 잊어버리셨나요? <Link to="/changePwd" className="btn btn-link btn-signup" >비밀번호 변경</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
