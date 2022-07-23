<template>
  <div class="free" id="free">
    <div class="free-inner container">
      <h2 class="mb-5">Попробуй бесплатно!</h2>

      <div class="free-inner__form col-9 mx-auto d-flex">
        <input type="text" placeholder="Введите свою почту" />
        <button>Попробовать бесплатно</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// потом разберусь почему миксин не работает нормально

@mixin button($color, $bg) {
  background: $bg;
  border-radius: 12px;
  border: 0;
  color: $color;
  font-weight: 500;
  font-size: 16px;
  padding: 13px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 2s;
}

#free {
  background: url("@/assets/images/trial/bg-3.png");
  background-color: #1d2126;
  height: 590px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  padding-bottom: 70px;
  display: flex;
  align-items: center;

  &::before {
    background: url("@/assets/images/trial/padding/5.svg");
    content: "";
    position: absolute;
    height: 149px;
    width: 100%;
    background-size: cover;
    z-index: 2;
    bottom: 0;
    background-repeat: NO-REPEAT;
  }
}

.free {
  &-inner {
    padding-top: 100px;
    h2 {
      font-weight: 400;
      font-size: 48px;
      letter-spacing: 0.1em;
      color: #ffffff;
      font-family: "Gang";
      text-align: center;
    }

    &__form {
      input {
        background: #1d2126;
        border-radius: 12px;
        padding: 18px 25px;
        color: white;
        border: 0;
        display: inline-flex;
        flex-grow: 2;
        margin-right: 50px;
        font-weight: 700;
        font-size: 16px;

        &::placeholder {
          color: white;
        }
      }
      button {
        @include button(#16a8ff, #1d2126);
      }
    }
  }
}
</style>
