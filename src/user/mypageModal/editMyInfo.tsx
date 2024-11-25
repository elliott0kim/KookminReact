import { useRef } from 'react';


interface userInfoImpl {
    userNickname:string;
    department: string;
    studentNumber: string;
    grade: number;
    birtYear: number;
    currentStatus: string;
}

type MyModalProps = {
    setNewUserInfo: (newUserInfo:userInfoImpl) => void;
    userNickname:string;
    department:string;
    studentNumber: string;
    grade: number;
    birtYear: number;
    currentStatus: string;
    isOpen:boolean;
    onClose: () => void;
};

export const EditMyInfo = ({setNewUserInfo, userNickname, department, studentNumber, grade, birtYear, currentStatus, isOpen, onClose}:MyModalProps) => {
    const newDepartment = useRef<HTMLSelectElement>(null);
    const newStudentNumber = useRef<HTMLSelectElement>(null);
    const newGrade = useRef<HTMLSelectElement>(null);
    const newBirthYear = useRef<HTMLSelectElement>(null);
    const newCurrentStatus = useRef<HTMLSelectElement>(null);
    
    const closeCurrentModal = () => {
        const newUserInfo: userInfoImpl = {
            userNickname: userNickname,  // 여기서 useState로 관리하는 userNickname을 사용
            department: newDepartment.current?.value ?? '',
            studentNumber: newStudentNumber.current?.value ?? '',
            grade: newGrade.current?.value ? parseInt(newGrade.current.value) : 0, // 숫자 변환
            birtYear: newBirthYear.current?.value ? parseInt(newBirthYear.current.value) : 0, // 숫자 변환
            currentStatus: newCurrentStatus.current?.value ?? ''
        };
        console.log("modal");
        console.log(newUserInfo);
        setNewUserInfo(newUserInfo);
        onClose();
    }

    return (
        <div className="subpage-wrap mypage">
            <p className="page-title" style={{color:"#000", textAlign:"left"}}>내 정보 수정</p>
            <br />
            <div className="card-body">
                <div className="list-wrap">
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">학과</div>
                        {department && department !== null?
                        <div className="list-content">
                            <input ref={newDepartment} defaultValue={department} type="text" name="department" className="form-control" style={{height:"20px", fontSize:"15px"}}/>
                            {/* <div>{department}</div> */}
                        </div>
                        :<div className="list-content">
                            <input ref={newDepartment} type="text" name="department" className="form-control" style={{height:"20px", fontSize:"15px"}}/>
                        </div>
                        }
                    </div>
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">학번</div>
                        {studentNumber && studentNumber !== null?
                        <div className="list-content">
                            <input ref={newStudentNumber} defaultValue={studentNumber} type="number" name="department" className="form-control" style={{height:"20px", fontSize:"15px"}}/>
                        </div>
                        :<div className="list-content">
                            <input ref={newStudentNumber} type="number" name="department" className="form-control" style={{height:"20px", fontSize:"15px"}}/>
                        </div>
                        }
                    </div>
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">학년</div>
                        <select ref={newGrade} id="askTopic" name="askType" className="form-control" style={{height:"25px", padding:"0 0 0 10px", fontSize:"15px", color:"#000"}}>
                            <option value="1">1학년</option>
                            <option value="2">2학년</option>
                            <option value="3">3학년</option>
                            <option value="4">4학년</option>
                            <option value="5">5학년</option>
                            <option value="6">6학년</option>
                        </select>
                    </div>
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">출생년도</div>
                        {birtYear && birtYear !== null?
                        <div className="list-content">
                            <input ref={newBirthYear} defaultValue={birtYear} type="number" name="department" className="form-control" style={{height:"20px", fontSize:"15px"}}/>
                        </div>
                        :<div className="list-content">
                            <input ref={newBirthYear} type="number" name="department" className="form-control" style={{height:"20px", fontSize:"15px"}}/>
                        </div>
                        }
                    </div>
                    <div className="list-item" style={{color:"#000"}}>
                        <div className="list-label">신분상태</div>
                        <select ref={newCurrentStatus} defaultValue={newCurrentStatus.current?.value} id="askTopic" name="askType" className="form-control" style={{height:"25px", padding:"0 0 0 10px", fontSize:"15px", color:"#000"}}>
                            <option value="1">재학</option>
                            <option value="2">휴학</option>
                            <option value="3">졸업</option>
                            <option value="0">졸업유예</option>
                        </select>
                    </div>
                </div>
            </div>
            <br /><br /><br />
            <div className="btns-wrap bottom-btns-wrap pb-3" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => closeCurrentModal()} style={{backgroundColor:"#F68536", color:"#fff"}}>저장하기</a>
            </div>
        </div>
    );
};


export default EditMyInfo;