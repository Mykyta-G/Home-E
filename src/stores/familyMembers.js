import { reactive } from 'vue';

// Load initial state from localStorage or use defaults
const loadState = () => {
    const saved = localStorage.getItem('family-members-state');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse saved family members state:', e);
        }
    }
    // Default members if nothing is saved
    return {
        members: [
            {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: 'Guardian'
            },
            {
                id: 2,
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                role: 'Guardian'
            },
            {
                id: 3,
                name: 'Alice Doe',
                email: 'alice.doe@example.com',
                role: 'Kid'
            },
            {
                id: 4,
                name: 'Bob Doe',
                email: 'bob.doe@example.com',
                role: 'Kid'
            }
        ],
        currentUserId: 1
    };
};

const state = reactive(loadState());

// Save state to localStorage and trigger custom event
const saveState = () => {
    const stateData = {
        members: state.members,
        currentUserId: state.currentUserId
    };
    localStorage.setItem('family-members-state', JSON.stringify(stateData));

    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('family-members-update', { detail: stateData }));
};

// Listen for storage events from OTHER tabs
window.addEventListener('storage', (event) => {
    if (event.key === 'family-members-state' && event.newValue) {
        try {
            const newState = JSON.parse(event.newValue);
            state.members = newState.members || [];
            state.currentUserId = newState.currentUserId || 1;
        } catch (e) {
            console.error('Failed to sync family members state from other tab:', e);
        }
    }
});

// Listen for custom events from THIS tab (for real-time UI updates)
window.addEventListener('family-members-update', (event) => {
    // Update is already in state, this is just for potential future use
});

// Poll for changes every 2 seconds as backup (catches all edge cases)
setInterval(() => {
    const saved = localStorage.getItem('family-members-state');
    if (saved) {
        try {
            const savedState = JSON.parse(saved);
            // Only update if there are actual differences
            if (JSON.stringify(state.members) !== JSON.stringify(savedState.members) ||
                state.currentUserId !== savedState.currentUserId) {
                state.members = savedState.members;
                state.currentUserId = savedState.currentUserId;
            }
        } catch (e) {
            // Ignore parse errors
        }
    }
}, 2000);

const addMember = (name, email, role = 'Kid') => {
    const newId = state.members.length > 0 
        ? Math.max(...state.members.map(m => m.id)) + 1 
        : 1;
    const newMember = {
        id: newId,
        name: name.trim(),
        email: email.trim(),
        role: role
    };
    state.members.push(newMember);
    saveState();
    return newMember;
};

const removeMember = (id) => {
    state.members = state.members.filter(m => m.id !== id);
    saveState();
};

const updateMember = (id, updates) => {
    const member = state.members.find(m => m.id === id);
    if (member) {
        Object.assign(member, updates);
        saveState();
    }
};

const toggleGuardian = (id) => {
    const member = state.members.find(m => m.id === id);
    if (member) {
        member.role = member.role === 'Guardian' ? 'Kid' : 'Guardian';
        saveState();
    }
};

export const familyMembersStore = {
    state,
    addMember,
    removeMember,
    updateMember,
    toggleGuardian
};


