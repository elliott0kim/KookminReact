document.addEventListener('DOMContentLoaded', function() {
    // 특정 클래스를 가진 첫 번째 요소를 선택합니다.
    const prevButton = document.getElementById("btnPrev");
    const nextButton = document.querySelector('.btn-primary');

    const reservation1Cookie = getCookie("userVisit");

    // URL의 경로와 쿼리 문자열을 추출합니다.
    const path = window.location.pathname;  // "/hi"
    const query = window.location.search;   // "?bye=kslfwe_234"
    // 경로와 쿼리 문자열을 합칩니다.
    const uri = path + query;

    // 요소가 존재할 경우 클릭 이벤트 리스너를 추가합니다.
    if (prevButton) {
        prevButton.addEventListener('click', function(event) {
            const pushPrev = new Date();
            const pushPrevDateTime = formatDate(pushPrev);
            const clickPrev = "이전으로"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushPrevDateTime)}&cookie=${encodeURIComponent(reservation1Cookie)}
            &uri=${encodeURIComponent(uri)}&clickItem=${encodeURIComponent(clickPrev)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // 필요시 적절한 Content-Type 사용
                },
            })
                .then(response => response.text())  // 텍스트 형식으로 응답 받기
                .catch(error => {
                    // 오류 처리
                    console.error('JS send log error : ', error);
                });
        });
    }


    // 요소가 존재할 경우 클릭 이벤트 리스너를 추가합니다.
    if (nextButton) {
        nextButton.addEventListener('click', function(event) {
            const pushNext = new Date();
            const pushNextDateTime = formatDate(pushNext);
            const clickNext = "다음단계"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushNextDateTime)}&cookie=${encodeURIComponent(reservation1Cookie)}
            &uri=${encodeURIComponent(uri)}&clickItem=${encodeURIComponent(clickNext)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // 필요시 적절한 Content-Type 사용
                },
            })
                .then(response => response.text())  // 텍스트 형식으로 응답 받기
                .catch(error => {
                    // 오류 처리
                    console.error('JS send log error : ', error);
                });
        });
    }
});