alertify.set('notifier', 'position', 'top-right');
$(function () {
    getMoneyOweData();
});

function getMoneyOweData() {
    $.ajax({
        type: "GET",
        url: "/v1/credit/getMoneyOwe",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            console.log(response.data);
            generateCollectYourDebt(response.data);
            // resetExpenseForm()

            alertify.success('Information fetched.', 3);
        },
        error: function (error) {
            // console.log(error);
            alertify.error('Error while fetching the data!!', 3);
        },
    });
}

function generateCollectYourDebt(oweData) {
    let collectYourDebtTable = $("#collect-your-debt-table").DataTable({
        data: oweData,
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
                "title": "Lend To",
            },
            {
                "title": "Total Amount",
            },
            {
                "title": "Already Received",
            },
            {
                "title": "Full Payment",
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
                data: "LendTo",
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
            {
                targets: 4,
                data: "alreadyReceived",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            {
                targets: 5,
                data: null,
                defaultContent: `<button type="button" class="btn btn-outline-success btn-sm">Clear Debt</button>`
            },
        ],
        order: [1, 'asc']
    });
    collectYourDebtTable.column(1).visible(false);

    $('#collect-your-debt-table tbody').on('click', 'td.dt-control', function () {
        // console.log("HIT")
        let tr = $(this).closest('tr');
        let row = collectYourDebtTable.row(tr);
        // GlobalPRow = row;
        // GlobalPData = row.data();
        if (row.child.isShown()) {
            // This row is already open - close it
            // console.log("HIT")
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(generateOweDetailsTable(row.data().personId)).show();
            tr.addClass('shown');
            generateOweDetailsDatatable(row.data());
        }
    })
}

function generateOweDetailsDatatable(detailsObj) {
    console.log(detailsObj.OweDetails)
    let detailsTable = $(`#oweDetails-${detailsObj.personId}`).DataTable({
        data: detailsObj.OweDetails,
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
                "title": "Received",
            },
            {
                "title": "Update Info",
            },
            {
                "title": "Lend On",
            },
            {
                "title": "Debited From",
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
                data: "bankId",
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
                data: "alreadyReceived",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            {
                targets: 5,
                data: null,
                defaultContent: `<button type="button" class="btn btn-outline-success btn-sm">Update</button>`
            },
            {

                targets: 6,
                data: "date",
                render: function (data) {
                    return convertDate(data);
                },
            },
            {

                targets: 7,
                data: "bankName",
                render: function (data) {
                    return data;
                },
            },
        ]
    });

    detailsTable.column(0).visible(false);
    detailsTable.column(1).visible(false);
    detailsTable.column(2).visible(false);

    $(`#oweDetails-${detailsObj.personId} tbody`).on('click', '.btn-sm', function () {
        // console.log("HIT")
        $("#paymentModalBody").empty();
        let tr = $(this).closest("tr");
        let row = detailsTable.row(tr);
        let rowData = row.data();
        let modalBody = `
            <div class="row">
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="bankCheckBox" checked>
                        <label class="form-check-label" for="bankCheckBox">
                            Debited From Bank
                        </label>

                        <input id="bankAmount" class="" type="text" readonly>
                    </div>
                </div>
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="cashCheckBox">
                        <label class="form-check-label" for="cashCheckBox">
                            Expense By Cash
                        </label>
                        <input id="cashBalance" type="text" readonly>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="lendFrom" class="col-sm-4 col-form-label">Borrow From</label>
                <div class="col-sm-6">
                <input type="text" readonly class="form-control" id="lendFrom" value="${detailsObj.LendFrom}">
                </div>
            </div>

            <div class="form-group row">
                <label for="amount" class="col-sm-4 col-form-label">Amount</label>
                <div class="col-sm-6">
                <input type="number" readonly class="form-control" id="amount" value="${rowData.amount}">
                </div>
            </div>

            <div class="form-group row">
                <label for="onDate" class="col-sm-4 col-form-label">On</label>
                <div class="col-sm-6">
                <input type="text" readonly class="form-control" id="lendFrom" value="${convertDate(rowData.date)}">
                </div>
            </div>

            <div class="form-group row">
                <label for="alreadyPaid" class="col-sm-4 col-form-label">Already Paid</label>
                <div class="col-sm-6">
                <input type="text" readonly class="form-control" id="alreadyPaid" value="${rowData.alreadyPaid}">
                </div>
            </div>

            <div id="debited-from-div" class="form-group row">
                <label for="debited-from" class="col-sm-4 col-form-label">Debited From</label>
                <div class="col-sm-6">
                <select id="debited-from" class="select2 form-control" required>
                </select>
                </div>
            </div>

            <div class="form-group row">
                <label for="payNow" class="col-sm-4 col-form-label">Pay Now</label>
                <div class="col-sm-6">
                <input type="number" class="form-control" id="payNow" value=0>
                </div>
            <div>

            <input type="hidden" id="personId" value=${detailsObj.personId}>
            <input type="hidden" id="transacationId" value=${rowData.transacationId}>
            <input type="hidden" id="lendId" value=${rowData.lendId}>
            <input type="hidden" id="bankId" value=${rowData.bankId}>

        `
        getCashBalance()
        $("#paymentModalBody").append(modalBody);
        $('#updatePaymentModal').modal("show");
    })


    $(".btn-cls").on("click", function () {
        $('#makePaymentModal').modal("toggle");

    })
}

function getCashBalance() {
    $.ajax({
        type: "GET",
        url: "/v1/cash/getCashBalance",
        data: `date=${getDate()}`,
        success: function (response) {
            // console.log(response)
            $("#cashBalance").val(response.data.Amount);
        }
    });
}

function generateOweDetailsTable(id) {
    return `
    <table id="oweDetails-${id}" class="table display nowrap" style="width:100%">
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
function getDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    return `${month}-${day}-${year}`;
    // console.log(currentDate); // "6-17-2022"
}