// $(document).ready(function() {
// Click on Settings href and set Bank setting color white
// console.log("HIT");
$("#settings_id")[0].click();
$("#bank_settings_id").css("color", "#FFFFFF");
alertify.set('notifier', 'position', 'top-right');


// });

$("#add_bank_details").on("click", () => {
  $("#add_bank_details").css("color", "#FFFFFF");
  $("#add_bank_details").css("background-color", "#90ee90");
  //
  $("#edit_bank_details").css("color", "#000000");
  $("#edit_bank_details").css("background-color", "#FFFFFF");

  fillDynamicDiv(createAddBankDetailsForm);

  $("#bankAccountType").select2({
    placeholder: "Select an Account Type",
    // allowClear: true,
    // tags: [],
    ajax: {
      url: "/v1/bank/getAccountTypes",
      type: "GET",
      dataType: 'json',
      delay: 250,
      data: function (params) {
        // console.log(params.term)
        return {
          searchTerm: params.term
        };
      },
      processResults: function (response) {
        console.log(response)
        return {
          results: $.map(response, function (item) {
            return {
              text: item.AccountType,
              id: item.ID
            }
          })
        };
      },
      cache: true
    }
    // theme: "bootstrap"
  });

  // Add bank details form submit
  $("#add_bank_details_btn").submit(function (event) {
    event.preventDefault();
    let date = new Date();
    let currentDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    // console.log(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`);
    // return;
    let jsonObj = {
      "bankName": $("#new_bank_name").val(),
      "bankBalance": $("#total_amount").val(),
      "bankAccountType": $('#bankAccountType').select2('data')[0].id,
      "notes": $("#notes").val(),
      "borrowFrom": null,
      "date": currentDate
    };
    // console.log($('#bankAccountType').select2('data')[0].id)
    // return;

    // console.log(jsonObj);
    $.ajax({
      type: "POST",
      url: "/v1/bank/addDetails",
      data: JSON.stringify(jsonObj),
      contentType: "application/json; charset=utf-8",
      dataType: "json",

      success: function (response) {
        // console.log(response);
        resetAddBankForm()
        alertify.success('Bank information saved.', 3);
      },
      error: function (error) {
        console.log(error)
        // console.log(error);
        // console.log("Error");
        alertify.error('Error while saving the data!!', 3);
      },
    });
  });
});

$("#edit_bank_details").on("click", () => {
  $("#edit_bank_details").css("color", "#FFFFFF");
  $("#edit_bank_details").css("background-color", "#90ee90");
  // Remove css from add_bank_details
  $("#add_bank_details").css("color", "#000000");
  $("#add_bank_details").css("background-color", "#FFFFFF");

  fillDynamicDiv(createBankDetailsTable);
  getBankDetails();
});

// ------ Functions ------------------//

function resetAddBankForm() {
  $("#new_bank_name").val("");
  $("#total_amount").val("");
  $("#bankAccountType").empty().trigger('change')
  $("#notes").val("");
}

function fillDynamicDiv(functionName) {
  $("#dynamic_bank_content").html("");
  if (!$.trim($("#dynamic_bank_content").html()).length) {
    $("#dynamic_bank_content").append(functionName());
  }
}

function createAddBankDetailsForm() {
  return `
      <form id="add_bank_details_btn">
        <div class="mb-3">
            <label for="new_bank_name" class="form-label">Bank Name</label>
            <input type="text" class="form-control" id="new_bank_name" required>
        </div>
        <div class="mb-3">
            <label for="total_amount" class="form-label">Total Amount In Account</label>
            <input type="number" class="form-control" id="total_amount" required>
        </div>
        <div class="mb-3">
        <label for="bankAccountType" class="form-label">Account Type</label>
          <select id="bankAccountType" class="form-control" required>
            
          </select>
        </div>
        <div class="mb-3">
            <label for="notes" class="form-label">Notes</label>
            <input type="text" id="notes" class="form-control">
        </div>
        <button class="btn btn-primary">Add Bank</button>
      </form>
    `;
}
// Call a rest API and add those data to database
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

function createBankDetailsTable() {
  return `
      <table id="bankDetailsTable" class="display nowrap" style="width:100%">
        <thead>
            <tr>


            </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
  `
}

function insertBankData(bankDetailsObj) {
  let tabel = $("#bankDetailsTable").DataTable({
    data: bankDetailsObj,
    columns: [
      {
        "title": "id",
      },
      {
        "title": "Name",
      },
      {
        "title": "Type",
      },
      {
        "title": "Ammount",
      },
      {
        "title": "Notes",
      }
    ],
    rowReorder: {
      selector: 'td:nth-child(2)'
    },
    responsive: true,
    columnDefs: [
      {
        targets: 0,
        data: "BankID",
        render: function (data) {
          // console.log(data)
          return data;
        },
      },
      {
        targets: 1,
        data: "BankName",
        render: function (data) {
          return data;
        },
      },
      {
        targets: 2,
        data: "AccountType",
        render: function (data) {
          return data;
        },
      },
      {
        targets: 3,
        data: "bankBalance",
        render: function (data, type, full, meta) {
          return data;
        },
      },
      {
        targets: 4,
        data: "Notes",
        render: function (data, type, full, meta) {
          return data;
        },
      }
    ]
  });

  tabel.column(0).visible(false);
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