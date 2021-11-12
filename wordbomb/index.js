const vowels = ["a", "e", "i", "o", "u"];
const notVowels = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "s", "y", "z"];
const correctSfx = new Audio('res/correct.ogg');
const incorrectSfx = new Audio('res/incorrect.ogg');
const input = document.getElementById("input");
const phraseE = document.getElementById("phrase");
let phrase = '';
document.addEventListener("keydown", keyDown)

function generatePhrase() {
    let phraseTemp = "";
    if (Math.random() > 0.5) {
        phraseTemp += vowels[Math.floor(Math.random() * vowels.length)]
        phraseTemp += notVowels[Math.floor(Math.random() * vowels.length)]
    } else {
        phraseTemp += notVowels[Math.floor(Math.random() * vowels.length)]
        phraseTemp += vowels[Math.floor(Math.random() * vowels.length)]
    }

    phrase = phraseTemp;
}

function checkWord() {
    let isCorrect = false;
    words.forEach(word => {
        if (input.value.toLowerCase() == word && input.value.toLowerCase().includes(phrase)) isCorrect = true;
    });

    if (isCorrect) {
        input.value = '';
        phraseE.style = "color: lime";
        correctSfx.play();
        setTimeout(() => {
            setPhrase();
            phraseE.style = "color: white";
        }, 500);
    } else {
        input.value = '';
        phraseE.style = "color: red";
        incorrectSfx.play();
        setTimeout(() => {
            phraseE.style = "color: white";
        }, 500);
    }
}

function setPhrase() {
    generatePhrase();
    phraseE.innerHTML = phrase.toUpperCase();
}

function keyDown(evt) {
    if (evt.keyCode == 13) {
        checkWord();
    }
}

setPhrase();