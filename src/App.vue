<template>
  <div id="app">
    <h1 class="title">{{ title }}</h1>

    <div class="nav-wrraper">
      <div class="query">
        <form @submit.prevent="Search">
          <div>
            <input
              type="text"
              v-model="nameBook"
              placeholder="Название книги..."
              class="input"
              required
            />
            <input type="submit" value="Поиск" class="button" />
          </div>
        </form>
      </div>
      <div class="wrraper-cart">
        <router-link to="/cart" class="link">Корзина</router-link>
        <img src="@/assets/cart.png" class="img-cart" />
      </div>
    </div>

    <div class="content">
      <BookList :books="books" />
    </div>
    <!-- <Cart /> -->
  </div>
</template>

<script>
import BookList from "@/components/BookList";
// import Cart from "@/components/Cart";
import axios from "axios";

export default {
  components: {
    BookList,
    // Cart,
  },
  data() {
    return {
      title: "Твои Google Books",
      books: [],
      nameBook: "",
      maxResultsBook: "3",
      loadState: "",
    };
  },
  methods: {
    Search() {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${this.nameBook}&maxResults=${this.maxResultsBook}`
        )
        .then((response) => {
          this.books = response.data.items;
        });
      this.nameBook = "";
    },
  },
};
</script>

<style>
.title {
  margin: 15px 0;
}

.nav-wrraper {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.wrraper-cart {
  display: flex;
  align-items: center;
  margin-left: 200px;
}

.img-cart {
  display: block;
  width: 40px;
  height: 35px;
}

body,
html {
  position: relative;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #000;
}

.content {
  position: relative;
}

.input {
  border: 1px solid #000;
  border-radius: 5px;
  height: 40px;
  padding: 0;
  margin: 0;
  padding-left: 15px;
  font-size: 18px;
}

.button {
  border: 2px solid #000;
  border-radius: 5px;
  padding: 0 10px;
  margin-left: 10px;
  background: transparent;
  color: #000;
  height: 40px;
  vertical-align: top;
  cursor: pointer;
}
</style>
