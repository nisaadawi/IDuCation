// Lesson Page JavaScript
// Interactive learning experience - dynamically loads from modules.js

let currentQuestion = 1;
let totalQuestions = 5;
let earnedXP = 0;
let correctAnswers = 0;
let answeredQuestions = new Set();
let currentModule = null;
let moduleQuestions = [];

document.addEventListener('DOMContentLoaded', function() {
    // Try to load module from URL or sessionStorage
    loadModuleData();
    initializeLesson();
    setupEventListeners();
});

function loadModuleData() {
    if (typeof KSSRModules === 'undefined') {
        console.warn('KSSRModules not loaded');
        // Use default/hardcoded lesson
        return;
    }

    // Get module ID from URL or sessionStorage
    const urlParams = new URLSearchParams(window.location.search);
    const moduleId = urlParams.get('module') || sessionStorage.getItem('currentModuleId');
    
    if (moduleId && KSSRModules.getModuleById(moduleId)) {
        currentModule = KSSRModules.getModuleById(moduleId);
        moduleQuestions = currentModule.questions || [];
        totalQuestions = moduleQuestions.length;
        
        // Render module questions dynamically
        renderModuleQuestions();
    } else {
        // Fallback to default lesson structure
        console.log('Using default lesson structure');
    }
}

function renderModuleQuestions() {
    if (!currentModule || !moduleQuestions.length) return;
    
    const questionContainer = document.querySelector('.question-container');
    if (!questionContainer) return;
    
    questionContainer.innerHTML = '';
    
    moduleQuestions.forEach((q, index) => {
        const questionNum = index + 1;
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        questionCard.setAttribute('data-question', questionNum);
        if (questionNum === 1) questionCard.classList.add('active');
        
        let questionHTML = `
            <div class="question-header">
                <div class="question-number">Question ${questionNum} of ${totalQuestions}</div>
                <div class="question-type">
                    <i class="fas fa-${getQuestionTypeIcon(q.type)}"></i>
                    ${getQuestionTypeLabel(q.type)}
                </div>
            </div>
        `;
        
        // Add story if exists
        if (currentModule.story) {
            questionHTML += `
                <div class="story-box">
                    <div class="story-icon">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <div class="story-content">
                        <h3>${currentModule.story.split('\n')[0]}</h3>
                        <p>${currentModule.story.split('\n').slice(1).join(' ')}</p>
                    </div>
                </div>
            `;
        }
        
        // Add question image if exists
        if (q.image) {
            questionHTML += `
                <div class="question-image-container">
                    <img src="${q.image}" alt="Question image" class="question-image" onerror="this.style.display='none'">
                </div>
            `;
        }
        
        questionHTML += `
            <div class="question-text">
                <h3>${q.question}</h3>
            </div>
        `;
        
        // Generate question content based on type
        if (q.type === 'multiple-choice') {
            let optionsHTML = '<div class="answer-options">';
            const optionLetters = ['A', 'B', 'C', 'D'];
            q.options.forEach((opt, optIdx) => {
                const isCorrect = opt.correct ? 'correct' : '';
                optionsHTML += `
                    <button class="answer-option ${isCorrect}" data-correct="${opt.correct}" data-option="${optIdx}">
                        <div class="option-icon">${optionLetters[optIdx]}</div>
                        <div class="option-text">${opt.text}</div>
                        <i class="fas fa-check-circle check-icon"></i>
                    </button>
                `;
            });
            optionsHTML += '</div>';
            questionHTML += optionsHTML;
        } else if (q.type === 'fill-blank') {
            questionHTML += `
                <div class="fill-blank-question">
                    ${q.question.replace('____', `<span class="blank-input-container">
                        <input type="text" class="blank-input" id="blank${questionNum}" placeholder="?" maxlength="20">
                    </span>`)}
                </div>
                <div class="answer-hint">
                    <i class="fas fa-lightbulb"></i>
                    <span>Type your answer in the blank</span>
                </div>
                <button class="submit-answer-btn" onclick="checkFillBlank(${questionNum}, '${q.correctAnswer}')">
                    <i class="fas fa-check"></i>
                    Check Answer
                </button>
            `;
        } else if (q.type === 'true-false') {
            questionHTML += `
                <div class="answer-options true-false">
                    <button class="answer-option true-option ${q.correctAnswer ? 'correct' : ''}" 
                            data-correct="${q.correctAnswer}" data-option="true">
                        <div class="option-icon"><i class="fas fa-check"></i></div>
                        <div class="option-text">True</div>
                        <i class="fas fa-check-circle check-icon"></i>
                    </button>
                    <button class="answer-option false-option ${!q.correctAnswer ? 'correct' : ''}" 
                            data-correct="${!q.correctAnswer}" data-option="false">
                        <div class="option-icon"><i class="fas fa-times"></i></div>
                        <div class="option-text">False</div>
                        <i class="fas fa-check-circle check-icon"></i>
                    </button>
                </div>
            `;
        }
        
        questionHTML += `<div class="feedback-message" id="feedback${questionNum}"></div>`;
        
        questionCard.innerHTML = questionHTML;
        questionContainer.appendChild(questionCard);
    });
}

function getQuestionTypeIcon(type) {
    const icons = {
        'multiple-choice': 'question-circle',
        'fill-blank': 'edit',
        'true-false': 'check-square',
        'story': 'book-reader'
    };
    return icons[type] || 'question-circle';
}

function getQuestionTypeLabel(type) {
    const labels = {
        'multiple-choice': 'Multiple Choice',
        'fill-blank': 'Complete the Sentence',
        'true-false': 'True or False',
        'story': 'Read the Story'
    };
    return labels[type] || 'Question';
}

function initializeLesson() {
    // Set initial progress
    updateProgress();
    updateQuestionCounter();
    
    // Show first question
    showQuestion(1);
}

function setupEventListeners() {
    // Use event delegation for dynamically loaded questions
    document.addEventListener('click', function(e) {
        const answerOption = e.target.closest('.answer-option[data-correct]');
        if (answerOption && !answerOption.classList.contains('disabled')) {
            if (answeredQuestions.has(currentQuestion)) return;
            
            const isCorrect = answerOption.getAttribute('data-correct') === 'true';
            handleAnswer(answerOption, isCorrect);
        }
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
    
    // Calculate XP per question
    const questionXP = currentModule ? Math.round(currentModule.xpReward / totalQuestions) : 10;
    
    // Show correct/incorrect feedback
    if (isCorrect) {
        selectedOption.classList.add('correct-answer');
        correctAnswers++;
        earnedXP += questionXP;
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
    if (!input) return;
    
    const userAnswer = input.value.trim().toLowerCase();
    const correct = correctAnswer.toLowerCase();
    
    if (userAnswer === '') {
        input.focus();
        return;
    }
    
    answeredQuestions.add(currentQuestion);
    
    // Calculate XP per question
    const questionXP = currentModule ? Math.round(currentModule.xpReward / totalQuestions) : 10;
    
    if (userAnswer === correct) {
        input.classList.add('correct');
        input.disabled = true;
        correctAnswers++;
        earnedXP += questionXP;
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
    
    // Get explanation from module if available
    let explanation = '';
    if (currentModule && moduleQuestions[questionNum - 1]) {
        const question = moduleQuestions[questionNum - 1];
        explanation = isCorrect ? question.explanation : question.explanation;
    }
    
    if (isCorrect) {
        feedback.classList.add('correct');
        feedback.classList.remove('incorrect');
        feedback.innerHTML = `<i class="fas fa-check-circle"></i> Excellent! ${explanation || 'You got it right!'}`;
    } else {
        feedback.classList.add('incorrect');
        feedback.classList.remove('correct');
        feedback.innerHTML = `<i class="fas fa-times-circle"></i> Not quite right. ${explanation || 'Keep trying!'}`;
    }
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
        
        // Use SimpleFaceRecognition to ensure camera is active during lesson
        if (window.simpleFaceRecognition && 
            !window.simpleFaceRecognition.isCameraActive && 
            !window.simpleFaceRecognition.isLessonCompleted) {
            window.simpleFaceRecognition.startCamera();
        }
    } else {
        // All questions completed
        showCompletionScreen();
        
        // Stop camera when lesson ends
        if (window.simpleFaceRecognition) {
            window.simpleFaceRecognition.isLessonCompleted = true;
            window.simpleFaceRecognition.stopCamera();
        }
        
        // Dispatch lesson completed event
        const event = new Event('lessonCompleted');
        document.dispatchEvent(event);
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
        
       // Calculate XP based on module
        const moduleXP = currentModule ? currentModule.xpReward : 50;
        const finalXP = Math.round((correctAnswers / totalQuestions) * moduleXP);
        
        // Update completion stats
        const stats = completionScreen.querySelectorAll('.stat-item span');
        if (stats.length >= 3) {
            stats[0].textContent = `${correctAnswers}/${totalQuestions} Correct`;
            stats[1].textContent = `+${finalXP} XP Earned`;
            stats[2].textContent = 'Streak +1';
        }
        
        // Update module title if exists
        const completionMessage = completionScreen.querySelector('.completion-message');
        if (completionMessage && currentModule) {
            completionMessage.textContent = `You completed ${currentModule.title}!`;
        }
        
        // Save progress to localStorage
        if (currentModule) {
            saveModuleProgress(finalXP);
        }
                
        // Stop camera when lesson ends
        if (window.simpleFaceRecognition) {
            window.simpleFaceRecognition.stopCamera();
        }
        
        // Dispatch event for face recognition system
        const event = new Event('lessonCompleted');
        document.dispatchEvent(event);
    }
}

function saveModuleProgress(xpEarned) {
    if (!currentModule || typeof KSSRModules === 'undefined') return;
    
    const isCompleted = correctAnswers === totalQuestions;
    const progress = {
        completed: isCompleted,
        questionsAnswered: totalQuestions,
        correctAnswers: correctAnswers,
        xpEarned: xpEarned,
        lastAttempt: new Date().toISOString()
    };
    
    KSSRModules.saveModuleProgress(currentModule.id, progress);
    
    // Update total XP in header
    const totalXP = KSSRModules.getTotalXP();
    const xpValue = document.querySelector('.xp-value');
    if (xpValue) {
        xpValue.textContent = totalXP.toLocaleString();
    }
}

// Make checkFillBlank available globally
window.checkFillBlank = checkFillBlank;