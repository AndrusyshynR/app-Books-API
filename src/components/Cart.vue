<template>
  <div>
    <p class="cart-title">Твоя корзина</p>
    <router-link to="/" class="link">Перейти на главную</router-link>
    <div class="wrapper-cart" v-for="item in cartList" :key="item">
      <div class="cart-img">
        <img :src="`${item.img}`" alt="book img" />
      </div>
      <div class="cart-description">
				<p>Описание</p>
        <h3>{{ `${item.description}` }}</h3>
      </div>
      <dic class="cart-price">
				<p>Цена</p>
        <p>{{ `${item.sale} UAH` }}</p>
      </dic>
    </div>
		<div class="cart-total-sum">
			<p>Итоговая сумма: 1546UAH</p>
			<button class="cart-btn">Заказать</button>
		</div>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "Cart",
  components: {},
  data() {
    return {
      objRendering: {},
			cartList: [],
    };
  },
  methods: {
    getOrderInformation(obj) {
      this.objRendering = obj;
			this.cartList.push(obj);
    },
  },
  created() {
    eventBus.$on("priseInfo", (obj) => this.getOrderInformation(obj));
  },
};
</script>

<style>
.cart-title {
	font-size: 30px;
	color: rgb(95, 92, 95);
}

.wrapper-cart {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.cart-img {
	width: 70px;
	height: 100px;
}

.cart-img img {
	display: block;
	width: 100%;
	height: 100%;
}

.cart-description {
	max-width: 900px;
}

.cart-description h3 {
	font-size: 14px;
}

.cart-btn {
	padding: 10px 5px;
  font-size: 14px;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
  border: 1px solid #000;
}

.cart-btn:hover {
  background: rgb(228, 228, 228);
}
</style>
