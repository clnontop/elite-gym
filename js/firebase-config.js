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

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, push, set, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Database helper functions
class FirebaseDB {
    // Members
    static addMember(memberData) {
        const membersRef = ref(database, 'members');
        return push(membersRef, {
            ...memberData,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    }

    static updateMember(memberId, memberData) {
        const memberRef = ref(database, `members/${memberId}`);
        return set(memberRef, {
            ...memberData,
            updatedAt: Date.now()
        });
    }

    static deleteMember(memberId) {
        const memberRef = ref(database, `members/${memberId}`);
        return remove(memberRef);
    }

    static onMembersChange(callback) {
        const membersRef = ref(database, 'members');
        return onValue(membersRef, (snapshot) => {
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
        const paymentsRef = ref(database, 'payments');
        return push(paymentsRef, {
            ...paymentData,
            createdAt: Date.now()
        });
    }

    static onPaymentsChange(callback) {
        const paymentsRef = ref(database, 'payments');
        return onValue(paymentsRef, (snapshot) => {
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
        const activityRef = ref(database, 'activities');
        return push(activityRef, {
            ...activity,
            timestamp: Date.now(),
            user: localStorage.getItem('gymflow_admin_user') || 'Admin'
        });
    }

    static onActivitiesChange(callback) {
        const activitiesRef = ref(database, 'activities');
        return onValue(activitiesRef, (snapshot) => {
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
