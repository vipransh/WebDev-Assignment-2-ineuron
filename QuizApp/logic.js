let questions=[
    {
        que: "what is 2*2?",
        options: ["Two","Three","Six","Four"],
        correctAnswer: "Four",
    },
    {
        que: "what is 2+1?",
        options: ["Two","Three","Six","Four"],
        correctAnswer: "Three",
    },
    {
        que: "what is 6-2?",
        options: ["Two","Three","Six","Four"],
        correctAnswer: "Four",
    }
]

let currentQuestion = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let quizContainer=document.getElementById("quizContainer");



// load quiz function
function loadQuiz(){
    let data=questions[currentQuestion];
    let options=data.options.map((op)=>(`<option>${op}</option>`))
    quizContainer.innerHTML=`
    <h2 id="question">Q-${currentQuestion+1+" "}${data.que}</h2>
            <select class="text-black w-full py-1"  id="myDropdown">
              ${options}  
            </select>
            <button class="bg-[#51E1ED] px-3 py-1 w-full" onclick="validate()">Submit</button>
    `
}

// validate user's answer
function validate(){
    const dropdown = document.getElementById("myDropdown");
    const selectedValue = dropdown.value;
    const ansDiv=document.getElementById("ansDiv");
    if(selectedValue===questions[currentQuestion].correctAnswer){
        ansDiv.innerHTML=`<div class="bg-[#00D84A] px-2 py-1">Status:Correct Answer</div>`
        correctAnswers++;
    }
    else{
        ansDiv.innerHTML=`<div class="bg-[#E21717] px-2 py-1">Status:Wrong Answer</div>`
        incorrectAnswers++;
    }

    if(currentQuestion<questions.length-1){
        setTimeout(()=>{
            ansDiv.innerHTML=""
            currentQuestion++;
            loadQuiz();
        }, 2000);
    }else{
        setTimeout(()=>{
            ansDiv.innerHTML=""
            showResults();
        }, 2000);
    }
}

// show final result
function showResults(){

    let res
    if(correctAnswers>=Math.floor(questions.length/2)){
        res="Pass"
    }
    else{
        res="Fail"
    }
    quizContainer.innerHTML=""
    quizContainer.innerHTML=`
    <div class="w-full bg-[#51E1ED] py-1 rounded-xl text-black text-center">Score</div>
    <h1>Total Right Questions: ${correctAnswers}</h1>
    <h1>Total Wrong Questions: ${incorrectAnswers}</h1>
    <div class="border border-white py-1 w-full text-center">Final Result: ${res}</div>
    `
}

loadQuiz();

