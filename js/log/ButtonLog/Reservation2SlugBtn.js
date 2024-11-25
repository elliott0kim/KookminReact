let isChecked = false

document.addEventListener('DOMContentLoaded', function() {
    const planCurious = document.getElementById("planCurious");
    const planCuriousDetail = document.getElementById("planCuriousDetail");

    const planFrustrated = document.getElementById("planFrustrated");
    const planFrustratedDetail = document.getElementById("planFrustratedDetail");

    const planSave = document.getElementById("planSave");
    const planSaveDetail = document.getElementById("planSaveDetail");

    // 특정 클래스를 가진 첫 번째 요소를 선택합니다.
    const prevButton = document.getElementById("btnPrev");
    const nextButton = document.querySelector('.btn-primary');

    nextButton.addEventListener("click", function(e){
        if(!isChecked){
            e.preventDefault();
            alert("플랜을 선택해주세요!");
        }
    });

    const reservation2Cookie = getCookie("userVisit");

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
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushPrevDateTime)}&cookie=${encodeURIComponent(reservation2Cookie)}
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
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushNextDateTime)}&cookie=${encodeURIComponent(reservation2Cookie)}
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

    if (planCurious) {
        planCurious.addEventListener('click', function(event) {
            isChecked = true;
            const pushPlanCurious = new Date();
            const pushPlanCuriousDateTime = formatDate(pushPlanCurious);
            const clickPlanCurious = "궁금해요"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushPlanCuriousDateTime)}&cookie=${encodeURIComponent(reservation2Cookie)}
            &uri=${encodeURIComponent(uri)}&clickItem=${encodeURIComponent(clickPlanCurious)}`, {
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

    if (planCuriousDetail) {
        planCuriousDetail.addEventListener('click', function(event) {
            const pushPlanCuriousDetail = new Date();
            const pushPlanCuriousDetailDateTime = formatDate(pushPlanCuriousDetail);
            const clickPlanCuriousDetail = "궁금해요 상세보기"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushPlanCuriousDetailDateTime)}&cookie=${encodeURIComponent(reservation2Cookie)}
            &uri=${encodeURIComponent(uri)}&clickItem=${encodeURIComponent(clickPlanCuriousDetail)}`, {
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

    if (planFrustrated) {
        planFrustrated.addEventListener('click', function(event) {
            isChecked = true;
            const pushPlanFrustrated = new Date();
            const pushPlanFrustratedDateTime = formatDate(pushPlanFrustrated);
            const clickPlanFrustrated = "답답해요"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushPlanFrustratedDateTime)}&cookie=${encodeURIComponent(reservation2Cookie)}
            &uri=${encodeURIComponent(uri)}&clickItem=${encodeURIComponent(clickPlanFrustrated)}`, {
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

    if (planFrustratedDetail) {
        planFrustratedDetail.addEventListener('click', function(event) {
            const pushPlanFrustratedDetail = new Date();
            const pushPlanFrustratedDetailDateTime = formatDate(pushPlanFrustratedDetail);
            const clickPlanFrustratedDetail = "답답해요 상세보기"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushPlanFrustratedDetailDateTime)}&cookie=${encodeURIComponent(reservation2Cookie)}
            &uri=${encodeURIComponent(uri)}&clickItem=${encodeURIComponent(clickPlanFrustratedDetail)}`, {
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

    if (planSave) {
        planSave.addEventListener('click', function(event) {
            isChecked = true;
            const pushPlanSave = new Date();
            const pushPlanSaveDateTime = formatDate(pushPlanSave);
            const clickPlanSave = "살려줘요"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushPlanSaveDateTime)}&cookie=${encodeURIComponent(reservation2Cookie)}
            &uri=${encodeURIComponent(uri)}&clickItem=${encodeURIComponent(clickPlanSave)}`, {
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

    if (planSaveDetail) {
        planSaveDetail.addEventListener('click', function(event) {
            const pushPlanSaveDetail = new Date();
            const pushPlanSaveDetailDateTime = formatDate(pushPlanSaveDetail);
            const clickPlanSaveDetail = "살려줘요 상세보기"
            fetch(`http://localhost:5000/EventLog?dateTime=${encodeURIComponent(pushPlanSaveDetailDateTime)}&cookie=${encodeURIComponent(reservation2Cookie)}
            &uri=${encodeURIComponent(uri)}&clickItem=${encodeURIComponent(clickPlanSaveDetail)}`, {
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