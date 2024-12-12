# javascriptExamProject
this is my examination project in Javascript1 module in frontend developer course . making a Driving quiz
1. Starting Point: User Interaction Begins
•	What happens first?
o	The program begins when the user clicks the "Start Quiz" button.
o	An event listener (startButton.addEventListener) is attached to the button. When clicked:
	The introductory quote and button are hidden.
	The quiz container becomes visible.
	The first question is displayed by calling displayQuestion(currentQuestionIndex).
2. Displaying Questions: displayQuestion Function
•	Purpose: Dynamically displays the current question and its options based on the currentQuestionIndex.
•	Flow:
o	Takes the question data (questions [index]) and displays the question text.
o	Clears the options container and generates the input fields (radio or checkbox) and labels the question options.
o	Dynamically creates and appends these elements into the DOM using JavaScript.
o	Attaches an event listener to each input to track user answers.
________________________________________
3. Tracking User Answers
o	When the user selects an option, the input event listener updates the userAnswers array.
o	For radio buttons, the selected option replaces the previous one.
o	For checkboxes, selected options are added or removed from an array.
________________________________________
4. Navigation: Buttons for Moving Through Questions
•	Buttons:
o	Next Button: Advances to the next question.
	Saves the current answer using saveAnswer(currentQuestionIndex).
	Increments currentQuestionIndex and displays the next question.
o	Previous Button: Goes back to the previous question.
	Similar flow but decrements currentQuestionIndex.
o	Submit Button: Appears on the last question and allows the user to submit their answers.
•	Control Logic:
o	toggleNavigationButtons(index) ensures only relevant buttons are shown based on the question's position (first, middle, or last).
________________________________________
5. Calculating Results: calculate Results
•	When does this function run?
o	It executes when the user clicks "Submit".
•	Flow:
o	Compares the user's answers (userAnswers) with the correct answers for each question.
o	Determines the score by checking if answers match exactly.
o	Records incorrect answers for later display.
o	Calls displayResults(score, incorrectAnswers).
________________________________________
6. Displaying Results: displayResults
•	Purpose: Shows the user’s score, feedback based on performance, and a list of incorrect answers.
•	Flow:
o	Calculates the percentage score and assigns a feedback message with styling (green, orange, red).
o	Displays a list of questions the user got wrong, showing their incorrect answers and the correct ones.
o	Adds a "Start Over" button that resets the quiz using resetQuiz.
________________________________________
7. Resetting the Quiz: resetQuiz
•	Purpose: Restarts the quiz from the beginning.
•	Flow:
o	Resets currentQuestionIndex to 0 and clears userAnswers.
o	Hides the results and shows the start button and quote again.
________________________________________
8. Other Features
•	Dark Mode Toggle:
o	A button toggles between light and dark themes for the quiz.
o	Updates the text and styles dynamically based on the current mode.
________________________________________
9. Overall Flow
1.	Start Quiz: User clicks "Start Quiz," and the first question is displayed.
2.	Answer Questions: User selects answers and navigates using Next/Previous buttons.
3.	Submit Quiz: On the last question, the user clicks "Submit" to see results.
4.	View Results: The app displays the score, incorrect answers, and feedback.
5.	Restart Quiz: The user can click "Start Over" to reset and play again.

Functions
1.	Number of functions: I have 9 main functions and several small event listeners.
2.	Purpose of each function:
o	displayQuestion(index): Dynamically displays the question and options on the screen based on the index provided.
o	updateQuestionCount(): Updates the question counter (e.g., "1 of 10 Questions").
o	toggleNavigationButtons(index): Toggles the visibility of navigation buttons (Prev, Next, Submit) based on the current question.
o	saveAnswer(index): Saves the user’s selected answer for the current question.
o	calculateResults(): Compares user answers with correct answers, calculates the score, and identifies incorrect answers.
o	displayResults(score, incorrectAnswers): Displays the user's results, including their score, performance message, and incorrect answers.
o	resetQuiz(): Resets the quiz to its initial state for a fresh attempt.
o	Event Listeners:
	startButton.addEventListener("click", ...): Starts the quiz by displaying the first question.
	prevButton.addEventListener("click", ...): Moves to the previous question.
	nextButton.addEventListener("click", ...): Moves to the next question.
	submitButton.addEventListener("click", ...): Submits the quiz and calculates results.
	toggleThemeButton.addEventListener("click", ...): Toggles the theme between dark and light modes.
________________________________________
Variables
1.	Total variables: I have 12 key variables and additional local variables inside functions.
2.	Key variables:
o	Global variables:
	questions: Stores all quiz questions, types, options, and correct answers.
	quoteElement, startButton, quizContainer, etc.: DOM elements selected using document.querySelector.
	currentQuestionIndex: Tracks which question the user is currently viewing.
	userAnswers: An array initialized to null for storing the user’s answers.
o	Local variables (inside functions):
	question: The current question object (inside displayQuestion).
	score: The total number of correct answers (inside calculateResults).
	percentage: The user’s performance percentage (inside displayResults).
