document.addEventListener('DOMContentLoaded', function() {
    // 특정 클래스를 가진 첫 번째 요소를 선택합니다.
    const mypageButton = document.getElementById('mypageButton');
    const homeButton = document.getElementById('homeButton');

    const reviewWriteOkCookie = getCookie("userVisit")
    const uri = "/reviewSuccess"

    // 요소가 존재할 경우 클릭 이벤트 리스너를 추가합니다.
    if (mypageButton) {
        mypageButton.addEventListener('click', function(event) {
            const pushMypageButton = new Date();
            const pushMypageButtonDateTime = formatDate(pushMypageButton);
            const clickItem = "마이페이지"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushMypageButtonDateTime)}&cookie=${encodeURIComponent(reviewWriteOkCookie)}
            &uri=${encodeURIComponent(uri)}&clickItem=${encodeURIComponent(clickItem)}`, {
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
    if (homeButton) {
        homeButton.addEventListener('click', function(event) {
            const pushHomeButton = new Date();
            const pushHomeButtonDateTime = formatDate(pushHomeButton);
            const clickItem = "홈으로"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushHomeButtonDateTime)}&cookie=${encodeURIComponent(reviewWriteOkCookie)}
            &uri=${encodeURIComponent(uri)}&clickItem=${encodeURIComponent(clickItem)}`, {
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
