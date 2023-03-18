$("#credit_id").css("color", "#FFFFFF");

$("#add-credit-details").on("click", () => {
    $("#add-credit-details").css("color", "#FFFFFF");
    $("#add-credit-details").css("background-color", "#90ee90");
    //
    $("#view-credit-details").css("color", "#000000");
    $("#view-credit-details").css("background-color", "#FFFFFF");

    fillDynamicDiv(addCreditForm);

    $("#credit-date").datepicker();
    $("#credited-to").select2({
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
                console.log(data)
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
                // console.log(data.data)
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

    $('#credit-reason').on("change", () => {
        // console.log($('#expense-reason').select2('data')[0].text);
        if ($('#credit-reason').select2('data')[0].text === "Borrow") {
            insertCreditExtendFields();
            $("#spacial-credit").select2({
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
                        // console.log(data.data)
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
        } else {
            // console.log("HIT ELSE")
            $("#credit-cause-div").html("");
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
        let creditObject = {
            "bankID": $("#credited-to").select2('data')[0].id,
            "amount": $("#amount").val(),
            "date": $("#credit-date").val(),
            "creditReasonID": $('#credit-reason').select2('data')[0].id,
            "spacialCreditID": spacialCredit,
            "notes": $("#notes").val()
        }

        $.ajax({
            type: "POST",
            url: "/v1/credit/addCredit",
            data: JSON.stringify(creditObject),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log(error);
            },
        });

    })
})

$("#view-credit-details").on("click", () => {
    $("#view-credit-details").css("color", "#FFFFFF");
    $("#view-credit-details").css("background-color", "#90ee90");

    $("#add-credit-details").css("color", "#000000");
    $("#add-credit-details").css("background-color", "#FFFFFF");

})

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

function addCreditForm() {
    return `
    <form id="credit-form">
        <div class="mb-3">
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

        <div class="mb-3">
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