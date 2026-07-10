// Home page authentication state and micro-interactions
const currentUserKey = 'eliteCoachingCurrentUser';
const statusBox = document.getElementById('homeAuthStatus');
const guestAuthActions = document.getElementById('guestAuthActions');
const studentProfileLink = document.getElementById('studentProfileLink');
const dashboardUrl = '../student_panel_elitecoaching_institute/student panel.html';
const loginUrl = '../auth_elitecoaching_institute/auth.html?mode=login';
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

function createLink(label, href) {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    link.style.cssText = 'color:#2563eb;font-weight:700;text-decoration:none;';
    return link;
}

function showGuestState() {
    if (guestAuthActions) guestAuthActions.classList.remove('hidden');
    if (studentProfileLink) {
        studentProfileLink.classList.add('hidden');
        studentProfileLink.classList.remove('flex');
    }

    if (!statusBox) return;
    statusBox.replaceChildren(
        document.createTextNode('New here? '),
        createLink('Register now', '../auth_elitecoaching_institute/auth.html?mode=register'),
        document.createTextNode(' or '),
        createLink('login', loginUrl),
        document.createTextNode('.')
    );
}

function showStudentState(user) {
    const role = user.role || 'student';
    if (guestAuthActions) guestAuthActions.classList.add('hidden');
    if (studentProfileLink) {
        studentProfileLink.classList.remove('hidden');
        studentProfileLink.classList.add('flex');
        studentProfileLink.href = role === 'student' ? dashboardUrl : '#homeAuthStatus';
        studentProfileLink.setAttribute('aria-label', role === 'student' ? 'Open student dashboard' : 'Teacher profile');
    }

    const name = document.getElementById('homeStudentName');
    const email = document.getElementById('homeStudentEmail');
    const initial = document.getElementById('studentAvatarInitial');
    if (name) name.textContent = user.name;
    if (email) email.textContent = `${role === 'teacher' ? 'Teacher' : 'Student'} · ${user.email || ''}`;
    if (initial) initial.textContent = user.name.charAt(0).toUpperCase();

    if (!statusBox) return;
    const logoutButton = document.createElement('button');
    logoutButton.type = 'button';
    logoutButton.textContent = 'Logout';
    logoutButton.style.cssText = 'color:#dc2626;font-weight:700;margin-left:12px;';
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem(currentUserKey);
        showGuestState();
    });

    const strongName = document.createElement('strong');
    strongName.textContent = user.name;
    const statusItems = [
        document.createTextNode('Welcome back, '),
        strongName,
        document.createTextNode(` · ${role === 'teacher' ? 'Teacher account' : 'Student account'}`)
    ];
    if (role === 'student') {
        statusItems.push(document.createTextNode(' · '), createLink('Open student dashboard', dashboardUrl));
    }
    statusItems.push(logoutButton);
    statusBox.replaceChildren(...statusItems);
}

function updateAuthStatus() {
    try {
        const user = JSON.parse(localStorage.getItem(currentUserKey));
        if (user && user.name) {
            showStudentState(user);
        } else {
            showGuestState();
        }
    } catch (error) {
        showGuestState();
    }
}

function setupMobileMenu() {
    if (!mobileMenuButton || !mobileMenu) return;
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
}

function setupCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const animateCounter = (element) => {
        const target = Number(element.dataset.count || '0');
        const suffix = element.dataset.suffix || '';
        const duration = 1200;
        const startTime = performance.now();

        const step = (timestamp) => {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);
            element.textContent = `${value}${suffix}`;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.6 });

    counters.forEach((counter) => observer.observe(counter));
}

function setupCourseFilters() {
    const buttons = document.querySelectorAll('[data-course-filter]');
    const cards = document.querySelectorAll('[data-course-category]');
    if (!buttons.length || !cards.length) return;

    const applyFilter = (filter) => {
        buttons.forEach((button) => {
            button.classList.toggle('is-active', button.dataset.courseFilter === filter);
        });

        cards.forEach((card) => {
            const matches = filter === 'all' || card.dataset.courseCategory === filter;
            card.classList.toggle('course-card-hidden', !matches);
        });
    };

    buttons.forEach((button) => {
        button.addEventListener('click', () => applyFilter(button.dataset.courseFilter || 'all'));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section > div').forEach((section) => {
        section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
        observer.observe(section);
    });

    setupMobileMenu();
    setupCounters();
    setupCourseFilters();
    updateAuthStatus();
});
