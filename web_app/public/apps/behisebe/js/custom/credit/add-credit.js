alertify.set('notifier', 'position', 'top-right');
$(function () {
    $("#credit-nav")[0].click();
    $("#add-credit-nav").css("color", "#FFFFFF");
    getCashBalance();
});


$("#cashCheckBox").on("click", function(e){
    $("#cerdit-reason-div").hide();
});


function getCashBalance() {
    $.ajax({
        type: "GET",
        url: "/apps/behisebe/v1/cash/getCashBalance",
        data: `date=${toISOLocal(new Date()).slice(0, 19).replace('T', ' ')}`,
        success: function (response) {
            // console.log(response)
            $("#cashBalance").val(response.data.Amount);
            // $("#bankAmount").val(response.data);
        }
    });
}

$("#credit-date").datepicker();
$("#credited-to").select2({
    placeholder: "Select a Bank Account",
    tags: [],
    ajax: {
        url: "/apps/behisebe/v1/bank/getBankDetails",
        dataType: 'json',
        type: "GET",
        quietMillis: 50,
        data: function (term) {
            return {
                term: term
            };
        },
        processResults: function (data) {
            // console.log(data)
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
        url: "/apps/behisebe/v1/credit/getCreditReason",
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

$("#credited-to").on("change", () => {
    try {
        $.ajax({
            type: "GET",
            url: "/apps/behisebe/v1/bank/getAccountBalance",
            data: `bankId=${$("#credited-to").select2('data')[0].id}&date=${toISOLocal(new Date()).slice(0, 19).replace('T', ' ')}`, // date: DD/MM/YY
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
        // console.log($('#expense-reason').select2('data')[0].text);
        if ($('#credit-reason').select2('data')[0].text === "Borrow") {
            $("#credit-cause-div").html("");
            insertCreditExtendFields();
            $("#spacial-credit").select2({
                placeholder: "Select an Option",
                tags: [],
                ajax: {
                    url: "/apps/behisebe/v1/persons/getPersonData",
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
        } else if ($('#credit-reason').select2('data')[0].text === "Pay Of Debt") {
            $("#credit-cause-div").html("");
            insertCreditExtendFields();
            $("#spacial-credit").select2({
                placeholder: "Select an Option",
                tags: [],
                ajax: {
                    url: "/apps/behisebe/v1/credit/getLendToPersons",
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
            // console.log("HIT ELSE")
            $("#credit-cause-div").html("");
        }

    } catch {

    }
});

function toISOLocal(d) {
    var z  = n =>  ('0' + n).slice(-2);
    var zz = n => ('00' + n).slice(-3);
    var off = d.getTimezoneOffset();
    var sign = off > 0? '-' : '+';
    off = Math.abs(off);
  
    return d.getFullYear() + '-'
           + z(d.getMonth()+1) + '-' +
           z(d.getDate()) + 'T' +
           z(d.getHours()) + ':'  + 
           z(d.getMinutes()) + ':' +
           z(d.getSeconds()) + '.' +
           zz(d.getMilliseconds()) +
           sign + z(off/60|0) + ':' + z(off%60); 
  }

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
    try {
        bankId = $("#credited-to").select2('data')[0].id;
    } catch {
        bankId = null;
    }
    let reason;
    try {
        reason = $('#credit-reason').select2('data')[0].id;
    } catch {
        reason = null;
    }
    let creditObject = {
        "bankId": bankId,
        "amount": $("#amount").val(),
        "date": toISOLocal(new Date()).slice(0, 19).replace('T', ' '),
        "reason": $("#cashCheckBox").is(":checked") ? "6765454367" : reason,
        "spacialCreditID": spacialCredit,
        "byCash": $("#cashCheckBox").is(":checked"),
        "notes": $("#notes").val()
    }
    // console.log($("#spacial-credit").select2('data')[0].personID);
    console.log(creditObject);
    // return;

    $.ajax({
        type: "POST",
        url: "/apps/behisebe/v1/credit/addCredit",
        data: JSON.stringify(creditObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            // console.log(response);
            resetCreditForm();
            alertify.success('Credit information saved.', 3);
            getCashBalance()
        },
        error: function (error) {
            // console.log(error);
            alertify.error('Error while saving the data!!', 3);
        },
    });

});

function insertCreditExtendFields() {
    let spacialCreditFileds = `
        <div id="spacial-credit-div" class="mb-3">
            <label for="spacial-credit" class="form-label">From</label>
            <select id="spacial-credit" class="form-control" required>

            </select>
        </div>
    `;

    $("#credit-cause-div").append(spacialCreditFileds);
}

$(document).on('change', "#cashCheckBox", function () {
    if ($('#cashCheckBox').is(":checked")) {
        $('#bankCheckBox').prop('checked', false);
        $("#credit-from-div").css("display", "none");
        $('#credited-to').removeAttr('required');
    }
});

$(document).on('change', "#bankCheckBox", function () {
    if ($('#bankCheckBox').is(":checked")) {
        $('#cashCheckBox').prop('checked', false);
        // console.log("HIT");
        $("#credit-from-div").css("display", "block");
        // $("#cerdit-reason-div").css("display", "block");
        $('#credited-to').prop('required', true);
        // $("#credit-reason").prop('required', true);

    }
});

function resetCreditForm() {
    $("#credited-to").empty().trigger('change');
    $("#amount").val("");
    $("#credit-date").val("");
    $("#notes").val("");
    $("#credit-reason").empty().trigger('change');
    try{
        $("#spacial-credit").empty().trigger('change');
        $("#spacial-credit-div").css("display","none");
    }catch {

    }

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