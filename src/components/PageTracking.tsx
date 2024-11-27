import { start } from '@popperjs/core';
import { CookieManagement } from './Cookie';
import axios from 'axios';

/*
    currentDateTime = request.args.get('currentDateTime')
    timeSpent = request.args.get('timeSpent')
    currentUrl = request.args.get('currentUrl')
    userVisitCookie = request.args.get('userVisitCookie')
    newVisiter = request.args.get('newVisiter')
    scrollingPercentage = request.args.get('scrollingPercentage')
*/

export const PageTracking = (startTime:number, pageHeight:number, currentScrollY:number, currentUrl:string) => {
    if (startTime == -1)
    {
        return false;
    }
    const date = new Date(startTime); // 밀리초를 Date 객체로 변환

    // 년, 월, 일, 시, 분, 초 추출 및 포맷팅
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const formattedCurrentDateTime = currentTime;
    const timeSpent = parseFloat(((Date.now() - startTime)/1000).toFixed(3));
    console.log(Date.now());
    console.log(startTime);
    // url은 위에 파람 그대로 받아다가 쓰고~

    const cookieData: [string, boolean] = CookieManagement();
    const userVisitCookie = cookieData[0];
    let newVisiter:number = 0;
    if (cookieData[1] == true)
    {
        newVisiter = 1;
    }
    else
    {
        newVisiter = 0;
    }
    

    const windowHeight = window.innerHeight;
    const scrollingHeight = pageHeight - windowHeight;
    let scrollingPercentage = Math.ceil((currentScrollY / scrollingHeight) * 100);
    if (scrollingPercentage > 100)
    {
        scrollingPercentage = 100;
    }

    console.log(pageHeight)
    console.log(windowHeight);
    console.log(currentScrollY);
    console.log(scrollingPercentage);

    const fetchData = async () => {
        try {
            const response = await axios.post('/log/PageLog', {
                currentTime: formattedCurrentDateTime,
                timeSpent: timeSpent,
                currentUrl: currentUrl,
                userVisitCookie: userVisitCookie,
                newVisiter: newVisiter,
                scrollingPercentage: scrollingPercentage
            });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        } finally {
            // setLoading(false); // 로딩 상태 종료
        }
    };

    fetchData();

};


