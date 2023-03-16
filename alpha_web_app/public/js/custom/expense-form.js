// $("#add-expense").trigger( "click" );
$("#add-expense").on("click", () => {

    $("#add-expense").css("color", "#FFFFFF");
    $("#add-expense").css("background-color", "#90ee90");
    //
    $("#view-expense").css("color", "#000000");
    $("#view-expense").css("background-color", "#FFFFFF");

    fillDynamicDiv(generateAddExpenseForm);

    // Added form jquery

    $('#expense_date').datepicker();
    $("#debited-from").select2({
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

    $("#expense-reason").select2({
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

    $("#lend-to").select2({
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
                            text: item.Reason,
                            id: item.ID
                        }
                    })
                };
            }
        }
    });

    $('#expense-reason').on("change", () => {
        // console.log($('#expense-reason').select2('data')[0].text);
        if ($('#expense-reason').select2('data')[0].text === "Lend Money") {
            insertLendMoneyFields();
            $("#lend-to").select2({
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
                                    text: item.Reason,
                                    id: item.ID
                                }
                            })
                        };
                    }
                }
            });
        } else {
            // console.log("HIT ELSE")
            $("#expense-cause-form").html("");
        }

    });

    $("#expense-form").submit(function (event) {
        event.preventDefault();
        let lendMoneyTo;
        try{
            lendMoneyTo = $("#lend-to").select2('data')[0].id;
        }catch (error){
            lendMoneyTo = null;
        }
        // console.log($("#debited-from").select2('data'));
        let expenseObject = {
            "bankName": $("#debited-from").select2('data')[0].id,
            "amount": $("#amount").val(),
            "date": $("#expense_date").val(),
            "expenseReason": $('#expense-reason').select2('data')[0].id,
            "lendMoneyTo": lendMoneyTo,
            "Notes": $("#notes").val()
        }

        $.ajax({
            type: "POST",
            url: "/v1/expense/addExpense",
            data: JSON.stringify(expenseObject),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log(error);
            },
        });
    });
})


// ------ Functions ------------------//

function insertLendMoneyFields() {
    let lendFields = `
        <div class="mb-3">
            <label for="lend-to" class="form-label">Lend to</label>
            <select id="lend-to" class="select2 form-control" required>

            </select>
        </div>
    `;

    $("#expense-cause-form").append(lendFields);
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
        <div class="mb-3">
            <label for="debited-from" class="form-label">Debited From</label>
            <select id="debited-from" class="select2 form-control" required>

            </select>
        </div>
        <div class="mb-3">
            <label for="amount" class="form-label">Amount</label>
            <input type="number" class="form-control" id="amount" required>
        </div>

        <div class='mb-3'>
            <label for="datepicker" class="form-label">Date</label>
            <input type="text" id="expense_date" class="form-control" id="datepicker" required>
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