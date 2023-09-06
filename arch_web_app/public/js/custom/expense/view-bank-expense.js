alertify.set('notifier', 'position', 'top-right');
$(function () {
    $("#expense-nav")[0].click();
    $("#view-bank-expense-nav").css("color", "#FFFFFF");
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
    getExpenseDetails();
    $("#start-date").on('change', () => {
        getExpenseDetails();
    })
    $("#end-date").on('change', () => {
        getExpenseDetails();
    })

})

function insertExpenseDetails(expenseData) {
    let expenseTable = $("#ExpenseDetailsTable").DataTable({
        data: expenseData,
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            {
                "title": "bankId",
            },
            {
                "title": "Bank",
            },
            {
                "title": "Amount",
            },
        ],
        responsive: false,
        destroy: true,
        retrieve: true,
        columnDefs: [
            {
                targets: 1,
                data: "BankID",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 2,
                data: "BankName",
                render: function (data) {

                    return data;
                },
            },
            {
                targets: 3,
                data: "totalExpense",
                render: function (data) {

                    return data;
                },
            }
        ],
        order: [1, 'asc']
    });
    expenseTable.column(1).visible(false);


    $("#ExpenseDetailsTable").on('click', 'td.dt-control', function () {
        let tr = $(this).closest('tr');
        let row = expenseTable.row(tr);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(expenseDetails(row.data().BankID)).show();
            tr.addClass('shown');
            generateExpenseDetailsDatatable(row.data());
        }
    });
}

function getExpenseDetails() {
    let startDate = $("#start-date").val();
    let endDate = $("#end-date").val();
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
        alert("NOT POSSIBLE")
        return
    }
    $.ajax({
        type: "GET",
        "url": "/v1/expense/getExpense",
        "data": `startDate=${startDate}&endDate=${endDate}`,

        success: function (response) {
            if ($.fn.dataTable.isDataTable('#ExpenseDetailsTable')) {
                let expTable = $('#ExpenseDetailsTable').DataTable();
                expTable.clear().draw();
                expTable.rows.add(response.data);
                expTable.columns.adjust().draw();
            } else {
                insertExpenseDetails(response.data);
            }

        },
        error: function (error) {
        },
    });
}


function getOneMonthPreviosDate() {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    let previosDateSplit = date.toISOString().split('T')[0].split("-");
    return `${previosDateSplit[1]}/${previosDateSplit[2]}/${previosDateSplit[0]}`;
}


function generateExpenseDetailsDatatable(expenseObj) {
    let detailsExpTable = $(`#expense-details-${expenseObj.BankID}`).DataTable({
        data: expenseObj.expenseDetails,
        columns: [
            {
                "title": "Reason",
            },
            {
                "title": "Amount",
            },
            {
                "title": "Date",
            },
            {
                "title": "Note"
            }
        ],
        responsive: true,
        searching: false,
        paging: false,
        info: false,
        destroy: true,
        columnDefs: [
            {
                targets: 0,
                data: "Reason",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 1,
                data: "Amount",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 2,
                data: "Date",
                render: function (data) {
                    return convertDate(data);
                },
            },
            {
                targets: 3,
                data: "Notes",
                render: function (data) {
                    return data;
                },
            },
        ]

    });
}

function convertDate(date) {
    let dateUTC = new Date(date);
    dateUTC = dateUTC.getTime()
    let dateIST = new Date(dateUTC);
    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);
    return dateIST.toDateString();
}

function expenseDetails(bankId) {
    return `
    <table id="expense-details-${bankId}" class="table display nowrap" style="width:100%">
        <thead>
            <tr>

            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
    </div>
    `
}