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

const PayHistory = ()=>{
    return(
        <div lang='ko'>
            <Title title="관리자:결제내역"/>
            <Header />
            <div className="subpage-wrap login-wrap admin-wrap">
                <div className="container-fluid">
                    <AdminTitle title="결제내역" subTitle="기획서 와야함"/>
                    {/* <UserMngContent />  */}
                </div>
            </div>
            <AdminGnb current="paylist"/>
        </div>
    )
}
export default PayHistory;