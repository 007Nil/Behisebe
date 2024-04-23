
$(function () {
    $("#add-initial-cash").submit(function (e) {
        e.preventDefault();
        let cashObj = {
            "cashInHand": $("#cashInHand").val(),
            "date": getDate()
        } 
       
        $.ajax({
            type: "POST",
            url: "/v1/credit/add-init-cash",
            data: JSON.stringify(cashObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (response) {
                console.log(response);
                window.location.replace('/dashboard');
                // resetCreditForm();
                // alertify.success('Credit information saved.', 3);
                // getCashBalance()
            },
            error: function (error) {
                // console.log(error);
                alertify.error('Error while saving the data!!', 3);
            },
        });
    });
});

function getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = mm + '/' + dd + '/' + yyyy;
    return formattedToday
}
