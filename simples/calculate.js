"use strict"

let values = [""];
let abort = false;
let isEquals = false;
let isDark = false;

function numEnter(num) {
    if (!values[values.length - 1] || isEquals) {
        isEquals = false;
        values[values.length - 1] = num;
        display();
    } else {
        values[values.length - 1] = (values[values.length - 1] * 10) + num;
        display();
    }
}

function display() {
    if (typeof values[values.length - 1] === "number") {
        document.getElementById("result").innerHTML = values.map(item => getNumDisplay(item)).join(" ");    
    } else {
        document.getElementById("result").innerHTML = values.join(" ");
    }
}

function getNumDisplay(num) {
    if (typeof num !== "number") {return num}
    let conste = Math.abs([num].slice()[0]);
    let reverst = false;
    if (num < 0) {reverst = true}
    if (!Number.isInteger(num)) {
        let fraction = "." + conste.toString().split(".")[1]
        let resolve = conste.toString().split(".")[0].split("").reverse();
        let result = [];
        for (let i = 3; resolve.length; i--) {
            if (i === 0) {
                i += 3;
                result.unshift(",");
            }
        result.unshift(resolve.shift());
        }
        if (reverst) {result.unshift("-")}
        return result.join("") + fraction;
    }
    let resolve = conste.toString().split("").reverse();
    let result = [];
    for (let i = 3; resolve.length; i--) {
        if (i === 0) {
            i += 3;
            result.unshift(",");
        }
        result.unshift(resolve.shift());
    }
    if (reverst) {result.unshift("-")}
    return result.join("")
}

function getNumber(numstr) {
    if (typeof numstr !== 'string') {return numstr}
    return Number(numstr.slice(0).split(",").join(""));
}

function operator(op) {
    values[values.length - 1] = getNumDisplay(values[values.length - 1]);
    if (!values[values.length - 1] && typeof values[values.length - 2] === "string") {
        switch(op) {
            case "+": values[values.length - 2] = "+"; break;
            case "-": values[values.length - 2] = "-"; break;
            case "x": values[values.length - 2] = "x"; break;
            case "/": values[values.length - 2] = "/"; break;
        }    
    } else {
        switch(op) {
            case "+": values.push("+"); break;
            case "-": values.push("-"); break;
            case "x": values.push("x"); break;
            case "/": values.push("/"); break;
        }
        values.push("");
    }
    display();
}

function equals() {
    if (values[values.length - 1] === "") {values.splice(-2, 2)}
    if (values.length === 1) {
        display();
        return
    }
    let resolve = values.filter((item, index) => !(index % 2)).map(item => getNumber(item));
    let operates = values.filter((item, index) => index % 2);
    if (operates.includes("/") || operates.includes("x")) {
        for (let i = 0; i < operates.length; i++) {
            if (operates[i] === 'x') {
                if (resolve[i + 1] === 0) {
                    resolve.splice(i, 2, 0);
                    operates.splice(i, 1);
                    i--;
                    continue
                }
                let operate = resolve.splice(i, 2);
                operate = operate[0] * operate[1];
                resolve.splice(i, 0, operate);
                operates.splice(i, 1);
                i--;
            }
            if (operates[i] === '/') {
                if (resolve[i + 1] === 0) {abort = true}
                let operate = resolve.splice(i, 2);
                operate = operate[0] / operate[1];
                resolve.splice(i, 0, operate);
                operates.splice(i, 1);
                i--;
            }
        }
    }
    for (let i = 0; i < operates.length; i++) {
        if (operates[i] === '+') {
            let operate = resolve.splice(i, 2);
            operate = operate[0] + operate[1]
            resolve.splice(i, 0, operate);
            operates.splice(i, 1);
            i--;
        }
        if (operates[i] === '-') {
            let operate = resolve.splice(i, 2);
            operate = operate[0] - operate[1];
            resolve.splice(i, 0, operate);
            operates.splice(i, 1);
            i--;
        }
    }
    if (!operates.length) {
        values = resolve.slice();
        display();
        checkAbort();
        isEquals = true;
    }
}

function checkAbort() {
    if (abort) {
        abort = false;
        values = [""];
        document.getElementById("result").innerHTML = "&infin;";
    }
}

function backspace() {
    if (isEquals) {
        isEquals = false;
        values = [""];
        display();
        return
    }
    if (values[values.length - 1] === "" && values.length > 1) {
        values.splice(-2, 2)
        values[values.length - 1] = getNumber(values[values.length - 1]);
    } else {
        values[values.length - 1] = Math.floor(values[values.length - 1] / 10) || "";
    }
    display();
}

function cleare() {
    values = [""];
    isEquals = false;
    display();
}

function darkmode() {
    if (!isDark) {
        for (let i = 0; i < 17; i++) {
            document.getElementsByClassName("button")[i].classList.add("darkmode");
            document.getElementsByClassName("button")[i].classList.add("darkbutton");
        }
        document.getElementsByClassName("result")[0].classList.add("darkmode");
        document.getElementsByClassName("title")[0].classList.add("darkmode");
        document.getElementsByClassName("body")[0].classList.add("darkbackground");
        isDark = true;
    } else {
        for (let i = 0; i < 17; i++) {
            document.getElementsByClassName("button")[i].classList.remove("darkmode");
            document.getElementsByClassName("button")[i].classList.remove("darkbutton");
        }
        document.getElementsByClassName("result")[0].classList.remove("darkmode");
        document.getElementsByClassName("title")[0].classList.remove("darkmode");
        document.getElementsByClassName("body")[0].classList.remove("darkbackground");
        isDark = false;
    }
}
