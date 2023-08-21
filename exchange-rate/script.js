window.onload = function() {

    const currencyEl_one = document.getElementById('currencyOne');
    const amountEl_one = document.getElementById('amountOne');
    const currencyEl_two = document.getElementById('currencyTwo');
    const amountEl_two = document.getElementById('amountTwo');

    const rateEl = document.getElementById('rate');
    const swap = document.getElementById('swap');

    function calculate() {
        let currency_one;
        let currency_two;
        if (currencyEl_one) {
            currency_one = currencyEl_one.value;
        }
        if (currencyEl_two) {
            currency_two = currencyEl_two.value;
        }

        fetch(`https://api.exchangerate-api.com/v6/latest`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const rate = data.rates[currency_two] / data.rates[currency_one];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * (rate)).toFixed(2);
        })

    }

    // Event Listener
    if (currencyEl_one) {
        currencyEl_one.addEventListener('change', calculate);
    }

    if (amountEl_one) {
        amountEl_one.addEventListener('input', calculate);
    }

    if (currencyEl_two) {
        currencyEl_two.addEventListener('change', calculate);
    }

    if (amountEl_two) {
        amountEl_two.addEventListener('input', calculate);
    }


    if (swap) {
        swap.addEventListener('click', () => {
            const temp = currencyEl_one.value;
            currencyEl_one.value = currencyEl_two.value;
            currencyEl_two.value = temp;
            calculate();
        })
    }
  calculate();
}

