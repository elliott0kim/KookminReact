$(document).ready(function () {
    //로그인화면 : 이메일 인증
    $("btnEmailCheck").click(function(){
        $.ajax({
            url:"/signUpEmailChk",
            method:"POST",
            dataType:"json",
            success:function(data){}
        })
    });
});