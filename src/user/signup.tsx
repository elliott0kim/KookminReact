import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import useMaxScrollY from '../components/UseMaxScrollY.js'
import { PageTracking } from '../components/pageTracking.js'
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react'
import axios from 'axios';

export function Signup() {
    const navigate = useNavigate();

    const username = useRef<HTMLSelectElement>(null);
    const email = useRef<HTMLSelectElement>(null); // select 요소에 대한 ref 생성
    const emailCheckCode = useRef<HTMLSelectElement>(null); // select 요소에 대한 ref 생성
    const pwd = useRef<HTMLSelectElement>(null); // select 요소에 대한 ref 생성
    const pwdCheck = useRef<HTMLSelectElement>(null); // select 요소에 대한 ref 생성
    const nickname = useRef<HTMLSelectElement>(null); // select 요소에 대한 ref 생성


/* 페이지 로그 수집부분 */
    const startTime = Date.now();
    const [maxScrollY, maxScrollYRef] = useMaxScrollY(); // 커스텀 훅 호출하여 상태와 ref 값 가져오기
    const containerRef = useRef(null);
    const containerHeightRef = useRef(0); // containerHeight 값을 관리할 ref

    // 로딩이 끝난 후에 containerRef 사용
    useEffect(() => {
        if (containerRef.current) {
            // 로딩이 끝난 후 containerRef 사용
            // console.log("containerRef.current scrollHeight:", containerRef.current.scrollHeight);
            containerHeightRef.current = containerRef.current.scrollHeight; // ref에 height 값 저장
        }
    }, []); // 로딩 상태가 변경될 때마다 ref를 확인

    useEffect(() => {
        window.addEventListener('beforeunload', (event) => {
            PageTracking(startTime, containerHeightRef.current, maxScrollYRef.current, "/");
        })
        return () => {
        }
    }, []);
/* 페이지 로그 수집부분 end */

    function isValidPassword(password: string): boolean {
        if (password.length < 7)
        {
            return false;
        }
        // 영문자가 포함되었는지 확인
        const hasLetter = /[a-zA-Z]/.test(password);
        
        // 숫자가 포함되었는지 확인
        const hasNumber = /[0-9]/.test(password);
        
        // 특수문자가 포함되었는지 확인 (필요에 따라 특수문자 리스트 확장 가능)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        console.log(hasLetter);
        console.log(hasNumber);
        console.log(hasSpecialChar);
        // 영문자, 숫자, 특수문자 모두 포함되었는지 확인
        return hasLetter && hasNumber && hasSpecialChar;
    }

    const [isEmailChecked, setIsEmailChecked] = useState(false);

    const handleButtonSendEmailCheck = () => {
        if (email == null || email.current?.value == "")
        {
            alert("이메일을 입력하여주세요.");
            return;
        }
        // 여기지금 테스트용도임!!! 나중에 꼭 코드 수정요망
        // 조건식 앞에 ! 느낌표 붙여주기!!
        else if (!email.current?.value.includes("kookmin.ac.kr"))
        {
            alert("국민대학교 이메일로만 회원가입 가능합니다.");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.post(`/back/emailToken?email=${email.current?.value}`);
                return true;
            } catch (err) {
                console.error(err);
                alert("이메일 인증번호 전송 도중 문제가 발생하였습니다. 관리자에게 문의하여주세요.");
                return false;
            } finally {
                // setLoading(false); // 로딩 상태 종료
            }
        };
        fetchData().then((success) => {
            if (success)
            {
                alert("이메일 인증번호 전송이 완료되었습니다.");
            }
        });
    }

    // try - catch 코드 검증 해봐야할 것 같은데?
    const handleButtonVaildationEmailCheck = () => {
        if (email == null || email.current?.value == "")
        {
            alert("이메일을 먼저 입력해주세요.");
            return;
        }
        if (emailCheckCode == null || emailCheckCode.current?.value == "")
        {
            alert("이메일 인증번호를 먼저 입력해주세요.");
            return;
        }
        const fetchData = async () => {
            if (emailCheckCode.current?.value)
            try {
                const response = await axios.post('/back/email-auth', {
                    email: email.current?.value,
                    token: emailCheckCode.current?.value,
                });
                if (response.status == 200)
                {
                    return 0;
                }
                else if (response.status == 400)
                {
                    return 1;
                }
                
            } catch (err) {
                console.error(err);
                alert("인증번호 확인 도중 문제가 발생하였습니다. 관리자에게 문의하여주세요.");
                return 2;
            } finally {
                // setLoading(false); // 로딩 상태 종료
            }
        };
        fetchData().then((returnCode) => {
            if (returnCode == 0)
            {
                alert("인증번호 확인이 완료되었습니다.");
                setIsEmailChecked(true);
            }
            else if (returnCode == 1)
            {
                alert("인증번호가 다릅니다.");
            }
        });
    }

    const [isNicknameChecked, setIsNicknameChecked] = useState(false);

    const handleButtonNicknameCheck = () => {
        const fetchData = async () => {
            if (!nickname.current?.value)
            {
                alert("닉네임을 먼저 입력해주세요.");
                return;
            }
            try {
                const response = await axios.get(`/back/nickname-check?nickname=${nickname.current?.value}`);
                if (response.status == 200)
                {
                    return 0;
                }
                else
                {
                    return 1;
                }
                
            } catch (err) {
                console.error(err);
                alert("중복된 닉네임입니다. 사용할 수 없습니다.");
                return 2;
            } finally {
                // setLoading(false); // 로딩 상태 종료
            }
        };
        fetchData().then((returnCode) => {
            if (returnCode == 0)
            {
                alert("사용가능한 닉네임입니다.");
                setIsNicknameChecked(true);
            }
            else if (returnCode == 1)
            {
                alert("중복된 닉네임입니다. 사용할 수 없습니다.");
            }
        });
    }

    const handleButtonSignup = () => {
        if (username == null || username.current?.value == "")
        {
            alert("실명을 입력하여 주세요.");
            return;
        }

        if (!isEmailChecked)
        {
            alert("이메일 인증을 먼저 시도해주세요.");
            return;
        }

        if (!isNicknameChecked)
        {
            alert("닉네임 중복확인을 먼저 시도해주세요.");
            return;
        }

        if (pwd == null || pwd.current?.value == "")
        {
            alert("비밀번호를 입력하여주세요.");
            return;
        }

        if (pwdCheck == null || pwdCheck.current?.value == "")
        {
            alert("비밀번호 인증을 입력하여주세요.");
            return;
        }

        if (pwd.current?.value != pwdCheck.current?.value)
        {
            alert("비밀번호와 비밀번호 확인이 불일치합니다.");
            return;
        }

        if (!isValidPassword(pwd.current?.value))
        {
            alert("비밀번호는 최소 8자 이상의 영문/특수문자/숫자의 조합이여야 합니다.");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.post('/back/signUp', {
                email:email.current?.value,
                username:username.current?.value,
                authToken:emailCheckCode.current?.value,
                password:pwd.current?.value,
                passwordConfirm:pwd.current?.value,
                nickname:nickname.current?.value,
                });
                // 여기서 토큰 받아다가 로컬 스토리지에 저장하는 로직 들어가야함
                // 예시: 로그인 후 JWT 토큰을 로컬 스토리지에 저장
                // const token = response.data.token; // 서버로부터 받은 JWT 토큰
                // localStorage.setItem('kookminToken', token);
                return true;
            } catch (err) {
                console.error(err);
                alert("회원가입 도중 문제가 발생하였습니다. 관리자에게 문의하여 주십시오.");
                return false;
            } finally {
                // setLoading(false); // 로딩 상태 종료
            }
        };
        fetchData().then((success) => {
            if (success) {
                alert("회원가입이 완료되었습니다. 로그인해주세요.");
                navigate("/");
            }
        });
    }

    return (
        <div lang='ko'>
            <Title title="회원 가입"/>
            <Header />
            <div className="subpage-wrap login-wrap">
                <div className="container-fluid">
                    <p className="page-title">회원가입</p>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="username">실명</label>
                                <div className="d-flex">
                                    <input ref={username} type="text" name="username" className="flex-grow-1 form-control" id="username" placeholder="본인의 실명을 입력하여주세요" required maxLength={40} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">이메일</label>
                                <div className="d-flex">
                                    <input ref={email} type="email" name="email" className="flex-grow-1 form-control" id="email" placeholder="국민대학교 이메일로만 가입 가능" required maxLength={40} />
                                    <button onClick={() => handleButtonSendEmailCheck()} id="btnEmailCheck" className="w-auto flex-shrink-0 h-auto ml-2 btn btn-secondary">이메일 인증</button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="emailCheckCode">이메일 인증번호 입력</label>
                                <div className="d-flex">
                                    <input ref={emailCheckCode} type="text" name="emailCheckCode" className="flex-grow-1 form-control" id="emailCheckCode" placeholder="이메일 인증번호 입력" required maxLength={40} />
                                    <button onClick={() => handleButtonVaildationEmailCheck()} id="btnAuthCodeCheck" className="w-auto flex-shrink-0 h-auto ml-2 btn btn-secondary">인증번호 확인</button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">비밀번호</label>
                                <input ref={pwd} type="password" name="pwd" className="form-control" id="pwd" placeholder="최소 8자의 영문 / 특수문자 / 숫자 조합" required maxLength={20} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwdCheck">비밀번호 확인</label>
                                <input ref={pwdCheck} type="password" name="pwdCheck" className="form-control" id="pwdCheck" placeholder="최소 8자의 영문 / 특수문자 / 숫자 조합" required maxLength={20} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nickname">닉네임 (혹은 실명 사용 가능)</label>
                                <div className="d-flex">
                                    <input ref={nickname} type="text" name="nickname" className="form-control" id="nickname" placeholder="한글로만 작성 가능 (ex) 국냥이" required maxLength={16} />
                                    <button onClick={() => handleButtonNicknameCheck()} id="btnNicknameCheck" className="w-auto flex-shrink-0 h-auto ml-2 btn btn-secondary">닉네임 중복확인</button>
                                </div>
                            </div>
                            <div className="btns-wrap">
                                <button onClick={() => handleButtonSignup()} type="submit" id="signup" className='btn btn-primary'>회원가입</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
