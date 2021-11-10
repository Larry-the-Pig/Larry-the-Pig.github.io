const input = document.getElementById("input");
const text = document.getElementById("sentence");
const correctSfx = new Audio('res/correct.ogg');
const incorrectSfx = new Audio('res/incorrect.ogg');
let sent = 1;
document.addEventListener("keydown", keyDown);

function generateSentence() {
    input.value = '';
    sent = Math.floor(Math.random() * sentences.length)
    text.innerHTML = sentences[sent].sentence;
}

function checkAnswer() {
    if (input.value.toLowerCase() == sentences[sent].answer) {
        text.style = "color: lime";
        correctSfx.play();
        setTimeout(() => {
            generateSentence();
            text.style = "color: white";
        }, 500);
    } else {
        input.value = '';
        text.style = "color: red";
        incorrectSfx.play();
        setTimeout(() => {
            text.style = "color: white";
        }, 500);
    }
}

function keyDown(evt) {
    if (evt.keyCode == 13) {
        checkAnswer()
    }
}

generateSentence();