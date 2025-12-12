// Lesson Page JavaScript
// Interactive learning experience for Module 5

let currentQuestion = 1;
const totalQuestions = 5;
let earnedXP = 0;
let correctAnswers = 0;
let answeredQuestions = new Set();

document.addEventListener('DOMContentLoaded', function() {
    initializeLesson();
    setupEventListeners();
});

function initializeLesson() {
    // Set initial progress
    updateProgress();
    updateQuestionCounter();
    
    // Show first question
    showQuestion(1);
}

function setupEventListeners() {
    // Multiple choice answer options
    const answerOptions = document.querySelectorAll('.answer-option[data-correct]');
    answerOptions.forEach(option => {
        option.addEventListener('click', function() {
            if (answeredQuestions.has(currentQuestion)) return;
            
            const isCorrect = this.getAttribute('data-correct') === 'true';
            handleAnswer(this, isCorrect);
        });
    });
}

function showQuestion(questionNum) {
    // Hide all questions
    const allQuestions = document.querySelectorAll('.question-card');
    allQuestions.forEach(q => q.classList.remove('active'));
    
    // Show current question
    const currentQ = document.querySelector(`[data-question="${questionNum}"]`);
    if (currentQ) {
        currentQ.classList.add('active');
    }
    
    // Update progress
    updateProgress();
    updateQuestionCounter();
}

function handleAnswer(selectedOption, isCorrect) {
    if (answeredQuestions.has(currentQuestion)) return;
    
    answeredQuestions.add(currentQuestion);
    
    // Disable all options
    const allOptions = selectedOption.parentElement.querySelectorAll('.answer-option');
    allOptions.forEach(opt => {
        opt.classList.add('disabled');
        opt.style.pointerEvents = 'none';
    });
    
    // Mark selected option
    selectedOption.classList.add('selected');
    
    // Show correct/incorrect feedback
    if (isCorrect) {
        selectedOption.classList.add('correct-answer');
        correctAnswers++;
        earnedXP += 10;
        showFeedback(currentQuestion, true);
        updateXP();
        
        // Auto-advance after 1.5 seconds
        setTimeout(() => {
            nextQuestion();
        }, 1500);
    } else {
        selectedOption.classList.add('incorrect-answer');
        
        // Highlight correct answer
        const correctOption = selectedOption.parentElement.querySelector('.correct[data-correct="true"]');
        if (correctOption) {
            correctOption.classList.add('correct-answer');
        }
        
        showFeedback(currentQuestion, false);
        
        // Auto-advance after 2 seconds
        setTimeout(() => {
            nextQuestion();
        }, 2000);
    }
    
    // Update progress bar
    updateProgress();
}

function checkFillBlank(blankId, correctAnswer) {
    if (answeredQuestions.has(currentQuestion)) return;
    
    const input = document.getElementById(`blank${blankId}`);
    const userAnswer = input.value.trim().toLowerCase();
    const correct = correctAnswer.toLowerCase();
    
    if (userAnswer === '') {
        input.focus();
        return;
    }
    
    answeredQuestions.add(currentQuestion);
    
    if (userAnswer === correct) {
        input.classList.add('correct');
        input.disabled = true;
        correctAnswers++;
        earnedXP += 10;
        showFeedback(currentQuestion, true);
        updateXP();
        
        // Auto-advance
        setTimeout(() => {
            nextQuestion();
        }, 1500);
    } else {
        input.classList.add('incorrect');
        input.disabled = true;
        showFeedback(currentQuestion, false);
        
        // Show correct answer
        setTimeout(() => {
            input.value = correctAnswer;
            input.classList.remove('incorrect');
            input.classList.add('correct');
        }, 1000);
        
        // Auto-advance
        setTimeout(() => {
            nextQuestion();
        }, 2500);
    }
    
    updateProgress();
}

function showFeedback(questionNum, isCorrect) {
    const feedback = document.getElementById(`feedback${questionNum}`);
    if (!feedback) return;
    
    feedback.classList.add('show');
    
    if (isCorrect) {
        feedback.classList.add('correct');
        feedback.classList.remove('incorrect');
        feedback.innerHTML = '<i class="fas fa-check-circle"></i> Excellent! You got it right!';
    } else {
        feedback.classList.add('incorrect');
        feedback.classList.remove('correct');
        feedback.innerHTML = '<i class="fas fa-times-circle"></i> Not quite right. Keep trying!';
    }
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        // All questions completed
        showCompletionScreen();
    }
}

function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    const progressBar = document.getElementById('lessonProgress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

function updateQuestionCounter() {
    const currentQEl = document.getElementById('currentQuestion');
    const totalQEl = document.getElementById('totalQuestions');
    
    if (currentQEl) currentQEl.textContent = currentQuestion;
    if (totalQEl) totalQEl.textContent = totalQuestions;
}

function updateXP() {
    const xpEl = document.getElementById('earnedXP');
    if (xpEl) {
        xpEl.textContent = earnedXP;
    }
}

function showCompletionScreen() {
    const completionScreen = document.getElementById('completionScreen');
    const questionContainer = document.querySelector('.question-container');
    
    if (completionScreen && questionContainer) {
        questionContainer.style.display = 'none';
        completionScreen.style.display = 'flex';
        
        // Update completion stats
        const stats = completionScreen.querySelectorAll('.stat-item span');
        if (stats.length >= 3) {
            stats[0].textContent = `${correctAnswers}/${totalQuestions} Correct`;
            stats[1].textContent = `+${earnedXP} XP Earned`;
            stats[2].textContent = 'Streak +1';
        }
    }
}

// Make checkFillBlank available globally
window.checkFillBlank = checkFillBlank;

