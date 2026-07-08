const storageKey = 'eliteCoachingUsers';
const currentUserKey = 'eliteCoachingCurrentUser';

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
  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });

  Object.entries(forms).forEach(([key, form]) => {
    form.classList.toggle('active-form', key === mode);
  });
}

function getQueryMode() {
  const params = new URLSearchParams(window.location.search);
  return params.get('mode') === 'register' ? 'register' : 'login';
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => setMode(tab.dataset.mode));
});

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const users = getUsers();
  const user = users.find((entry) => entry.email === email);

  if (!user) {
    showMessage('No account found for that email.', 'error');
    return;
  }

  if (user.password !== password) {
    showMessage('Incorrect password. Please try again.', 'error');
    return;
  }

  localStorage.setItem(currentUserKey, JSON.stringify({ name: user.name, email: user.email }));
  showMessage(`Welcome back, ${user.name}!`, 'success');
  setTimeout(() => {
    window.location.href = '../home_elitecoaching_institute/code.html';
  }, 800);
});

document.getElementById('registerForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirm').value;
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

  if (users.some((entry) => entry.email === email)) {
    showMessage('An account with that email already exists.', 'error');
    return;
  }

  users.push({ name, email, password });
  saveUsers(users);
  localStorage.setItem(currentUserKey, JSON.stringify({ name, email }));
  showMessage('Account created successfully. Redirecting...', 'success');

  setTimeout(() => {
    window.location.href = '../home_elitecoaching_institute/code.html';
  }, 800);
});

setMode(getQueryMode());
