document.addEventListener("DOMContentLoaded", function() {
    // Function to enable drag-to-scroll
    function enableDragScroll() {
        const slider = document.querySelector('.menu-container');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3; // Scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // Apply the drag-to-scroll feature to each menu container
    document.querySelectorAll('.menu-container').forEach(container => {
        enableDragScroll(container);
    });
});