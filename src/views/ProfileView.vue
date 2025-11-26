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
            <h3 class="user-name">{{ user.name }}</h3>
            <p class="user-email">{{ user.email }}</p>
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
          <div 
            v-for="family in user.families" 
            :key="family.id" 
            class="family-card"
          >
            <div class="family-header">
              <span class="family-name">{{ family.name }}</span>
            </div>
            <div class="family-details">
              <span class="family-role">{{ family.role }}</span>
              <span class="family-members">{{ family.memberCount }} members</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats Section -->
      <div class="section">
        <h3 class="section-title">Quick Stats</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">🛒</div>
            <div class="stat-value">{{ stats.activeLists }}</div>
            <div class="stat-label">Active Lists</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-value">{{ stats.completedTasks }}</div>
            <div class="stat-label">Completed Tasks</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🗓️</div>
            <div class="stat-value">{{ stats.upcomingEvents }}</div>
            <div class="stat-label">Upcoming Events</div>
          </div>
        </div>
      </div>

    </div>

    <Nav :currentView="currentView" @navigate="$emit('navigate', $event)" />
  </div>
</template>

<script>
import Nav from '../components/nav.vue';

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
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Administrator',
        families: [
          {
            id: 1,
            name: 'The Doe Family',
            role: 'Administrator',
            memberCount: 4
          },
          {
            id: 2,
            name: 'Smith-Doe Family',
            role: 'Member',
            memberCount: 3
          }
        ]
      },
      stats: {
        activeLists: 3,
        completedTasks: 12,
        upcomingEvents: 5
      }
    };
  },
  computed: {
    userInitial() {
      return this.user.name.charAt(0).toUpperCase();
    },
    roleClass() {
      const role = this.user.role.toLowerCase();
      if (role.includes('admin')) return 'role-admin';
      if (role.includes('parent') || role.includes('guardian')) return 'role-parent';
      return 'role-member';
    },
    isAdmin() {
      return this.user.role.toLowerCase().includes('admin');
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
  background: var(--secondary-color);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  background: var(--secondary-color);
  border-radius: 15px;
  padding: 20px;
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
  background: var(--tertiary-color);
  border-radius: 12px;
  padding: 16px;
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

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat-card {
  background: var(--tertiary-color);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: scale(1.05);
}

.stat-icon {
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.8;
}
</style>

