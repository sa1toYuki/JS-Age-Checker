/* ═══════════════════════════════════════════════════
   CONFIGURATION – CUSTOMIZE ACCORDING TO YOUR PROJECT
═══════════════════════════════════════════════════ */
const CONFIG = {
    // Destination folder when the user confirms they are 18+
    redirectIfAllowed : '#your-projetct-folder',

    // Destination URL when the user claims to be under 18
    redirectIfDenied  : 'https://www.google.com',

    // Cookie name
    cookieName        : 'age_verified',

    // Cookie duration in days
    cookieDays        : 30,
};

/* ═══════════════════════════════════════════════════
   COOKIE FUNCTION
═══════════════════════════════════════════════════ */
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
    return document.cookie.split('; ').reduce((acc, part) => {
        const [k, v] = part.split('=');
        return k === name ? decodeURIComponent(v) : acc;
    }, null);
}

/* ═══════════════════════════════════════════════════
   Core Logic
═══════════════════════════════════════════════════ */
function confirmAge() {
    setCookie(CONFIG.cookieName, 'allowed', CONFIG.cookieDays);
    window.location.href = CONFIG.redirectIfAllowed;
}

function denyAge() {
    // Blocking cookie — long duration (365 days)
    setCookie(CONFIG.cookieName, 'blocked', 365);
    window.location.href = CONFIG.redirectIfDenied;
}

// Check cookie when loading the page
(function checkOnLoad() {
    const status = getCookie(CONFIG.cookieName);

    if (status === 'allowed') {
        // Already verified — go straight to the website
        window.location.replace(CONFIG.redirectIfAllowed);

    } else if (status === 'blocked') {
        // Locked — displays the lock screen instead of redirecting
        document.getElementById('age-gate').style.display = 'none';
        const blocked = document.getElementById('blocked-screen');
        blocked.style.display = 'flex';

        // Redirects after 10 seconds with the message visible
        setTimeout(() => {
            window.location.href = CONFIG.redirectIfDenied;
        }, 10000);
    }
    // If null → displays the 
})();
