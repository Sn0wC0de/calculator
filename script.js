const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// calculate values 
const calculate = {
    '/': (firstNumber,secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber,secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber,secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber,secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber,secondNumber) => secondNumber,

}

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;


function sendNumberValue(number) {
    // replace current dispaly value if first value is entered 
    if(awaitingNextValue) {
        calculatorDisplay.textContent =  number;
        awaitingNextValue = false
    } else {
        // if current display value is 0, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue ==='0' ? number: displayValue + number;
    }
    
}

function addDecimal() {
    // if operator pressed, dont add decimal
    if(awaitingNextValue) return;
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}




function useOperator(operator) { 
    const currentValue = Number(calculatorDisplay.textContent);
    // prevent multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return
    };
    // assign first value if no value
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // ready for the next value operator
    awaitingNextValue = true;
    operatorValue = operator;
 
}


//  reset display

function resetALl() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0'
}

// event listeners

inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))

    }else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal())

    }
});

clearBtn.addEventListener('click', resetALl)