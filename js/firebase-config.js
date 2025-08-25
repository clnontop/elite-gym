// Firebase Configuration
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "elite-gym-dashboard.firebaseapp.com",
    databaseURL: "https://elite-gym-dashboard-default-rtdb.firebaseio.com",
    projectId: "elite-gym-dashboard",
    storageBucket: "elite-gym-dashboard.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id-here"
};

// Initialize Firebase (using CDN version for compatibility)
let app, database;

// Check if Firebase is available
if (typeof firebase !== 'undefined') {
    app = firebase.initializeApp(firebaseConfig);
    database = firebase.database();
} else {
    console.warn('Firebase not loaded, using localStorage fallback');
}

// Database helper functions
class FirebaseDB {
    // Members
    static addMember(memberData) {
        if (!database) return Promise.resolve();
        const membersRef = database.ref('members');
        return membersRef.push({
            ...memberData,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    }

    static updateMember(memberId, memberData) {
        if (!database) return Promise.resolve();
        const memberRef = database.ref(`members/${memberId}`);
        return memberRef.set({
            ...memberData,
            updatedAt: Date.now()
        });
    }

    static deleteMember(memberId) {
        if (!database) return Promise.resolve();
        const memberRef = database.ref(`members/${memberId}`);
        return memberRef.remove();
    }

    static onMembersChange(callback) {
        if (!database) return;
        const membersRef = database.ref('members');
        return membersRef.on('value', (snapshot) => {
            const data = snapshot.val();
            const members = data ? Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })) : [];
            callback(members);
        });
    }

    // Payments
    static addPayment(paymentData) {
        if (!database) return Promise.resolve();
        const paymentsRef = database.ref('payments');
        return paymentsRef.push({
            ...paymentData,
            createdAt: Date.now()
        });
    }

    static onPaymentsChange(callback) {
        if (!database) return;
        const paymentsRef = database.ref('payments');
        return paymentsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            const payments = data ? Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })) : [];
            callback(payments);
        });
    }

    // Activity Log
    static logActivity(activity) {
        if (!database) return Promise.resolve();
        const activityRef = database.ref('activities');
        return activityRef.push({
            ...activity,
            timestamp: Date.now(),
            user: localStorage.getItem('gymflow_admin_username') || 'Admin'
        });
    }

    static onActivitiesChange(callback) {
        if (!database) return;
        const activitiesRef = database.ref('activities');
        return activitiesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            const activities = data ? Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })).sort((a, b) => b.timestamp - a.timestamp) : [];
            callback(activities);
        });
    }
}

// Export for use in other files
window.FirebaseDB = FirebaseDB;
