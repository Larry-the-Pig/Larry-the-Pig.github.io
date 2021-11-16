const input = document.getElementById("input");
const output = document.getElementById("output");

document.addEventListener("keydown", keyDown);

function txt2Num(number) {
    const numArray = number.toLowerCase().replace(/[^a-zA-Z0-9]/g, '').split('');
    let converted = "";
    
    numArray.forEach(num => {
        if (num >= '0' && num <= '9') {
            converted+=num;
        } else {
            converted+=numbers[num];
        }
    });

    return `(${converted.substring(0, 3)})-${converted.substring(3, 6)}-${converted.substring(6, 10)}`;
}

function keyDown(evt) {
    if (evt.keyCode == 13 && input.value != "") {
        output.innerHTML = txt2Num(input.value);
    }
}