alertify.set('notifier', 'position', 'top-right');
$(function () {
    getUserDebtData()
});

var GlobalPRow;
var GlobalCRow;
// 
var GlobalCData;
var GlobalPData;
// 
var GlobalPTable;
var GolbalCTable;

function getUserDebtData() {
    $.ajax({
        type: "GET",
        url: "/v1/expense/getPayOfDebt",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            generatePayYourDebtTable(response.data);
            // resetExpenseForm()

            alertify.success('Information fetched.', 3);
        },
        error: function (error) {
            alertify.error('Error while fetching the data!!', 3);
        },
    });
}

function generatePayYourDebtTable(transactionData) {

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
            },
            {
                "title": "Total Amount",
            },
            {
                "title": "Already Paid",
            },
            // {
            //     "title": "Full Payment",
            // },
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
                    return data;
                },
            },
            {
                targets: 4,
                data: "totalPaid",
                render: function (data) {
                    return data;
                },
            },
        ],
        order: [1, 'asc']
    });
    GlobalPTable = payYourDebtTable;
    payYourDebtTable.column(1).visible(false);


    $('#pay-your-debt-table tbody').on('click', 'td.dt-control', function () {
        let tr = $(this).closest('tr');
        let row = payYourDebtTable.row(tr);
        GlobalPRow = row;
        GlobalPData = row.data();
        if (row.child.isShown()) {
            // This row is already open - close it
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
                "title": "Paid",
            },
            {
                "title": "Make Payment",
            },
            {
                "title": "Borrow On",
            },
            {
                "title": "Credited in",
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
                    return data;
                },

            },
            {
                targets: 1,
                data: "lendId",
                render: function (data) {

                    return data;
                },
            },
            {
                targets: 2,
                data: "bankId",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 3,
                data: "amount",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 4,
                data: "alreadyPaid",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 5,
                data: null,
                defaultContent: `<button type="button" class="btn btn-outline-success btn-sm">Pay</button>`
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
    GolbalCTable = detailsTable;


    $(`#payDebtDetails-${detailsObj.personId} tbody`).on('click', '.btn-sm', function () {
        $("#paymentModalBody").empty();
        let tr = $(this).closest("tr");

        let row = detailsTable.row(tr);
        GolbalCRow = row;
        let rowData = row.data();
        GlobalCData = rowData;

        // paymentModalBody
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
        $('#makePaymentModal').modal("show");

        $("#debited-from").select2({
            dropdownParent: $('#makePaymentModal'),
            placeholder: "Select a Bank Account",
            // tags: false,
            ajax: {
                url: "/v1/bank/getBankDetails",
                dataType: 'json',
                type: "GET",

                data: function (params) {
                    return {
                        searchTerm: params.term
                    };
                },
                processResults: function (data) {
                    return {
                        results: $.map(data, function (item) {
                            return {
                                text: item.BankName,
                                id: item.BankID
                            }
                        })
                    };
                },
            }
        });

        $("#debited-from").on("change", () => {

            try {
                $.ajax({
                    type: "GET",
                    url: "/v1/bank/getAccountBalance",
                    data: `bankId=${$("#debited-from").select2('data')[0].id}&date=${getDate()}`, // date: DD/MM/YY
                    success: function (response) {
                        $("#bankAmount").val(response.data);
                    }
                });
            } catch {
                $("#bankAmount").val("");
            }
        })
    });



    $(".btn-cls").on("click", function () {
        $('#makePaymentModal').modal("toggle");

    })
}

$(document).on('change', "#cashCheckBox", function () {
    if ($('#cashCheckBox').is(":checked")) {
        $('#bankCheckBox').prop('checked', false);
        $("#debited-from-div").css("display", "none");
        $('#debited-from').removeAttr('required');
        $("#bankAmount").val("");
    }
});

$(document).on('change', "#bankCheckBox", function () {
    if ($('#bankCheckBox').is(":checked")) {
        $('#cashCheckBox').prop('checked', false);
        $("#debited-from-div").css("display", "block");
        $('#debited-from').prop('required', true);

    }
});

function getCashBalance() {
    $.ajax({
        type: "GET",
        url: "/v1/cash/getCashBalance",
        data: `date=${getDate()}`,
        success: function (response) {
            $("#cashBalance").val(response.data.Amount);
        }
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

$("#processBorrowPayment").on("click", () => {
    let payAmount = $("#payNow").val();
    let borrowAmount = $("#amount").val();
    let alreadyPaid = $("#alreadyPaid").val();
    let fullPayment = 0;
    let bankId = null;
    let bycash = null;
    if ($('#cashCheckBox').is(":checked")) {
        let cashBalance = $('#cashBalance').val();
        bycash = 1;
        if (parseInt(payAmount) > parseInt(cashBalance)) {
            alert("You don't have Enough balance")
            return;
        }
    } else {
        try {
            bankId = `${$("#debited-from").select2('data')[0].id}`;
        } catch (error) {
            alert("Please select Bank")
            return;
        }

        let bankBalance = $("#bankAmount").val();
        if (parseInt(payAmount) > parseInt(bankBalance)) {
            alert("You don't have Enough balance")
            return;
        }
    }

    if (payAmount == 0) {
        alert("Invalid Pay Amount");
        return;
    } else if (payAmount > (borrowAmount - alreadyPaid)) {
        alert("Invalid Pay Amount");
        return;
    } else if (payAmount < 0) {
        alert("Invalid Pay Amount");
        return;
    }

    if (parseInt(alreadyPaid) + parseInt(payAmount) == parseInt(borrowAmount)) {
        fullPayment = 1;
    }

    let personId = $("#personId").val();
    let transacationId = $("#transacationId").val();
    let lendId = $("#lendId").val();
    let date = getDate();


    let payObject = {
        "transacationId": transacationId,
        "lendId": lendId,
        "debitedBankId": bankId,
        "date": date,
        "payAmount": payAmount,
        "fullPayment": fullPayment,
        "personId": personId,
        "bycash": bycash,
        "borrowAmount": borrowAmount

    }

    $.ajax({
        type: "POST",
        url: "/v1/lend/payDebt",
        data: JSON.stringify(payObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            $('#makePaymentModal').modal('toggle');
            reDrawTable(payObject);
            alertify.success('Information saved.', 3);
        },
        error: function (error) {
            alertify.error('Error while saving the data!!', 3);
        },
    });

})

function reDrawTable(payObject) {
    GlobalPData.totalPaid = parseInt(payObject.payAmount) + parseInt(GlobalPData.totalPaid);
    if (parseInt(GlobalPData.totalAmount) == parseInt(GlobalPData.totalPaid)) {
        try {
            GlobalPTable.row(GlobalPRow).remove().draw();
        } catch {

        }
    } else {
        GlobalPTable.row(GlobalPRow).data(GlobalPData).draw();
    }
    // Logic for Child table
    if (parseInt(payObject.fullPayment) == 1) {
        try {
            GolbalCTable.row(GolbalCRow).remove().draw();
        } catch {

        }
    } else {
        GlobalCData.alreadyPaid = parseInt(payObject.payAmount) + parseInt(GlobalCData.alreadyPaid);
        GolbalCTable.row(GolbalCRow).data(GlobalCData).draw();
        GlobalCData = GlobalCData;
    }
}

function getDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${month}-${day}-${year}`;
}