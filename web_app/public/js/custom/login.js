alertify.set('notifier', 'position', 'top-right');
$("#login-form-submit").on("click", function (event) {
    event.preventDefault();
    let userName = $("#userName").val();
    let passwd = $("#userPasswd").val();

    if (userName === "" || passwd === "") {
        console.log("HIT");
        alertify.error('Username or Password cannot be empty!!', 3);
    }
});
