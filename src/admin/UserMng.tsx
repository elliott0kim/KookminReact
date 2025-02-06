import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'
import '/css/admin.css'
import '../../js/lib/jquery-3.5.1.min.js';
import '../../js/lib/bootstrap.min.js';
import Header from '../components/Header.js'
import Title from '../components/Title.js';
import AdminGnb from '../components/admin/AdminGnb.jsx';
import AdminTitle from '../components/admin/AdminTitle.jsx';
import UserMngContent from "../components/admin/UserMngContent.jsx";


export function UserMng() {
    return (
        <div lang='ko'>
            <Title title="관리자:회원관리"/>
            <Header />
            <div className="subpage-wrap login-wrap admin-wrap">
                <div className="container-fluid">
                    <AdminTitle title="회원관리" subTitle="회원 경고/차단, 메일 발신, 정보 추가 등"/>
                    <UserMngContent />                    
                </div>
            </div>
            <AdminGnb current="userMng"/>
        </div>
    )
}

export default UserMng
