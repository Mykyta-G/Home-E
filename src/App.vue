<template>
  <div id="app">
    <component :is="currentView" @navigate="navigateTo" />
  </div>
</template>

<script>
import { ref } from 'vue';
import HomeView from './views/HomeView.vue';
import ShoppingListView from './views/ShoppingListView.vue';

export default {
  name: 'App',
  components: {
    HomeView,
    ShoppingListView,
  },
  setup() {
    const currentView = ref('HomeView');

    const navigateTo = (view) => {
      currentView.value = view;
    };

    return {
      currentView,
      navigateTo,
    };
  },
};
</script>

<style>
@import './main.css';

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

#app {
  padding: 10px;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  height: 100vh;
  background: var(--primary-color);
}
</style>
