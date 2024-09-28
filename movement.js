// movement.js

let isDragging = false;
let offsetX, offsetY;

function makeDraggable(element) {
    element.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
}

function mouseMoveHandler(e) {
    if (isDragging) {
        const popup = document.getElementById('timerPopup');
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        // Prevent dragging out of window bounds
        const maxX = window.innerWidth - popup.offsetWidth;
        const maxY = window.innerHeight - popup.offsetHeight;
        
        popup.style.left = Math.min(Math.max(0, x), maxX) + 'px';
        popup.style.top = Math.min(Math.max(0, y), maxY) + 'px';
    }
}

function mouseUpHandler() {
    isDragging = false;
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
}

// Call this function in popup.js after the popup is loaded
function initializeDraggable() {
    const popup = document.getElementById('timerPopup');
    makeDraggable(popup);
}
