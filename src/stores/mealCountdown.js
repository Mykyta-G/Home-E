import { reactive, computed } from 'vue';

const state = reactive({
  mealType: 'lunch', // 'lunch' or 'dinner'
  lunchDuration: 30, // Default lunch duration in minutes
  dinnerDuration: 30, // Default dinner duration in minutes
  message: 'Lunch will be served in', // Default message
  isActive: false, // Whether countdown is active
  targetTime: null, // Target time for countdown
  currentTimestamp: Date.now(), // Reactive timestamp that updates every second
});

// Computed values
const currentTargetTime = computed(() => {
  if (!state.isActive || !state.targetTime) return null;
  
  const now = new Date();
  const target = new Date(state.targetTime);
  
  // If target time has passed, return null
  if (target <= now) {
    return null;
  }
  
  return target;
});

const timeRemaining = computed(() => {
  const target = currentTargetTime.value;
  if (!target) return null;
  
  // Use reactive timestamp to trigger updates
  const now = new Date(state.currentTimestamp);
  const diff = target - now;
  
  if (diff <= 0) return null;
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return {
    hours,
    minutes,
    seconds,
    totalMinutes: Math.floor(diff / (1000 * 60)),
    totalSeconds: Math.floor(diff / 1000)
  };
});

const formattedTimeRemaining = computed(() => {
  const time = timeRemaining.value;
  if (!time) return '00:00:00';
  
  const formatNumber = (num) => String(num).padStart(2, '0');
  
  if (time.hours > 0) {
    return `${formatNumber(time.hours)}:${formatNumber(time.minutes)}:${formatNumber(time.seconds)}`;
  } else {
    return `${formatNumber(time.minutes)}:${formatNumber(time.seconds)}`;
  }
});

const humanReadableTimeRemaining = computed(() => {
  const time = timeRemaining.value;
  if (!time) return 'Time\'s up!';
  
  if (time.hours > 0) {
    return `${time.hours}h ${time.minutes}m`;
  } else if (time.minutes > 0) {
    return `${time.minutes}m ${time.seconds}s`;
  } else {
    return `${time.seconds}s`;
  }
});

// Methods
const setMealType = (type) => {
  state.mealType = type;
  updateMessage();
};

const setLunchDuration = (minutes) => {
  state.lunchDuration = Math.max(1, parseInt(minutes) || 30);
  if (state.isActive && state.mealType === 'lunch') {
    startCountdown();
  }
};

const setDinnerDuration = (minutes) => {
  state.dinnerDuration = Math.max(1, parseInt(minutes) || 30);
  if (state.isActive && state.mealType === 'dinner') {
    startCountdown();
  }
};

const setMessage = (message) => {
  state.message = message;
};

const updateMessage = () => {
  if (state.mealType === 'lunch') {
    state.message = 'Lunch will be served in';
  } else {
    state.message = 'Dinner will be served in';
  }
};

const sendNotification = () => {
  const durationMinutes = state.mealType === 'lunch' ? state.lunchDuration : state.dinnerDuration;
  
  // Format duration for message
  let durationText = '';
  if (durationMinutes >= 60) {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    durationText = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  } else {
    durationText = `${durationMinutes}m`;
  }
  
  const message = `${state.message} ${durationText}`;
  
  // Here you would integrate with your messaging system
  // For now, we'll use a simple console log
  console.log('Sending notification to all:', message);
  
  // TODO: Integrate with actual messaging API/service
  // Example: messagingService.sendToAll(message);
};

const startCountdown = () => {
  const durationMinutes = state.mealType === 'lunch' ? state.lunchDuration : state.dinnerDuration;
  
  const now = new Date();
  const target = new Date(now.getTime() + durationMinutes * 60 * 1000);
  
  state.targetTime = target.toISOString();
  state.isActive = true;
  updateMessage();
  
  // Automatically send notification when countdown starts
  sendNotification();
};

const stopCountdown = () => {
  state.isActive = false;
  state.targetTime = null;
};

const toggleCountdown = () => {
  if (state.isActive) {
    stopCountdown();
  } else {
    startCountdown();
  }
};

// Start interval to update timestamp every second
let intervalId = null;

const startTimer = () => {
  if (intervalId) return; // Already running
  
  intervalId = setInterval(() => {
    state.currentTimestamp = Date.now();
  }, 1000);
};

const stopTimer = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

// Start timer when module loads
startTimer();

export const mealCountdownStore = {
  state,
  currentTargetTime,
  timeRemaining,
  formattedTimeRemaining,
  humanReadableTimeRemaining,
  setMealType,
  setLunchDuration,
  setDinnerDuration,
  setMessage,
  startCountdown,
  stopCountdown,
  toggleCountdown,
};

