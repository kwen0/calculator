const display = document.querySelector("#display");
const digits = document.querySelectorAll(".button");
const operations = document.querySelectorAll(".op");
const equalButton = document.querySelector(".equal");
const backspace = document.querySelector(".bkspce");
const clear = document.querySelector(".clear");
let expression = [];

function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(a, operation, b) {
    switch(operation) {
        case "add":
            return add(a,b)
            break;
        case "subtract":
            return subtract(a,b)
            break;
        case "multiply":
            return multiply(a,b)
            break;
        case "divide":
            return divide(a,b)
            break;
    }
}

function getDisplayNumber() {
    expression.push(parseFloat(display.textContent));
}

function evalExpression() {
    result = operate(expression[0], expression[1], expression[2]);
    expression[0] = result;
    expression.splice(1,2);
    display.textContent = result;
}

function clearDisplay() {
    display.textContent = "";
}

digits.forEach(button => {button.addEventListener('click', function(e) {
    if (display.textContent.length < 9) {
        display.textContent += e.target.textContent;
    }
})
})

operations.forEach(operation => {
    operation.addEventListener('click', () => {
        getDisplayNumber();
        if (expression.length == 3) {
            evalExpression();
        }
        if (operation.classList.contains("add")) {
            expression.push("add");
        } else if (operation.classList.contains("subtract")) {
            expression.push("subtract");
        } else if (operation.classList.contains("multiply")) {
            expression.push("multiply");
        } else if (operation.classList.contains("divide")) {
            expression.push("divide");
        }
        clearDisplay();
    })
})

equalButton.addEventListener('click', () => {
    getDisplayNumber();
    if (expression[1] == "divide" && expression[2] == 0) {
        display.textContent = "Nope"
    } else {
        evalExpression();
        expression.splice(0, expression.length);
    }
})

backspace.addEventListener('click', () => {
    let newDisplay = display.textContent.slice(0, -1);
    display.textContent = newDisplay;
})

clear.addEventListener('click', () => {
    expression.splice(0, expression.length);
    clearDisplay();
})