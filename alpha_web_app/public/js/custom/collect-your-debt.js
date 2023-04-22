alertify.set('notifier', 'position', 'top-right');
$(function () {
    getMoneyOweData();
});

function getMoneyOweData() {
    $.ajax({
        type: "GET",
        url: "/v1/credit/getMoneyOwe",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            console.log(response.data);
            generateCollectYourDebt(response.data);
            // resetExpenseForm()

            alertify.success('Information fetched.', 3);
        },
        error: function (error) {
            // console.log(error);
            alertify.error('Error while fetching the data!!', 3);
        },
    });
}

function generateCollectYourDebt(oweData) {
    let collectYourDebtTable = $("#collect-your-debt-table").DataTable({
        data: oweData,
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            {
                "title": "personId",
            },
            {
                "title": "Lend To",
            },
            {
                "title": "Total Amount",
            },
            {
                "title": "Already Received",
            },
            {
                "title": "Full Payment",
            },
        ],
        responsive: false,
        columnDefs: [
            {
                targets: 1,
                data: "personId",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 2,
                data: "LendTo",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 3,
                data: "totalAmount",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            {
                targets: 4,
                data: "alreadyReceived",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            {
                targets: 5,
                data: null,
                defaultContent: `<button type="button" class="btn btn-outline-success btn-sm">Clear Debt</button>`
            },
        ],
        order: [1, 'asc']
    });
    collectYourDebtTable.column(1).visible(false);

    $('#collect-your-debt-table tbody').on('click', 'td.dt-control', function () {
        // console.log("HIT")
        let tr = $(this).closest('tr');
        let row = collectYourDebtTable.row(tr);
        // GlobalPRow = row;
        // GlobalPData = row.data();
        if (row.child.isShown()) {
            // This row is already open - close it
            // console.log("HIT")
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(generateOweDetailsTable(row.data().personId)).show();
            tr.addClass('shown');
            generateOweDetailsDatatable(row.data());
        }
    })
}

function generateOweDetailsDatatable(detailsObj) {
    console.log(detailsObj.OweDetails)
    let detailsTable = $(`#oweDetails-${detailsObj.personId}`).DataTable({
        data: detailsObj.OweDetails,
        columns: [
            {
                "title": "transacationId",
            },
            {
                "title": "lendId",
            },
            {
                "title": "bankID",
            },
            {
                "title": "Amount",
            },
            {
                "title": "Received",
            },
            {
                "title": "Update Info",
            },
            {
                "title": "Lend On",
            },
            {
                "title": "Debited From",
            },
        ],
        searching: false,
        paging: false,
        info: false,
        responsive: true,
        columnDefs: [
            {
                targets: 0,
                data: "transacationId",
                render: function (data) {
                    // console.log(data)
                    return data;
                },

            },
            {
                targets: 1,
                data: "lendId",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            {
                targets: 2,
                data: "bankId",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            {
                targets: 3,
                data: "amount",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            {
                targets: 4,
                data: "alreadyReceived",
                render: function (data) {
                    // console.log(data)
                    return data;
                },
            },
            {
                targets: 5,
                data: null,
                defaultContent: `<button type="button" class="btn btn-outline-success btn-sm">Update</button>`
            },
            {

                targets: 6,
                data: "date",
                render: function (data) {
                    return convertDate(data);
                },
            },
            {

                targets: 7,
                data: "bankName",
                render: function (data) {
                    return data;
                },
            },
        ]
    });

    detailsTable.column(0).visible(false);
    detailsTable.column(1).visible(false);
    detailsTable.column(2).visible(false);
}

function generateOweDetailsTable(id) {
    return `
    <table id="oweDetails-${id}" class="table display nowrap" style="width:100%">
        <thead>
            <tr>

            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
    </div>
    `
}

function convertDate(date) {
    let dateUTC = new Date(date);
    dateUTC = dateUTC.getTime()
    let dateIST = new Date(dateUTC);
    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);
    // console.log(dateIST.toDateString())
    return dateIST.toDateString();
}