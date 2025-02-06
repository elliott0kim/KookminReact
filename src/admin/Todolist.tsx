import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import '/css/admin.css'
import '../../js/lib/jquery-3.5.1.min.js';
import '../../js/lib/bootstrap.min.js';
import Header from '../components/Header.js'
import Title from '../components/Title.js'

import AdminGnb from '../components/admin/AdminGnb.jsx';
import AdminTitle from '../components/admin/AdminTitle.jsx';
import TodoListContent from '../components/admin/TodoListContent.jsx';


export function Todolist() {
    return (
        <div lang='ko'>
            <Title title="관리자:할일목록"/>
            <Header />
            <div className="subpage-wrap login-wrap admin-wrap">
                <div className="container-fluid">
                    <AdminTitle title="할일목록" subTitle="멘티 입금 확인, 멘토 송금 체크, 환불 체크, 멘토 신청 승인"/>
                    <TodoListContent />                    
                </div>
            </div>
            <AdminGnb current="todolist"/>
        </div>
    )
}

export default Todolist
