$("#credit_id").css("color", "#FFFFFF");

$("#add-credit-details").on("click", ()=>{
    $("#add-credit-details").css("color", "#FFFFFF");
    $("#add-credit-details").css("background-color", "#90ee90");
    //
    $("#view-credit-details").css("color", "#000000");
    $("#view-credit-details").css("background-color", "#FFFFFF");

    fillDynamicDiv(addCreditForm);
})

$("#view-credit-details").on("click",()=>{
    $("#view-credit-details").css("color", "#FFFFFF");
    $("#view-credit-details").css("background-color", "#90ee90");

    $("#add-credit-details").css("color", "#000000");
    $("#add-credit-details").css("background-color", "#FFFFFF");
    
})


function fillDynamicDiv(functionName) {
    $("#dynamic_bank_content").html("");
    if (!$.trim($("#dynamic_bank_content").html()).length) {
        $("#dynamic_bank_content").append(functionName());
    }
}

function addCreditForm(){
    return `
    <form id="credit-form">
        <div class="mb-3">
            <label for="credit-to" class="form-label">Credit To</label>
            <select id="credit-to" class="select2 form-control" required>

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
            <label for="credit-reason" class="form-label">Credit Cause</label>
            <select id="credit-reason" class="select2 form-control" required>

            </select>
        </div>
        <div id="credit-cause-form"></div>
        <div class="mb-3">
            <label for="notes" class="form-label">Notes</label>
            <input type="text" class="form-control" id="notes" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit Data</button>
    </form> 
    `
}