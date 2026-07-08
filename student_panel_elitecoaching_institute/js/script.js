const themeToggle = document.getElementById('themeToggle');
const countdownTimer = document.getElementById('countdownTimer');
const navLinks = document.querySelectorAll('.sidebar-link');
const sections = document.querySelectorAll('main section');
const logoutButton = document.querySelector('.logout-btn');
const currentUserKey = 'eliteCoachingCurrentUser';

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(currentUserKey));
  } catch (error) {
    return null;
  }
}

function updateUserDetails() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = '../auth_elitecoaching_institute/code.html?mode=login';
    return;
  }
  const nameFields = document.querySelectorAll('.profile-pill p, .profile-pill span, header .topbar-left h1');
  const profileName = document.querySelector('.profile-pill p');
  const profileRole = document.querySelector('.profile-pill span');
  if (profileName) profileName.textContent = user.name;
  if (profileRole) profileRole.textContent = 'Elite Learner';
  const greeting = document.querySelector('header .topbar-left h1');
  if (greeting) greeting.textContent = user.name;
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('theme-dark');
  } else {
    document.body.classList.remove('theme-dark');
  }
  localStorage.setItem('elitecoachingTheme', theme);
}

function toggleTheme() {
  const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function updateCountdown() {
  const examDate = new Date();
  examDate.setDate(examDate.getDate() + 12);
  examDate.setHours(9, 0, 0, 0);
  const now = new Date();
  const diff = examDate - now;
  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const values = [days, hours, minutes, seconds].map((value) => String(value).padStart(2, '0'));
  const blocks = countdownTimer.querySelectorAll('div');

  blocks.forEach((block, index) => {
    const label = block.querySelector('span');
    if (label) label.textContent = values[index];
  });
}

function showSection(id) {
  sections.forEach((section) => {
    section.classList.toggle('hidden-section', section.id !== id);
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
}

navLinks.forEach((link) => {
  if (link.tagName.toLowerCase() !== 'button') {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      if (document.getElementById(targetId)) {
        showSection(targetId);
      }
    });
  }
});

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem(currentUserKey);
    window.location.href = '../auth_elitecoaching_institute/code.html?mode=login';
  });
}

themeToggle.addEventListener('click', toggleTheme);

const savedTheme = localStorage.getItem('elitecoachingTheme');
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

if (countdownTimer) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

updateUserDetails();
showSection('dashboard');
