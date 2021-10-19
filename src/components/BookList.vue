<template>
  <div class="book-list">
    <BookItem v-for="book in books" :key="book.id" :book="book" />
  </div>
</template>

<script>
import BookItem from "./BookItem.vue";

export default {
  name: "BookList",
  components: {
    BookItem,
  },
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
}
</style>
