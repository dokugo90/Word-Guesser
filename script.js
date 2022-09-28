//Queries
const levelValue = document.querySelector("#select")
const hintText = document.querySelector(".hint")
const submit = document.querySelector(".btn")
const wordText = document.querySelector(".word-len")

const answer = document.querySelector(".result")
const popup = document.querySelector(".popup")
const resultBtn = document.querySelector(".resultBtn")
const score = document.querySelector(".score")
const wrongGuesses = document.querySelector("#wrongs")
const clearAll = document.querySelector(".clear")
const rank = document.querySelector(".rank")


// Words
const WordListOne = [
    {
        word: "school",
        hint: "Kids go there everyday"
    },
   {
        word: "tesla",
        hint: "Electric car company"
    },
    {
        word: "apple",
        hint: "Company named after a fruit"
    },
    {
        word: "bag",
        hint: "It holds stuff"
    },
    {
        word: "funny",
        hint: "It makes you laugh"
    },
    {
        word: "tablet",
        hint: "A very big phone"
    },
    {
        word: "pencil",
        hint: "It brings your thoughts to life"
    }
]

const WordListTwo = [
    {
        word: "whiteboard",
        hint: "People write on it"
    },
    {
         word: "atom",
         hint: "You can't see me without help"
    },
    {
        word: "mouse",
        hint: "It moves wherever your hand moves"
    }
]

const WordListThree = [
    {
        word: "mouse",
        hint: "You use it on computers"
    },
    {
        word: "keyboard",
        hint: "qwerty"
    },
    {
        word: "parents",
        hint: "Your\'e existence"
    },
    {
        word: "fishtank",
        hint: "A small home for a nemo"
    },
    {
        word: "nintendo",
        hint: "Super mario"
    },
    {
        word: "gravity",
        hint: "You cannot see me but I can move you"
    }
]    

class History {
    constructor(word) {
        this.word = word;
    }
}

let saved = '';
let counter = 0;
let ans = '';
let arr = [];
let savedHistory = JSON.parse(localStorage.getItem("savedHistory")) || [];


 function randomWord() {
    let randObj = WordListOne[Math.floor(Math.random() * WordListOne.length)];
    if (levelValue.value === 'Level: 1') {
        gameHints(randObj.hint, randObj.word.length)
        saved = randObj.word;
    }
    let randObjTwo = WordListTwo[Math.floor(Math.random() * WordListTwo.length)];
    if (levelValue.value === 'Level: 2') {
        gameHints(randObjTwo.hint, randObjTwo.word.length)
        saved = randObjTwo.word;
    }
    let randObjThree = WordListThree[Math.floor(Math.random() * WordListThree.length)];
    if (levelValue.value === 'Level: 3') {
        gameHints(randObjThree.hint)
        saved = randObjThree.word;
    }
 }

function gameHints(e, n = '') {
    hintText.textContent = `Hint: ${e}`
    wordText.textContent = `Length: ${n}`
}

function Validate() {
    const userInput = document.querySelector("#text")
    let userLower = userInput.value.toLowerCase()
    if (userLower === saved) {
        answer.textContent = 'Yay you\'re Correct!'
        counter ++;
        score.textContent = `Score: ${counter}`
        OpenModal()
        checkScore(counter)
    } else {
        if (userInput.value !== '') {
            arr.push(userInput.value)
            CheckArr()
            let userWord = new History(name);
            savedHistory.push(userWord)
            localStorage.setItem("savedHistory", JSON.stringify(savedHistory))
        const wrongGuess = document.createElement("p")
        const removeGuess = document.createElement("button")
        wrongGuess.textContent = userInput.value;
        removeGuess.textContent = '-'
        wrongGuess.classList.add("userGuess")
        removeGuess.classList.add("removeBtn")
        wrongGuesses.appendChild(wrongGuess)
        wrongGuesses.appendChild(removeGuess)
        clearAll.addEventListener("click", () => {
            wrongGuess.remove()
            removeGuess.remove()
        })
        removeGuess.addEventListener("click", () => {
            wrongGuess.remove()
            removeGuess.remove()
        })
    }
    }
}

function getHistory() {
    savedHistory.forEach(function (e) {
        const wrongGuess = document.createElement("p")
        const removeGuess = document.createElement("button")


        wrongGuess.textContent = e.word;
        wrongGuesses.appendChild(wrongGuess)
    })
}

function resetScreen() {
    randomWord()
    counter = 0;
    score.textContent = `Score: ${counter}`
}

function OpenModal() {
    popup.style.transform = 'scale(1)'
    hintText.style.filter = 'blur(10px)'
    wordText.style.filter = 'blur(10px)'
    levelValue.disabled = true;
}

function next() {
    popup.style.transform = 'scale(0)';
    hintText.style.filter = 'blur(0px)';
    wordText.style.filter = 'blur(0px)';
    levelValue.disabled = false;
    randomWord()
}

function checkScore(value) {
    if (value >= 35) {
        rank.textContent = `Skill: Genius`
    } else if (value >= 25) {
        rank.textContent = 'Skill: Master'
    } else if (value >= 15) {
        rank.textContent = 'Skill: Proficient'
    } else if (value >= 5) {
        rank.textContent = 'Skill: Amateur'
    } else {
        rank.textContent = 'Skill: Just starting'
    }
}

function CheckArr() {
    if (arr.length > 20) {
        rank.textContent = 'Skill: Beginner'
    }
}

submit.addEventListener("click", Validate)
resultBtn.addEventListener("click", next)
levelValue.addEventListener("change", resetScreen);
window.addEventListener("load", () => {
    randomWord()
    rank.textContent = 'Play to rank up'
    getHistory()
})