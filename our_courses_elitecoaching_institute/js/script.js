let activeCategory = 'all';
let activeMode = 'offline';

const activeFilterClasses = ['bg-primary', 'text-on-primary'];
const inactiveFilterClasses = ['border', 'border-outline-variant', 'text-on-surface-variant'];
const activeModeClasses = ['bg-white', 'shadow-sm', 'text-primary'];
const inactiveModeClasses = ['text-on-surface-variant'];

function setClassState(element, active, activeClasses, inactiveClasses) {
    element.classList.toggle('hover:border-primary', !active);
    activeClasses.forEach((className) => element.classList.toggle(className, active));
    inactiveClasses.forEach((className) => element.classList.toggle(className, !active));
}

function updateCourseCards() {
    let visibleCount = 0;
    document.querySelectorAll('.course-card').forEach((card) => {
        const categoryMatches = activeCategory === 'all' || card.dataset.category === activeCategory;
        const modeMatches = card.dataset.mode === activeMode || (activeMode === 'offline' && card.dataset.mode === 'hybrid');
        const visible = categoryMatches && modeMatches;
        card.classList.toggle('hidden', !visible);
        if (visible) visibleCount += 1;
    });
    document.getElementById('noCoursesMessage')?.classList.toggle('hidden', visibleCount > 0);
}

document.querySelectorAll('.course-filter').forEach((button) => {
    button.addEventListener('click', () => {
        activeCategory = button.dataset.filter || 'all';
        document.querySelectorAll('.course-filter').forEach((filterButton) => {
            setClassState(filterButton, filterButton === button, activeFilterClasses, inactiveFilterClasses);
        });
        updateCourseCards();
    });
});

document.querySelectorAll('.mode-filter').forEach((button) => {
    button.addEventListener('click', () => {
        activeMode = button.dataset.mode || 'offline';
        document.querySelectorAll('.mode-filter').forEach((modeButton) => {
            setClassState(modeButton, modeButton === button, activeModeClasses, inactiveModeClasses);
        });
        updateCourseCards();
    });
});

function toggleAccordion(id) {
    const content = document.getElementById(`content-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    if (!content || !icon) return;
    
    // Close all others
    for (let i = 1; i <= 4; i++) {
        if (i !== id) {
            document.getElementById(`content-${i}`)?.classList.add('hidden');
            document.getElementById(`icon-${i}`)?.classList.remove('rotate-180');
        }
    }
    
    // Toggle current
    const isHidden = content.classList.contains('hidden');
    if (isHidden) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

updateCourseCards();
