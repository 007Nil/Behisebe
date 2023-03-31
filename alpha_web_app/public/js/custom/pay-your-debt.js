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
            generatePayYourDebtTable(response.data);
            // resetExpenseForm()
            alertify.success('Expense information saved.', 3);
        },
        error: function (error) {
            // console.log(error);
            alertify.error('Error while saving the data!!', 3);
        },
    });
}

function generatePayYourDebtTable(transactionData) {
    console.log(transactionData);
    let payYourDebtTable = $("#pay-your-debt-table").DataTable({
        data: transactionData,
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            {
                "title": "personId",
            },
            {
                "title": "Borrow From",
                // className: "click-borrow-from"
            },
            {
                "title": "Total Amount",
            },
        ],
        responsive: false,
        columnDefs: [
            {
                targets: 1,
                data: "personId",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 2,
                data: "LendFrom",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 3,
                data: "totalAmount",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
        ],
        order: [1, 'asc']
    });
    payYourDebtTable.column(1).visible(false);


    $('#pay-your-debt-table tbody').on('click', 'td.dt-control', function () {
        // console.log("HIT")
        let tr = $(this).closest('tr');
        let row = payYourDebtTable.row(tr);
        // console.log(row)
        console.log(row.child.isShown())
        if (row.child.isShown()) {
            // This row is already open - close it
            // console.log("HIT")
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(generateBorrowDetailsTable(row.data().personId)).show();
            tr.addClass('shown');
            generateBorrowDetailsDatatable(row.data());
        }
    })
}

function generateBorrowDetailsTable(id) {
    return `
    <table id="payDebtDetails-${id}" class="table display nowrap" style="width:100%">
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

function generateBorrowDetailsDatatable(detailsObj) {
    let detailsTable = $(`#payDebtDetails-${detailsObj.personId}`).DataTable({
        data: detailsObj.borrowDetails,
        columns: [
            {
                "title": "transacationId",
            },
            {
                "title": "lendId",
            },
            {
                "title": "bankID",
            },
            {
                "title": "Amount",
            },
            {
                "title": "Make Payment",
                className: "make-payment"
            },
            {
                "title": "On",
            },
        ],
        searching: false,
        paging: false,
        info: false,
        responsive: true,
        columnDefs: [
            {
                targets: 0,
                data: "transacationId",
                render: function (data) {
                    // console.log(data)
                    return data;
                },

            },
            {
                targets: 1,
                data: "lendId",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            {
                targets: 2,
                data: "bankID",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            {
                targets: 3,
                data: "amount",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            {
                targets: 4,
                data: null,
                defaultContent: `<button type="button" class="btn btn-outline-success btn-sm">Pay</button>`
            },
            {

                targets: 5,
                data: "date",
                render: function (data) {
                    let dateUTC = new Date(data);
                    dateUTC = dateUTC.getTime()
                    let dateIST = new Date(dateUTC);
                    //date shifting for IST timezone (+5 hours and 30 minutes)
                    dateIST.setHours(dateIST.getHours() + 5);
                    dateIST.setMinutes(dateIST.getMinutes() + 30);
                    return dateIST.toDateString();
                },
            },
        ]
    });

    detailsTable.column(0).visible(false);
    detailsTable.column(1).visible(false);
    detailsTable.column(2).visible(false);
    // console.log(`#payDebtDetails-${detailsObj.personId} tbody`)
    $(`#payDebtDetails-${detailsObj.personId} tbody`).on('click', 'td.make-payment', function () {
        let tr = $(this).closest("tr");
        console.log(tr)
        let row = detailsTable.row(tr);
        
    })
}
