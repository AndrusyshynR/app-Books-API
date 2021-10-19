<template>
  <div>
    <p>cart</p>
    <router-link to="/" class="link">Главная</router-link>
    <!-- <div class="wrapper-cart">
      <div class="img-cart">
        <img :src="`${volumeInfo.imageLinks.thumbnail}`" alt="book img" />
      </div>
      <div class="description-cart">
        <h3>{{ `Описание: ${volumeInfo.description}` }}</h3>
      </div>
      <dic class="price-cart">
        <p>{{ `Цена: ${saleInfo.listPrice.amount} UAH` }}</p>
      </dic>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Cart",
  components: {},
  // props: {
  //   book: {
  //     type: Array,
  //     required: true,
  //   },
  // },
  methods: {},
  computed: {
    volumeInfo() {
      return this.book.volumeInfo;
    },
    saleInfo() {
      return this.book.saleInfo;
    },
  },
};
</script>

<style>
.wrapper-cart {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.description-cart {
  width: 500px;
}
</style>
