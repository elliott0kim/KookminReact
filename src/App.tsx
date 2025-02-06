import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

import MainPage from './mainPage/mainPage'
import Login from './user/login'
import Signup from './user/signup'
import Logout from './user/logout'
import Mypage from './user/mypage'
import MentoPage from './mento/mento'
import Reservation1 from './reservation/reservation1'
import Reservation2 from './reservation/reservation2'
import Reservation3 from './reservation/reservation3'
import ReservationSuccess from './reservation/reservationSuccess'
import CommonErrorPage from './components/CommonErrorPage';
import { LoginProvider } from './user/auth'
import ChangePwd from './user/changePwd'
import HotjarHeader from './components/Hotjar';
import GAHeader from './components/GA';
import Board from './mento/Board';
import BoardDetail from './mento/BoardDetail';
import BoardCreate from './mento/BoardCreate';
import BoardEdit from './mento/BoardEdit';
import AdminLogin from './admin/Login';
import AdminUserMng from './admin/UserMng';
import AdminDashboard from './admin/Dashboard';
import AdminTodoList from './admin/Todolist';
import AdminTodolistHistory from './admin/TodolistHistory';
import AdminPayHistory from './admin/PayHistory';
import AdminReservationHistory from './admin/ReservationHistory';


function App() {
    return (
      <LoginProvider>
        <Router>
          <HotjarHeader />
          <GAHeader />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/changePwd' element={<ChangePwd />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/mento' element={<MentoPage />} />
            {/* <Route path='/test' element={<CommonErrorPage />} /> */}
            <Route path='/mypage' element={<Mypage />} />
            <Route path='/boards' element={<Board />} />
            <Route path='/boards/:boardId' element={<BoardDetail />} />
            <Route path='/api/boards' element={<BoardCreate />} />
            <Route path='/api/boards/:boardId' element={<BoardEdit />} />
            <Route path='/admin/userMng' element={<AdminUserMng />} />
            <Route path='/admin/todoList' element={<AdminTodoList />} />
            <Route path='/admin/todoList/history' element={<AdminTodolistHistory />} />
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/payHistory' element={<AdminPayHistory />} />
            <Route path='/admin/reservationHistory' element={<AdminReservationHistory />} />
        
            
            

            <Route path='/reservation1' element={<Reservation1 />} />
            <Route path='/reservation2' element={<Reservation2 />} />
            <Route path='/reservation3' element={<Reservation3 />} />
            <Route path='/reservationSuccess' element={<ReservationSuccess />} />
            {/* 여기서부터는 리다이렉션으로 잘 갈라야함 */}
          </Routes>
        </Router>
      </LoginProvider>
    )
}

export default App
