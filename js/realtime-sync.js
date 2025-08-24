// Real-time synchronization for Elite Gym Dashboard
class RealtimeSync {
    constructor() {
        this.isOnline = navigator.onLine;
        this.setupConnectionListener();
        this.initializeSync();
    }

    setupConnectionListener() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncLocalChanges();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    initializeSync() {
        if (typeof FirebaseDB !== 'undefined') {
            this.setupFirebaseSync();
        } else {
            // Fallback to localStorage with periodic sync
            this.setupLocalStorageSync();
        }
    }

    setupFirebaseSync() {
        // Listen for member changes
        FirebaseDB.onMembersChange((members) => {
            this.updateLocalMembers(members);
            this.notifyMemberChanges();
        });

        // Listen for payment changes
        FirebaseDB.onPaymentsChange((payments) => {
            this.updateLocalPayments(payments);
            this.notifyPaymentChanges();
        });

        // Listen for activity changes
        FirebaseDB.onActivitiesChange((activities) => {
            this.updateLocalActivities(activities);
            this.notifyActivityChanges();
        });
    }

    setupLocalStorageSync() {
        // Fallback sync using localStorage and periodic checks
        setInterval(() => {
            this.syncWithLocalStorage();
        }, 5000); // Check every 5 seconds
    }

    // Member synchronization
    addMember(memberData) {
        if (this.isOnline && typeof FirebaseDB !== 'undefined') {
            FirebaseDB.addMember(memberData).then(() => {
                FirebaseDB.logActivity({
                    type: 'member_added',
                    description: `New member registered: ${memberData.fullName}`,
                    data: memberData
                });
            });
        } else {
            this.addToLocalQueue('addMember', memberData);
        }
    }

    updateMember(memberId, memberData) {
        if (this.isOnline && typeof FirebaseDB !== 'undefined') {
            FirebaseDB.updateMember(memberId, memberData).then(() => {
                FirebaseDB.logActivity({
                    type: 'member_updated',
                    description: `Member updated: ${memberData.fullName}`,
                    data: memberData
                });
            });
        } else {
            this.addToLocalQueue('updateMember', { memberId, memberData });
        }
    }

    deleteMember(memberId, memberName) {
        if (this.isOnline && typeof FirebaseDB !== 'undefined') {
            FirebaseDB.deleteMember(memberId).then(() => {
                FirebaseDB.logActivity({
                    type: 'member_deleted',
                    description: `Member deleted: ${memberName}`,
                    data: { memberId, memberName }
                });
            });
        } else {
            this.addToLocalQueue('deleteMember', { memberId, memberName });
        }
    }

    // Payment synchronization
    addPayment(paymentData) {
        if (this.isOnline && typeof FirebaseDB !== 'undefined') {
            FirebaseDB.addPayment(paymentData).then(() => {
                FirebaseDB.logActivity({
                    type: 'payment_added',
                    description: `Payment recorded: $${paymentData.amount} for ${paymentData.memberName}`,
                    data: paymentData
                });
            });
        } else {
            this.addToLocalQueue('addPayment', paymentData);
        }
    }

    // Local storage helpers
    updateLocalMembers(members) {
        localStorage.setItem('elite_gym_members', JSON.stringify(members));
        // Trigger custom event for UI updates
        window.dispatchEvent(new CustomEvent('membersUpdated', { detail: members }));
    }

    updateLocalPayments(payments) {
        localStorage.setItem('elite_gym_payments', JSON.stringify(payments));
        window.dispatchEvent(new CustomEvent('paymentsUpdated', { detail: payments }));
    }

    updateLocalActivities(activities) {
        localStorage.setItem('elite_gym_activities', JSON.stringify(activities));
        window.dispatchEvent(new CustomEvent('activitiesUpdated', { detail: activities }));
    }

    // Offline queue management
    addToLocalQueue(action, data) {
        const queue = JSON.parse(localStorage.getItem('elite_gym_sync_queue') || '[]');
        queue.push({
            action,
            data,
            timestamp: Date.now()
        });
        localStorage.setItem('elite_gym_sync_queue', JSON.stringify(queue));
    }

    syncLocalChanges() {
        const queue = JSON.parse(localStorage.getItem('elite_gym_sync_queue') || '[]');
        
        queue.forEach(item => {
            switch(item.action) {
                case 'addMember':
                    this.addMember(item.data);
                    break;
                case 'updateMember':
                    this.updateMember(item.data.memberId, item.data.memberData);
                    break;
                case 'deleteMember':
                    this.deleteMember(item.data.memberId, item.data.memberName);
                    break;
                case 'addPayment':
                    this.addPayment(item.data);
                    break;
            }
        });

        // Clear the queue after syncing
        localStorage.removeItem('elite_gym_sync_queue');
    }

    // Notification helpers
    notifyMemberChanges() {
        this.showSyncNotification('Member data synchronized');
    }

    notifyPaymentChanges() {
        this.showSyncNotification('Payment data synchronized');
    }

    notifyActivityChanges() {
        // Update activity indicators if visible
        const activityIndicator = document.querySelector('.activity-indicator');
        if (activityIndicator) {
            activityIndicator.classList.add('pulse');
            setTimeout(() => activityIndicator.classList.remove('pulse'), 1000);
        }
    }

    showSyncNotification(message) {
        // Create a subtle sync notification
        const notification = document.createElement('div');
        notification.className = 'sync-notification fixed top-4 right-4 bg-success text-white px-4 py-2 rounded-md shadow-lg z-50 opacity-0 transition-opacity duration-300';
        notification.innerHTML = `
            <div class="flex items-center">
                <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Fade in
        setTimeout(() => notification.classList.remove('opacity-0'), 100);
        
        // Fade out and remove
        setTimeout(() => {
            notification.classList.add('opacity-0');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Get local data
    getLocalMembers() {
        return JSON.parse(localStorage.getItem('elite_gym_members') || '[]');
    }

    getLocalPayments() {
        return JSON.parse(localStorage.getItem('elite_gym_payments') || '[]');
    }

    getLocalActivities() {
        return JSON.parse(localStorage.getItem('elite_gym_activities') || '[]');
    }
}

// Initialize real-time sync
const realtimeSync = new RealtimeSync();
window.realtimeSync = realtimeSync;
