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
                            Credited In Bank
                        </label>

                        <input id="bankAmount" class="" type="text" readonly>
                    </div>
                </div>
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="cashCheckBox">
                        <label class="form-check-label" for="cashCheckBox">
                            Credit By Cash
                        </label>
                        <input id="cashBalance" type="text" readonly>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="lendTo" class="col-sm-4 col-form-label">Lend To</label>
                <div class="col-sm-6">
                <input type="text" readonly class="form-control" id="lendTo" value="${detailsObj.LendTo}">
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
                <input type="text" readonly class="form-control" id="onDate" value="${convertDate(rowData.date)}">
                </div>
            </div>

            <div class="form-group row">
                <label for="alreadyReceived" class="col-sm-4 col-form-label">Received</label>
                <div class="col-sm-6">
                <input type="text" readonly class="form-control" id="alreadyReceived" value="${rowData.alreadyReceived}">
                </div>
            </div>

            <div id="credited-in-div" class="form-group row">
                <label for="credited-in" class="col-sm-4 col-form-label">Credited In</label>
                <div class="col-sm-6">
                <select id="credited-in" class="form-control" required>
                </select>
                </div>
            </div>

            <div class="form-group row">
                <label for="collectedDebt" class="col-sm-4 col-form-label">Collected</label>
                <div class="col-sm-6">
                <input type="number" class="form-control" id="collectedDebt" value=0>
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

        $("#credited-in").select2({
            dropdownParent: $('#updatePaymentModal'),
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

        $("#credited-in").on("change", () => {

            try {
                $.ajax({
                    type: "GET",
                    url: "/v1/bank/getAccountBalance",
                    data: `bankId=${$("#credited-in").select2('data')[0].id}&date=${getDate()}`, // date: DD/MM/YY
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
        $('#updatePaymentModal').modal("toggle");

    })
}

$(document).on('change', "#cashCheckBox", function () {
    if ($('#cashCheckBox').is(":checked")) {
        $('#bankCheckBox').prop('checked', false);
        $("#credited-in-div").css("display", "none");
        $('#credited-in').removeAttr('required');
        $("#bankAmount").val("");
    }
});

$(document).on('change', "#bankCheckBox", function () {
    if ($('#bankCheckBox').is(":checked")) {
        $('#cashCheckBox').prop('checked', false);
        $("#credited-in-div").css("display", "block");
        $('#credited-in').prop('required', true);

    }
});



$("#processOwePayment").on("click", () => {
    let collectedDebt = $("#collectedDebt").val();
    let lendAmount = $("#amount").val();
    let alreadyReceived = $("#alreadyReceived").val();
    let fullPayment = 0;
    let bankId = null;
    let bycash = null;

    if ($('#cashCheckBox').is(":checked")) {
        bycash = 1;
    } else {
        try {
            bankId = `${$("#credited-in").select2('data')[0].id}`;
        } catch (error) {
            alert("Please select Bank")
            return;
        }
    }

    if (collectedDebt == 0) {
        alert("Invalid Pay Amount");
        return;
    } else if (collectedDebt > (lendAmount - alreadyReceived)) {
        alert("Invalid Pay Amount");
        return;
    } else if (collectedDebt < 0) {
        alert("Invalid Pay Amount");
        return;
    }

    if (parseInt(alreadyReceived) + parseInt(collectedDebt) == parseInt(lendAmount)) {
        fullPayment = 1;
    }

    let personId = $("#personId").val();
    let transacationId = $("#transacationId").val();
    let lendId = $("#lendId").val();
    // let bankId = $("#bankId").val();
    let date = getDate();

    let collectObj = {
        "transacationId": transacationId,
        "lendId": lendId,
        "debitedBankId": bankId,
        "date": date,
        "payAmount": collectedDebt,
        "fullPayment": fullPayment,
        "personId": personId,
        "bycash": bycash,
        "lendAmount": lendAmount

    };

    // console.log(collectObj)

    $.ajax({
        type: "POST",
        url: "/v1/lend/collectDebt",
        data: JSON.stringify(collectObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            console.log(response.data)
            // $('#makePaymentModal').modal('toggle');
            // reDrawTable(payObject);
            // alertify.success('Information saved.', 3);
        },
        error: function (error) {
            // alertify.error('Error while saving the data!!', 3);
        },
    });
});




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