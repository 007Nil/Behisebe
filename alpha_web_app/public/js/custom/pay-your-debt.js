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
            },
            {
                "title": "Total Amount",
            },
            {
                "title": "Already Paid",
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
            {
                targets: 4,
                data: "totalPaid",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            {
                targets: 5,
                data: null,
                defaultContent: `<button type="button" class="btn btn-outline-success btn-sm">Make Payment</button>`
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
    console.log(detailsObj)
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
                data: null,
                defaultContent: `<button type="button" class="btn btn-outline-success btn-sm">Pay</button>`
            },
            {

                targets: 5,
                data: "date",
                render: function (data) {
                    return convertDate(data);
                },
            },
            {

                targets: 6,
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
    // console.log(`#payDebtDetails-${detailsObj.personId} tbody`)





    $(`#payDebtDetails-${detailsObj.personId} tbody`).on('click', '.btn-sm', function () {
        // console.log(detailsObj)

        $("#paymentModalBody").empty();
        let tr = $(this).closest("tr");
        // console.log(tr)
        let row = detailsTable.row(tr);
        // console.log(row.data())
        let rowData = row.data();
        console.log(rowData)
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
                <input type="text" readonly class="form-control" id="alreadyPaid" value="0">
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

            <input type="hidden" id="personId" value=${detailsObj.personId}/>
            <input type="hidden" id="transacationId" value=${rowData.transacationId}/>
            <input type="hidden" id="lendId" value=${rowData.lendId}/>
            <input type="hidden" id="bankId" value=${rowData.bankId}/>

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
                // quietMillis: 1000,

                data: function (params) {
                    return {
                        searchTerm: params.term
                    };
                },
                processResults: function (data) {
                    console.log(data)
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
                // console.log("HIT")
                $("#bankAmount").val("");
            }
        })
    });



    $(".btn-cls").on("click", function () {
        $('#makePaymentModal').modal("toggle");

    })
}

$(document).on('change', "#cashCheckBox", function () {
    // console.log($('#bankCheckBox').attr('checked'))
    if ($('#cashCheckBox').is(":checked")) {
        $('#bankCheckBox').prop('checked', false);
        // console.log("HIT");
        $("#debited-from-div").css("display", "none");
        // $('#debited-from').removeAttr('required');​​​​​
        $('#debited-from').removeAttr('required');
        $("#bankAmount").val("");
    }
});

$(document).on('change', "#bankCheckBox", function () {
    if ($('#bankCheckBox').is(":checked")) {
        $('#cashCheckBox').prop('checked', false);
        // console.log("HIT");
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
            // console.log(response)
            $("#cashBalance").val(response.data.Amount);
            // $("#bankAmount").val(response.data);
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
    // console.log(dateIST.toDateString())
    return dateIST.toDateString();
}

$("#processBorrowPayment").on("click", () => {
    let payAmount = $("#payNow").val();
    let borrowAmount = $("#amount").val();
    let alreadyPaid = $("#alreadyPaid").val();
    let fullPayment = 0;
    let bankId;
    // console.log(payAmount)
    if ($('#cashCheckBox').is(":checked")) {
        // console.log("HIT")
        let cashBalance = $('#cashBalance').val();
        console.log(cashBalance);
        if (parseInt($("#amount").val()) > parseInt(cashBalance)) {
            alert("NOT POSSIBLE");
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
        if (parseInt($("#amount").val()) > parseInt(bankBalance)) {
            alert("NOT POSSIBLE")
            return;
        }
    }

    if (payAmount == 0) {
        alert("Pay Now is 0");
        return;
    } else if (payAmount > (borrowAmount - alreadyPaid)) {
        alert("Pay amount ");
    } else if (payAmount < 0) {
        alert("Pay Now is 0");
    }

    if (parseInt(alreadyPaid) + parseInt(payAmount) == parseInt(borrowAmount)) {
        fullPayment = 1;
    }

    let personId = $("#personId").val();
    let transacationId = $("#transacationId").val();
    let lendId = $("#lendId").val();
    // let bankId = $("#bankId").val();
    let date = getDate();


    let payObject = {
        "transacationId": transacationId,
        "lendId": lendId,
        "debitedBankId": bankId,
        "date": date,
        "payAmount": payAmount,
        "fullPayment": fullPayment,
        "personId": personId,

    }

    console.log(payObject)

    $.ajax({
        type: "POST",
        url: "/v1/lend/payDebt",
        data: JSON.stringify(payObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            console.log(response)
            // console.log(response);
            // resetExpenseForm()
            // alertify.success('Expense information saved.', 3);
        },
        error: function (error) {
            // console.log(error);
            // alertify.error('Error while saving the data!!', 3);
        },
    });

})

function getDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    return `${day}-${month}-${year}`;
    // console.log(currentDate); // "17-6-2022"
}