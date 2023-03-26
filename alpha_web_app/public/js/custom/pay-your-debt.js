alertify.set('notifier', 'position', 'top-right');
$(function () {
    getUserDebtData()
});

function getUserDebtData() {
    $.ajax({
        type: "GET",
        url: "/v1/expense/getPayOfDebt",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            console.log(response);
            // resetExpenseForm()
            alertify.success('Expense information saved.', 3);
        },
        error: function (error) {
            // console.log(error);
            alertify.error('Error while saving the data!!', 3);
        },
    });
}