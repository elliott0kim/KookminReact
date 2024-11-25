document.addEventListener('DOMContentLoaded', function() {
    // 라디오 버튼 요소를 선택합니다.
    const radioButton01 = document.getElementById('reviewScore01');
    const radioButton02 = document.getElementById('reviewScore02');
    const radioButton03 = document.getElementById('reviewScore03');
    const radioButton04 = document.getElementById('reviewScore04');
    const radioButton05 = document.getElementById('reviewScore05');
    const radioButton06 = document.getElementById('reviewScore06');
    const radioButton07 = document.getElementById('reviewScore07');

    const loginCookie = getCookie("userVisit")

    // URL의 경로와 쿼리 문자열을 추출합니다.
    const path = window.location.pathname;  // "/hi"
    const query = window.location.search;   // "?bye=kslfwe_234"

    // 경로와 쿼리 문자열을 합칩니다.
    const uri = path + query;

    if (radioButton01) {
        radioButton01.addEventListener('change', function() {
            const pushRadioButton01 = new Date();
            const pushRadioButton01DateTime = formatDate(pushRadioButton01);
            const clickItem = "1점"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushRadioButton01DateTime)}&cookie=${encodeURIComponent(loginCookie)}
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

    if (radioButton02) {
        radioButton02.addEventListener('change', function() {
            const pushRadioButton02 = new Date();
            const pushRadioButton02DateTime = formatDate(pushRadioButton02);
            const clickItem = "2점"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushRadioButton02DateTime)}&cookie=${encodeURIComponent(loginCookie)}
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

    if (radioButton03) {
        radioButton03.addEventListener('change', function() {
            const pushRadioButton03 = new Date();
            const pushRadioButton03DateTime = formatDate(pushRadioButton03);
            const clickItem = "3점"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushRadioButton03DateTime)}&cookie=${encodeURIComponent(loginCookie)}
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

    if (radioButton04) {
        radioButton04.addEventListener('change', function() {
            const pushRadioButton04 = new Date();
            const pushRadioButton04DateTime = formatDate(pushRadioButton04);
            const clickItem = "4점"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushRadioButton04DateTime)}&cookie=${encodeURIComponent(loginCookie)}
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

    if (radioButton05) {
        radioButton05.addEventListener('change', function() {
            const pushRadioButton05 = new Date();
            const pushRadioButton05DateTime = formatDate(pushRadioButton05);
            const clickItem = "5점"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushRadioButton05DateTime)}&cookie=${encodeURIComponent(loginCookie)}
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

    if (radioButton06) {
        radioButton06.addEventListener('change', function() {
            const pushRadioButton06 = new Date();
            const pushRadioButton06DateTime = formatDate(pushRadioButton06);
            const clickItem = "6점"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushRadioButton06DateTime)}&cookie=${encodeURIComponent(loginCookie)}
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

    if (radioButton07) {
        radioButton07.addEventListener('change', function() {
            const pushRadioButton07 = new Date();
            const pushRadioButton07DateTime = formatDate(pushRadioButton07);
            const clickItem = "7점"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushRadioButton07DateTime)}&cookie=${encodeURIComponent(loginCookie)}
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