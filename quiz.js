const questions = [
    
  {
      question: " Which document is mandatory to carry while driving?",
      type: "radio",
      options: ["Driving License", "Passport"],
      correctAnswers: ["Driving License"]
  },
  {
      question: "What should you never do while driving? (Pick all that apply)",
      type: "checkbox",
      options: [
        "Text your bestie",
        "Eat spaghetti",
        "Sing loudly with the windows down",
        "Drive with your eyes closed"
      ],
      correctAnswers: ["Text your bestie", "Eat spaghetti", "Drive with your eyes closed"]
  },
  {
      question: "What should you do if you hear a siren from an emergency vehicle?",
      type: "radio",
      options: ["Pull over and stop.", "Keep driving and maintain your speed."],
      correctAnswers: ["Pull over and stop."]
  },
  {
      question: "Before starting your car, you should always check your mirrors and adjust your seat.",
      type: "radio",
      options: ["True", "False"],
      correctAnswers: ["True"]
  },
  {
      question: "When is it OK to drive in the wrong lane?",
      type: "radio",
      options: [
        "When no one’s looking",
        "During a car chase in an action movie",
        "Never",
        "When your GPS says, 'Recalculating...'"
      ],
      correctAnswers: ["Never"]
  },
  {
      question: "You must always stop for a pedestrian waiting at a zebra crossing, even if the light is green for vehicles.",
      type: "radio",
      options: ["True", "False"],
      correctAnswers: ["False"]
  },
  {
      question: "What should you do if a cow is blocking the road?",
      type: "radio",
      options: [
        "Politely ask it to move",
        "Honk loudly",
        "Wait patiently",
        "Take a selfie for Instagram"
      ],
      correctAnswers: ["Wait patiently"]
  },
  {
      question: "What should you do when you see a yellow traffic light?",
      type: "radio",
      options: [
        "Stop immediately.",
        "Speed up before it turns red.",
        "Slow down and prepare to stop.",
        "Ignore it."
      ],
      correctAnswers: ["Slow down and prepare to stop."]
  },
  {
      question: "Which of these are mandatory car safety checks before driving? (Pick all that apply)",
      type: "checkbox",
      options: [
        "Tire pressure",
        "Functioning headlights",
        "Emergency brakes",
        "Car color"
      ],
      correctAnswers: ["Tire pressure", "Functioning headlights", "Emergency brakes"]
  },
  
  {
      question: "And finally: Think you know your speed limits? Give this one a shot! What is the maximum speed limit on highways in Sweden(unless otherwise posted)?",
      type: "radio",
      options: [
        "80 km/h",
        "100 km/h",
        "110 km/h",
        "120 km/h"
      ],
      correctAnswers: ["120 km/h"]
  }
  
];

// Select the elements
const quoteElement = document.querySelector('.quote');
const startButton = document.querySelector('.start-button');
const quizContainer = document.querySelector('#quiz-container');
const questionContainer = document.querySelector('.question');
const optionsContainer = document.querySelector('.options');
const questionCountElement = document.querySelector('.question-count');

const nextButton = document.querySelector('#next-btn');
const submitButton = document.querySelector('#submit-btn');


let currentQuestionIndex = 0;
const userAnswers = Array(questions.length).fill(null);

//hide submit button initially
submitButton.style.display = "none";

//hide quiz container initially
quizContainer.style.display = "none";

// Add an event listener to the "Rev the Engine!" button
startButton.addEventListener('click', () => {
// Hide the quote and start button
quoteElement.style.display = 'none';
startButton.style.display = 'none';

// Show the quiz container
quizContainer.style.display = 'flex';

// start quiz - Display the first question when the page loads
displayQuestion(currentQuestionIndex);

});

function displayQuestion(index) {
  //const questionContainer = document.getElementById("question-container");
  const question = questions[index];
  questionContainer.textContent = question.question; // Set question text

  // Clear existing options
  optionsContainer.innerHTML = '';
  
 

 //const optionsContainer = document.querySelector('.options');
 question.options.forEach((option, i) => {
  const div = document.createElement("div");
     div.classList.add("option-container");
     const inputType = question.type;
     const input = document.createElement("input");
     input.type = inputType;
     input.name = `question-${index}`;
     input.value = option;

     const label = document.createElement("label");
     label.textContent = option;

     // Preselect answers if already chosen
     if (userAnswers[index]?.includes(option)) {
         input.checked = true;
     }
    
     div.appendChild(input);
     div.appendChild(label);
    
     optionsContainer.appendChild(div);

     // Save the selected option
     input.addEventListener("change", () => {
         if (inputType === "radio") {
             userAnswers[index] = [input.value];
         } else if (inputType === "checkbox") {
             if (input.checked) {
                 userAnswers[index] = userAnswers[index] || [];
                 userAnswers[index].push(input.value);
             } else {
                 userAnswers[index] = userAnswers[index].filter(ans => ans !== input.value);
             }
         }
     });
 });

 //questionContainer.appendChild(optionsContainer);
 toggleNavigationButtons(index);
 updateQuestionCount(); //update the question counter.
}
// Function to update the question count
function updateQuestionCount() {
  questionCountElement.textContent = `${currentQuestionIndex + 1} of ${questions.length} Questions`;
}

function toggleNavigationButtons(index) {
 document.getElementById("prev-btn").style.display = index > 0 ? "inline-block" : "none";
 document.getElementById("next-btn").style.display = index < questions.length - 1 ? "inline-block" : "none";
 document.getElementById("submit-btn").style.display = index === questions.length - 1 ? "inline-block" : "none";
}

function saveAnswer(index) {
 const inputs = document.querySelectorAll(`[name="question-${index}"]`);
 const selected = Array.from(inputs)
     .filter(input => input.checked)
     .map(input => input.value);

 userAnswers[index] = selected.length > 0 ? selected : null;
}

function calculateResults() {
 let score = 0;
 const incorrectAnswers = [];

 questions.forEach((question, index) => {
     const correct = question.correctAnswers;
     const userSelected = userAnswers[index] || [];
     const isCorrect =
         question.type === "radio"
             ? correct.includes(userSelected[0])
             : correct.every(ans => userSelected.includes(ans)) &&
               userSelected.every(ans => correct.includes(ans));

     if (isCorrect) {
         score++;
     } else {
         incorrectAnswers.push({
             question: question.question,
             userSelected,
             correctAnswers: correct
         });
     }
 });

 displayResults(score, incorrectAnswers);
}

function displayResults(score, incorrectAnswers) {
 const resultContainer = document.getElementById("result-container");
 const percentage = (score / questions.length)*100;
 let resultText = "";
 let resultClass = "";

   // Determine performance level
   if (percentage < 50) {
      resultText = "🚨 Speed bump! Better luck next time on your driving adventure.";
      resultClass = "red";
  } else if (percentage >= 50 && percentage <= 75) {
      resultText = "⛽ Fuel pump: Halfway there! Refuel your knowledge and take another lap!";
      resultClass = "orange";
  } else {
      resultText = "🎉 Honk honk! Celebration ahead—you have nailed it! driving champion!";
      resultClass = "green";
  }
  // Display the score with performance level
 resultContainer.innerHTML = `<h2 class="${resultClass}">Your Score: ${score}/${questions.length} (${percentage}%)</h2>
 <p class="${resultClass}">${resultText}</p>
 `;

 //List incorrect answers
 if (incorrectAnswers.length) {
  
     const incorrectList = document.createElement("ul");
     incorrectAnswers.forEach(({ question, userSelected, correctAnswers }) => {
         const listItem = document.createElement("li");
         listItem.innerHTML = `
             <strong>${question}</strong><br>
             Your Answer: ${userSelected.join(", ") || "None"}<br>
             Correct Answer: ${correctAnswers.join(", ")}
         `;
         incorrectList.appendChild(listItem);
     });
     resultContainer.appendChild(incorrectList);
 }

 const restartButton = document.createElement("button");
 restartButton.classList.add("startOver");
 restartButton.textContent = "Start Over";
 restartButton.addEventListener("click", resetQuiz);
 resultContainer.appendChild(restartButton);

 resultContainer.style.display = "block";
 document.getElementById("quiz-container").style.display = "none";
}

function resetQuiz() {
 currentQuestionIndex = 0;
 userAnswers.fill(null);
 document.getElementById("result-container").style.display = "none";
 //document.getElementById("quiz-container").style.display = "block";
  document.querySelector('.quote').style.display = "block";
document.querySelector('.start-button').style.display = "block";
 //displayQuestion(currentQuestionIndex);
}

// Event Listeners
document.getElementById("prev-btn").addEventListener("click", () => {
 saveAnswer(currentQuestionIndex);
 currentQuestionIndex--;
 displayQuestion(currentQuestionIndex);
});

document.getElementById("next-btn").addEventListener("click", () => {
 saveAnswer(currentQuestionIndex);
 currentQuestionIndex++;
 displayQuestion(currentQuestionIndex);
});

document.getElementById("submit-btn").addEventListener("click", () => {
 saveAnswer(currentQuestionIndex);
 calculateResults();
});

// Start the Quiz
displayQuestion(currentQuestionIndex);






