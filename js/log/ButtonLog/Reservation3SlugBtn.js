document.addEventListener('DOMContentLoaded', function() {
    function copyToClipboard() {
        // 복사할 텍스트를 정의합니다.
        const textToCopy = "110-454-977350";

        // Clipboard API를 사용하여 클립보드에 텍스트를 복사합니다.
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                // 성공적으로 복사되었을 때의 처리
                alert("텍스트가 클립보드에 복사되었습니다!");
            })
            .catch(err => {
                // 복사에 실패했을 때의 처리
                alert("클립보드에 텍스트를 복사하는 데 실패했습니다.");
            });
    }


    // 특정 클래스를 가진 첫 번째 요소를 선택합니다.
    const nextButton = document.querySelector('.btn-primary');
    const naverPayButton = document.querySelector('.btn-line-white');

    const reservation3Cookie = getCookie("userVisit");

    // URL의 경로와 쿼리 문자열을 추출합니다.
    const path = window.location.pathname;  // "/hi"
    const query = window.location.search;   // "?bye=kslfwe_234"
    // 경로와 쿼리 문자열을 합칩니다.
    const uri = path + query;

    // 요소가 존재할 경우 클릭 이벤트 리스너를 추가합니다.
    if (nextButton) {
        nextButton.addEventListener('click', function(event) {
            const pushNext = new Date();
            const pushNextDateTime = formatDate(pushNext);
            const clickNext = "내용확인 및 예약완료"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushNextDateTime)}&cookie=${encodeURIComponent(reservation3Cookie)}
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


    // 요소가 존재할 경우 클릭 이벤트 리스너를 추가합니다.
    if (naverPayButton) {
        naverPayButton.addEventListener('click', function(event) {
            const pushNaverPay = new Date();
            const pushNaverPayDateTime = formatDate(pushNaverPay);
            const clickNaverPay = "네이버페이"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushNaverPayDateTime)}&cookie=${encodeURIComponent(reservation3Cookie)}
            &uri=${encodeURIComponent(uri)}&clickItem=${encodeURIComponent(clickNaverPay)}`, {
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