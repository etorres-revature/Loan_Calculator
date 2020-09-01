//Listen for submit

$("#loan-form").on("submit", function () {
  event.preventDefault();
  //hide results
  $("#results").css("display", "none");

  //Show loader gif
  $("#loading").css("display", "block");

  setTimeout(calculateResults, 2500);
});

function calculateResults() {
  //Calculate Results
  console.log("Calculating...");

  //UI variables
  const amountEl = $("#amount");
  const interestEL = $("#interest");
  const yearsEL = $("#years");
  const monthlyPaymentEl = $("#monthly-payment");
  const totalPaymentEl = $("#total-payment");
  const totalInterestEl = $("#total-interest");

  const principal = parseFloat(amountEl.val());
  const calculatedInterest = parseFloat(interestEL.val()) / 100 / 12;
  const calculatedPayments = parseFloat(yearsEL.val()) * 12;

  //compute montly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPaymentEl.val(monthly.toFixed(2));
    totalPaymentEl.val((monthly * calculatedPayments).toFixed(2));
    totalInterestEl.val((monthly * calculatedPayments - principal).toFixed(2));
    //show results
    $("#results").css("display", "block");
    //hide calculating gif
    $("#loading").css("display", "none");
  } else {
    showError("Please check your numbers");
  }
}

function showError(error) {
  //hide results
  $("#results").css("display", "none");
  //hide calculating gif
  $("#loading").css("display", "none");
  //locate where to put the error message
  errorDiv = $(".card");
  //create error message
  errorDiv.prepend(`<div class='alert alert-danger'>${error}</div>`);
  //clear error message after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  $(".alert").remove();
}
