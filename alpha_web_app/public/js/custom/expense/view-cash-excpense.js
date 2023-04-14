alertify.set('notifier', 'position', 'top-right');
$(function () {
    $("#expense-nav")[0].click();
    $("#view-cash-expense-nav").css("color", "#FFFFFF");

    $("#start-date").datepicker({
        showButtonPanel: true,
        currentText: "Today:" + $.datepicker.formatDate('MM dd, yy', new Date()),
        maxDate: 0
    });
    $("#start-date").val(getOneMonthPreviosDate())
    $("#end-date").datepicker({
        showButtonPanel: true,
        currentText: "Today:" + $.datepicker.formatDate('MM dd, yy', new Date()),
        maxDate: 0
    }).datepicker('setDate', 'today');
    // getExpenseDetails();
    $("#start-date").on('change', () => {
        // $("table#ExpenseDetailsTable").remove()
        getCashExpense()
    })
    $("#end-date").on('change', () => {
        // $("table#ExpenseDetailsTable").remove()
        getCashExpense();
    })
    getCashExpense();
})

function getOneMonthPreviosDate() {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    let previosDateSplit = date.toISOString().split('T')[0].split("-");
    return `${previosDateSplit[1]}/${previosDateSplit[2]}/${previosDateSplit[0]}`;
}

function getCashExpense(){
    let startDate = $("#start-date").val();
    let endDate = $("#end-date").val();
    // console.log(new Date(startDate).getTime());
    // console.log(new Date(endDate).getTime());
    if (new Date(startDate).getTime() > new Date(endDate).getTime()){
        alert("NOT POSSIBLE")
        return
    }
    $.ajax({
        type: "GET",
        "url": "/v1/expense/getCashExpense",
        "data": `startDate=${startDate}&endDate=${endDate}`,

        success: function (response) {
            console.log(response.data);
            // if ($.fn.dataTable.isDataTable('#ExpenseDetailsTable')) {
            //     console.log("HIT")
            //     let expTable = $('#ExpenseDetailsTable').DataTable();
            //     expTable.clear().draw();
            //     expTable.rows.add(response.data);
            //     expTable.columns.adjust().draw();
            // } else {
            //     insertExpenseDetails(response.data);
            // }

        },
        error: function (error) {
            console.log(error);
        },
    });
}

function generateCashExpenseTable(){

}