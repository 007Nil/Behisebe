alertify.set('notifier', 'position', 'top-right');
$(function () {
    getUserDebtData()
});

function getUserDebtData() {
    $.ajax({
        type: "GET",
        url: "/v1/expense/getPayOfDebt",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            generatePayYourDebtTable(response.data);
            // resetExpenseForm()
            alertify.success('Expense information saved.', 3);
        },
        error: function (error) {
            // console.log(error);
            alertify.error('Error while saving the data!!', 3);
        },
    });
}

function generatePayYourDebtTable(transactionData) {
    console.log(transactionData);
    let payYourDebtTable = $("#pay-your-debt-table").DataTable({
        data: transactionData,
        columns: [
            // {
            //     "title"
            //     defaultContent: '',
            // },
            {
                "title": "personId",
            },
            {
                "title": "Borrow From",
            },
            {
                "title": "Total Amount",
            },
        ],
        // rowReorder: {
        //     selector: 'td:nth-child(2)'
        // },
        responsive: true,
        columnDefs: [
            {
                targets: 0,
                data: "personId",
                render: function (data) {
                    return "data";
                },
            },
            {
                targets: 1,
                data: "LendFrom",
                render: function (data) {
                    // console.log(data)
                    return `<img src="../../images/slide-up.png" height="20" width="20"><span> </span>${data}`;
                },
            },
            {
                targets: 2,
                data: "totalAmount",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            // {
            //     targets: 3,
            //     data: null,
            //     defaultContent: "<button class='btn btn-success'>Make Payment</button><button class='btn btn-success'>Show Details</button>",
            // },
        ]
    });
    payYourDebtTable.column(0).visible(false);
    $('#pay-your-debt-table').on("click", function () {
        var nTr = this.parentNode;
        // var i = $.inArray( nTr, anOpen );

        console.log(nTr);
    });
}
