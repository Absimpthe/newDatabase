document.addEventListener("DOMContentLoaded", function() {
    // Function to enable drag-to-scroll for a specific container
    function enableDragScroll(container) {
        let isDown = false;
        let startX;
        let scrollLeft;
    
        const leftArrow = container.previousElementSibling; // Assuming left arrow is placed just before the container
        const rightArrow = container.nextElementSibling; // Assuming right arrow is placed just after the container
    
        const checkArrows = () => {
            leftArrow.style.display = container.scrollLeft > 0 ? 'block' : 'none';
            rightArrow.style.display = container.scrollLeft < container.scrollWidth - container.clientWidth ? 'block' : 'none';
        };
    
        container.addEventListener('scroll', checkArrows);
        checkArrows(); // Initial check
    
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
    
        container.addEventListener('mouseleave', () => {
            isDown = false;
        });
    
        container.addEventListener('mouseup', () => {
            isDown = false;
        });
    
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 3; // Scroll-fast
            container.scrollLeft = scrollLeft - walk;
        });
    
        // Arrow click events
        leftArrow.addEventListener('click', () => {
            container.scrollBy({ left: -container.clientWidth / 2, behavior: 'smooth' });
        });
    
        rightArrow.addEventListener('click', () => {
            container.scrollBy({ left: container.clientWidth / 2, behavior: 'smooth' });
        });
    }    

    document.querySelectorAll('.menu-container').forEach(container => {
        enableDragScroll(container);
    });    
});