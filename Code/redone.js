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

var qandA = [
    {
        questions: 'What is your favorite cheese?',
        answers: ["Pecorino Romano","Manchego", "Stiltons", "Brie", 
        ],
        solution: 0
    },
    {
        questions: 'What is your favorite color?',
        answers: ["Red", "Blue", "Green", "Yellow"
        ],
        solution: 1
    },
    {
        questions: 'What is your favorite movie?',
        answers: ["Cars 2", "Cars 2", "Cars 2", "Cars 2"],
        solution: 2

    },
    {
        questions: 'What is your favorite animal?',
        answers: ["Dog", "Platypus", "Manatee", "Dragon"
        ],
        solution: 3
    },
    {
        questions: 'When is my birthday?',
        answers: ["Today", "Tomorrow", "Overmorrow", "In a fortnight"
        ],
        solution: 1
    },
]


// ---------------------------Code START------------------------------------------
// List of Tasks:
// 1. Fix document.body to be wrapper
// 2. Store to local storage, stop timer, score = timeLeft



start.addEventListener("click", startgame);



function time() {

    var timeInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = timeLeft


        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            document.body.style.backgroundImage="url('./Images/jigsaw.jpg')";
            document.body.style.backgroundSize="cover"
            questionbox.style.display='none'
            highscore.style.display='none'
            box.style.display='none'

        }

        if (currentQIndex > qandA.length - 1)
            clearInterval(timeInterval)

    }, 1000);

}


function startgame() {
    welcome.textContent="It's Game Time"
    time();
    questionbox.classList.remove('hide');
    displayQuestionAnswer();
    start.style.display = "none"
}



// This function does not work
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

function clearButton() {
    answerCardHead.innerHTML = ""
    stage2.classList.remove('hide')
    questionCardHead.classList.add('hide')
    welcome.style.display="none"
    var x = document.querySelector(".score")
    x.textContent=timeLeft





};
answerCardHead.addEventListener('click', function (event) {
    console.log(parseInt(event.target.getAttribute("data-index")) === qandA[currentQIndex].solution)
    if (parseInt(event.target.getAttribute("data-index")) === qandA[currentQIndex].solution) {


        currentQIndex++
        displayQuestionAnswer();
        console.log("Correct")

    }




    else {
        timeLeft -= 5
        currentQIndex++
        displayQuestionAnswer();
        console.log("incorrect")
    }


})



// CODE FOR SCORE SECTION BEGINS
var submit = document.querySelector(".submit")
var initialForm = document.querySelector(".initialform")
var finalscorelist = document.querySelector('.finalscoreList')

var initials = JSON.parse(localStorage.getItem('score')) || []
// JSON.stringify



var list = document.createElement("div");


submit.addEventListener("click", function (scoreData) {
    // console.log(initialForm.value)
    var userScore = [
        {
            initials: initialForm.value,
            score: timeLeft
        },
    ]
    
   //var scoreIndex = []

    // userScore.push({initials: initialForm.value, score: timeLeft})
    localStorage.setItem('score', JSON.stringify(userScore))
    console.log(userScore)
    for (i = 0; i < userScore.length; i++) {
        var list = document.createElement("li");
        list.textContent = userScore[i].initials + ": " + userScore[i].score;
        list.setAttribute('score', i);
        finalscorelist.appendChild(list);
    }
        console.log(userScore)
    
        // congrats.textContent=localStorage.setItem('score', JSON.stringify(initials))
    
    
})