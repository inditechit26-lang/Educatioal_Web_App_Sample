const storageKey = 'eliteCoachingUsers';
const currentUserKey = 'eliteCoachingCurrentUser';
const studentDashboardUrl = '../student_panel_elitecoaching_institute/code.html';
const adminDashboardUrl = '../admin_dashboard_elitecoaching_institute/code.html';
const homeUrl = '../home_elitecoaching_institute/code.html';

const tabs = document.querySelectorAll('.tab-btn');
const forms = {
  login: document.getElementById('loginForm'),
  register: document.getElementById('registerForm')
};
const messageBox = document.getElementById('messageBox');

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(storageKey, JSON.stringify(users));
}

function showMessage(text, type = 'success') {
  messageBox.textContent = text;
  messageBox.className = `message-box ${type}`;
}

function setMode(mode) {
  tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.mode === mode));
  Object.entries(forms).forEach(([key, form]) => form.classList.toggle('active-form', key === mode));
  showMessage('');
}

function selectedRole(groupName) {
  return document.querySelector(`input[name="${groupName}"]:checked`).value;
}

function saveSession(user) {
  localStorage.setItem(currentUserKey, JSON.stringify({
    name: user.name,
    email: user.email,
    role: user.role || 'student'
  }));
}

function redirectForRole(role) {
  window.location.href = role === 'teacher' ? adminDashboardUrl : studentDashboardUrl;
}

function getQueryMode() {
  const params = new URLSearchParams(window.location.search);
  return params.get('mode') === 'register' ? 'register' : 'login';
}

tabs.forEach((tab) => tab.addEventListener('click', () => setMode(tab.dataset.mode)));

forms.login.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  const role = selectedRole('loginRole');
  const user = getUsers().find((entry) => entry.email.toLowerCase() === email);

  if (!user) {
    showMessage('No account found for that email.', 'error');
    return;
  }
  if (user.password !== password) {
    showMessage('Incorrect password. Please try again.', 'error');
    return;
  }

  const accountRole = user.role || 'student';
  if (accountRole !== role) {
    showMessage(`This email is registered as a ${accountRole}. Please select ${accountRole}.`, 'error');
    return;
  }

  saveSession({ ...user, role: accountRole });
  showMessage(`Welcome back, ${user.name}! Opening your ${accountRole} account...`);
  setTimeout(() => redirectForRole(accountRole), 700);
});

forms.register.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim().toLowerCase();
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirm').value;
  const role = selectedRole('registerRole');
  const users = getUsers();

  if (!name || !email || !password || !confirmPassword) {
    showMessage('Please fill out all fields.', 'error');
    return;
  }
  if (password.length < 6) {
    showMessage('Password must be at least 6 characters long.', 'error');
    return;
  }
  if (password !== confirmPassword) {
    showMessage('Passwords do not match.', 'error');
    return;
  }
  if (users.some((entry) => entry.email.toLowerCase() === email)) {
    showMessage('An account with that email already exists.', 'error');
    return;
  }

  const newUser = { name, email, password, role };
  users.push(newUser);
  saveUsers(users);
  saveSession(newUser);
  showMessage(`${role === 'teacher' ? 'Teacher' : 'Student'} account created successfully. Redirecting...`);
  setTimeout(() => redirectForRole(role), 700);
});

setMode(getQueryMode());
