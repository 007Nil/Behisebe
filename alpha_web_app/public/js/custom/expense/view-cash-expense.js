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

function getCashExpense() {
    let startDate = $("#start-date").val();
    let endDate = $("#end-date").val();
    // console.log(new Date(startDate).getTime());
    // console.log(new Date(endDate).getTime());
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
        alert("NOT POSSIBLE")
        return
    }
    $.ajax({
        type: "GET",
        "url": "/v1/expense/getCashExpense",
        "data": `startDate=${startDate}&endDate=${endDate}`,

        success: function (response) {
            console.log(response.data);
            if ($.fn.dataTable.isDataTable('#ExpenseCashDetailsTable')) {
                console.log("HIT")
                let cashExpTable = $('#ExpenseCashDetailsTable').DataTable();
                cashExpTable.clear().draw();
                cashExpTable.rows.add(response.data);
                cashExpTable.columns.adjust().draw();
            } else {
                generateCashExpenseTable(response.data);
            }

        },
        error: function (error) {
            console.log(error);
        },
    });
}

function convertDate(date) {
    let dateUTC = new Date(date);
    dateUTC = dateUTC.getTime()
    let dateIST = new Date(dateUTC);
    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);
    // console.log(dateIST.toDateString())
    return dateIST.toDateString();
}

function generateCashExpenseTable(expenseData) {
    let expenseTable = $("#ExpenseCashDetailsTable").DataTable({
        data: expenseData,
        columns: [
            {
                "title": "Amount",
            },
            {
                "title": "Date",
            },
            {
                "title": "Reason",
            },
            {
                "title": "Note",
            }
        ],
        responsive: true,
        destroy: true,
        retrieve: true,
        columnDefs: [
            {
                targets: 0,
                data: "Amount",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            {
                targets: 1,
                data: "Date",
                render: function (data) {
                    // console.log(data)
                    return convertDate(data);
                },
            },
            {
                targets: 2,
                data: "Reason",
                render: function (data,row) {
                    console.log(row)
                    if (data === "Lend"){
                        return `${data} To ${expenseData.LendID}`
                    }
                    return data;
                },
            },
            {
                targets: 3,
                data: "Notes",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
        ]
    })
}

