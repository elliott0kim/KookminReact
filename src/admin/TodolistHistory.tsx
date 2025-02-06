import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import '/css/admin.css'
import '../../js/lib/jquery-3.5.1.min.js';
import '../../js/lib/bootstrap.min.js';
import Header from '../components/Header.js'
import Title from '../components/Title.js'
import { useNavigate } from 'react-router-dom';

import AdminGnb from '../components/admin/AdminGnb.jsx';
import AdminTitle from '../components/admin/AdminTitle.jsx';
import TodoListContentHistory from '../components/admin/TodoListContentHistory.jsx';


export function Todolist() {
    const navigate = useNavigate();

    const handleButtonPrev = () => {
        navigate(-1);
    }

    return (
        <div lang='ko'>
            <Title title="관리자:30일간의 작업내역"/>
            <Header />
            <div className="subpage-wrap login-wrap admin-wrap">
                <div className="container-fluid">
                <button id="btnPrev" className="btn btn-link btn-inline" onClick={handleButtonPrev}><i className="bi bi-chevron-left"></i><span>이전으로</span></button>
                    <AdminTitle title="30일간의 작업내역" subTitle="관리자님이 작업한 목록입니다. (작업 취소 가능)"/>
                    <TodoListContentHistory />          
                </div>
            </div>
            <AdminGnb current="todolist"/>
        </div>
    )
}

export default Todolist
