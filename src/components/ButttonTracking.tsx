import { CookieManagement } from './Cookie';
import axios from 'axios';

/*
    currentDateTime = request.args.get('dateTime')
    userVisitCookie = request.args.get('cookie')
    uri = request.args.get('uri')
    clickItem = request.args.get('clickItem')
*/

export const ButtonTracking = (currentUrl:string, clickItem:string) => {
    const currentTime = new Date();
    const formattedCurrentDateTime = currentTime.toISOString().slice(0, 19).replace("T", " ");

    const cookieData: [string, boolean] = CookieManagement();
    const userVisitCookie = cookieData[0];

    // console.log(formattedCurrentDateTime);
    // console.log(userVisitCookie);
    // console.log(currentUrl);
    // console.log(clickItem);
    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/EventLog', {
                currentTime: formattedCurrentDateTime,
                userVisitCookie: userVisitCookie,
                currentUrl: currentUrl,
                clickItem: clickItem
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


