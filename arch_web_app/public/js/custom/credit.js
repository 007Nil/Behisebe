alertify.set('notifier', 'position', 'top-right');
$("#credit_id").css("color", "#FFFFFF");

$("#add-credit-details").on("click", () => {
    $("#add-credit-details").css("color", "#FFFFFF");
    $("#add-credit-details").css("background-color", "#90ee90");
    //
    $("#view-credit-details").css("color", "#000000");
    $("#view-credit-details").css("background-color", "#FFFFFF");

    fillDynamicDiv(addCreditForm);
    getCashBalance();
    $("#credit-date").datepicker();
    $("#credited-to").select2({
        placeholder: "Select a Bank Account",
        tags: [],
        ajax: {
            url: "/v1/bank/getBankDetails",
            dataType: 'json',
            type: "GET",
            quietMillis: 50,
            data: function (term) {
                return {
                    term: term
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
            }
        }
    });

    $("#credit-reason").select2({
        placeholder: "Select a Credit Reason",
        tags: [],
        ajax: {
            url: "/v1/credit/getCreditReason",
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

    $("#credited-to").on("change", () => {
        try {
            $.ajax({
                type: "GET",
                url: "/v1/bank/getAccountBalance",
                data: `bankId=${$("#credited-to").select2('data')[0].id}&date=${new Date().toLocaleDateString()}`, // date: DD/MM/YY
                success: function (response) {
                    $("#bankAmount").val(response.data);
                }
            });

        } catch {
            $("#bankAmount").val("");
        }
    });

    $('#credit-reason').on("change", () => {
        try {
            if ($('#credit-reason').select2('data')[0].text === "Borrow") {
                $("#credit-cause-div").html("");
                insertCreditExtendFields();
                $("#spacial-credit").select2({
                    placeholder: "Select an Option",
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
            } else if ($('#credit-reason').select2('data')[0].text === "Pay Of Debt") {
                $("#credit-cause-div").html("");
                insertCreditExtendFields();
                $("#spacial-credit").select2({
                    placeholder: "Select an Option",
                    tags: [],
                    ajax: {
                        url: "/v1/credit/getLendToPersons",
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
                                        text: item.LendToName,
                                        personID: item.LendTo,
                                        id: item.ID
                                    }
                                })
                            };
                        }
                    }
                });
            } else {
                $("#credit-cause-div").html("");
            }

        } catch {

        }
    });



    $("#credit-form").submit((event) => {
        event.preventDefault();
        let spacialCredit;
        try {
            if ($('#credit-reason').select2('data')[0].text === "Borrow") {
                spacialCredit = `${$("#spacial-credit").select2('data')[0].id}-lendMoney`;
            } else if ($('#credit-reason').select2('data')[0].text === "Pay Of Debt") {
                spacialCredit = `${$("#spacial-credit").select2('data')[0].id}-payOfDebt`;
            }

        } catch {
            spacialCredit = null;
        }
        let bankId;
        try{
            bankId = $("#credited-to").select2('data')[0].id;
        }catch {
            bankId = null;
        }
        let reason;
        try{
            reason = $('#credit-reason').select2('data')[0].id;
        }catch {
            reason = null;
        }
        let creditObject = {
            "bankId": bankId,
            "amount": $("#amount").val(),
            "date": $("#credit-date").val(),
            "reason": reason,
            "spacialCreditID": spacialCredit,
            "byCash": $("#cashCheckBox").is(":checked"),
            "notes": $("#notes").val()
        }

        $.ajax({
            type: "POST",
            url: "/v1/credit/addCredit",
            data: JSON.stringify(creditObject),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (response) {
                resetCreditForm();
                alertify.success('Credit information saved.', 3);
                getCashBalance()
            },
            error: function (error) {
                alertify.error('Error while saving the data!!', 3);
            },
        });

    })
})

$("#view-credit-details").on("click", () => {
    $("#view-credit-details").css("color", "#FFFFFF");
    $("#view-credit-details").css("background-color", "#90ee90");

    $("#add-credit-details").css("color", "#000000");
    $("#add-credit-details").css("background-color", "#FFFFFF");
    fillDynamicDiv(createViewCreditTable);

})

function resetCreditForm() {
    $("#credited-to").empty().trigger('change');
    $("#amount").val("");
    $("#credit-date").val("");
    $("#notes").val("");
    $("#credit-reason").empty().trigger('change');

}

function createViewCreditTable() {
    return `

        <table id="CreditDetailsTable" class="display nowrap" style="width:100%">
            <thead>
                <tr>
    
                </tr>
            </thead>
            <tbody>
    
            </tbody>
            </table>
    `
}

function insertCreditExtendFields() {
    let spacialCreditFileds = `
        <div id="spacial-credit-div class="mb-3">
            <label for="spacial-credit" class="form-label">From</label>
            <select id="spacial-credit" class="select2 form-control" required>

            </select>
        </div>
    `;

    $("#credit-cause-div").append(spacialCreditFileds);
}


function fillDynamicDiv(functionName) {
    $("#dynamic_bank_content").html("");
    if (!$.trim($("#dynamic_bank_content").html()).length) {
        $("#dynamic_bank_content").append(functionName());
    }
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

function addCreditForm() {
    return `
    <form id="credit-form">
        <div class="row">
            <div class="col-sm">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="bankCheckBox" checked>
                    <label class="form-check-label" for="bankCheckBox">
                        Credited to Bank
                    </label>
                    <input id="bankAmount" class="" type="text" value="" readonly>
                </div>
            </div>
            <div class="col-sm">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="cashCheckBox">
                    <label class="form-check-label" for="cashCheckBox">
                        Credit by Cash
                    </label>
                    <input id="cashBalance" class="" type="text" value="" readonly>
                </div>
            </div>
        </div>
        <div class="mb-3" id="credit-from-div">
            <label for="credited-to" class="form-label">Credit To</label>
            <select id="credited-to" class="select2 form-control" required>

            </select>
        </div>
        <div class="mb-3">
            <label for="amount" class="form-label">Amount</label>
            <input type="number" class="form-control" id="amount" required>
        </div>

        <div class='mb-3'>
            <label for="credit-date" class="form-label">Date</label>
            <input type="text" id="credit-date" class="form-control" required>
        </div>

        <div class="mb-3" id="cerdit-reason-div">
            <label for="credit-reason" class="form-label">Credit Cause</label>
            <select id="credit-reason" class="select2 form-control" required>

            </select>
        </div>
        <div id="credit-cause-div"></div>
        <div class="mb-3">
            <label for="notes" class="form-label">Notes</label>
            <input type="text" class="form-control" id="notes" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit Data</button>
    </form> 
    `
}

$(document).on('change', "#cashCheckBox", function () {
    if ($('#cashCheckBox').is(":checked")) {
        $('#bankCheckBox').prop('checked', false);
        $("#credit-from-div").css("display", "none");
        $("#cerdit-reason-div").css("display", "none");
        $('#credited-to').removeAttr('required');
        $("#credit-reason").removeAttr('required')
    }
});

$(document).on('change', "#bankCheckBox", function () {
    if ($('#bankCheckBox').is(":checked")) {
        $('#cashCheckBox').prop('checked', false);
        $("#credit-from-div").css("display", "block");
        $("#cerdit-reason-div").css("display", "block");
        $('#credited-to').prop('required', true);
        $("#credit-reason").prop('required', true);

    }
});

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
