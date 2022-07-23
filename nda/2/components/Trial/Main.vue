<template>
  <div
    class="main pt-5 align-items-center container d-flex justify-content-between"
  >
    <div class="main-column">
      <h2 class="mb-5">
        Измените свой геймплей вместе с
        <span class="main-color__item">FEMIDA.IO</span>
      </h2>

      <p class="mb-5">
        Femida раскрасит надоевшие цвета Dota 2 яркими красками! Выбирайте любые
        скины, меняйте деревья и ландшафты, используйте легальный анализатор
        пиков и кастомизируйте профиль.
      </p>

      <div class="main-column__form d-flex justify-content-between">
        <input type="text" placeholder="Введите свою почту" />
        <button>Попробовать бесплатно</button>
      </div>
    </div>

    <div class="main-column">
      <img src="@/assets/images/trial/main/preview.png" alt="load" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.main {
  &-column {
    h2 {
      font-family: "Gang";
      font-weight: 400;
      font-size: 50px;
      line-height: 160%;
      letter-spacing: 0.06em;
      color: #ffffff;
      text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
    }

    p {
      font-weight: 600;
      font-size: 16px;
      line-height: 180%;
      color: #ffffff;
    }

    &__form {
      input {
        background: #282d33;
        border-radius: 12px;
        padding: 11px 15px;
        border: 0;
        font-size: 14px;
        flex-grow: 2;
        color: white;
        margin-right: 10px;

        &::placeholder {
          color: white;
        }
      }

      button {
        @include button(
          white,
          linear-gradient(90deg, #00c6fb 0%, #005bea 100%)
        );
      }
    }
  }
  &-color__item {
    color: #0066ff;
  }
}
</style>
