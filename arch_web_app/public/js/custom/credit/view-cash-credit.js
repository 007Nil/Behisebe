alertify.set('notifier', 'position', 'top-right');
$(function () {
    $("#credit-nav")[0].click();
    $("#view-cash-credit-nav").css("color", "#FFFFFF");

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
    $("#start-date").on('change', () => {
        getCashCredit()
    })
    $("#end-date").on('change', () => {
        getCashCredit();
    })
    getCashCredit();
});

function getOneMonthPreviosDate() {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    let previosDateSplit = date.toISOString().split('T')[0].split("-");
    return `${previosDateSplit[1]}/${previosDateSplit[2]}/${previosDateSplit[0]}`;
}

function getCashCredit() {
    let startDate = $("#start-date").val();
    let endDate = $("#end-date").val();
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
        alert("NOT POSSIBLE")
        return
    }
    $.ajax({
        type: "GET",
        "url": "/v1/credit/getCashCredit",
        "data": `startDate=${startDate}&endDate=${endDate}`,

        success: function (response) {
            if ($.fn.dataTable.isDataTable('#CreditCashDetailsTable')) {
                let cashCreditTable = $('#CreditCashDetailsTable').DataTable();
                cashCreditTable.clear().draw();
                cashCreditTable.rows.add(response.data);
                cashCreditTable.columns.adjust().draw();
            } else {
                generateCashCreditTable(response.data);
            }

        },
        error: function (error) {
            alertify.error("Error occur!!", 3);
        },
    });
}

function generateCashCreditTable(creditObj) {
    let creditTable = $("#CreditCashDetailsTable").DataTable({
        data: creditObj,
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
                    return data;
                },
            },
            {
                targets: 1,
                data: "Date",
                render: function (data) {
                    return convertDate(data);
                },
            },
            {
                targets: 2,
                data: "Reason",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 3,
                data: "Notes",
                render: function (data) {
                    return data;
                },
            },
        ],
        order: [1, 'desc']
    })
};

function convertDate(date) {
    let dateUTC = new Date(date);
    dateUTC = dateUTC.getTime()
    let dateIST = new Date(dateUTC);
    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);
    return dateIST.toDateString();
}
