// Student Dashboard JavaScript
// Simple, intuitive interactions for rural students

document.addEventListener('DOMContentLoaded', function() {
    // Animate progress bar on load
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        setTimeout(() => {
            progressFill.style.transition = 'width 1s ease';
        }, 300);
    }

    // Action button interactions with visual feedback
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Handle different button actions
            const buttonText = this.querySelector('span').textContent;
            
            if (buttonText.includes('Daftar Masuk')) {
                // Track/Check-in functionality
                handleCheckIn();
            } else if (buttonText.includes('Mula Belajar')) {
                // Navigate to learning modules
                window.location.href = 'learn.html';
            } else if (buttonText.includes('Lihat Hadiah')) {
                // Navigate to rewards
                window.location.href = 'rewards.html';
            }
        });
    });

    // Quick action buttons
    const quickActionButtons = document.querySelectorAll('.quick-action-btn');
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const actionText = this.querySelector('span').textContent;
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Handle navigation (placeholder - implement actual navigation)
            console.log('Action:', actionText);
        });
    });

    // Profile avatar click
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar) {
        profileAvatar.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
    }

    // Sidebar toggle functionality (Mobile)
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarNav = document.getElementById('sidebarNav');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebarToggle && sidebarNav) {
        sidebarToggle.addEventListener('click', function() {
            sidebarNav.classList.toggle('active');
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle('active');
            }
        });

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', function() {
                sidebarNav.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            });
        }
    }

    // Sidebar navigation active state
    const currentPage = window.location.pathname.split('/').pop();
    const sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');
    sidebarNavItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.includes(currentPage)) {
            item.classList.add('active');
        }
    });
});

// Check-in functionality
function handleCheckIn() {
    // Show simple feedback
    const trackStatus = document.querySelector('.track-status');
    if (trackStatus) {
        trackStatus.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>Memproses...</span>
        `;
        
        // Simulate check-in process
        setTimeout(() => {
            trackStatus.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Berjaya Daftar Masuk!</span>
            `;
            trackStatus.style.background = 'var(--light-green)';
            trackStatus.style.color = 'var(--green)';
        }, 1500);
    }
}

// Lesson Path Functions
function startLesson(lessonId) {
    if (typeof KSSRModules === 'undefined') {
        showNotification('Loading modules...', 'info');
        return;
    }
    
    // Map lesson IDs to actual module IDs
    // Based on unlocked modules: math_001, eng_001, bm_001, sci_001
    const moduleMap = {
        'start': 'math_001',  // First unlocked module
        '1': 'math_001',
        '2': 'eng_001',
        '3': 'eng_001',  // English Basics
        '4': 'bm_001',
        '5': 'sci_001'
    };
    
    const moduleId = moduleMap[lessonId] || moduleMap['start'];
    const module = KSSRModules.getModuleById(moduleId);
    
    if (module) {
        startModuleLesson(moduleId);
    } else {
        showNotification('Module not found', 'info');
    }
}

function reviewLesson(lessonId) {
    if (typeof KSSRModules === 'undefined') {
        showNotification('Loading modules...', 'info');
        return;
    }
    
    // Map lesson IDs to actual module IDs for review
    const moduleMap = {
        '1': 'math_001',
        '2': 'eng_001',
        '3': 'eng_001',
        '4': 'bm_001',
        '5': 'sci_001'
    };
    
    const moduleId = moduleMap[lessonId] || 'math_001';
    const module = KSSRModules.getModuleById(moduleId);
    
    if (module) {
        startModuleLesson(moduleId);
    } else {
        showNotification('Module not found', 'info');
    }
}

// Simple notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--green)' : 'var(--blue)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== MODULE SYSTEM INTEGRATION ====================
// Load modules dynamically from modules.js

let currentSubjectFilter = 'all';
let allVisibleModules = [];

function loadModulesIntoPage(subjectFilter = 'all') {
    // Check if we're on the learn page and modules.js is loaded
    if (typeof KSSRModules === 'undefined') {
        console.warn('KSSRModules not loaded yet');
        setTimeout(() => loadModulesIntoPage(subjectFilter), 100);
        return;
    }

    const lessonsGrid = document.getElementById('lessonsGrid') || document.querySelector('.lessons-grid');
    if (!lessonsGrid) return;

    // Get completed modules from localStorage
    const completedModules = KSSRModules.getCompletedModules();
    
    // Show ALL modules so students can see what's available (locked modules will be marked as locked)
    let visibleModules = KSSRModules.modules;
    
    // Store for filtering
    allVisibleModules = visibleModules;
    
    // Filter by subject if not 'all'
    if (subjectFilter && subjectFilter !== 'all') {
        visibleModules = visibleModules.filter(m => m.subject === subjectFilter);
    }
    
    // Clear existing content
    lessonsGrid.innerHTML = '';

    // Update empty state
    const emptyState = document.getElementById('emptyState');
    if (emptyState) {
        emptyState.style.display = visibleModules.length === 0 ? 'block' : 'none';
    }

    // Update module count
    const moduleCount = document.getElementById('moduleCount');
    if (moduleCount) {
        moduleCount.textContent = `${visibleModules.length} module${visibleModules.length !== 1 ? 's' : ''} available`;
    }

    // Update title
    const modulesTitle = document.getElementById('modulesTitle');
    if (modulesTitle && subjectFilter !== 'all') {
        const subjectInfo = KSSRModules.subjects[subjectFilter];
        if (subjectInfo) {
            modulesTitle.textContent = subjectInfo.name + ' Modules';
        }
    } else if (modulesTitle) {
        modulesTitle.textContent = 'All Modules';
    }

    // Sort modules: unlocked first, then by year level, then by subject
    visibleModules.sort((a, b) => {
        const aCompleted = completedModules.includes(a.id);
        const bCompleted = completedModules.includes(b.id);
        const aInProgress = !aCompleted && KSSRModules.getModuleProgress(a.id).questionsAnswered > 0;
        const bInProgress = !bCompleted && KSSRModules.getModuleProgress(b.id).questionsAnswered > 0;
        
        // Priority: Completed < In Progress < Not Started
        if (aCompleted !== bCompleted) {
            return aCompleted ? -1 : 1;
        }
        if (aInProgress !== bInProgress) {
            return aInProgress ? -1 : 1;
        }
        
        // Then by year level
        if (a.yearLevel !== b.yearLevel) {
            return a.yearLevel - b.yearLevel;
        }
        
        // Then alphabetically
        return a.title.localeCompare(b.title);
    });

    // Generate module cards
    visibleModules.forEach(module => {
        const progress = KSSRModules.getModuleProgress(module.id);
        const isCompleted = completedModules.includes(module.id);
        
        // Check if year level is unlocked (prevents year skipping)
        const yearUnlocked = KSSRModules.isYearUnlocked(module.yearLevel, completedModules);
        
        // Check if module prerequisites are met
        const prerequisitesMet = module.unlocked || 
            (module.prerequisites && module.prerequisites.every(prereq => completedModules.includes(prereq)));
        
        // Module is locked if year is not unlocked OR prerequisites not met
        const isLocked = !yearUnlocked || !prerequisitesMet;
        
        const progressPercent = isCompleted ? 100 : 
            (progress.questionsAnswered / module.totalQuestions) * 100;
        
        // Get year progress info for locked modules
        const yearProgress = KSSRModules.getYearProgress(module.yearLevel - 1, completedModules);
        const modulesNeeded = KSSRModules.getModulesNeededForNextYear(module.yearLevel - 1, completedModules);

        const subjectInfo = KSSRModules.subjects[module.subject];
        const iconClass = getIconClass(module.icon, subjectInfo?.icon);

        const moduleCard = document.createElement('div');
        moduleCard.className = `lesson-card ${isCompleted ? 'completed' : isLocked ? 'locked' : progress.questionsAnswered > 0 ? 'in-progress' : ''}`;
        moduleCard.innerHTML = `
            <div class="lesson-status">
                <i class="fas fa-${isCompleted ? 'check-circle' : isLocked ? 'lock' : 'play-circle'}"></i>
            </div>
            <div class="lesson-icon" style="background: ${subjectInfo?.color || '#4A90E2'}20; color: ${subjectInfo?.color || '#4A90E2'};">
                <i class="fas fa-${iconClass}"></i>
            </div>
            <h3>${module.title}</h3>
            <p>${module.description}</p>
            <div class="lesson-meta">
                <span class="lesson-year">Year ${module.yearLevel}</span>
                <span class="lesson-time"><i class="fas fa-clock"></i> ${module.estimatedTime}</span>
                <span class="lesson-xp"><i class="fas fa-coins"></i> ${module.xpReward} XP</span>
            </div>
            <div class="lesson-progress">
                <div class="lesson-progress-bar">
                    <div class="lesson-progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <span>${isCompleted ? '100% Complete' : isLocked ? (!yearUnlocked && module.yearLevel > 1 ? `Complete ${modulesNeeded} more Year ${module.yearLevel - 1} modules` : 'Complete prerequisites') : progressPercent > 0 ? Math.round(progressPercent) + '% Complete' : 'Not Started'}</span>
            </div>
            <button class="lesson-btn ${isCompleted ? 'review-btn' : isLocked ? 'locked-btn' : 'start-btn'}" 
                    ${isLocked ? 'disabled' : ''} 
                    onclick="startModuleLesson('${module.id}')">
                <i class="fas fa-${isCompleted ? 'redo' : isLocked ? 'lock' : 'play'}"></i>
                ${isCompleted ? 'Review' : isLocked ? 'Locked' : progress.questionsAnswered > 0 ? 'Continue' : 'Start'}
            </button>
        `;

        lessonsGrid.appendChild(moduleCard);
    });

    // Update module count in header if exists
    updateModuleStats();
    
    // Load year progress overview
    loadYearProgress();
}

function loadYearProgress() {
    if (typeof KSSRModules === 'undefined') return;
    
    const yearProgressCards = document.getElementById('yearProgressCards');
    if (!yearProgressCards) return;
    
    const completedModules = KSSRModules.getCompletedModules();
    const maxYear = Math.max(...KSSRModules.modules.map(m => m.yearLevel));
    
    yearProgressCards.innerHTML = '';
    
    // Show progress for each year
    for (let year = 1; year <= maxYear; year++) {
        const progress = KSSRModules.getYearProgress(year, completedModules);
        const isUnlocked = KSSRModules.isYearUnlocked(year, completedModules);
        const isNextYearLocked = year < maxYear && !KSSRModules.isYearUnlocked(year + 1, completedModules);
        const modulesNeeded = year < maxYear ? KSSRModules.getModulesNeededForNextYear(year, completedModules) : 0;
        
        const yearCard = document.createElement('div');
        yearCard.className = `year-progress-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        yearCard.innerHTML = `
            <div class="year-progress-header">
                <div class="year-number">
                    <i class="fas fa-${isUnlocked ? 'check-circle' : 'lock'}"></i>
                    <span>Year ${year}</span>
                </div>
                <div class="year-status">
                    ${isUnlocked ? '<span class="status-badge unlocked">Unlocked</span>' : '<span class="status-badge locked">Locked</span>'}
                </div>
            </div>
            <div class="year-progress-bar-container">
                <div class="year-progress-bar">
                    <div class="year-progress-fill" style="width: ${progress.percentage}%"></div>
                </div>
                <div class="year-progress-text">
                    <span>${progress.completed} / ${progress.total} modules completed (${progress.percentage}%)</span>
                </div>
            </div>
            ${isNextYearLocked && modulesNeeded > 0 ? `
                <div class="year-unlock-requirement">
                    <i class="fas fa-info-circle"></i>
                    <span>Complete ${modulesNeeded} more module${modulesNeeded !== 1 ? 's' : ''} to unlock Year ${year + 1}</span>
                </div>
            ` : ''}
        `;
        
        yearProgressCards.appendChild(yearCard);
    }
}

function filterModulesBySubject(subject) {
    currentSubjectFilter = subject;
    
    // Update active tab
    const tabs = document.querySelectorAll('.subject-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-subject') === subject) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Reload modules with filter
    loadModulesIntoPage(subject);
}

function getIconClass(moduleIcon, subjectIcon) {
    const iconMap = {
        'hashtag': 'hashtag',
        'plus-minus': 'plus',
        'plus': 'plus',
        'minus': 'minus',
        'times': 'times',
        'divide': 'divide',
        'shapes': 'shapes',
        'language': 'language',
        'book-reader': 'book-reader',
        'spell-check': 'spell-check',
        'book-open': 'book-open',
        'leaf': 'leaf',
        'tree': 'tree',
        'flask': 'flask',
        'calculator': 'calculator',
        'book': 'book',
        'paint-brush': 'paint-brush',
        'percent': 'percent',
        'pen': 'pen',
        'pen-fancy': 'pen-alt',
        'atom': 'atom',
        'brain': 'brain',
        'globe': 'globe'
    };
    
    return iconMap[moduleIcon] || subjectIcon || 'book';
}

function startModuleLesson(moduleId) {
    // Store current module in sessionStorage for lesson page
    sessionStorage.setItem('currentModuleId', moduleId);
    
    // Navigate to lesson page
    window.location.href = 'lesson.html?module=' + moduleId;
}

function getCurrentModuleInProgress() {
    if (typeof KSSRModules === 'undefined') return null;
    
    let currentModule = null;
    let highestProgress = 0;
    let mostRecentDate = null;
    let firstUnlockedModule = null;
    
    // Find module with progress but not completed
    KSSRModules.modules.forEach(module => {
        const progress = KSSRModules.getModuleProgress(module.id);
        
        // Track first unlocked module as fallback
        if (!firstUnlockedModule && module.unlocked) {
            firstUnlockedModule = module;
        }
        
        // Check if module has progress but isn't completed
        if (progress.questionsAnswered > 0 && !progress.completed) {
            const progressPercent = (progress.questionsAnswered / module.totalQuestions) * 100;
            const lastAttempt = progress.lastAttempt ? new Date(progress.lastAttempt) : null;
            
            // Prioritize by most recent, then by highest progress
            if (!mostRecentDate || (lastAttempt && lastAttempt > mostRecentDate) || 
                (lastAttempt && lastAttempt.getTime() === mostRecentDate.getTime() && progressPercent > highestProgress)) {
                currentModule = module;
                highestProgress = progressPercent;
                mostRecentDate = lastAttempt;
            }
        }
    });
    
    // If no module in progress, return first unlocked module
    if (!currentModule) {
        return firstUnlockedModule;
    }
    
    return currentModule;
}

function loadContinueLearningModule() {
    if (typeof KSSRModules === 'undefined') {
        // Wait for modules.js to load
        setTimeout(() => loadContinueLearningModule(), 100);
        return;
    }
    
    const currentModule = getCurrentModuleInProgress();
    const continueSection = document.querySelector('.featured-module-card');
    
    if (!continueSection) return;
    
    if (currentModule) {
        const progress = KSSRModules.getModuleProgress(currentModule.id);
        const progressPercent = progress.questionsAnswered > 0 
            ? Math.round((progress.questionsAnswered / currentModule.totalQuestions) * 100)
            : 0;
        const subjectInfo = KSSRModules.subjects[currentModule.subject];
        
        // Update module details
        const moduleTitle = continueSection.querySelector('.module-details h4');
        const moduleProgress = continueSection.querySelector('.module-progress');
        const progressFill = continueSection.querySelector('.module-progress-fill');
        const continueBtn = continueSection.querySelector('.continue-btn');
        
        if (moduleTitle) {
            moduleTitle.textContent = `${subjectInfo?.name || currentModule.subject} - ${currentModule.title}`;
        }
        
        if (moduleProgress) {
            if (progressPercent > 0) {
                moduleProgress.textContent = `${progressPercent}% Complete`;
            } else {
                moduleProgress.textContent = 'Not Started';
            }
        }
        
        if (progressFill) {
            progressFill.style.width = `${progressPercent}%`;
        }
        
        if (continueBtn) {
            // Store module ID in data attribute for reference
            continueBtn.setAttribute('data-module-id', currentModule.id);
            
            // Remove old onclick and add new one
            continueBtn.removeAttribute('onclick');
            continueBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                const moduleId = this.getAttribute('data-module-id') || currentModule.id;
                
                // Navigate to lesson page
                sessionStorage.setItem('currentModuleId', moduleId);
                window.location.href = `lesson.html?module=${moduleId}`;
            };
        }
    } else {
        // No module available - hide the section
        continueSection.style.display = 'none';
    }
}

function updateModuleStats() {
    if (typeof KSSRModules === 'undefined') return;
    
    const completedModules = KSSRModules.getCompletedModules();
    const totalXP = KSSRModules.getTotalXP();
    
    // Update XP in header
    const xpValue = document.querySelector('.xp-value');
    if (xpValue) {
        xpValue.textContent = totalXP.toLocaleString();
    }
    
    // Update module count if elements exist
    const moduleCountEls = document.querySelectorAll('.stat-number');
    moduleCountEls.forEach(el => {
        const label = el.nextElementSibling;
        if (label && label.textContent.includes('Modules')) {
            el.textContent = completedModules.length;
        }
    });
}

// Load modules when page loads (for learn.html)
if (document.querySelector('.lessons-grid') || document.getElementById('lessonsGrid')) {
    // Wait for DOM and modules.js to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Wait a bit for modules.js to load
            setTimeout(() => loadModulesIntoPage('all'), 100);
        });
    } else {
        // DOM already loaded
        setTimeout(() => loadModulesIntoPage('all'), 100);
    }
}

// Load continue learning module when on home page
if (document.querySelector('.featured-module-card')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => loadContinueLearningModule(), 200);
        });
    } else {
        setTimeout(() => loadContinueLearningModule(), 200);
    }
}

// Make functions globally available
window.startModuleLesson = startModuleLesson;
window.loadModulesIntoPage = loadModulesIntoPage;
window.filterModulesBySubject = filterModulesBySubject;
window.getCurrentModuleInProgress = getCurrentModuleInProgress;
window.loadContinueLearningModule = loadContinueLearningModule;

