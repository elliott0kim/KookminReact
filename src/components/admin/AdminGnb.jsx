import { Link } from "react-router-dom";
import todoOn from "../../assets/ico_todo_on.svg";
import todoOff from "../../assets/ico_todo_off.svg";
import userOn from "../../assets/ico_user_on.svg";
import userOff from "../../assets/ico_user_off.svg";
import graphOn from "../../assets/ico_graph_on.svg";
import graphOff from "../../assets/ico_graph_off.svg";
import cardOn from "../../assets/ico_card_on.svg";
import cardOff from "../../assets/ico_card_off.svg";
import calendarOn from "../../assets/ico_calendar_on.svg";
import calendarOff from "../../assets/ico_calendar_off.svg";

const AdminGnb = ({current})=>{
    return(
        <>
            <nav className="AdminGnb">
                <div className="nav-item nav-todolist">
                    <Link to="/admin/todoList">
                        <img src={current==="todolist"?todoOn:todoOff} alt="" />
                    </Link>
                </div>
                <div className="nav-item nav-user-mng">
                    <Link to="/admin/userMng">
                        <img src={current==="userMng"?userOn:userOff} alt="" />
                    </Link>
                </div>
                <div className="nav-item nav-dashboard">
                    <Link to="/admin/dashboard">
                        <img src={current==="dashboard"?graphOn:graphOff} alt="" />
                    </Link>
                </div>
                <div className="nav-item nav-pay-history">
                    <Link to="/admin/payHistory">
                        <img src={current==="paylist"?cardOn:cardOff} alt="" />
                    </Link>
                </div>
                <div className="nav-item nav-reservation-history">
                    <Link to="/admin/reservationHistory">
                        <img src={current==="reservation"?calendarOn:calendarOff} alt="" />
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default AdminGnb;