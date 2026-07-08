// Micro-interactions and effects
const currentUserKey = 'eliteCoachingCurrentUser';
const statusBox = document.getElementById('homeAuthStatus');

function updateAuthStatus() {
    if (!statusBox) return;

    try {
        const user = JSON.parse(localStorage.getItem(currentUserKey));

        if (user && user.name) {
            statusBox.innerHTML = `Welcome back, <strong>${user.name}</strong> · <a href="../auth_elitecoaching_institute/code.html?mode=login" style="color:#2563eb;font-weight:700;text-decoration:none;">Open account</a>`;
        } else {
            statusBox.innerHTML = `New here? <a href="../auth_elitecoaching_institute/code.html?mode=register" style="color:#2563eb;font-weight:700;text-decoration:none;">Register now</a> or <a href="../auth_elitecoaching_institute/code.html?mode=login" style="color:#2563eb;font-weight:700;text-decoration:none;">login</a>.`;
        }
    } catch (error) {
        statusBox.innerHTML = `New here? <a href="../auth_elitecoaching_institute/code.html?mode=register" style="color:#2563eb;font-weight:700;text-decoration:none;">Register now</a> or <a href="../auth_elitecoaching_institute/code.html?mode=login" style="color:#2563eb;font-weight:700;text-decoration:none;">login</a>.`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Scroll fade-in effect
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section > div').forEach(section => {
        section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
        observer.observe(section);
    });

    updateAuthStatus();
});
