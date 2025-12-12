// IDuCation - Main JavaScript

// Login Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the login page
    const loginPage = document.querySelector('.login-section');
    if (!loginPage) return;

    // User Type Selection
    const userTypeButtons = document.querySelectorAll('.user-type-btn');
    const loginForms = document.querySelectorAll('.login-form');
    
    userTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userType = this.getAttribute('data-type');
            
            // Remove active class from all buttons
            userTypeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all forms
            loginForms.forEach(form => form.classList.remove('active'));
            
            // Show selected form
            const selectedForm = document.getElementById(`${userType}-form`);
            if (selectedForm) {
                selectedForm.classList.add('active');
            }
        });
    });

    // Scan Modal with Completion Animation
    const scanModal = document.getElementById('scanModal');
    const closeScanModal = document.getElementById('closeScanModal');
    
    function openScanModal(formId) {
        if (scanModal) {
            const modalContent = scanModal.querySelector('.scan-modal-content');
            const scanAnimation = modalContent.querySelector('.scan-animation');
            const scanTitle = modalContent.querySelector('h3');
            const scanText = modalContent.querySelector('p');
            const progressBar = modalContent.querySelector('.scan-progress-bar');
            
            // Reset modal state
            scanModal.classList.add('active');
            scanTitle.textContent = 'Scanning for Smart ID';
            scanText.textContent = 'Hold your Smart ID card near the device or tap with NFC';
            progressBar.style.width = '0%';
            progressBar.style.animation = 'none';
            scanAnimation.innerHTML = `
                <div class="scan-ring"></div>
                <i class="fas fa-wifi scan-icon"></i>
            `;
            
            // Generate random Smart ID code
            let randomCode;
            if (formId === 'student-form') {
                randomCode = 'STU' + Math.random().toString(36).substr(2, 9).toUpperCase();
            } else if (formId === 'teacher-form') {
                randomCode = 'TCH' + Math.random().toString(36).substr(2, 9).toUpperCase();
            }
            
            // Animate progress
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 10;
                progressBar.style.width = progress + '%';
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    
                    // Show completion animation
                    setTimeout(() => {
                        scanAnimation.innerHTML = `
                            <div class="scan-complete">
                                <i class="fas fa-check-circle"></i>
                            </div>
                        `;
                        scanTitle.textContent = 'Scan Complete!';
                        scanText.textContent = `Smart ID: ${randomCode}`;
                        
                        // Fill the input field
                        const idInput = document.querySelector(`#${formId} .floating-input`);
                        if (idInput) {
                            idInput.value = randomCode;
                            // Trigger input event to show avatar
                            idInput.dispatchEvent(new Event('input'));
                        }
                        
                        // Redirect after showing completion
                        setTimeout(() => {
                            closeScanModalFunc();
                            
                            // Auto-redirect
                            setTimeout(() => {
                                if (formId === 'student-form') {
                                    window.location.href = 'pages/student/home.html';
                                } else if (formId === 'teacher-form') {
                                    window.location.href = 'pages/teacher/dashboard.html';
                                }
                            }, 500);
                        }, 1500);
                    }, 500);
                }
            }, 150);
        }
    }

    function closeScanModalFunc() {
        if (scanModal) {
            scanModal.classList.remove('active');
        }
    }

    if (closeScanModal) {
        closeScanModal.addEventListener('click', closeScanModalFunc);
    }

    if (scanModal) {
        scanModal.addEventListener('click', function(e) {
            if (e.target === scanModal) {
                closeScanModalFunc();
            }
        });
    }

    // Scan Button Functionality
    const scanButtons = document.querySelectorAll('.modern-scan-btn');
    scanButtons.forEach(button => {
        button.addEventListener('click', function() {
            const formId = this.closest('form').id;
            openScanModal(formId);
        });
    });

    // NFC Button Functionality
    const nfcButtons = document.querySelectorAll('.nfc-btn');
    nfcButtons.forEach(button => {
        button.addEventListener('click', function() {
            const formId = this.closest('form').id;
            openScanModal(formId);
        });
    });

    // Avatar Preview on Smart ID Input
    const smartIdInputs = document.querySelectorAll('.floating-input');
    smartIdInputs.forEach(input => {
        const formId = input.closest('form').id;
        const avatarPreview = document.getElementById(formId.replace('-form', '-avatar'));
        
        input.addEventListener('input', function() {
            const value = this.value.trim();
            if (value.length >= 8 && avatarPreview) {
                avatarPreview.style.display = 'flex';
            } else if (avatarPreview) {
                avatarPreview.style.display = 'none';
            }
        });
    });

    // Form Submission
    const forms = document.querySelectorAll('.login-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formId = this.id;
            const submitButton = this.querySelector('.btn-login');
            const originalText = submitButton.innerHTML;
            
            // Show loading state with premium animation
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            
            // Get form values
            const idInput = this.querySelector('input[type="text"]');
            const idValue = idInput.value.trim();
            
            // Validate
            if (!idValue) {
                showErrorMessage('Please enter or scan your Smart ID');
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                return;
            }
            
            // Simulate authentication
            setTimeout(() => {
                // In a real application, this would make an API call
                console.log('Login attempt:', {
                    formType: formId,
                    smartId: idValue
                });
                
                // Simulate successful login
                showSuccessMessage('Smart ID authenticated successfully! Redirecting...');
                
                // Reset button
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                
                // Redirect based on user type
                setTimeout(() => {
                    if (formId === 'student-form') {
                        window.location.href = 'pages/student/home.html';
                    } else if (formId === 'teacher-form') {
                        window.location.href = 'pages/teacher/dashboard.html';
                    }
                }, 1500);
            }, 2000);
        });
    });

});

// Helper Functions
function showScanMessage(message) {
    const notice = document.createElement('div');
    notice.className = 'scan-notice';
    notice.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;
    notice.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, var(--blue), var(--green));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;
    document.body.appendChild(notice);
    
    setTimeout(() => {
        notice.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notice.remove(), 300);
    }, 4000);
}

function showErrorMessage(message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    error.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--red);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;
    document.body.appendChild(error);
    
    setTimeout(() => {
        error.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => error.remove(), 300);
    }, 4000);
}

function showSuccessMessage(message) {
    const success = document.createElement('div');
    success.className = 'success-message';
    success.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    success.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;
    document.body.appendChild(success);
    
    setTimeout(() => {
        success.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => success.remove(), 300);
    }, 4000);
}

// Add animations for notifications
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add CSS variables for JavaScript
const root = document.documentElement;
if (getComputedStyle(root).getPropertyValue('--blue')) {
    // Variables are already set
} else {
    root.style.setProperty('--blue', '#2253e6');
    root.style.setProperty('--green', '#00cc85');
    root.style.setProperty('--red', '#ff4444');
}

