// Authentication utility for GymFlow Dashboard
class GymFlowAuth {
    constructor() {
        this.storageKey = 'gymflow_admin_logged_in';
        this.usernameKey = 'gymflow_admin_username';
        this.loginTimeKey = 'gymflow_login_time';
        this.sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    }

    // Check if user is authenticated
    isAuthenticated() {
        const isLoggedIn = localStorage.getItem(this.storageKey) === 'true';
        const loginTime = localStorage.getItem(this.loginTimeKey);
        
        if (!isLoggedIn || !loginTime) {
            return false;
        }

        // Check if session has expired
        const loginTimestamp = new Date(loginTime).getTime();
        const currentTime = new Date().getTime();
        const sessionAge = currentTime - loginTimestamp;

        if (sessionAge > this.sessionTimeout) {
            this.logout();
            return false;
        }

        return true;
    }

    // Get current admin username
    getCurrentUser() {
        return localStorage.getItem(this.usernameKey);
    }

    // Logout user
    logout() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.usernameKey);
        localStorage.removeItem(this.loginTimeKey);
        window.location.href = '/login.html';
    }

    // Protect page - redirect to login if not authenticated
    protectPage() {
        if (!this.isAuthenticated()) {
            // Store current page for redirect after login
            localStorage.setItem('gymflow_redirect_after_login', window.location.pathname);
            window.location.href = '/login.html';
            return false;
        }
        return true;
    }

    // Initialize authentication for protected pages
    init() {
        // Don't protect login page
        if (window.location.pathname.includes('login.html')) {
            return;
        }

        // Protect all other pages
        this.protectPage();

        // Add logout functionality to any logout buttons
        const logoutButtons = document.querySelectorAll('[data-logout]');
        logoutButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        });

        // Add user info display
        this.displayUserInfo();
    }

    // Display current user info in header
    displayUserInfo() {
        const userInfoElements = document.querySelectorAll('[data-user-info]');
        const currentUser = this.getCurrentUser();
        
        userInfoElements.forEach(element => {
            element.textContent = currentUser || 'Admin';
        });
    }

    // Extend session on user activity
    extendSession() {
        if (this.isAuthenticated()) {
            localStorage.setItem(this.loginTimeKey, new Date().toISOString());
        }
    }
}

// Create global auth instance
window.gymflowAuth = new GymFlowAuth();

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.gymflowAuth.init();
    
    // Extend session on user activity
    ['click', 'keypress', 'scroll', 'mousemove'].forEach(event => {
        document.addEventListener(event, () => {
            window.gymflowAuth.extendSession();
        }, { passive: true, once: false });
    });
});

// Handle redirect after login
if (window.location.pathname.includes('login.html') && window.gymflowAuth.isAuthenticated()) {
    const redirectPath = localStorage.getItem('gymflow_redirect_after_login') || '/pages/member_management_dashboard.html';
    localStorage.removeItem('gymflow_redirect_after_login');
    window.location.href = redirectPath;
}
