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
            <Route path='/logout' element={<Logout />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/mento' element={<MentoPage />} />
            {/* <Route path='/mypage' element={<Mypage />} /> */}
            <Route path='/mypage' element={<CommonErrorPage />} />
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
