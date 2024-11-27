
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export const CookieManagement = () => {
    const userCookie = Cookies.get('coweefUser');
    let newVisitor:boolean = false;
    if (!userCookie)
    {
        // 쿠키가 있으면 해당 값으로 상태 업데이트
        newVisitor = true;
        const newUser = uuidv4(); // 난수 생성해주기
        Cookies.set('coweefUser', newUser, { expires: 365 }); // 쿠키를 7일 동안 유효하게 설정
    }

    return [userCookie, newVisitor];
};
