// Admin Login JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const adminForm = document.getElementById('admin-form');
    const usernameInput = document.getElementById('admin-username');
    const passwordInput = document.getElementById('admin-password');
    const togglePassword = document.getElementById('togglePassword');
    const rememberCheckbox = document.getElementById('remember-admin');
    const btnLogin = adminForm.querySelector('.btn-login');
    const btnContent = btnLogin.querySelector('.btn-content');
    const btnLoading = btnLogin.querySelector('.btn-loading');

    // Password Toggle
    if (togglePassword) {
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
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            // Validation
            if (!username || !password) {
                showError('Please enter both username and password');
                return;
            }

            // Show loading state
            btnContent.style.display = 'none';
            btnLoading.style.display = 'flex';
            btnLogin.disabled = true;

            // Simulate authentication (replace with actual API call)
            setTimeout(() => {
                // For demo purposes, accept any credentials
                // In production, validate against backend
                if (username && password) {
                    // Save to localStorage if remember me is checked
                    if (rememberCheckbox.checked) {
                        localStorage.setItem('admin_username', username);
                    } else {
                        localStorage.removeItem('admin_username');
                    }

                    // Redirect to admin dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    showError('Invalid username or password');
                    btnContent.style.display = 'flex';
                    btnLoading.style.display = 'none';
                    btnLogin.disabled = false;
                }
            }, 1500);
        });
    }

    // Load remembered username
    const rememberedUsername = localStorage.getItem('admin_username');
    if (rememberedUsername) {
        usernameInput.value = rememberedUsername;
        rememberCheckbox.checked = true;
    }

    // Error display function
    function showError(message) {
        // Remove existing error message
        const existingError = adminForm.querySelector('.error-message');
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
        adminForm.insertBefore(errorDiv, btnLogin);

        // Auto remove after 5 seconds
        setTimeout(() => {
            errorDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => errorDiv.remove(), 300);
        }, 5000);
    }

    // Add animations
    const style = document.createElement('style');
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
});

