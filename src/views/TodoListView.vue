<template>
  <div class="todo-list-container">
    <!-- Modern header -->
    <header class="header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <Icon name="check-square" size="xl" class="header-icon" />
        </div>
        <div class="header-text">
          <h1 class="header-title">Todo List</h1>
          <p class="header-subtitle">{{ store.totalCount.value }} {{ store.totalCount.value === 1 ? 'task' : 'tasks' }} • {{ store.completedCount.value }} completed</p>
        </div>
      </div>
    </header>

    <!-- Add Task Form -->
    <div class="add-task-form">
      <div class="input-row">
        <input 
          v-model="newTaskTitle" 
          @keyup.enter="handleAddTask"
          placeholder="Add new task..." 
          class="input-field"
        />
        <button @click="handleAddTask" class="add-btn">+</button>
      </div>
      
      <div class="priority-row">
        <select v-model="selectedPriority" class="priority-select">
          <option v-for="priority in store.state.priorities" :key="priority" :value="priority">
            {{ priority.charAt(0).toUpperCase() + priority.slice(1) }} Priority
          </option>
        </select>
      </div>
    </div>

    <div class="list-content">
      <!-- Pending Tasks -->
      <div v-if="store.pendingTasks.value.length > 0" class="task-section">
        <h2 class="section-title">Pending ({{ store.pendingTasks.value.length }})</h2>
        <div class="task-list">
          <div 
            v-for="task in sortedPendingTasks" 
            :key="task.id"
            class="task-item"
            :class="{ 'priority-high': task.priority === 'high', 'priority-medium': task.priority === 'medium', 'priority-low': task.priority === 'low' }"
          >
            <label class="checkbox-container">
              <input 
                type="checkbox" 
                :checked="task.completed" 
                @change="store.toggleTask(task.id)"
              />
              <span class="checkmark"></span>
            </label>
            <span class="task-title">{{ task.title }}</span>
            <span class="priority-badge" :class="`priority-${task.priority}`">
              {{ task.priority }}
            </span>
            <button @click="store.deleteTask(task.id)" class="delete-btn" title="Delete task">
              <span class="delete-icon">×</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Completed Tasks -->
      <div v-if="store.completedTasks.value.length > 0" class="task-section">
        <h2 class="section-title">Completed ({{ store.completedTasks.value.length }})</h2>
        <div class="task-list">
          <div 
            v-for="task in store.completedTasks.value" 
            :key="task.id"
            class="task-item completed"
          >
            <label class="checkbox-container">
              <input 
                type="checkbox" 
                :checked="task.completed" 
                @change="store.toggleTask(task.id)"
              />
              <span class="checkmark"></span>
            </label>
            <span class="task-title">{{ task.title }}</span>
            <button @click="store.deleteTask(task.id)" class="delete-btn" title="Delete task">
              <span class="delete-icon">×</span>
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="store.totalCount.value === 0" class="empty-state">
        <div class="empty-icon-wrapper">
          <Icon name="file-text" size="xl" class="empty-icon" />
        </div>
        <h3 class="empty-text">No tasks yet</h3>
        <p class="empty-subtext">Start by adding your first task above</p>
      </div>
    </div>
    <Nav @navigate="$emit('navigate', $event)" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Nav from '../components/nav.vue';
import Icon from '../components/Icon.vue';
import { todoListStore as store } from '../stores/todoList';

defineEmits(['navigate']);

const newTaskTitle = ref('');
const selectedPriority = ref('medium');

const sortedPendingTasks = computed(() => {
  const tasks = [...store.pendingTasks.value];
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
});

const handleAddTask = () => {
  if (newTaskTitle.value.trim()) {
    store.addTask(newTaskTitle.value.trim(), selectedPriority.value);
    newTaskTitle.value = '';
    selectedPriority.value = 'medium';
  }
};
</script>

<style scoped>
.todo-list-container {
  padding: var(--spacing-lg);
  padding-bottom: 140px;
  max-width: 640px;
  margin: 0 auto;
  color: white;
  min-height: 100vh;
  background: transparent;
}

/* Modern header */
.header {
  margin-bottom: var(--spacing-xl);
  padding-top: var(--spacing-md);
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.header-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 149, 0, 0.2), rgba(255, 59, 48, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.header-icon {
  width: 28px;
  height: 28px;
  color: rgba(255, 255, 255, 0.95);
}

.header-text {
  flex: 1;
  min-width: 0;
}

.header-title {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.8px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.2;
}

.header-subtitle {
  margin: 4px 0 0 0;
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: -0.2px;
}

.add-task-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  background: rgba(255, 255, 255, 0.08);
  padding: var(--spacing-lg);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.add-task-form:hover {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.16);
}

.input-row {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.priority-row {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.input-field {
  flex: 1;
  min-width: 0;
  padding: 16px 18px;
  border: none;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.input-field:focus {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.08);
  transform: translateY(-1px);
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.priority-select {
  flex: 1;
  min-width: 0;
  padding: 16px 18px;
  border: none;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.priority-select:hover {
  background: rgba(255, 255, 255, 0.16);
}

.priority-select:focus {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.08);
}

.priority-select option {
  background: #1a1a1a;
  color: white;
  padding: 12px;
}

.add-btn {
  min-width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #34C759, #30B350);
  color: white;
  font-size: 32px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 16px rgba(52, 199, 89, 0.4);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 199, 89, 0.5);
}

.add-btn:active {
  transform: translateY(0) scale(0.96);
  box-shadow: 0 2px 12px rgba(52, 199, 89, 0.4);
}

.list-content {
  animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.task-section {
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 var(--spacing-md) 0;
  color: rgba(255, 255, 255, 0.9);
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.task-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background: rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.06);
  min-height: 64px;
  gap: var(--spacing-md);
  backdrop-filter: blur(10px);
}

.task-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateX(4px);
}

.task-item.priority-high {
  border-left: 4px solid #FF3B30;
  background: rgba(255, 59, 48, 0.05);
}

.task-item.priority-medium {
  border-left: 4px solid #FF9500;
  background: rgba(255, 149, 0, 0.05);
}

.task-item.priority-low {
  border-left: 4px solid #34C759;
  background: rgba(52, 199, 89, 0.05);
}

.task-item:active {
  background: rgba(255, 255, 255, 0.12);
  transform: translateX(2px) scale(0.99);
}

.task-item.completed {
  opacity: 0.5;
}

.task-item.completed .task-title {
  text-decoration: line-through;
}

.task-title {
  flex: 1;
  font-size: 17px;
  line-height: 1.5;
  font-weight: 400;
  color: white;
  min-width: 0;
}

.priority-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.priority-badge.priority-high {
  background: rgba(255, 59, 48, 0.2);
  color: #FF3B30;
}

.priority-badge.priority-medium {
  background: rgba(255, 149, 0, 0.2);
  color: #FF9500;
}

.priority-badge.priority-low {
  background: rgba(52, 199, 89, 0.2);
  color: #34C759;
}

.delete-btn {
  min-width: 44px;
  min-height: 44px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
}

.delete-icon {
  font-size: 32px;
  line-height: 1;
}

.delete-btn:active {
  color: #FF3B30;
  transform: scale(1.15);
}

/* iOS-style Checkbox */
.checkbox-container {
  display: block;
  position: relative;
  min-width: 24px;
  min-height: 44px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  height: 24px;
  width: 24px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  transition: all 0.2s;
}

.checkbox-container:hover .checkmark {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.checkbox-container input:checked ~ .checkmark {
  background: #34C759;
  border-color: #34C759;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.empty-state {
  text-align: center;
  padding: 80px var(--spacing-xl);
  animation: fadeIn 0.5s ease-out 0.2s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.empty-icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-lg);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.empty-icon {
  width: 40px;
  height: 40px;
  opacity: 0.4;
  color: rgba(255, 255, 255, 0.5);
}

.empty-text {
  font-size: 22px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 var(--spacing-sm) 0;
  letter-spacing: -0.3px;
}

.empty-subtext {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
}

/* Mobile adjustments */
@media (max-width: 600px) {
  .todo-list-container {
    padding: var(--spacing-md);
    padding-bottom: 140px;
  }
  
  .header-title {
    font-size: 28px;
  }
  
  .header-icon-wrapper {
    width: 48px;
    height: 48px;
  }
  
  .header-icon {
    width: 24px;
    height: 24px;
  }
  
  .header-subtitle {
    font-size: 14px;
  }
}
</style>

