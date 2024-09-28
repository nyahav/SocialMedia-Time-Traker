document.addEventListener('DOMContentLoaded', function() {
    let isRunning = true; // Automatically set to true
    let intervalId;
    let totalSeconds = 0;

    // List of known social media websites
    const socialMediaSites = [
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'snapchat',
        'tiktok',
        'pinterest',
        'youtube',
        'reddit',
        'whatsapp',
        'twitch'
    ];
    const siteColors = {
        facebook: '#3b5998',  // צבע פייסבוק
        twitter: '#1DA1F2',   // צבע טוויטר
        instagram: '#C13584', // צבע אינסטגרם
        linkedin: '#0077B5',  // צבע לינקדאין
        snapchat: '#FFFC00',   // צבע סנאפצ'ט
        tiktok: '#69C9D0',     // צבע טיקטוק
        pinterest: '#E60023',  // צבע פינטרסט
        youtube: '#FF0000',    // צבע יוטיוב
        reddit: '#FF4500',     // צבע רדיט
        whatsapp: '#25D366',   // צבע וואטסאפ
        twitch: '#9146FF'      // צבע טוויץ'
    };
    function showCurrentWebsite() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const currentTab = tabs[0];
            const url = currentTab.url;

            if (url) {
                const siteName = getSiteName(url);
                setBackgroundColorForSite(siteName); 
                document.getElementById('currentUrl').textContent = 'Current Website: ' + siteName;

                // Check if the site is a known social media site
                if (socialMediaSites.includes(siteName)) {
                    document.getElementById('socialMediaIndicator').textContent = 'This is a social media site!';
                } else {
                    document.getElementById('socialMediaIndicator').textContent = 'This is NOT a social media site.';
                }
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
    function setBackgroundColorForSite(siteName) {
        const color = siteColors[siteName]; // קבל את צבע הרקע מהאובייקט
    
        if (color) {
            document.body.style.backgroundColor = color; // שנה את צבע הרקע
        } else {
            document.body.style.backgroundColor = 'white'; // צבע ברירת מחדל
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
