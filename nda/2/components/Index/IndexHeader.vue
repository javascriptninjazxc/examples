<template>
  <section class="index">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-5">
          <div class="header-block">
            <h1>FEMIDA.IO —</h1>
            <h2>{{ $t("index.title") }}</h2>
            <p>
              {{ $t("index.description") }}
            </p>

            <div class="buy-block">
              <!--              <nuxt-link class="register-button" tag="button" to="/profile/download">Скачать</nuxt-link>-->
              <a
                class="register-button"
                href="https://vk.com/femida_io?w=wall-194256799_15394"
                target="_blank"
              >
                {{ $t("index.free_trial") }}
              </a>
            </div>
          </div>
        </div>

        <div class="index-image" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped lang="scss">
section.index {
  min-height: 100vh;
  width: 100%;

  color: #fff;

  overflow-x: visible;

  .header-block {
    z-index: 1;
    position: relative;

    .buy-block {
      display: flex;
      align-items: center;

      margin-top: 32px;

      span {
        margin-left: 24px;

        white-space: nowrap;
        color: #00c5fb;
      }
    }

    h1 {
      font-size: 48px;
      font-weight: 900;
      margin: 0;
    }

    h2 {
      font-size: 24px;
      font-weight: 500;

      margin: 8px 0 0;

      white-space: nowrap;
    }

    p {
      color: #c1bbc9;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;

      margin: 32px 0 0;
    }
  }

  .container,
  .row {
    min-height: 100vh;
  }
}

.index-image {
  position: absolute;

  // vh cause relative size
  height: 105vh;
  width: 105vh;

  top: 52px;
  left: 40%;

  background: url(../../assets/images/index-image.png) no-repeat;
  background-size: contain;
}

@media (max-width: 575px) {
  .header-block h2 {
    white-space: normal !important;
  }
}
</style>
