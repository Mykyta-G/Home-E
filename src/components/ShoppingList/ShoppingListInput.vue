<template>
  <div class="add-item-form">
    <input 
      v-model="newItemName" 
      @keyup.enter="submitItem"
      placeholder="Add new item..." 
      class="input-field"
    />
    <select v-model="selectedCategory" class="category-select">
      <option v-for="cat in categories" :key="cat" :value="cat">
        {{ cat }}
      </option>
    </select>
    <button @click="submitItem" class="add-btn">+</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['add-item']);

const newItemName = ref('');
const selectedCategory = ref(props.categories[0] || 'Other');

const submitItem = () => {
  if (newItemName.value.trim()) {
    emit('add-item', { name: newItemName.value, category: selectedCategory.value });
    newItemName.value = '';
  }
};
</script>

<style scoped>
.add-item-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 12px;
}

.input-field {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.category-select {
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.category-select option {
  background: #333;
  color: white;
}

.add-btn {
  padding: 0 20px;
  border: none;
  border-radius: 8px;
  background: #4CAF50;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-btn:hover {
  background: #45a049;
}
</style>
