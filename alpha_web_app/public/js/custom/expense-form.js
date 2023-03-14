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