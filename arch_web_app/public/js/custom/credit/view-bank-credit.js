alertify.set('notifier', 'position', 'top-right');
$(function () {
    $("#credit-nav")[0].click();
    $("#view-credit-expense-nav").css("color", "#FFFFFF");
    $("#start-date").datepicker({
        showButtonPanel: true,
        currentText: "Today:" + $.datepicker.formatDate('MM dd, yy', new Date()),
        maxDate: 0
    });
    $("#start-date").val(getOneMonthPreviosDate())
    $("#end-date").datepicker({
        showButtonPanel: true,
        currentText: "Today:" + $.datepicker.formatDate('MM dd, yy', new Date()),
        maxDate: 0
    }).datepicker('setDate', 'today');
    getCreditDetials();

    $("#start-date").on('change', () => {
        getCreditDetials();
    })
    $("#end-date").on('change', () => {
        getCreditDetials();
    })
});

function getCreditDetials() {
    let startDate = $("#start-date").val();
    let endDate = $("#end-date").val();
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
        alert("NOT POSSIBLE")
        return
    }
    $.ajax({
        type: "GET",
        "url": "/v1/credit/getCredit",
        "data": `startDate=${startDate}&endDate=${endDate}`,

        success: function (response) {
            if ($.fn.dataTable.isDataTable('#creditDetailsTable')) {
                let creditTable = $('#creditDetailsTable').DataTable();
                creditTable.clear().draw();
                creditTable.rows.add(response.data);
                creditTable.columns.adjust().draw();
            } else {
                insertCreditDetails(response.data);
            }

        },
        error: function (error) {
            alertify.error("Error occur", 3);
        },
    });
}

function insertCreditDetails(creditData) {
    let creditTable = $("#creditDetailsTable").DataTable({
        data: creditData,
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            {
                "title": "Bank",
            },
            {
                "title": "Amount",
            },
        ],
        responsive: false,
        destroy: true,
        retrieve: true,
        columnDefs: [
            {
                targets: 1,
                data: "BankName",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 2,
                data: "totalCredit",
                render: function (data) {
                    return data;
                },
            }
        ],
        order: [1, 'asc']

    });

    $("#creditDetailsTable").on('click', 'td.dt-control', function () {
        let tr = $(this).closest('tr');
        let row = creditTable.row(tr);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(creditDetails(row.data().BankID)).show();
            tr.addClass('shown');
            generateCreditDetails(row.data());
        }
    });
}

function generateCreditDetails(creditDetailsData) {
    let detailsCreditTable = $(`#credit-details-${creditDetailsData.BankID}`).DataTable({
        data: creditDetailsData.creditDetails,
        columns: [
            {
                "title": "Reason",
            },
            {
                "title": "Amount",
            },
            {
                "title": "Date",
            },
            {
                "title": "Note"
            }
        ],
        responsive: true,
        searching: false,
        paging: false,
        info: false,
        destroy: true,
        columnDefs: [
            {
                targets: 0,
                data: "Reason",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 1,
                data: "Amount",
                render: function (data) {
                    return data;
                },
            },
            {
                targets: 2,
                data: "Date",
                render: function (data) {
                    return convertDate(data);
                },
            },
            {
                targets: 3,
                data: "Notes",
                render: function (data) {
                    return data;
                },
            },
        ]
    });
}

function creditDetails(bankId) {
    return `
    <table id="credit-details-${bankId}" class="table display nowrap" style="width:100%">
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

function getOneMonthPreviosDate() {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    let previosDateSplit = date.toISOString().split('T')[0].split("-");
    return `${previosDateSplit[1]}/${previosDateSplit[2]}/${previosDateSplit[0]}`;
}

function convertDate(date) {
    let dateUTC = new Date(date);
    dateUTC = dateUTC.getTime()
    let dateIST = new Date(dateUTC);
    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);
    return dateIST.toDateString();
}