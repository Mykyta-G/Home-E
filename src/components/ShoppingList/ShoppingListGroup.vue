<template>
  <div class="category-group">
    <h3 class="category-title">{{ title }}</h3>
    <ul class="items-list">
      <ShoppingListItem 
        v-for="item in items" 
        :key="item.id" 
        :item="item"
        @toggle="$emit('toggle', $event)"
        @delete="$emit('delete', $event)"
      />
    </ul>
  </div>
</template>

<script setup>
import ShoppingListItem from './ShoppingListItem.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});

defineEmits(['toggle', 'delete']);
</script>

<style scoped>
.category-group {
  margin-bottom: 20px;
}

.category-title {
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 5px;
}

.items-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
