const input = document.getElementById("input");
const output = document.getElementById("output")
var intervalID = setInterval(convert, 100);


function convert() {
    const splitStr = input.value.split('');
    let converted = '';

    splitStr.forEach(str => {
        converted += morse[str.toLowerCase()] + " ";
    });

    output.innerHTML = converted;
}