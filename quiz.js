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
      type: "trueFalse",
      options: ["True", "False"],
      correct: "True"
    },
    {
      text: "And how about this one: You must always stop for a pedestrian waiting at a zebra crossing, even if the light is green for vehicles.",
      type: "trueFalse",
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


let currentQuestionIndex = 0; // Start with the first question
const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');

function displayQuestion(index) {
    const question = questions[index];
    console.log(question);
    questionElement.textContent = question.text; // Set question text

    // Clear existing options
    optionsElement.innerHTML = '';

    // Add options dynamically
    question.options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => checkAnswer(option, question.correct));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedOption, correctAnswer) {
  // check if the selected answer is correct
    if (Array.isArray(correctAnswer)) {
        alert(correctAnswer.includes(selectedOption) ? "Correct!" : "Incorrect!");
    } else {
        alert(selectedOption === correctAnswer ? "yes Correct!" : "Incorrect!");
    }

    // move to the next question
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
      displayQuestion(currentQuestionIndex); // show the next question
    } else {
      alert("Quiz completed well done!");
      questionElement.textContent="Congratulations! You have finished the quiz.";
      optionsElement.innerHTML=" "; // clear options
    }
}

// Display the first question when the page loads
displayQuestion(currentQuestionIndex);
