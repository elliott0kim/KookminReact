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

    const currentTime = new Date();

    const formattedCurrentDateTime = currentTime.toISOString().slice(0, 19).replace("T", " ");
    const timeSpent = parseFloat(((Date.now() - startTime)/1000).toFixed(3));
    console.log(Date.now());
    console.log(startTime);
    // url은 위에 파람 그대로 받아다가 쓰고~

    const cookieData: [string, boolean] = CookieManagement();
    const userVisitCookie = cookieData[0];
    const newVisiter = cookieData[1];

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
            const response = await axios.post('http://localhost:5000/PageLog', {
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


