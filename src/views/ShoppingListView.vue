<template>
  <div class="shopping-list-container">
    <header class="header">
      <h2>🛒 Shopping List</h2>
    </header>

    <ShoppingListInput 
      :categories="store.categories"
      @add-item="handleAddItem"
    />

    <div class="list-content">
      <template v-for="(items, category) in store.itemsByCategory" :key="category">
        <ShoppingListGroup 
          v-if="items.length > 0"
          :title="category"
          :items="items"
          @toggle="store.toggleItem"
          @delete="store.deleteItem"
        />
      </template>
    </div>
    <Nav />
  </div>
</template>

<script setup>
import Nav from '../components/Nav.vue';

import { useShoppingListStore } from '../stores/shoppingList';
import ShoppingListInput from '../components/ShoppingList/ShoppingListInput.vue';
import ShoppingListGroup from '../components/ShoppingList/ShoppingListGroup.vue';

const store = useShoppingListStore();

const handleAddItem = ({ name, category }) => {
  store.addItem(name, category);
};
</script>

<style scoped>
.shopping-list-container {
  padding: 20px;
  padding-bottom: 80px; /* Space for nav */
  max-width: 600px;
  margin: 0 auto;
  color: white;
}

.header {
  margin-bottom: 20px;
  text-align: center;
}
</style>
