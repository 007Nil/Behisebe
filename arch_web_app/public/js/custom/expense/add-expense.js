alertify.set('notifier', 'position', 'top-right');
$(function () {
    $("#expense-nav")[0].click();
    $("#add-expense-nav").css("color", "#FFFFFF");
    getCashBalance();
    $('#expense_date').datepicker();
    $("#debited-from").select2({
        placeholder: "Select a Bank Account",
        ajax: {
            type: "GET",
            url: "/v1/bank/getBankDetails",
            data: `date=${getDate()}`,
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
        if ($('#cashCheckBox').is(":checked")) {
            let cashBalance = $('#cashBalance').val();
            if (parseInt($("#amount").val()) > parseInt(cashBalance)) {
                alert("NOT POSSIBLE");
                return;
            }
        } else {
            let bankBalance = $("#bankAmount").val();
            if (parseInt($("#amount").val()) > parseInt(bankBalance)) {
                alert("NOT POSSIBLE")
                return;
            }
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
});

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

function getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = mm + '/' + dd + '/' + yyyy;
    return formattedToday
}

function resetExpenseForm() {
    $("#debited-from").empty().trigger('change');
    $("#amount").val("");
    $("#expense_date").val("");
    $("#notes").val("");
    $("#spacial-debit").empty().trigger('change');
    $("#spacial-debit-div").css("display", "none");
    $("#expense-reason").empty().trigger('change');
}

function insertLendMoneyFields() {
    let lendFields = `
        <div class="mb-3" id="spacial-debit-div">
            <label for="spacial-debit" class="form-label">To</label>
            <select id="spacial-debit" class="form-control" required>

            </select>
        </div>
    `;

    $("#expense-cause-form").append(lendFields);
}

