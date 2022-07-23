<template>
  <div class="popup" v-if="modalActual">
    <div class="popup-backdrop">
      <div class="popup-inner popup-container pt-5 d-flex">
        <div class="popup-close" @click="modalClose(0)">X</div>
        <div class="popup-left mr-3 w-50">
          <h2 class="popup-header__item fs-4 mb-2">Оплата счета</h2>

          <div class="popup-methods mb-3">
            <p>Метод оплаты:</p>

            <div class="popup-methods-card">
              <div
                class="popup-methods-card-item"
                v-for="(item, i) in modal.payment"
                :key="i"
              >
                <img
                  :src="
                    require(`@/assets/images/trial/modal/payment/${i + 1}.svg`)
                  "
                  class="mb-2"
                  alt=""
                />
                <h2>{{ item.title }}</h2>
              </div>
            </div>
          </div>

          <div class="popup-details">
            <h2 class="popup-header__item fs-4 mb-4">Детали платежа</h2>

            <div class="popup-details__input">
              <label for="">
                <h4>Ваша почта:</h4>
                <input type="text" v-model="modal.form.mail" />
              </label>
              <label for="">
                <h4>Ваша Ваш пароль:</h4>
                <input type="password" v-model="modal.form.password" />
              </label>
            </div>

            <div class="popup-details__confirn line">
              <span class="unflex">
                <h2 class="mb-1">Femida - 1 неделя</h2>
                <h3 class="popup-discount__item">Скидка: 99 %</h3>
              </span>

              <h2>{{ modal.price }}</h2>
            </div>

            <div class="popup-details__final">
              <div class="popup-details__confirn">
                <span class="unflex">
                  <h2>Итого:</h2>
                  <h3 class="popup-discount__item">Скидка: 99 %</h3>
                </span>

                <h2>{{ modal.price }}</h2>
              </div>

              <button class="popup-details__button">Оплатить за 1 рубль</button>

              <div class="popup-details__policy">
                <span
                  class="popup-details__checkbox align-items-center d-flex mb-2"
                >
                  <input type="checkbox" class="mr-2" />
                  <p>
                    Нажимая "Оплатить", я принимаю условия
                    <a href="">"Пользовательского соглашения"</a>
                  </p>
                </span>

                <span class="popup-policy-item d-flex">
                  <a href="/">Политика конфендициальности</a>
                  <a href="/">Пользовательское соглашение</a>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="popup-right w-50">
          <img
            src="@/assets/images/trial/modal/logo.svg"
            class="d-block mb-2"
            alt=""
          />
          <h3 class="mb-4">Неделя подписки за</h3>
          <h2 class="popup-price__item">{{ modal.price }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      modal: {
        price: '1.00p',
        form: {
            password: null,
            email: null
        },
        payment: [
          {
            title: "Банковская карта",
            active: 0, // эту логику сам додумаешь я думаю
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({ modalActual: 'modal/modalActual' }),
  },
  methods: {
    modalClose(value) {
      this.$store.commit("modal/setModal", value);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/femida.scss";
.popup {
  position: fixed;
  top: 0;
  margin: auto;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: "Manrope" !important;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 33;
  background: rgba(17, 20, 23, 0.8);

  &-right {
    border-radius: 3px;
  }

  &-container {
    width: 95%;
    position: relative;
    margin: auto;
  }

  &-backdrop {
    width: 60vw;
    height: 811px;
    background: #1d2126;
    border-radius: 15px;
  }

  &-close {
    position: absolute;
    top: 15px;
    right: 0;
    opacity: 0.3;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  &-right {
    background: url("@/assets/images/trial/modal/preview.png");
    background-repeat: NO-REPEAT;
    background-size: cover;
    padding: 24px;

    h3 {
      font-weight: 500;
      font-size: 24px;
      line-height: 33px;
      /* identical to box height */

      letter-spacing: 0.05em;

      color: #ffffff;
    }
  }
  h2,
  h4,
  h3 {
    font-weight: normal;
  }

  &-price__item {
    font-weight: 700;
    font-size: 48px;
    line-height: 66px;
    /* identical to box height */

    letter-spacing: 0.05em;

    color: #ffffff;
  }

  &-policy {
    &-item {
      a {
        font-weight: 500;
        font-size: 13px;
        line-height: 18px;
        color: #697179;
        margin-right: 10px;
      }
    }
  }

  &-header__item {
    font-weight: 300;
  }
  &-methods {
    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 100%;
      margin-bottom: 15px;
      /* identical to box height, or 16px */

      color: #697179;
    }

    &-card {
      &-item {
        cursor: pointer;
        display: flex;
        background: #2e343c;
        border-radius: 5px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 12px 20px;
        width: fit-content;

        h2 {
          font-size: 12px;
          line-height: 100%;
          color: #697179;
        }
      }
    }
  }

  &-details {
    &__checkbox {
      p {
        font-weight: 600;
        font-size: 16px;
        line-height: 130%;
        letter-spacing: 0.05em;
        color: #8e9092;
      }

      a {
        color: #0166ff;
      }
    }

    &__button {
      width: 100%;
      font-size: 20px;
      border-radius: 3px !important;
      margin-bottom: 20px !important;
      @include button(
        white,
        linear-gradient(291.01deg, #1dbbff 10.69%, #0066ff 61.15%)
      );
    }
    .line {
      border-bottom: 2px solid rgba(255, 255, 255, 0.25);
    }
    &__confirn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 15px;

      .unflex {
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;
        letter-spacing: 0.05em;
        color: #ffffff;

        h2 {
          font-weight: 600;
          font-size: 20px;
          line-height: 27px;
          letter-spacing: 0.05em;
          color: #ffffff;
        }

        h3 {
          font-weight: 600;
          font-size: 17px;
          line-height: 25px;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.5);
        }
      }

      h2 {
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 0.05em;
        color: #ffffff;
      }
    }

    label {
      display: block;
      margin-bottom: 20px;
      h4 {
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
        margin-bottom: 16px;

        color: #697179;
      }

      input {
        background: #2e343b;
        border-radius: 5px;
        border: 0;
        color: white;
        width: 100%;
        padding: 12px 12px;
      }
    }
  }
}
</style>
