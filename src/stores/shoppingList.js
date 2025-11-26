import { defineStore } from 'pinia';

export const useShoppingListStore = defineStore('shoppingList', {
    state: () => ({
        items: [
            { id: 1, name: 'Milk', completed: false, category: 'Groceries' },
            { id: 2, name: 'Bread', completed: true, category: 'Groceries' },
            { id: 3, name: 'Batteries', completed: false, category: 'Household' },
        ],
        categories: ['Groceries', 'Household', 'Electronics', 'Other'],
    }),
    actions: {
        addItem(name, category = 'Other') {
            this.items.push({
                id: Date.now(),
                name,
                completed: false,
                category,
            });
        },
        toggleItem(id) {
            const item = this.items.find((i) => i.id === id);
            if (item) {
                item.completed = !item.completed;
            }
        },
        deleteItem(id) {
            this.items = this.items.filter((i) => i.id !== id);
        },
    },
    getters: {
        itemsByCategory: (state) => {
            const grouped = {};
            state.categories.forEach(cat => {
                grouped[cat] = state.items.filter(item => item.category === cat);
            });
            return grouped;
        }
    }
});
