const input = document.getElementById("input");

document.addEventListener("keydown", keyDown);

function keyDown(evt) {
    if (evt.keyCode == 13 && input.value != "") {
        window.location.href = "results.html?q=" + input.value;
    }
}