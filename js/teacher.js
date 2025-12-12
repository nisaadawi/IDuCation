// Teacher Dashboard JavaScript
// Student progress tracking and management

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Animate progress bars on load
    animateProgressBars();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize filter functionality
    initializeFilters();
});

/**
 * Initialize dashboard with data
 */
function initializeDashboard() {
    // This would typically fetch data from an API
    console.log('Teacher dashboard initialized');
}

/**
 * Animate progress bars on page load
 */
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill-small');
    progressBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1s ease';
            bar.style.width = width;
        }, 300 + (index * 100));
    });
}

/**
 * Initialize search functionality
 */
function initializeSearch() {
    const searchInput = document.getElementById('studentSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            const studentCards = document.querySelectorAll('.student-card');
            
            studentCards.forEach(card => {
                const studentName = card.querySelector('.student-info h3')?.textContent.toLowerCase() || '';
                const studentId = card.querySelector('.student-info p')?.textContent.toLowerCase() || '';
                
                if (studentName.includes(searchTerm) || studentId.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

/**
 * Initialize filter functionality
 */
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterStudents(filter);
        });
    });
}

/**
 * Filter students based on selected filter
 */
function filterStudents(filter) {
    const studentCards = document.querySelectorAll('.student-card');
    
    studentCards.forEach(card => {
        const status = card.dataset.status;
        
        switch(filter) {
            case 'all':
                card.style.display = 'block';
                break;
            case 'active':
                card.style.display = status === 'active' ? 'block' : 'none';
                break;
            case 'struggling':
                card.style.display = status === 'struggling' ? 'block' : 'none';
                break;
            case 'inactive':
                card.style.display = status === 'inactive' ? 'block' : 'none';
                break;
            default:
                card.style.display = 'block';
        }
    });
}

/**
 * View detailed student progress
 */
function viewStudentDetails(studentId) {
    // This would typically navigate to a detailed student page
    // or open a modal with detailed information
    console.log(`Viewing details for student: ${studentId}`);
    
    // Example: Could open a modal or navigate to detail page
    // window.location.href = `student-details.html?id=${studentId}`;
    // or
    // openStudentModal(studentId);
}

/**
 * Export student progress data
 */
function exportStudentData() {
    // This would export student progress data as CSV or PDF
    console.log('Exporting student data...');
}

/**
 * Refresh dashboard data
 */
function refreshDashboard() {
    // This would refresh data from the server
    console.log('Refreshing dashboard...');
    location.reload();
}

