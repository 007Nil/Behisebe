$("#add-expense").on("click", ()=> {

    $("#add-expense").css("color", "#FFFFFF");
    $("#add-expense").css("background-color", "#90ee90");
    //
    $("#view-expense").css("color", "#000000");
    $("#view-expense").css("background-color", "#FFFFFF");

    fillDynamicDiv(generateAddExpenseForm);

    // Added form jquery

    $('#expense_date').datepicker();
    $("#debited_from").select2({
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
        // theme: "bootstrap"
    });
    
    
    
    $("#expense_form").submit(function (event) {
        event.preventDefault();
        let bank_name = $("#bank_name").val();
        let amount = $("#amount").val();
        let date = $("#expense_date").val();
    
        if (bank_name === "Open this select menu") {
            alert("Need a value")
            return
        }
    });
})


// ------ Functions ------------------//

function fillDynamicDiv(functionName) {
    $("#dynamic_bank_content").html("");
    if (!$.trim($("#dynamic_bank_content").html()).length) {
      $("#dynamic_bank_content").append(functionName());
    }
  }

function generateAddExpenseForm(){
    return `
    <form id="expense_form">
        <div class="mb-3">
            <label for="debited_from" class="form-label">Debited From</label>
            <select id="debited_from" class="select2 form-control" required>

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
            <label for="reason" class="form-label">Debited From</label>
            <select id="reason" class="select2 form-control" required>

            </select>
        </div>
        <div class="mb-3">
            <label for="notes" class="form-label">Notes</label>
            <input type="text" class="form-control" id="notes" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit Data</button>
    </form> 
    `;
}