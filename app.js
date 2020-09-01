//Listen for submit

$("#loan-form").on("submit", function calculateResults() {
  //Calculate Results
  event.preventDefault();
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
  } else {
    showError("Please check your numbers");
  }
});

function showError(error) {

    //locate where to put the error message
    errorDiv = $(".card")
    //create error message
    errorDiv.prepend(`<div class='alert alert-danger'>${error}</div>`)
    //clear error message after 3 seconds
    setTimeout(clearError, 3000)
}

function clearError() {
    $(".alert").remove();
}
