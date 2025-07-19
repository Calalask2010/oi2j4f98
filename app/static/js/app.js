// HireHand Platform - JavaScript

// Global state
let currentUser = null;
let currentLanguage = 'ru';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('HireHand Platform initialized');
    initializeApp();
});

function initializeApp() {
    // Check authentication
    checkAuth();
    
    // Load initial data
    loadJobs();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load language preference
    loadLanguagePreference();
}

function setupEventListeners() {
    // Auth forms
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', handleLanguageChange);
    }
}

// API Helper Functions
async function apiCall(url, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    
    try {
        const response = await fetch(url, finalOptions);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API Error');
        }
        
        return data;
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
}

// Jobs Functions
async function loadJobs() {
    try {
        const response = await apiCall('/api/jobs?featured_only=true&limit=6');
        
        if (response.success && response.jobs) {
            displayJobs(response.jobs);
        }
    } catch (error) {
        console.error('Error loading jobs:', error);
        document.getElementById('jobsList').innerHTML = '<div class="error">Ошибка загрузки вакансий</div>';
    }
}

function displayJobs(jobs) {
    const jobsList = document.getElementById('jobsList');
    
    if (jobs.length === 0) {
        jobsList.innerHTML = '<div class="empty-state"><i class="fas fa-briefcase"></i><p>Нет доступных вакансий</p></div>';
        return;
    }
    
    const jobsHTML = jobs.map(job => `
        <div class="job-card">
            <div class="job-title">${job.title}</div>
            <div class="job-company">${job.company_name}</div>
            <div class="job-location">
                <i class="fas fa-map-marker-alt"></i> ${job.location || 'Не указано'}
            </div>
            <div class="job-description">${truncateText(job.description, 150)}</div>
            ${job.salary_min ? `<div class="job-salary">
                От ${formatSalary(job.salary_min)} ${job.salary_max ? '- ' + formatSalary(job.salary_max) : ''} €
            </div>` : ''}
            <div class="job-actions">
                <button class="btn btn-primary" onclick="viewJob(${job.id})">
                    <i class="fas fa-eye"></i> Подробнее
                </button>
            </div>
        </div>
    `).join('');
    
    jobsList.innerHTML = jobsHTML;
}

function viewJob(jobId) {
    // For now, just show an alert. In a full app, this would open a job detail modal/page
    showNotification('Функция просмотра вакансии будет добавлена позже', 'info');
}

// Candidates Functions
async function searchCandidates() {
    const skills = document.getElementById('candidateSkills').value;
    const experienceLevel = document.getElementById('experienceLevel').value;
    const location = document.getElementById('candidateLocation').value;
    
    try {
        const searchData = {
            skills: skills ? skills.split(',').map(s => s.trim()).filter(s => s) : [],
            experience_min: experienceLevel ? parseInt(experienceLevel) : null,
            location: location || null,
            limit: 10
        };
        
        const response = await apiCall('/api/candidates/search', {
            method: 'POST',
            body: JSON.stringify(searchData)
        });
        
        if (response.success && response.candidates) {
            displayCandidates(response.candidates);
        }
    } catch (error) {
        console.error('Error searching candidates:', error);
        showNotification('Ошибка поиска кандидатов: ' + error.message, 'error');
    }
}

function displayCandidates(candidates) {
    const candidatesList = document.getElementById('candidatesList');
    
    if (candidates.length === 0) {
        candidatesList.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><p>Кандидаты не найдены</p></div>';
        return;
    }
    
    const candidatesHTML = candidates.map(candidate => `
        <div class="candidate-card">
            <div class="candidate-name">${candidate.full_name}</div>
            <div class="candidate-position">${candidate.desired_position || 'Ищет работу'}</div>
            <div class="candidate-location">
                <i class="fas fa-map-marker-alt"></i> ${candidate.location || 'Не указано'}
            </div>
            ${candidate.skills.length > 0 ? `<div class="candidate-skills">
                <strong>Навыки:</strong> ${candidate.skills.join(', ')}
            </div>` : ''}
            ${candidate.experience_years ? `<div class="candidate-experience">
                <i class="fas fa-clock"></i> Опыт: ${candidate.experience_years} лет
            </div>` : ''}
            <div class="candidate-actions">
                <button class="btn btn-primary" onclick="viewCandidate(${candidate.id})">
                    <i class="fas fa-eye"></i> Подробнее
                </button>
            </div>
        </div>
    `).join('');
    
    candidatesList.innerHTML = candidatesHTML;
}

function viewCandidate(candidateId) {
    showNotification('Функция просмотра кандидата будет добавлена позже', 'info');
}

// Authentication Functions
async function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        showLoading(event.target);
        
        const response = await apiCall('/api/users/login', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        if (response.success) {
            currentUser = response.user;
            showNotification('Успешная авторизация!', 'success');
            closeAuthModal();
            updateUIForLoggedInUser();
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        showNotification('Ошибка авторизации: ' + error.message, 'error');
    } finally {
        hideLoading(event.target);
    }
}

async function handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.language = currentLanguage;
    
    try {
        showLoading(event.target);
        
        const response = await apiCall('/api/users/register', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        if (response.success) {
            showNotification('Регистрация успешна! Теперь войдите в систему.', 'success');
            switchAuthTab('login');
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        showNotification('Ошибка регистрации: ' + error.message, 'error');
    } finally {
        hideLoading(event.target);
    }
}

async function checkAuth() {
    try {
        const response = await apiCall('/api/users/check-auth');
        
        if (response.authenticated) {
            currentUser = {
                id: response.user_id,
                username: response.username,
                role: response.role
            };
            updateUIForLoggedInUser();
        }
    } catch (error) {
        console.error('Auth check error:', error);
    }
}

function updateUIForLoggedInUser() {
    // Update UI to show user is logged in
    // This would involve changing the login button to show user menu, etc.
    console.log('User logged in:', currentUser);
}

// Modal Functions
function showAuthModal() {
    document.getElementById('authModal').style.display = 'block';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.querySelector('.auth-tab');
    const registerTab = document.querySelectorAll('.auth-tab')[1];
    
    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
    }
}

// Language Functions
function handleLanguageChange(event) {
    currentLanguage = event.target.value;
    localStorage.setItem('hirehand_language', currentLanguage);
    // In a full app, this would trigger translation updates
    showNotification('Язык изменен на ' + getLanguageName(currentLanguage), 'success');
}

function loadLanguagePreference() {
    const saved = localStorage.getItem('hirehand_language');
    if (saved) {
        currentLanguage = saved;
        document.getElementById('languageSelect').value = saved;
    }
}

function getLanguageName(code) {
    const names = {
        'ru': 'Русский',
        'en': 'English', 
        'et': 'Eesti'
    };
    return names[code] || code;
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

function showLoading(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
    }
}

function hideLoading(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = false;
        // Restore original button text based on form
        if (form.id === 'loginForm') {
            submitButton.innerHTML = 'Войти';
        } else if (form.id === 'registerForm') {
            submitButton.innerHTML = 'Зарегистрироваться';
        }
    }
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function formatSalary(salary) {
    return new Intl.NumberFormat('et-EE').format(salary);
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
        closeAuthModal();
    }
});

// Smooth scrolling for navigation links
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('nav-link')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});