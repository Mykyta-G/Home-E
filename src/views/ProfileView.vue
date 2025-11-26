<template>
  <div class="profile-container">
    <header class="header">
      <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
      <h2>Profile</h2>
    </header>

    <div class="profile-content">
      <!-- User Info Card -->
      <div class="profile-card">
        <div class="avatar-section">
          <div class="avatar">
            <span class="avatar-initial">{{ userInitial }}</span>
          </div>
          <div class="user-info">
            <h3 class="user-name">{{ currentUser.name }}</h3>
            <p class="user-email">{{ currentUser.email }}</p>
          </div>
        </div>
        <div class="role-badge" :class="roleClass" v-if="isAdmin">
          <svg class="crown-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/>
          </svg>
        </div>
      </div>

      <!-- Family Groups Section -->
      <div class="section">
        <h3 class="section-title">My Families</h3>
        <div class="family-list">
          <div class="family-card">
            <div class="family-header">
              <span class="family-name">The Family</span>
            </div>
            <div class="family-details">
              <span class="family-role">{{ currentUser.role }}</span>
              <span class="family-members">{{ familyMembersStore.state.members.length }} members</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Family Members Section -->
      <div class="section">
        <h3 class="section-title">Family Members</h3>
        <div class="members-list">
          <div 
            v-for="member in familyMembersStore.state.members" 
            :key="member.id" 
            class="member-card"
          >
            <div class="member-avatar">
              <span class="member-initial">{{ getInitial(member.name) }}</span>
            </div>
            <div class="member-info">
              <div class="member-name-row">
                <span class="member-name">{{ member.name }}</span>
                <div class="member-role-badge" :class="getMemberRoleClass(member.role)" v-if="isMemberGuardian(member.role)">
                  <svg class="member-crown-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/>
                  </svg>
                </div>
              </div>
              <span class="member-email">{{ member.email }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <Nav :currentView="currentView" @navigate="$emit('navigate', $event)" />
  </div>
</template>

<script>
import Nav from '../components/nav.vue';
import { familyMembersStore } from '../stores/familyMembers.js';

export default {
  name: 'ProfileView',
  components: {
    Nav,
  },
  props: {
    currentView: {
      type: String,
      default: 'ProfileView'
    }
  },
  emits: ['navigate'],
  data() {
    return {
      familyMembersStore: familyMembersStore
    };
  },
  computed: {
    currentUser() {
      const user = this.familyMembersStore.state.members.find(
        m => m.id === this.familyMembersStore.state.currentUserId
      );
      return user || this.familyMembersStore.state.members[0] || {
        name: 'User',
        email: 'user@example.com',
        role: 'Guardian'
      };
    },
    userInitial() {
      return this.currentUser.name.charAt(0).toUpperCase();
    },
    roleClass() {
      const role = this.currentUser.role.toLowerCase();
      if (role.includes('admin')) return 'role-admin';
      if (role.includes('parent') || role.includes('guardian')) return 'role-parent';
      return 'role-member';
    },
    isAdmin() {
      return this.currentUser.role.toLowerCase().includes('admin') || 
             this.currentUser.role.toLowerCase().includes('guardian');
    }
  },
  methods: {
    getInitial(name) {
      return name.charAt(0).toUpperCase();
    },
    getMemberRoleClass(role) {
      const roleLower = role.toLowerCase();
      if (roleLower.includes('admin')) return 'member-role-admin';
      if (roleLower.includes('parent') || roleLower.includes('guardian')) return 'member-role-parent';
      return 'member-role-member';
    },
    isMemberGuardian(role) {
      return role.toLowerCase().includes('guardian');
    }
  }
};
</script>

<style scoped>
.profile-container {
  padding: 20px;
  padding-bottom: 100px;
  max-width: 600px;
  margin: 0 auto;
  color: white;
  min-height: 100vh;
  background: transparent;
}

.header {
  margin-bottom: 24px;
  text-align: center;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.header-icon {
  width: 28px;
  height: 28px;
  color: white;
}

.header h2 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Profile Card */
.profile-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--tertiary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
}

.user-name {
  margin: 0 0 4px 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.user-email {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.role-badge {
  padding: 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.role-admin {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.crown-icon {
  width: 20px;
  height: 20px;
  color: #ffc107;
}

.role-parent {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.role-member {
  background: rgba(33, 150, 243, 0.2);
  color: #2196f3;
  border: 1px solid rgba(33, 150, 243, 0.3);
}

/* Section */
.section {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.section-title {
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  font-weight: 600;
}

/* Family List */
.family-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.family-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.family-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.family-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.family-name {
  font-size: 1.1rem;
  font-weight: 600;
}

.family-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  opacity: 0.9;
}

.family-role {
  text-transform: capitalize;
}

/* Members List */
.members-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.member-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.member-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.member-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
}

.member-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.member-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.member-name {
  font-size: 1rem;
  font-weight: 600;
}

.member-role-badge {
  padding: 4px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.member-role-admin {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.member-crown-icon {
  width: 14px;
  height: 14px;
  color: #ffc107;
}

.member-email {
  font-size: 0.85rem;
  opacity: 0.8;
}

.member-role {
  font-size: 0.85rem;
  opacity: 0.8;
  text-transform: capitalize;
}
</style>

