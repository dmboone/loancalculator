// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// Calculate Results
function calculateResults(e){
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value); // turns imput into decimal; .value grabs what was put in the input field
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) *  12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    // Validate if a finite value
    if(isFinite(monthly)){ // then display results in fields
        monthlyPayment.value = monthly.toFixed(2); // toFixed set number of decimal points
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    }
    else {
        showError('Please check your numbers');
    }

    e.preventDefault(); // usually call this when the event listener is 'submit'
}

// Show Error
function showError(error){
    // Create a div
    const errorDiv = document.createElement('div'); // creates a new div element

    // Get elements
    const card = document.querySelector('.card'); // grabs card element from html
    const heading = document.querySelector('.heading'); // grabs heading element from html

    // Add class
    errorDiv.className = 'alert alert-danger'; // added bootstap classes to div element

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    //Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// Clear Error
function clearError(){
    document.querySelector('.alert').remove();
}