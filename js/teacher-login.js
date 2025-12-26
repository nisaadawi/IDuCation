// Teacher Login JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const teacherForm = document.getElementById('teacher-form');
    const usernameInput = document.getElementById('teacher-username');
    const passwordInput = document.getElementById('teacher-password');
    const togglePassword = document.getElementById('toggleTeacherPassword');
    const rememberCheckbox = document.getElementById('remember-teacher');
    const btnLogin = teacherForm ? teacherForm.querySelector('.btn-login') : null;
    const btnContent = btnLogin ? btnLogin.querySelector('.btn-content') : null;
    const btnLoading = btnLogin ? btnLogin.querySelector('.btn-loading') : null;

    // Password Toggle
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            if (type === 'password') {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    }

    // Form Submission
    if (teacherForm) {
        teacherForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            // Validation
            if (!username || !password) {
                showError('Please enter both username and password');
                return;
            }

            // Show loading state
            if (btnContent && btnLoading && btnLogin) {
                btnContent.style.display = 'none';
                btnLoading.style.display = 'flex';
                btnLogin.disabled = true;
            }

            // Simulate authentication (replace with actual API call)
            setTimeout(() => {
                // For demo purposes, accept any credentials
                // In production, validate against backend
                if (username && password) {
                    // Save to localStorage if remember me is checked
                    if (rememberCheckbox && rememberCheckbox.checked) {
                        localStorage.setItem('teacher_username', username);
                    } else {
                        localStorage.removeItem('teacher_username');
                    }

                    // Store teacher data in sessionStorage
                    sessionStorage.setItem('teacher_username', username);
                    sessionStorage.setItem('teacher_logged_in', 'true');

                    // Redirect to teacher dashboard (adjust path as needed)
                    window.location.href = 'pages/teacher/dashboard.html';
                } else {
                    showError('Invalid username or password');
                    if (btnContent && btnLoading && btnLogin) {
                        btnContent.style.display = 'flex';
                        btnLoading.style.display = 'none';
                        btnLogin.disabled = false;
                    }
                }
            }, 1500);
        });
    }

    // Load remembered username
    if (usernameInput && rememberCheckbox) {
        const rememberedUsername = localStorage.getItem('teacher_username');
        if (rememberedUsername) {
            usernameInput.value = rememberedUsername;
            rememberCheckbox.checked = true;
        }
    }

    // Error display function
    function showError(message) {
        if (!teacherForm) return;

        // Remove existing error message
        const existingError = teacherForm.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: rgba(239, 68, 68, 0.1);
            border: 2px solid #ef4444;
            color: #ef4444;
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;

        // Insert before submit button
        if (btnLogin) {
            teacherForm.insertBefore(errorDiv, btnLogin);
        } else {
            teacherForm.appendChild(errorDiv);
        }

        // Auto remove after 5 seconds
        setTimeout(() => {
            errorDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => errorDiv.remove(), 300);
        }, 5000);
    }

    // Add animations if not already present
    if (!document.getElementById('teacher-login-animations')) {
        const style = document.createElement('style');
        style.id = 'teacher-login-animations';
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-10px);
                }
            }
        `;
        document.head.appendChild(style);
    }
});

