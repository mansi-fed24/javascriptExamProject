const questions = [
    {
      text: "Let's start with an easy one! Which document is mandatory to carry while driving?",
      type: "button",
      options: ["Driving License", "Passport"],
      correct: "Driving License"
    },
    {
      text: "I am feeling generous, so here's another simple question: What should you do if you hear a siren from an emergency vehicle?",
      type: "button",
      options: ["Pull over and stop.", "Keep driving and maintain your speed."],
      correct: "Pull over and stop."
    },
    {
      text: "Now we are warming up! Before starting your car, you should always check your mirrors and adjust your seat.",
      type: "button",
      options: ["True", "False"],
      correct: "True"
    },
    {
      text: "And how about this one: You must always stop for a pedestrian waiting at a zebra crossing, even if the light is green for vehicles.",
      type: "button",
      options: ["True", "False"],
      correct: "False"
    },
    {
      text: "OK. No more easy questions! What should you do if a cow is blocking the road?",
      type: "radio",
      options: [
        "Politely ask it to move",
        "Honk loudly",
        "Wait patiently",
        "Take a selfie for Instagram"
      ],
      correct: "Wait patiently"
    },
    {
      text: "When is it OK to drive in the wrong lane?",
      type: "radio",
      options: [
        "When no one’s looking",
        "During a car chase in an action movie",
        "Never",
        "When your GPS says, 'Recalculating...'"
      ],
      correct: "Never"
    },
    {
      text: "What should you do when you see a yellow traffic light?",
      type: "radio",
      options: [
        "Stop immediately.",
        "Speed up before it turns red.",
        "Slow down and prepare to stop.",
        "Ignore it."
      ],
      correct: "Slow down and prepare to stop."
    },
    {
      text: "Which of these are mandatory car safety checks before driving? (Pick all that apply)",
      type: "checkbox",
      options: [
        "Tire pressure",
        "Functioning headlights",
        "Emergency brakes",
        "Car color"
      ],
      correct: ["Tire pressure", "Functioning headlights", "Emergency brakes"]
    },
    {
      text: "What should you never do while driving? (Pick all that apply)",
      type: "checkbox",
      options: [
        "Text your bestie",
        "Eat spaghetti",
        "Sing loudly with the windows down",
        "Drive with your eyes closed"
      ],
      correct: ["Text your bestie", "Eat spaghetti", "Drive with your eyes closed"]
    },
    {
      text: "And finally: Think you know your speed limits? Give this one a shot! What is the maximum speed limit on highways in Sweden(unless otherwise posted)?",
      type: "radio",      
      options: [
        "80 km/h",
        "100 km/h",
        "110 km/h",
        "120 km/h"
      ],
      correct: "120 km/h"
    }
  ];
  // Select the elements
const quoteElement = document.querySelector('.quote');
const startButton = document.querySelector('.start-button');
const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const questionCountElement = document.querySelector('.question-count');
const timerElement = document.querySelector('.time-left');
const nextButton = document.querySelector('.next-btn');
const submitButton = document.querySelector('.submit-btn');

let currentQuestionIndex = 0; // Start with the first question
let timerInterval; // For controlling the timer.
let score = 0;

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
  startTimer(20);
});

  // function to display the question
   function displayQuestion(index) {
   
    const question = questions[index];
    questionElement.textContent = question.text; // Set question text

    // Clear existing options
    optionsElement.innerHTML = '';

    // Add options dynamically based on the type 
    if(question.type === "button"){
    question.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add('option');

        button.addEventListener('click', () => {
        // step1 remove "selected" class from all the buttons
        const allButtons = optionsElement.querySelectorAll(".option");
        allButtons.forEach(btn => btn.classList.remove("selected"));
        // step2 add "selected" class to the clicked button
        button.classList.add("selected");
        // step3 check the answer
        checkAnswer(option, question.correct);
      });
        optionsElement.appendChild(button);
    });
  }else if(question.type === "radio"){
    question.options.forEach((option, index) => {
      const div = document.createElement("div");
      div.classList.add("option-container");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question`;
      input.value = option;
      input.id = `option-${index}`;

      const label = document.createElement("label");
      label.htmlFor = `option-${index}`;
      label.textContent = option;

      input.addEventListener("click", () => {
      // Remove 'selected' class from all option containers
      const allOptions = optionsElement.querySelectorAll('.option-container');
      allOptions.forEach((container) => container.classList.remove('selected'));

      // Add 'selected' class to the parent container of the selected radio
      div.classList.add('selected');

      // Check the answer
      checkAnswer(option, question.correct)
    });

      div.appendChild(input);
      div.appendChild(label);
      optionsElement.appendChild(div);

    });
  } else if (question.type === "checkbox"){
    question.options.forEach((option, index) => {
      const div = document.createElement("div");
      div.classList.add("option-container");

      const input = document.createElement("input");
      input.type ="checkbox";
      input.value = option;
      input.id = `option-${index}`;

      const label = document.createElement("label");
      label.htmlFor =`option-${index}`;
      label.textContent = option;

      input.addEventListener("change", () =>{
        if (input.checked) {
          // Add 'selected' class if checkbox is checked
          div.classList.add("selected");
      } else {
          // Remove 'selected' class if checkbox is unchecked
          div.classList.remove("selected");
      }

          // collect selected options for checkboxes
        const selectedOptions = Array.from(
          optionsElement.querySelectorAll("input[type='checkbox']:checked"))
          .map((checkbox) => checkbox.value);
          checkAnswer(selectedOptions, question.correct);
          
        
      });
        div.appendChild(input);
         div.appendChild(label);
         optionsElement.appendChild(div);
    });
  }

    updateQuestionCount(); //update the question counter.
  }
  
// Function to update the question count
function updateQuestionCount() {
  questionCountElement.textContent = `${currentQuestionIndex + 1} of ${questions.length} Questions`;
}

// Timer function
function startTimer(duration) {
  let timeLeft = duration;
  timerElement.textContent = `${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval); // Stop the timer.
      moveToNextQuestion(); // Automatically move to the next question.
    }
  }, 1000);
}

// Function to stop the timer (useful when moving to the next question manually)
function stopTimer() {
  clearInterval(timerInterval);
}

function checkAnswer(selectedOption, correctAnswer) {
  // Determine if the selected answer is correct
  console.log("selected option:", selectedOption);
  console.log("correct answer:", correctAnswer);
  let isCorrect;
  if (Array.isArray(correctAnswer)) {
    isCorrect = correctAnswer.includes(selectedOption); // true or false
  } else {
    isCorrect = selectedOption === correctAnswer; // true or false
  }

  // Increment score and provide feedback
  if (isCorrect) {
    score++; // Increment the score for correct answers
   
  } 
}


    // function to move to the next question
    function moveToNextQuestion(){
      stopTimer(); // stop the timer for the current question

      if(currentQuestionIndex < questions.length - 2){
      currentQuestionIndex++; // move to the next question
    
      displayQuestion(currentQuestionIndex); // show the next question
      startTimer(20); // restart the timer for the new question
    } else if (currentQuestionIndex === questions.length - 2) {
      // for the secondlast question
      currentQuestionIndex++; // move to the last question
      displayQuestion(currentQuestionIndex); // show the last question
      startTimer(20); // restart the timer for the last question
      
      nextButton.style.display = "none";// hide the next button
      submitButton.style.display = "inline-block"; // show the submit button
      
     // questionElement.textContent="Congratulations! You have finished the quiz.";
      // optionsElement.innerHTML=" "; // clear options
      
      // timerElement.textContent=""; // clear the timer
    }
  }
  //Event listener for the NEXT button
nextButton.addEventListener("click", () => {
  moveToNextQuestion();
});
  
  //Event listerner for the SUBMIT button
  submitButton.addEventListener("click", () => {
    stopTimer(); // stop the timer
    showQuizSummary(); //show the quiz summary
  });

  // function will calculate the users score and display completion msg
  function showQuizSummary(){
    // calculate the total score (all calculations done in checkAnswer function)
    quizContainer.innerHTML = `
    <div class ="quiz-summary">
      <h2> Quiz Completed! </h2>
      <p> Your Score: ${score} out of ${questions.length}</p>
      </div>
      `;
  }





