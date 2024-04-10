document.addEventListener("DOMContentLoaded", function() {
    // Function to enable drag-to-scroll for a specific container
    function setupDragToScroll(containerId) {
        const container = document.getElementById(containerId);
        let isDown = false;
        let startX;
        let scrollLeft;

        if(container) { // Check if the container exists
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
                const walk = (x - startX) * 0.85;
                container.scrollLeft = scrollLeft - walk;
            });
        }
    }

    setupDragToScroll('appetizers-container');
    setupDragToScroll('main-courses-container'); 
    setupDragToScroll('desserts-container'); 
    setupDragToScroll('beverages-container');

    window.onload = function() {
        document.querySelectorAll('.menu-section').forEach(section => {
            const container = section.querySelector('.menu-container');
            const leftArrow = section.querySelector('.left-arrow');
            const rightArrow = section.querySelector('.right-arrow');
        
            // Hide the left arrow initially
            leftArrow.style.display = 'none';
        
            // Function to update arrow visibility
            const updateArrowVisibility = () => {
                leftArrow.style.display = container.scrollLeft > 0 ? 'block' : 'none';
                rightArrow.style.display = container.scrollLeft < container.scrollWidth - container.offsetWidth ? 'block' : 'none';
            };

            setTimeout(() => {
                document.querySelectorAll('.menu-container').forEach(container => {
                    container.dispatchEvent(new Event('scroll'));
                });
            }, 50); 
        
            // Initial update for arrow visibility
            updateArrowVisibility();
        
            // Update arrow visibility on scroll
            container.addEventListener('scroll', updateArrowVisibility);
        
            // Scroll the container when arrows are clicked
            leftArrow.addEventListener('click', () => {
                container.scrollLeft -= container.offsetWidth * 0.5;
            });
        
            rightArrow.addEventListener('click', () => {
                container.scrollLeft += container.offsetWidth * 0.5;
            });
        });
    };    
});