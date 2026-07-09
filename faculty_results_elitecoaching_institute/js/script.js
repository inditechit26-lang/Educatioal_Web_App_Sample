// Micro-interactions for chart bars
document.addEventListener('DOMContentLoaded', () => {
    const bars = document.querySelectorAll('.bg-primary, .bg-tertiary-container\\/30');
    bars.forEach(bar => {
        const finalHeight = bar.style.height;
        bar.style.height = '0%';
        setTimeout(() => {
            bar.style.height = finalHeight;
        }, 500);
    });
});
