window.onload = function() {
    let $btnMyPageForNotUser = document.getElementById("btnMyPageForNotUser");
    if($btnMyPageForNotUser != null) {
        $btnMyPageForNotUser.addEventListener("click", function(e) {
           if(!confirm("로그인 후 마이페이지로 이동할 수 있습니다. 먼저 로그인하시겠습니까?")){
                e.preventDefault();
           }
        });
    }
}