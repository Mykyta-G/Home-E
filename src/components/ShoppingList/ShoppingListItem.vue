<template>
  <li class="item-row" :class="{ completed: item.completed }">
    <label class="checkbox-container">
      <input 
        type="checkbox" 
        :checked="item.completed" 
        @change="$emit('toggle', item.id)"
      />
      <span class="checkmark"></span>
    </label>
    <span class="item-name">{{ item.name }}</span>
    <button @click="$emit('delete', item.id)" class="delete-btn">×</button>
  </li>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
});

defineEmits(['toggle', 'delete']);
</script>

<style scoped>
.item-row {
  display: flex;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.item-row:hover {
  background: rgba(255, 255, 255, 0.1);
}

.item-row.completed .item-name {
  text-decoration: line-through;
  opacity: 0.5;
}

.item-name {
  flex: 1;
  margin-left: 10px;
  font-size: 1.1em;
}

.delete-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.5em;
  cursor: pointer;
  padding: 0 5px;
}

.delete-btn:hover {
  color: #ff4444;
}

/* Custom Checkbox */
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: rgba(255, 255, 255, 0.3);
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #4CAF50;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
