import { useRef } from 'react';
import { useState } from 'react'
import axios from 'axios';

interface userInfoImpl {
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

type MyModalProps = {
    setNewUserInfo: (newUserInfo:userInfoImpl) => void;
    existingUserInfo:userInfoImpl;
    isOpen:boolean;
    onClose: () => void;
};

export const EditMyInfo = ({setNewUserInfo, existingUserInfo, isOpen, onClose}:MyModalProps) => {
    const newNickname = useRef<HTMLSelectElement>(null);
    const newDepartment = useRef<HTMLSelectElement>(null);
    const newStudentNumber = useRef<HTMLSelectElement>(null);
    const newGrade = useRef<HTMLSelectElement>(null);
    const newBirthYear = useRef<HTMLSelectElement>(null);
    const newPhone = useRef<HTMLSelectElement>(null);
    const newCurrentStatus = useRef<HTMLSelectElement>(null);
    const newBankAccount = useRef<HTMLSelectElement>(null);
    const newBankName = useRef<HTMLSelectElement>(null);

    const [isNicknameChecked, setIsNicknameChecked] = useState(false);

    const handleButtonNicknameCheck = () => {
        if (newNickname.current?.value)
        {
            if (newNickname.current.value == existingUserInfo.nickname)
            {
                alert("중복확인이 완료되었습니다.");
                setIsNicknameChecked(true);
                return;
            }
        }
        else
        {
            alert("닉네임을 먼저 입력해주세요.");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`/back/nickname-check?nickname=${newNickname.current?.value}`);
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

// 닉네임, 학년, 신분상태를 제외한 모든 항목들은 null 값이 가능하도록!
    const closeCurrentModal = () => {
        const numberRegax = /^\d+$/;
        if (!isNicknameChecked)
        {
            alert("닉네임 중복체크를 반드시 해주세요!");
            return;
        }
        
        if (newStudentNumber.current?.value)
        {
            if (!numberRegax.test(newStudentNumber.current?.value))
            {
                alert("학번은 숫자로만 기입하여주세요!");
                return;                
            }
        }

        if (newBirthYear.current?.value)
        {
            if (!numberRegax.test(newBirthYear.current?.value))
            {
                alert("출생년도는 숫자로만 기입하여주세요!");
                return;                
            }
        }

        if (newPhone.current?.value)
        {
            if (!numberRegax.test(newPhone.current?.value))
            {
                alert("전화번호는 숫자로만 기입하여주세요!");
                return;                
            }
        }

        // nickname:string;
        // department: string;
        // studentNumber: string;
        // grade: number;
        // birthYear: number;
        // phone: string;
        // currentStatus:string; 
        // bankAccount: string;
        // bankName: string;
        const newUserInfo: userInfoImpl = {
            nickname: newNickname.current?.value ?? '',  // 여기서 useState로 관리하는 userNickname을 사용
            department: newDepartment.current?.value ?? '',
            studentNumber: newStudentNumber.current?.value ?? '',
            grade: newGrade.current?.value ? parseInt(newGrade.current.value) : 0, // 숫자 변환
            birthYear: newBirthYear.current?.value ? parseInt(newBirthYear.current.value) : 0, // 숫자 변환
            phone: newPhone.current?.value ?? '',
            currentStatus: newCurrentStatus.current?.value ?? '',
            bankAccount: newBankAccount.current?.value ?? '',
            bankName: newBankName.current?.value ?? ''
        };
        console.log(newUserInfo);
        setNewUserInfo(newUserInfo);
        onClose();
    }

    return (
        <div className="subpage-wrap mypage modal-common modal-edit-myinfo">
            <div className="modal-title-wrap">
                <p className="page-title">내 정보 수정</p>
                <button className="btn-ico-only" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <div className="card-body">
                <div className="list-wrap">
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">닉네임</div>
                        {existingUserInfo.nickname && existingUserInfo.nickname !== null?
                        <div className="list-content">
                            <input ref={newNickname} defaultValue={existingUserInfo.nickname} type="text" name="nickname" className="form-control"/>
                        </div>
                        :<div className="list-content">
                            <input ref={newNickname} type="text" name="nickname" className="form-control"/>
                        </div>
                        }
                        <div className="btns-wrap bottom-btns-wrap pl-2" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                            <a className="btn btn-secondary btn-refund btn-refund-edit" onClick={() => handleButtonNicknameCheck()}>중복체크</a>
                        </div>
                    </div>
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">학과</div>
                        {existingUserInfo.department && existingUserInfo.department !== null?
                        <div className="list-content">
                            <input ref={newDepartment} defaultValue={existingUserInfo.department} type="text" name="department" className="form-control"/>
                        </div>
                        :<div className="list-content">
                            <input ref={newDepartment} type="text" name="department" className="form-control"/>
                        </div>
                        }
                    </div>
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">학번</div>
                        {existingUserInfo.studentNumber && existingUserInfo.studentNumber !== null?
                        <div className="list-content">
                            <input ref={newStudentNumber} defaultValue={existingUserInfo.studentNumber} type="text" name="studentNumber" className="form-control"/>
                        </div>
                        :<div className="list-content">
                            <input ref={newStudentNumber} type="text" name="studentNumber" className="form-control"/>
                        </div>
                        }
                    </div>
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">학년</div>
                        {existingUserInfo.grade && existingUserInfo.grade !== null?
                        <select ref={newGrade} id="askTopic" name="askType" className="form-control" defaultValue={existingUserInfo.grade}>
                            <option value="1">1학년</option>
                            <option value="2">2학년</option>
                            <option value="3">3학년</option>
                            <option value="4">4학년</option>
                            <option value="5">5학년</option>
                            <option value="6">6학년</option>
                        </select>
                        :
                        <select ref={newGrade} id="askTopic" name="askType" className="form-control">
                            <option value="1">1학년</option>
                            <option value="2">2학년</option>
                            <option value="3">3학년</option>
                            <option value="4">4학년</option>
                            <option value="5">5학년</option>
                            <option value="6">6학년</option>
                        </select>
                        }
                    </div>
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">출생년도</div>
                        {existingUserInfo.birthYear && existingUserInfo.birthYear !== null?
                        <div className="list-content">
                            <input ref={newBirthYear} defaultValue={existingUserInfo.birthYear} type="text" name="birthYear" className="form-control"/>
                        </div>
                        :<div className="list-content">
                            <input ref={newBirthYear} type="number" name="birthYear" className="form-control"/>
                        </div>
                        }
                    </div>
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">전화번호</div>
                        {existingUserInfo.phone && existingUserInfo.phone !== null?
                        <div className="list-content">
                            <input ref={newPhone} defaultValue={existingUserInfo.phone} type="text" name="phone" className="form-control"/>
                        </div>
                        :<div className="list-content">
                            <input ref={newPhone} type="number" name="phone" className="form-control"/>
                        </div>
                        }
                    </div>
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">신분상태</div>
                        {existingUserInfo.currentStatus && existingUserInfo.currentStatus !== null?
                        <select ref={newCurrentStatus} defaultValue={existingUserInfo.currentStatus} id="askTopic" name="askType" className="form-control">
                            <option value="재학">재학</option>
                            <option value="휴학">휴학</option>
                            <option value="졸업">졸업</option>
                            <option value="졸업유예">졸업유예</option>
                        </select>
                        :<select ref={newCurrentStatus} id="askTopic" name="askType" className="form-control">
                            <option value="재학">재학</option>
                            <option value="휴학">휴학</option>
                            <option value="졸업">졸업</option>
                            <option value="졸업유예">졸업유예</option>
                        </select>
                        }
                    </div>
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">환불 계좌번호</div>
                        {existingUserInfo.bankAccount && existingUserInfo.bankAccount !== null?
                        <div className="list-content">
                            <input ref={newBankAccount} defaultValue={existingUserInfo.bankAccount} type="text" name="bankAccount" className="form-control"/>
                        </div>
                        :<div className="list-content">
                            <input ref={newBankAccount} type="text" name="bankAccount" className="form-control"/>
                        </div>
                        }
                    </div>
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">환불 은행명</div>
                        {existingUserInfo.bankName && existingUserInfo.bankName !== null?
                        <div className="list-content">
                            <input ref={newBankName} defaultValue={existingUserInfo.bankName} type="text" name="bankName" className="form-control"/>
                        </div>
                        :<div className="list-content">
                            <input ref={newBankName} type="text" name="bankName" className="form-control"/>
                        </div>
                        }
                    </div>
                </div>
            </div>
            
            <div className="btns-wrap bottom-btns-wrap pt-4" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => closeCurrentModal()} style={{backgroundColor:"#F68536", color:"#fff"}}>저장하기</a>
            </div>
        </div>
    );
};


export default EditMyInfo;