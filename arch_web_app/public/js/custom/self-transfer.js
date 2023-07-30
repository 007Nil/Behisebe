alertify.set('notifier', 'position', 'top-right');
$(function () {
    $("#self-transfer-id").css("color", "#FFFFFF");
    $('#self-transfer-date').datepicker();

    $("#transfer-from").select2({
        placeholder: "Select a Bank Account",
        // tags: false,
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

    $("#transfer-to").select2({
        placeholder: "Select a Bank Account",
        // tags: false,
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
});

$("#transfer-to").on("change", () => {
    try {
        let transfer_from_id = $("#transfer-from").select2('data')[0].id;
        let transfer_to_id = $("#transfer-to").select2('data')[0].id;

        if (transfer_from_id === transfer_to_id) {
            alert("Both are same fund. Self tranfer is not possible!!!");
            $("#transfer-to").val("");
            return;
        }
    } catch {

    }
});

$("#transfer-from").on("change", () => {

    try {
        $.ajax({
            type: "GET",
            url: "/v1/bank/getAccountBalance",
            data: `bankId=${$("#transfer-from").select2('data')[0].id}&date=${getDate()}`, // date: DD/MM/YY
            success: function (response) {
                $("#fund-amount").val(response.data);
            }
        });
    } catch {
        $("#fund-amount").val("");
    }
})

$("#amount").on("change", () => {
    let tranfer_amount = parseInt($("#amount").val());
    let fund_amount = parseInt($("#fund-amount").val());

    if (tranfer_amount > fund_amount) {
        alert("Invalid Amount!!!")
        $("#amount").val(0);
        return;
    }
})

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

function resetFrom() {
    $("#transfer-from").empty().trigger('change');
    $("#transfer-to").empty().trigger('change');
    $("#amount").val("");
    $("#self-transfer-date").val("");
   
}

$("#self-transfer-form").submit(function (event) {
    event.preventDefault();
    let self_transfer_obj = {
        transfer_from_id: $("#transfer-from").select2('data')[0].id,
        transfer_to_id: $("#transfer-to").select2('data')[0].id,
        transfer_from_name: $("#transfer-from").select2('data')[0].text,
        transfer_to_name: $("#transfer-to").select2('data')[0].text,
        amount: $("#amount").val(),
        date: $("#self-transfer-date").val()
    };
    $.ajax({
        type: "POST",
        url: "/v1/self-transation/add-self",
        data: JSON.stringify(self_transfer_obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            resetFrom();
            alertify.success('Credit information saved.', 3);
        },
        error: function (error) {
            alertify.error('Error while saving the data!!', 3);
        },
    });


});