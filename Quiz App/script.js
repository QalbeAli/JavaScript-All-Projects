// const quizData = [
//     {
//         question:'Which of the following is not javascript data types?',
//         a: 'Null type',
//         b: 'Undefined type',
//         c: 'Number type',
//         d: 'All of the mentioned',
//         correct:'d',

//     },

//     {
//         question:'Which language runs in a web?',
//         a:'Java',
//         b:'C',
//         c:'Python',
//         d:'JavaScript',
//         correct:'d',
//     },

//     {
//         question:' Which of the following object is the main entry point to all client-side JavaScript features and APIs?',
//         a:'Position',
//         b:'Window',
//         c:'Standard',
//         d:'Location',
//         correct: 'a',
//     },

//     {
//         question:'What Does Css Stand For?',
//         a:'Central Style Sheets',
//         b:'Cascading Style Sheets',
//         c:'Cascading Simple Sheets',
//         d:'Casrs SUV Salibators',
//         correct:'b',
//     },
// ];


let quizData=[]
fetch("https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple")
.then(response => response.json())
.then(loadedQuestions => {loadedQuestions.results.map(loadedQuestion=>{
    console.log(loadedQuestion)
     quizData.push({
        question: loadedQuestion.question,
        a:loadedQuestion.incorrect_answers[0],
        b:loadedQuestion.incorrect_answers[1],
        c:loadedQuestion.incorrect_answers[2],
        d:loadedQuestion.correct_answer,
        correct:loadedQuestion.correct_answer 
        
    })
    })    

    loadQuiz()
})



const quiz = document.getElementById('quiz')
const answerEl = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')


let currentQuiz = 0;
let score = 0;


// loadQuiz()


function loadQuiz() {
    deSelectAnswer()
    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}
function deSelectAnswer() {
    answerEl.forEach(answerEl => answerEl.checked =false)
}


function getSelected() {

        let answer;
 
        answerEl.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id
        }
    })

    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    
    
    
    if(answer){

        if(answer === quizData[currentQuiz].correct){
            score++
        }

        currentQuiz++

        if(currentQuiz < quizData.length){
            loadQuiz();
        }else{
        quiz.innerHTML = `<h2>You Correctly Answered ${score} / ${quizData.length} questions</h2>

        <button onclick="location.reload()">Reload</button>`
        

    }
    }
})
