<template>
  <div class="form-cover">
    <h2>Список покупок</h2>
    <div class="form-list">
      <ul>
        <li v-for="(product, index) in sortedProducts" :key="index">
          <span :class="{ strikethrough: product.checked }">{{
            product.name
          }}</span>
          <button @click="toggleProduct(index)" class="hide__button">
            {{ product.checked ? "Вернуть" : "Убрать" }}
          </button>
          <button @click="removeProduct(index)" class="delete__button">
            <i class="fas fa-times"></i>
          </button>
        </li>
      </ul>
    </div>
    <div class="buttons__block">
      <form @submit.prevent="addProduct">
        <input
          v-model="newProduct"
          type="text"
          placeholder="Введите покупку"
          required
        />
        <button type="submit">Добавить</button>
      </form>
      <button
        @click="removeAllProducts"
        v-if="products.length > 0"
        class="delete__button"
      >
        Удалить все
      </button>
    </div>
  </div>
</template>

<script>
import "./ProductList.scss";
import { faTimes } from "@fortawesome/fontawesome-free";

export default {
  computed: {
    products() {
      return this.$store.state.products;
    },
    sortedProducts() {
      const uncheckedProducts = this.products.filter(
        (product) => !product.checked
      );
      const checkedProducts = this.products.filter(
        (product) => product.checked
      );
      return [...uncheckedProducts, ...checkedProducts];
    },
  },
  methods: {
    addProduct() {
      if (this.newProduct) {
        this.$store.commit("addProduct", {
          name: this.newProduct,
          checked: false,
        });
        this.newProduct = "";
      }
    },
    toggleProduct(index) {
      const product = this.products[index];
      product.checked = !product.checked;

      if (product.checked) {
        this.$store.commit("moveToEnd", index);
      } else {
        this.$store.commit("moveToStart", index);
      }
    },
    removeProduct(index) {
      this.$store.commit("removeProduct", index);
    },
    removeAllProducts() {
      this.$store.commit("setProducts", []);
    },
  },
  data() {
    return {
      faTimes: faTimes,
    };
  },
  watch: {
    products: {
      handler(products) {
        const uncheckedProducts = products.filter(
          (product) => !product.checked
        );
        const checkedProducts = products.filter((product) => product.checked);
        this.$store.commit("setProducts", [
          ...uncheckedProducts,
          ...checkedProducts,
        ]);
      },
      deep: true,
    },
  },
};
</script>
