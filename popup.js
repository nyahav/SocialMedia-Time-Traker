document.addEventListener('DOMContentLoaded', function() {
    let isRunning = true; // Automatically set to true
    let intervalId;
    let totalSeconds = 0;

    function showCurrentWebsite() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const currentTab = tabs[0];
            const url = currentTab.url;

            if (url) {
                const siteName = getSiteName(url);
                document.getElementById('currentUrl').textContent = 'Current Website: ' + siteName;
            } else {
                document.getElementById('currentUrl').textContent = 'No URL found';
            }
        });
    }
    function getSiteName(url) {
        try {
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname; // Extract the hostname from the URL
            const parts = hostname.split('.'); // Split the hostname by '.'
    
            // Check if the hostname contains '.com'
            if (hostname.includes('.com')) {
                // For '.com', return the second-to-last part
                return parts[parts.length - 2]; 
            } else {
                // For other domains, return the third-to-last part
                return parts[parts.length - 3]; 
            }
        } catch (error) {
            console.error('Invalid URL:', url);
            return 'Unknown Site'; // Return 'Unknown Site' for invalid URLs
        }
    }
    

    function startTimer() {
        if (isRunning) {
            intervalId = setInterval(function() {
                totalSeconds++;
                updateDisplay();
            }, 1000);
        }
    }

    function updateDisplay() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        document.getElementById('timeSpent').textContent = 
            (hours > 0 ? hours + ':' : '') + 
            (minutes < 10 ? '0' : '') + minutes + ':' + 
            (seconds < 10 ? '0' : '') + seconds;
    }

    // Automatically start the timer when the popup opens
    startTimer();
    showCurrentWebsite();
});
