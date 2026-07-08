function toggleAccordion(id) {
    const content = document.getElementById(`content-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    
    // Close all others
    for (let i = 1; i <= 4; i++) {
        if (i !== id) {
            document.getElementById(`content-${i}`).classList.add('hidden');
            document.getElementById(`icon-${i}`).classList.remove('rotate-180');
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
