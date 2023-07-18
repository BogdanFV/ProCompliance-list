import { createApp } from "vue";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import App from "./App.vue";

const store = createStore({
  state() {
    return {
      products: [],
    };
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addProduct(state, product) {
      state.products.push(product);
    },
    toggleProduct(state, index) {
      const product = state.products[index];
      product.checked = !product.checked;

      if (product.checked) {
        state.products.splice(index, 1);
        state.products.push(product);
      }
    },
    moveToEnd(state, index) {
      const product = state.products[index];
      state.products.splice(index, 1);
      state.products.push(product);
    },
    moveToStart(state, index) {
      const product = state.products[index];
      state.products.splice(index, 1);
      state.products.unshift(product);
    },
    removeProduct(state, index) {
      state.products.splice(index, 1);
    },
  },
  plugins: [createPersistedState()],
});

const app = createApp(App);
app.use(store);
app.mount("#app");
