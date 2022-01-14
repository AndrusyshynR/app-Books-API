<template>
  <div>
    <div class="book-item">
      <img
        :src="`${volumeInfo.imageLinks.thumbnail}`"
        :alt="volumeInfo.title"
      />
      <h4>{{ `Название: ${volumeInfo.title}` }}</h4>
      <h3>{{ `Автор: ${volumeInfo.authors}` }}</h3>
      <p>{{ `Дата публиувции: ${volumeInfo.publishedDate}` }}</p>
      <button @click="popupShow" class="btn-buy">{{ buttonName }}</button>
    </div>

    <div class="popup-wrapper" v-show="showModal" @closePopup="popupClose">
      <div class="wrapper-form">
        <h2 class="titl-description">{{ descriptionBook }}</h2>
        <div>
          <div>
            <div class="img-description">
              <img
                class="img-book"
                :src="`${volumeInfo.imageLinks.thumbnail}`"
                alt="title book"
              />
            </div>
            <p class="description">
              {{ `Описание: ${volumeInfo.description}` }}
            </p>
          </div>
        </div>
      </div>

      <div class="popup-body">
        <h2>{{ title }}</h2>
        <form id="app" @submit="checkForm" method="post" novalidate="true">
					<p v-if="errors.length"><b>Пожалуйста исправьте указанные ошибки:</b>
						<ul>
							<li v-for="(error, id) in errors" :key="id">{{ error }}</li>
						</ul>
					</p>
					<p>
						<label for="name"></label>
						<input id="name" v-model="name" type="text" placeholder="Имя" class="name input">
					</p>
					<p>
						<label for="email"></label>
						<input id="email" v-model="email" type="email" placeholder="Em@il" class="name input">
					</p>
					<p>
						<label for="phone"></label>
						<input id="phone" v-model="phone" type="text" placeholder="+380..." class="name input">
					</p>
					<input type="submit" class="btn-form" value="Отправить" :disabled='!isComplete' @click="addToCart">
					<button class="btn-form close" @click="popupClose">Закрыть</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main'

export default {
  name: "BookItem",
  components: {},
  data() {
    return {
      errors: [],
      name: null,
      email: null,
      phone: null,

      showModal: false,
      buttonName: "Заказать",
      descriptionBook: "Описание книги",

      title: "Форма заказа",
      btnSend: "Отправить",
    };
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
		checkForm(e) {
      this.errors = [];
      if (!this.name) {
        this.errors.push('Укажите имя');
      }
      if (!this.email) {
        this.errors.push('Укажите электронную почту');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Укажите корректный адрес электронной почты');
      }
			if (!this.phone) {
        this.errors.push('Введите номер телефона');
      } else if (!this.validPhone(this.phone)) {
        this.errors.push('Укажите корректный номер телефона');
      }
      if (!this.errors.length) {
        return true;
      }
      e.preventDefault();
    },
		validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
		validPhone(phone) {
      var re = /^\+380\d{9}$/;
      return re.test(phone);
    },
    popupShow() {
      this.showModal = true;
    },
    popupClose() {
      this.showModal = false;
    },
		// showMiniPopup() {
		// 	alert('hi');
		// },
    addToCart() {
			eventBus.$emit('priseInfo', {
				img: this.volumeInfo.imageLinks.thumbnail,
				description: this.volumeInfo.description,
				sale: this.saleInfo.listPrice.amount,
			});
      // this.$emit("addToCart", this.book);
			// this.showMiniPopup();
			this.checkForm();
      this.popupClose();
    },
  },
  computed: {
    volumeInfo() {
      return this.book.volumeInfo;
    },
		saleInfo() {
      return this.book.saleInfo;
    },
		isComplete () {
      return this.name && this.email && this.phone;
    },
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p {
  padding: 0;
  margin: 0;
}

.book-item {
  border-radius: 10px;
  border: 1px solid #000;
  background: rgb(250, 250, 249);
  padding: 15px;
  min-height: 350px;
}

.book-item h4 {
  margin: 7px 0;
}

.book-item p {
  margin: 7px 0;
}

.btn-buy {
  padding: 10px 5px;
  font-size: 14px;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
  border: 1px solid #000;
}

.btn-buy:hover {
  background: rgb(228, 228, 228);
}

/* popup */
.popup-wrapper {
  padding: 16px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background: rgb(255, 255, 255);
  box-shadow: 0 0 17px 0 #000;
  width: 400px;
  height: auto;
}

.wrapper-form {
  max-width: 400px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
}

.titl-description {
  margin-bottom: 7px;
}

.img-description {
  width: 100px;
  height: 150px;
  margin: 0 auto;
}

.img-book {
  display: block;
  width: 100%;
  height: 100%;
}

.description {
  font-size: 14px;
  margin-top: 10px;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input {
  padding: 5px 15px;
  font-size: 16px;
  border: 1px solid #000;
  border-radius: 5px;
  margin: 5px 0;
  max-width: 300px;
}

.popup-footer {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.btn-form {
  padding: 5px 15px;
  font-size: 16px;
  border: 1px solid #000;
  border-radius: 5px;
  max-width: 200px;
  background: transparent;
  cursor: pointer;
}

.btn-form:hover {
  background: rgb(228, 228, 228);
}

.close {
  margin-left: 10px;
}
</style>
