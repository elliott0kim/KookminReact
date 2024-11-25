////////////////////////////// 데이트 타임과 슬러그를 수집할 변수 //////////////////////////////
let startTime = 0;
let currentUrl = "";
let currentDateTime = "";

////////////////////////////// cookie 관련 변수 //////////////////////////////
let userVisitCookie = "";
let newVisiter = 0;

////////////////////////////// 화면 스크롤링 관련 변수 //////////////////////////////
let screenHeight = window.innerHeight;
let maxScrollTop = 0
let documentHeight = 0;

// *-------------------------------------------------------------------------------------* //




////////////////////////////// 데이트 타임과 슬러그 관련 함수 //////////////////////////////
function formatDate(date) {
    // 날짜와 시간 값을 얻어옵니다.
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 형식화된 날짜 문자열을 반환합니다.
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

////////////////////////////// cookie 관련 함수 //////////////////////////////
// 쿠키 저장하는 함수
function setCookie(cookieName, cookieValue, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// 쿠키를 가져오는 함수
function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

////////////////////////////// 화면 스크롤링 관련 함수 //////////////////////////////
window.onscroll = function() {
    const scrollTop = window.scrollY;
    // 최고 스크롤 위치 업데이트
    if (scrollTop > maxScrollTop) {
        maxScrollTop = scrollTop;
    }
};



// *-------------------------------------------------------------------------------------* //
// 돔 뜰때 설정들
document.addEventListener('DOMContentLoaded', () => {
////////////////////////////// 데이트 타임과 슬러그 관련 설정 //////////////////////////////
    // 페이지 URL 가져오기
    currentUrl = window.location.href;
    // console.log('현재 URL:', currentUrl);

    // 현재 시스템 시간을 가져옵니다.
    const now = new Date();
    currentDateTime = formatDate(now);
    // console.log(currentDateTime); // 예: 2024-09-17 14:45:30

    startTime = new Date().getTime();

////////////////////////////// cookie 관련 설정 //////////////////////////////
    // 쿠키 이름 정의
    const cookieName = "userVisit";

    // 기존 쿠키가 있는지 확인
    userVisitCookie = getCookie(cookieName);

    if (!userVisitCookie) {
        newVisiter = 1;
        // 쿠키가 없으면 새로운 쿠키를 생성
        const newCookieValue = "a-" + new Date().getTime(); // 예: "visit-1668493200"
        setCookie(cookieName, newCookieValue, 365); // 1년 유효 기간
        userVisitCookie = newCookieValue; // 새로운 쿠키를 변수에 저장
    }

////////////////////////////// 화면 스크롤링 관련 설정 //////////////////////////////
    // 전체 페이지의 높이를 측정하는 함수
    const getPageHeight = () => {
        return Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight
        );
    };

    // 전체 페이지 높이 가져오기
    documentHeight = getPageHeight();
});



// *-------------------------------------------------------------------------------------* //
let isLogSent = false;  // 로그가 이미 전송되었는지 여부를 체크할 변수

// 화면 벗어날때 로그 던지기
window.addEventListener('beforeunload', function (event) {
    if (isLogSent) return;  // 이미 로그가 전송된 경우, 중복 실행 방지
    isLogSent = true;
////////////////////////////// 데이트 타임과 슬러그 관련 로그 준비 //////////////////////////////
    const endTime = new Date().getTime();
    const timeSpent = endTime - startTime // 초 단위

////////////////////////////// cookie 관련 로그 준비 //////////////////////////////
    // 지금 현재는 없음


////////////////////////////// 화면 스크롤링 관련 설정 //////////////////////////////
    var totalScrollingHeight = documentHeight - screenHeight;
    var scrollingPercentage = maxScrollTop / totalScrollingHeight;

////////////////////////////// 로그 던지기 //////////////////////////////
//     POST 요청
//     fetch(`http://localhost:5000/PageLog?currentDateTime=${encodeURIComponent(currentDateTime)}&timeSpent=${encodeURIComponent(timeSpent)}&currentUrl=${encodeURIComponent(currentUrl)}
//     &userVisitCookie=${encodeURIComponent(userVisitCookie)}&newVisiter=${encodeURIComponent(newVisiter)}&scrollingPercentage=${encodeURIComponent(scrollingPercentage)}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json', // 필요시 적절한 Content-Type 사용
//         },
//     })
//         .then(response => response.text())  // 텍스트 형식으로 응답 받기
//         .catch(error => {
//             // 오류 처리
//             console.error('JS send log error : ', error);
//         });
    const data = new URLSearchParams({
        currentDateTime: currentDateTime,
        timeSpent: timeSpent,
        currentUrl: currentUrl,
        userVisitCookie: userVisitCookie,
        newVisiter: newVisiter,
        scrollingPercentage: scrollingPercentage
    }).toString();

    navigator.sendBeacon(`http://localhost:5000/PageLog?${data}`);
});