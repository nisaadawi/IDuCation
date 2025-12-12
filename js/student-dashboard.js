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
    console.log('Starting lesson:', lessonId);
    // Navigate to lesson page
    if (lessonId === 5 || lessonId === '5') {
        window.location.href = 'lesson.html';
    } else {
        showNotification('Starting lesson...', 'success');
        // For other lessons, navigate to lesson page with ID
        // window.location.href = `lesson.html?id=${lessonId}`;
    }
}

function reviewLesson(lessonId) {
    console.log('Reviewing lesson:', lessonId);
    // Navigate to lesson review page
    window.location.href = 'lesson.html?mode=review';
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

