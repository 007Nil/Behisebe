$('#expense_date').datepicker();

$("#expense_form").submit(function(event){
    event.preventDefault();
    let bank_name = $("#bank_name").val();
    let amount = $("#amount").val();
    let date = $("#expense_date").val();

    if (bank_name === "Open this select menu"){
        alert("Need a value")
        return
    }
    

    
  });