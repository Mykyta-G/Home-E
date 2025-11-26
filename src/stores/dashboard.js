import { reactive, watch } from 'vue';

const STORAGE_KEY = 'dashboard-widgets';

// Load widgets from localStorage
const loadWidgets = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load widgets from localStorage:', e);
  }
  return [];
};

// Calculate next widget ID based on existing widgets
const getNextWidgetId = (widgets) => {
  if (widgets.length === 0) return 1;
  const maxId = Math.max(...widgets.map(w => w.id || 0));
  return maxId + 1;
};

const initialState = loadWidgets();
let nextWidgetId = getNextWidgetId(initialState);

const state = reactive({
  widgets: initialState
});

// Save widgets to localStorage with debouncing
let saveTimeout = null;
const saveWidgets = () => {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  saveTimeout = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.widgets));
    } catch (e) {
      console.error('Failed to save widgets to localStorage:', e);
    }
  }, 300); // Debounce by 300ms
};

// Watch for changes and auto-save
watch(() => state.widgets, () => {
  saveWidgets();
}, { deep: true });

const addWidget = (type, config = {}) => {
  const widget = {
    id: nextWidgetId++,
    type: type,
    size: config.size || 'full',
    ...config
  };
  state.widgets.push(widget);
  return widget;
};

const removeWidget = (id) => {
  const index = state.widgets.findIndex(w => w.id === id);
  if (index !== -1) {
    state.widgets.splice(index, 1);
  }
};

const updateWidget = (id, updates) => {
  const widget = state.widgets.find(w => w.id === id);
  if (widget) {
    Object.assign(widget, updates);
  }
};

const reorderWidgets = (newOrder) => {
  state.widgets = newOrder;
};

const clearWidgets = () => {
  state.widgets = [];
  // Reset widget ID counter when clearing
  nextWidgetId = 1;
};

export const dashboardStore = {
  state,
  addWidget,
  removeWidget,
  updateWidget,
  reorderWidgets,
  clearWidgets
};

