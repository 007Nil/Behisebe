// Click on Settings href and set Bank setting color white
$("#settings_id")[0].click();
$("#bank_settings_id").css('color', '#FFFFFF');

$("#add_bank_details").on("click",()=>{
    $("#add_bank_details").css('color', '#FFFFFF');
    $("#add_bank_details").css('background-color', '#90ee90');
    // 
    $("#edit_bank_details").css('color', '#000000');
    $("#edit_bank_details").css('background-color', '#FFFFFF');
    if (!$.trim( $('#dynamic_bank_content').html()).length){
        $("#dynamic_bank_content").append(createAddBankDetailsForm());
    }
    
});

$("#edit_bank_details").on("click", ()=>{
    $("#edit_bank_details").css('color', '#FFFFFF');
    $("#edit_bank_details").css('background-color', '#90ee90');
    // Remove css from add_bank_details
    $("#add_bank_details").css('color', '#000000');
    $("#add_bank_details").css('background-color', '#FFFFFF');
    // emply the dynamic_bank_content div
    // $("#dynamic_bank_content").html("");

});

// ------ Functions ------------------//

function createAddBankDetailsForm(){
    return `
        <div class="mb-3">
            <label for="bank_name" class="form-label">Bank Name</label>
            <input type="text" class="form-control" id="bank_name">
        </div>
        <div class="mb-3">
            <label for="total_amount" class="form-label">Total Amount In Account</label>
            <input type="number" class="form-control" id="total_amount">
        </div>
            
        <div class="mb-3">
            <label for="notes" class="form-label">Notes</label>
            <input type="text" class="form-control">
        </div>
        <button id="add_bank_details_btn" onClick=add_bank_details() class="btn btn-primary">Add Bank</button>
    `;
}
// Call a rest API and add those data to database
function add_bank_details(){
    
}

function edit_bank_details(){
    
}