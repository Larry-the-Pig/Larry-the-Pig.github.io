const form = document.querySelector("form");
const header = document.getElementById("sentence");
const correctSfx = new Audio('res/correct.ogg');
const incorrectSfx = new Audio('res/incorrect.ogg');

let currentSent = 0;
let currentSkill = 1;

function generateSentence(skill) {
    currentSent = Math.floor(Math.random() * skills[skill].length)

    header.textContent = skills[skill][currentSent].sentence + " (Current Skill: " + currentSkill + ")";
}

function checkAnswer(input) {
    if (input == skills[currentSkill][currentSent].answer) {
        //sets text to green and generates a new sentence
        correct()
    } else {
        //flashes red and plays the incorrect sound effect
        incorrect()
    }
}

function correct() {
    header.style.color = "lime";
    correctSfx.play();
    setTimeout(() => {
        currentSkill++;
        if (currentSkill > 3) currentSkill = 3;
        generateSentence(currentSkill);
        header.style.color = "white";
    }, 500);
}

function incorrect() {
    header.style.color = "red";
    incorrectSfx.play();
    setTimeout(() => {
        currentSkill--;
        if (currentSkill < 1) currentSkill = 1;
        generateSentence(currentSkill);
        header.style.color = "white";
    }, 500);
}

form.onsubmit = function(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    checkAnswer(formData.get('type'))
}

generateSentence(currentSkill);
