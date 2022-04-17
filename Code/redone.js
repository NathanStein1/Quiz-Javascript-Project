var timer = document.querySelector(".timer")
var start = document.querySelector("#startButton")
var questionbox = document.querySelector("#questionbox")
var questionCardHead = document.querySelector(".questionClass")
var answerCardHead = document.querySelector(".button-blocks")
var btn1 = document.querySelector("#btn1")
var btn2 = document.querySelector("#btn2")
var btn3 = document.querySelector("#btn3")
var btn4 = document.querySelector("#btn4")
var target = btn1, btn2, btn3, btn4
var currentQIndex = 0;
var timeLeft = 60;
var score = timeLeft
var scoreData = localStorage.getItem('score')
var stage2 = document.querySelector(".scorearea")
var congrats = document.querySelector('.pg2banner')
var welcome = document.querySelector('.Welcome')
var x = document.querySelector(".score")
var highscore = document.querySelector('.highscorelink')
var box = document.querySelector('.timebox')
 
// This sets up my questions and allows me to assign values in the array
var qandA = [
    {
        questions: 'What is a boolean value?',
        answers: ["True", "Bracket", "console.log", "===",
        ],
        solution: 0
    },
    {
        questions: 'What is an example of a string?',
        answers: ["'red'", "red", "var red", "123"
        ],
        solution: 0
    },
    {
        questions: 'What does == mean?',
        answers: ["Equals", "Equivelent to", "Strictly Equals", "Move to-"],
        solution: 1

    },
    {
        questions: 'What is an example of a method(think arrays)?',
        answers: ["Bim", "Bam", "Bop", "Pop"
        ],
        solution: 3
    },
    {
        questions: 'In git, what should you use to add a comment to a commit?',
        answers: ["Code: 7", "Code: 12", "-m", "::hover"
        ],
        solution: 2
    },
]


// The game begins here-

// Run game
start.addEventListener("click", startgame);

// Run timer
var timeInterval;

function time() {

    timeInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = timeLeft


        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            congrats.textContent="You might want to try that again..."


        }

        if (currentQIndex > qandA.length - 1) {
            clearInterval(timeInterval)
        }



    }, 1000);

}

function startgame() {
    welcome.textContent = "It's Game Time"
    time();
    questionbox.classList.remove('hide');
    displayQuestionAnswer();
    start.style.display = "none"
}



// Fill out buttons and add info from array
function displayQuestionAnswer() {
    console.log(currentQIndex)

    if (currentQIndex > qandA.length - 1) {

        return clearButton()
    }
    var question = qandA[currentQIndex]
    questionCardHead.textContent = question.questions
    buttonArray = []
    answerCardHead.innerHTML = ""


    for (i = 0; i < qandA[currentQIndex].answers.length; i++) {
        var button = document.createElement("button")
        button.textContent = qandA[currentQIndex].answers[i]
        button.setAttribute("data-index", i)

        buttonArray.push(button)
        console.log(buttonArray[i])
        answerCardHead.appendChild(buttonArray[i])
    }



};

// Move to next stage, add initials and clear qandA
function clearButton() {
    answerCardHead.innerHTML = ""
    stage2.classList.remove('hide')
    questionbox.classList.add('hide')
    welcome.style.display = "none"
    var x = document.querySelector(".score")
    x.textContent = timeLeft
    clearInterval(timeInterval)





};

// Lets user know if they were right or wrong, sets up game rules
var right = document.body.querySelector('.right')

answerCardHead.addEventListener('click', function (event) {
    console.log(parseInt(event.target.getAttribute("data-index")) === qandA[currentQIndex].solution)
    if (parseInt(event.target.getAttribute("data-index")) === qandA[currentQIndex].solution) {


        currentQIndex++
        displayQuestionAnswer();
        console.log("Correct")
        right.textContent = "Good. Now don't get cocky..."

    }




    else {
        timeLeft -= 15
        currentQIndex++
        displayQuestionAnswer();
        console.log("incorrect")
        right.textContent = "Uh-oh...tick tock tick tock :)"
    }




})



// CODE FOR SCORE SECTION BEGINS
var submit = document.querySelector(".submit")
var initialForm = document.querySelector(".initialform")
var finalscorelist = document.querySelector('.finalscoreList')
var initials = JSON.parse(localStorage.getItem('score')) || []
var replay = document.body.querySelector(".replay")
var list = document.createElement("div");

submit.addEventListener("click", function (scoreData) {
    var userScore = [
        {
            initials: initialForm.value,
            score: timeLeft
        },
    ]

    var data = JSON.parse(localStorage.getItem("score")) || [];

    localStorage.setItem('score', JSON.stringify([...data, ...userScore]))
    for (i = 0; i < userScore.length; i++) {
        var list = document.createElement("li");
        list.textContent = userScore[i].initials + ": " + userScore[i].score;
        list.setAttribute('score', i);
        finalscorelist.appendChild(list);
    }

})

// Reset the game and play again
function reset() {
    startgame();
    timeLeft = 60
    start.style.display = "flex"
    stage2.classList.add('hide')
    currentQIndex = 0

}


replay.addEventListener("click", reset);

// Add time values to scoresheet
highscore.addEventListener('click', function () {
    var group = document.querySelector(".highscoregroup")
    var data = JSON.parse(localStorage.getItem("score")) || [];

    var template = '';
    data.forEach((datum) => {
        template += `
            <li>
                ${datum.initials} : ${datum.score}
            </li>
        `;
    });

    group.innerHTML = template;
})


var clear = document.body.querySelector(".clear")

// Clear away old scores
function cleanHigh() {
    localStorage.clear()
    finalscorelist.textContent = ""
}
clear.addEventListener('click', cleanHigh)