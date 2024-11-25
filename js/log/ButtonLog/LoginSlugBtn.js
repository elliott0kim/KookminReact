document.addEventListener('DOMContentLoaded', function() {
    // 특정 클래스를 가진 첫 번째 요소를 선택합니다.
    const signupButton = document.querySelector('.btn-signup');
    const loginCookie = getCookie("userVisit")
    const uri = "/login"
    const clickItem = "회원가입"

    // 요소가 존재할 경우 클릭 이벤트 리스너를 추가합니다.
    if (signupButton) {
        signupButton.addEventListener('click', function(event) {
            const pushSignup = new Date();
            const pushSignupDateTime = formatDate(pushSignup);
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushSignupDateTime)}&cookie=${encodeURIComponent(loginCookie)}
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