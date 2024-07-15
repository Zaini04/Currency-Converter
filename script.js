document.addEventListener('DOMContentLoaded', async function(){

    const form = document.getElementById('converter-form');
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const result = document.getElementById('result');


    const apiKey = '5503d12208b99f0b1111c6b4';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    try {
        const response = await fetch(apiUrl);
        const  data = await response.json();
        const currencies = Object.keys(data.conversion_rates);
        currencies.forEach(currency => {
            const optionFrom = new Option(currency,currency);
            const optionTo = new Option(currency,currency);
            fromCurrency.add(optionFrom);
            toCurrency.add(optionTo);

        });
        console.log(currencies);
    } catch (error) {
        console.error("fetching currency error",error);
    }

    form.addEventListener ('submit', async function (e) {

        e.preventDefault();

        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if(isNaN(amount)){
            alert("please enter a valid number");
        }
    
        const conversionApiUrl =  `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`;
        // const conversionApiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`;

    
        try {
            const response1 = await fetch(conversionApiUrl);
            const data1 = await response1.json();
            // console.log(data1);
            if(data1.result = 'succes'){
                const finalamount = (amount * data1.conversion_rate).toFixed(2);
                result.innerText = `${amount} ${from} = ${finalamount} ${to}`;
            }else{
                result.innerText = "fetching conversion error";
            }
        } catch (error) {
            console.error("fetching conversion rates error",error);
            result.innerText = "fetching conversion error";

    
        }
    });

   

});