// Shorthand for $( document ).ready()
$(function () {
    getBankDetails();
    getCashBalance();
});

function getBankDetails() {

    $.ajax({
        type: "GET",
        "url": "/v1/bank/getBankDetails",
        data: `date=${getDate()}`,

        success: function (response) {
            insertBankData(response);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function getCashBalance() {
    $.ajax({
        type: "GET",
        url: "/v1/cash/getCashBalance",
        data: `date=${getDate()}`,
        success: function (response) {
            // console.log(response)
            // $("#cashBalance").val(response.data.Amount);
            insertCashDetails(response.data.Amount)
            // $("#bankAmount").val(response.data);
        }
    });
}

function insertCashDetails(cashInHand) {
    $("#cash-information-div").html("");
    let cashHtml = `
    <div class="col-xl-3 col-md-6">
    <div class="card bg-info text-white mb-4">
       <div class="card-body">Cash in Hand: ${cashInHand}</div>
        </div>
    </div>
    `;

    $("#cash-information-div").append(cashHtml);

}
// bank-information-div
function insertBankData(bankInfo) {
    $("#bank-information-div").html("");
    let bankHtml = "";
    if (bankInfo.length > 0) {
        for (each of bankInfo) {
            bankHtml += `
            <div class="col-xl-3 col-md-6">
                <div class="card bg-info text-white mb-4">
                   <div class="card-body">Bank Name: ${each.BankName}</div>
                       <div class="card-footer d-flex align-items-center justify-content-between">
                     <div class="small text-white">
                     <p> Bank Balance: ${each.bankBalance}</p>
                     </div>
                   </div>
                </div>
            </div>
            `

        }
    } else {
        bankHtml += "No Bank Found. Please add bank from Settings -> Bank Settings"
    }

    $("#bank-information-div").append(bankHtml);
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