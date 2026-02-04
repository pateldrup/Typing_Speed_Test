// DOM Elements
const textDisplay = document.querySelector('#textDisplay');
const typingArea = document.querySelector('#typingArea');
const timerDisplay = document.querySelector('#timer');
const wpmDisplay = document.querySelector('#wpm');
const accuracyDisplay = document.querySelector('#accuracy');
const bestWpmDisplay = document.querySelector('#bestWPM');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const timeBtn1 = document.querySelector('.timeBtn1');
const timeBtn2 = document.querySelector('.timeBtn2');
const timeBtn3 = document.querySelector('.timeBtn3');


// Test Text
const testTexts = [
    "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type faster",
    "Technology has revolutionized the way we commnicate and work in the modern digital era.",
    "Typing speed is an essential skill for anyone working with computers in today's worknlace."
]

// Game state
let currentText = "";
let timeLeft = 60;
let timeInterval = null;
let startTime = null;
let isTestActive = false;
let bestWPM = 0;
let timerInterval = null;
let wpm = 0;



function webLoad() {
    onLoad();
    displayContent();
}
function onLoad() {
    var temp = sessionStorage.getItem('previousWpm')
    startBtn.disabled = true;
    if (temp != null) {
        bestWPM = parseInt(temp);
    }
    else {
        bestWPM = 0;
    }
}
function displayContent() {
    timerDisplay.textContent = timeLeft;
    bestWpmDisplay.textContent = bestWPM;
}



function startGame() {
    timeBtn1.disabled = true;
    timeBtn2.disabled = true;
    timeBtn3.disabled = true;
    startBtn.disabled = true;
    currentText = testTexts[Math.floor(Math.random() * testTexts.length)];
    textDisplay.innerHTML = currentText;
    typingArea.disabled = false;
    typingArea.setAttribute('placeholder', "Now you can start your typing test...");
    typingArea.value = "";
    typingArea.focus();

    timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endGame();
        }
        displayContent();
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    typingArea.disabled = true;
    timeLeft = 60;
    if (wpm > bestWPM) {
        sessionStorage.setItem('previousWpm', wpm)
        bestWPM = wpm;
    }
    displayContent();
}

function updateStatus() {
    var typed = typingArea.value;
    var word = typed.trim().split(/\s+/).filter(w => w.length > 0);
    // we can ignore () and {} from arrow functio if there is only one line in the arrow function
    const elapsedTime = (Date.now() - startTime) / (60 * 1000);
    wpm = elapsedTime > 0 ? Math.round(word.length / elapsedTime) : 0;
    wpmDisplay.textContent = wpm;

    var currentScore = 0;
    for (let i = 0; i < currentText.length; i++) {
        if (currentText[i] == typed[i]) {
            currentScore++;
        }
    }
    const accuracy = (typed.length > 0) ? Math.floor(currentScore / typed.length * 100) : 0;
    accuracyDisplay.textContent = accuracy;

}

function wordType() {
    if (startTime == null) {
        startTime = Date.now();     // return time in millisecond
    }
    // console.log(startTime);
    updateStatus();
    highlight();
}

function resetSession() {
    bestWPM = 0;
    sessionStorage.clear();
    displayContent();
}

function highlight() {
    var typed = typingArea.value;
    var highlightText = "";

    for (let i = 0; i < currentText.length; i++) {
        if (i < typed.length) {
            if (currentText[i] == typed[i]) {
                highlightText += `<span class="correct">${currentText[i]}</span>`;

            }
            else {
                highlightText += `<span class="incorrect">${currentText[i]}</span>`;  
            }
        }
        else if (i == typed.length) {
            highlightText += `<span class="current">${currentText[i]}</span>`;
        }

        else {
            highlightText += currentText[i];
        }
    }
    textDisplay.innerHTML = highlightText;
}

webLoad();
startBtn.addEventListener('click', startGame);
typingArea.addEventListener('input', wordType);
// input will monitor whether user pressed any single key or not
resetBtn.addEventListener('click', resetSession);
timeBtn1.addEventListener('click',function(){
    timeLeft = 15;
    startBtn.disabled = false;
    displayContent();
})

timeBtn2.addEventListener('click',function(){
    timeLeft = 30;
    startBtn.disabled = false;
    displayContent();
})

timeBtn3.addEventListener('click',function(){
    timeLeft = 60;
    startBtn.disabled = false;
    displayContent();
})
//==============================================================
// // DOM Elements
// const textDisplay = document.querySelector('#textDisplay');
// const typingArea = document.querySelector('#typingArea');
// const timerDisplay = document.querySelector('#timer');
// const wpmDisplay = document.querySelector('#wpm');
// const accuracyDisplay = document.querySelector('#accuracy');
// const bestWpmDisplay = document.querySelector('#bestWPM');
// const startBtn = document.querySelector('#startBtn');
// const resetBtn = document.querySelector('#resetBtn');

// // Test Text
// const testTexts = [
//     "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type faster",
//     "Technology has revolutionized the way we commnicate and work in the modern digital era.",
//     "Typing speed is an essential skill for anyone working with computers in today's worknlace."
// ]

// // Game state
// let currentText = "";
// let timeLeft = 60;
// let timeInterval = null;
// let startTime = null;
// let isTestActive = false;
// let bestWPM = 0;
// let timerInterval = null;
// let wpm = 0;



// function webLoad() {
//     onLoad();
//     displayContent();
// }
// function onLoad() {
//     var temp = sessionStorage.getItem('previousWpm')
//     if (temp != null) {
//         bestWPM = parseInt(temp);
//     }
//     else {
//         bestWPM = 0;
//     }
// }
// function displayContent() {
//     timerDisplay.textContent = timeLeft;
//     bestWpmDisplay.textContent = bestWPM;
// }

// function startGame() {
//     timeLeft = 60;
//     startBtn.disabled = true;
//     currentText = testTexts[Math.floor(Math.random() * testTexts.length)];
//     textDisplay.innerHTML = currentText;
//     typingArea.disabled = false;
//     typingArea.setAttribute('placeholder', "Now you can start your typing test...");
//     typingArea.value = "";
//     typingArea.focus();

//     timerInterval = setInterval(function () {
//         timeLeft--;
//         if (timeLeft <= 0) {
//             endGame();
//         }
//         displayContent();
//     }, 1000);
// }

// function endGame() {
//     clearInterval(timerInterval);
//     startBtn.disabled = false;
//     typingArea.disabled = true;
//     timeLeft = 60;
//     if (wpm > bestWPM) {
//         sessionStorage.setItem('previousWpm', wpm)
//         bestWPM = wpm;
//     }
//     displayContent();
// }

// function updateStatus() {
//     var typed = typingArea.value;
//     var word = typed.trim().split(/\s+/).filter(w => w.length > 0);
//     // we can ignore () and {} from arrow functio if there is only one line in the arrow function
//     const elapsedTime = (Date.now() - startTime) / (60 * 1000);
//     wpm = elapsedTime > 0 ? Math.round(word.length / elapsedTime) : 0;
//     wpmDisplay.textContent = wpm;

//     var currentScore = 0;
//     for (let i = 0; i < currentText.length; i++) {
//         if (currentText[i] == typed[i]) {
//             currentScore++;
//         }
//     }
//     const accuracy = (typed.length > 0) ? Math.floor(currentScore / typed.length * 100) : 0;
//     accuracyDisplay.textContent = accuracy;

// }

// function wordType() {
//     if (startTime == null) {
//         startTime = Date.now();     // return time in millisecond
//     }
//     // console.log(startTime);
//     updateStatus();
//     highlight();
// }

// function resetSession() {
//     bestWPM = 0;
//     sessionStorage.clear();
//     displayContent();
// }

// function highlight() {
//     var typed = typingArea.value;
//     var highlightText = "";

//     for (let i = 0; i < currentText.length; i++) {
//         if (i <= typed.length) {
//             if (currentText[i] == typed[i]) {
//                 highlightText += `<span class="correct">${currentText[i]}</span>`;
                
//             }
//             else {
//                 highlightText += `<span class="incorrect">${currentText[i]}</span>`;
//             }
//         }
//         else{
//             highlightText += currentText[i];
//         }
//     }
//     textDisplay.innerHTML = highlightText;
// }

// webLoad();
// startBtn.addEventListener('click', startGame);
// typingArea.addEventListener('input', wordType);
// // input will monitor whether user pressed any single key or not

// resetBtn.addEventListener('click', resetSession);
