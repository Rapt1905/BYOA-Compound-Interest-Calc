function calculate() {
    // Get input values
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseFloat(document.getElementById('time').value);
    const compounds = parseFloat(document.getElementById('compounds').value);

    // Validate inputs
    if (!principal || !rate || !time || !compounds) {
        alert('Please fill in all fields with valid numbers');
        return;
    }

    // Calculate APY
    const apy = calculateAPY(rate, compounds);

    // Calculate APR (simple interest rate)
    const apr = rate;

    // Calculate final amount
    const amount = calculateCompoundInterest(principal, rate, time, compounds);

    // Calculate total interest earned
    const interestEarned = amount - principal;

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results</h3>
        <p><strong>Initial Principal:</strong> $${principal.toFixed(2)}</p>
        <p><strong>APR:</strong> ${apr.toFixed(2)}%</p>
        <p><strong>APY:</strong> ${apy.toFixed(2)}%</p>
        <p><strong>Final Amount:</strong> $${amount.toFixed(2)}</p>
        <p><strong>Total Interest Earned:</strong> $${interestEarned.toFixed(2)}</p>
    `;
    
    // Add animation class
    resultsDiv.classList.remove('show');
    // Force reflow
    void resultsDiv.offsetWidth;
    resultsDiv.classList.add('show');
}

function calculateAPY(rate, compounds) {
    // APY = (1 + r/n)^n - 1
    // where r is the interest rate (in decimal) and n is the number of compounds
    const r = rate / 100; // Convert percentage to decimal
    return ((Math.pow(1 + r/compounds, compounds) - 1) * 100);
}

function calculateCompoundInterest(principal, rate, time, compounds) {
    // A = P(1 + r/n)^(nt)
    // where:
    // A = Final amount
    // P = Principal
    // r = Annual interest rate (in decimal)
    // n = Number of times interest is compounded per year
    // t = Time in years
    const r = rate / 100; // Convert percentage to decimal
    return principal * Math.pow(1 + r/compounds, compounds * time);
} 