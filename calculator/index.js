let display = document.querySelector("#display");
let equal = document.querySelector(".equal");
let clearBtn = document.querySelector(".clear");
let buttons = document.querySelectorAll("button:not(.equal):not(.clear)");

let holdTimeout;

let updateClearLabel = () => {
    clearBtn.textContent = display.value ? "del" : "C";
}


let appendToDisplay = (value) => {
    display.value += value;
    updateClearLabel();
}

let calculate = () => {
    display.value = eval(display.value);
    updateClearLabel();
}

let clear = () => {
    holdTimeout = setTimeout(() => {
        display.value = "";
        updateClearLabel();
    }, 700);
}

let backspace = () => {
    display.value = display.value.slice(0, -1);
    updateScroll();
    updateClearLabel();
}

buttons.forEach((button) => {
    button.addEventListener('click', () => appendToDisplay(button.textContent));
})

equal.addEventListener('click', calculate);
clearBtn.addEventListener('click', backspace);
clearBtn.addEventListener('mousedown', clear);
clearBtn.addEventListener('mouseup', () => clearTimeout(holdTimeout));