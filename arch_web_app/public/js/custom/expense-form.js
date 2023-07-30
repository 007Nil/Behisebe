alertify.set('notifier', 'position', 'top-right');
$("#debit-id").css("color", "#FFFFFF");
$("#add-expense").on("click", () => {

    $("#add-expense").css("color", "#FFFFFF");
    $("#add-expense").css("background-color", "#90ee90");
    //
    $("#view-expense").css("color", "#000000");
    $("#view-expense").css("background-color", "#FFFFFF");

    fillDynamicDiv(generateAddExpenseForm);
    getCashBalance();


    $('#expense_date').datepicker();
    $("#debited-from").select2({
        placeholder: "Select a Bank Account",

        ajax: {
            url: "/v1/bank/getBankDetails",
            dataType: 'json',
            type: "GET",
            quietMillis: 1000,

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
            cache: true
        }
    });

    $("#expense-reason").select2({
        placeholder: "Select a Reason",
        tags: [],
        ajax: {
            url: "/v1/expense/getExpenseReason",
            dataType: 'json',
            type: "GET",
            quietMillis: 50,
            response: function (term) {
                return {
                    term: term
                };
            },
            processResults: function (response) {
                return {
                    results: $.map(response.data, function (item) {
                        return {
                            text: item.Reason,
                            id: item.ID
                        }
                    })
                };
            }
        }
    });

    $("#spacial-debit").select2({
        placeholder: "Select an Option",
        tags: [],
        ajax: {
            url: "/v1/expense/getPersonData",
            dataType: 'json',
            type: "GET",
            quietMillis: 50,
            response: function (term) {
                return {
                    term: term
                };
            },
            processResults: function (response) {
                return {
                    results: $.map(response.data, function (item) {
                        return {
                            text: item.Reason,
                            id: item.ID
                        }
                    })
                };
            }
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

    $('#expense-reason').on("change", () => {
        try {
            if ($('#expense-reason').select2('data')[0].text === "Lend") {
                $("#expense-cause-form").html("");
                insertLendMoneyFields();
                $("#spacial-debit").select2({
                    tags: [],
                    ajax: {
                        url: "/v1/persons/getPersonData",
                        dataType: 'json',
                        type: "GET",
                        quietMillis: 50,
                        response: function (term) {
                            return {
                                term: term
                            };
                        },
                        processResults: function (response) {
                            return {
                                results: $.map(response.data, function (item) {
                                    return {
                                        text: item.Name,
                                        id: item.ID
                                    }
                                })
                            };
                        }
                    }
                });
            } else if ($('#expense-reason').select2('data')[0].text === "Pay Of Debt") {
                $("#expense-cause-form").html("");
                insertLendMoneyFields();
                $("#spacial-debit").select2({
                    tags: [],
                    ajax: {
                        url: "/v1/expense/getPayOfDebt",
                        dataType: 'json',
                        type: "GET",
                        quietMillis: 50,
                        response: function (term) {
                            return {
                                term: term
                            };
                        },
                        processResults: function (response) {
                            return {
                                results: $.map(response.data, function (item) {
                                    return {
                                        text: item.Name,
                                        id: item.ID
                                    }
                                })
                            };
                        }
                    }
                });
            }
            else {
                $("#expense-cause-form").html("");
            }
        } catch {
            // Nothing to catch, works just fine
        }
    });

    $("#expense-form").submit(function (event) {
        event.preventDefault();
        let bankBalance = $("#bankAmount").val();
        if (parseInt($("#amount").val()) > parseInt(bankBalance)) {
            alert("NOT POSSIBLE")
            return;
        }
        let spacialDebit;
        try {
            if ($('#expense-reason').select2('data')[0].text === "Lend") {
                spacialDebit = `${$("#spacial-debit").select2('data')[0].id}-lendMoney`;
            } else if ($('#expense-reason').select2('data')[0].text === "Pay Of Debt") {
                spacialDebit = `${$("#spacial-debit").select2('data')[0].id}-payOfDebt`;
            }
        } catch (error) {
            spacialDebit = null;
        }
        let bankId;
        try {
            bankId = $("#debited-from").select2('data')[0].id;
        } catch {
            bankId = null;
        }

        let expenseObject = {
            "bankId": bankId,
            "amount": $("#amount").val(),
            "date": $("#expense_date").val(),
            "expenseReason": $('#expense-reason').select2('data')[0].id,
            "spacialDebit": spacialDebit,
            "byCash": $("#cashCheckBox").is(":checked"),
            "notes": $("#notes").val()
        }

        $.ajax({
            type: "POST",
            url: "/v1/expense/addExpense",
            data: JSON.stringify(expenseObject),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (response) {
                resetExpenseForm()
                alertify.success('Expense information saved.', 3);
                getCashBalance();
            },
            error: function (error) {
                alertify.error('Error while saving the data!!', 3);
            },
        });
    });
})



$(document).on('change', "#cashCheckBox", function () {
    if ($('#cashCheckBox').is(":checked")) {
        $('#bankCheckBox').prop('checked', false);
        $("#debited-from-div").css("display", "none");
        $('#debited-from').removeAttr('required');
    }
});

$(document).on('change', "#bankCheckBox", function () {
    if ($('#bankCheckBox').is(":checked")) {
        $('#cashCheckBox').prop('checked', false);
        $("#debited-from-div").css("display", "block");
        $('#debited-from').prop('required', true);

    }
});

$("#view-expense").on("click", () => {

    $("#view-expense").css("color", "#FFFFFF");
    $("#view-expense").css("background-color", "#90ee90");

    $("#add-expense").css("color", "#000000");
    $("#add-expense").css("background-color", "#FFFFFF");
    fillDynamicDiv(createViewExpenseTable);
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
// ------ Functions ------------------//


function getExpenseDetails() {

    let startDate = $("#start-date").val();
    let endDate = $("#end-date").val();
    if (new Date(startDate).getTime() > new Date(endDate).getTime()){
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
            alert("Error occur!!!"+error);
        },
    });
}

function createViewExpenseTable() {
    return `
        <div class="row center2">
            <div class="col-sm" style="padding: 10px;">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="start-date" class="col-xs-3">Start Date:</label>
                        <input type="text" id="start-date" style="padding: 5px;">
                    </div>
                </form>
            </div>
            <div class="col-sm" style="padding: 10px;">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="end-date" class="col-xs-2" style="text-align: left;">End Date:</label>
                        <input type="text" id="end-date" style="padding: 5px;">
                    </div>
                </form>
            </div>
        </div>
        <table id="ExpenseDetailsTable" class="display nowrap" style="width:100%">
            <thead>
                <tr>
    
    
                </tr>
            </thead>
            <tbody>
    
            </tbody>
            </table>
    `
}

function insertLendMoneyFields() {
    let lendFields = `
        <div class="mb-3">
            <label for="spacial-debit" class="form-label">To</label>
            <select id="spacial-debit" class="select2 form-control" required>

            </select>
        </div>
    `;

    $("#expense-cause-form").append(lendFields);
}

function resetExpenseForm() {
    $("#debited-from").empty().trigger('change');
    $("#amount").val("");
    $("#expense_date").val("");
    $("#notes").val("");
    $("#expense-reason").empty().trigger('change');
}

function fillDynamicDiv(functionName) {
    $("#dynamic_bank_content").html("");
    if (!$.trim($("#dynamic_bank_content").html()).length) {
        $("#dynamic_bank_content").append(functionName());
    }
}

function generateAddExpenseForm() {
    return `
    <form id="expense-form">
        <div class="row">
            <div class="col">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="bankCheckBox" checked>
                    <label class="form-check-label" for="bankCheckBox">
                        Debited From Bank
                    </label>
                    
                    <input id="bankAmount" class="" type="text"readonly>
                </div>
            </div>
            <div class="col">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="cashCheckBox">
                    <label class="form-check-label" for="cashCheckBox">
                        Expense By Cash
                    </label>
                    <input id="cashBalance" type="text"readonly>
                </div>
            </div>
        </div>
        <div id="debited-from-div" class="mb-3">
            <label for="debited-from" class="form-label">Debited From</label>
            <select id="debited-from" class="select2 form-control" required>

            </select>
        </div>
        <div class="mb-3">
            <label for="amount" class="form-label">Amount</label>
            <input type="number" class="form-control" id="amount" required>
        </div>

        <div class='mb-3'>
            <label for="expense_date" class="form-label">Date</label>
            <input type="text" id="expense_date" class="form-control" required>
        </div>

        <div class="mb-3">
            <label for="expense-reason" class="form-label">Expense Cause</label>
            <select id="expense-reason" class="select2 form-control" required>

            </select>
        </div>
        <div id="expense-cause-form"></div>
        <div class="mb-3">
            <label for="notes" class="form-label">Notes</label>
            <input type="text" class="form-control" id="notes" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit Data</button>
    </form> 
    `;
}

function getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday
}

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

function getOneMonthPreviosDate() {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    let previosDateSplit = date.toISOString().split('T')[0].split("-");
    return `${previosDateSplit[1]}/${previosDateSplit[2]}/${previosDateSplit[0]}`;
}

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