<template>
  <section class="compare-us">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2 class="title">
            {{ $t("index.how_it_works.title") }}
            <span class="title-shadow">
              {{ $t("index.how_it_works.title") }}
            </span>
          </h2>
        </div>
      </div>

      <div class="row how-it-works-row">
        <div class="col-md-3">
          <div class="advantage-card bottom">
            <span class="advantage-number">1</span>

            <div class="advantage-icon">
              <img src="../../assets/images/icons/icon-user.png" alt="" />
            </div>

            <p class="advantage-text">
              <nuxt-link :to="localePath('sign-up')" class="femida-link-underline">
                {{ $t("index.how_it_works.step_1_title") }}
              </nuxt-link>
              {{ $t("index.how_it_works.step_1_desc") }}
            </p>
          </div>

          <div class="advantage-card-dashed-line"></div>
        </div>

        <div class="col-md-3">
          <div class="advantage-card">
            <span class="advantage-number">2</span>

            <div class="advantage-icon">
              <img src="../../assets/images/icons/femida-icon.png" alt="" />
            </div>

            <p class="advantage-text">
              <a
                href="https://cdn.femida.io/FemidaLauncherSetup.exe"
                target="_blank"
                class="femida-link-underline"
              >
                {{ $t("index.how_it_works.step_2_title") }}
              </a>
              {{ $t("index.how_it_works.step_2_desc") }}
            </p>
          </div>

          <div class="advantage-card-dashed-line invert"></div>
        </div>

        <div class="col-md-3">
          <div class="advantage-card bottom">
            <span class="advantage-number">3</span>

            <div class="advantage-icon">
              <img src="../../assets/images/icons/key-icon.png" alt="" />
            </div>

            <p class="advantage-text">
              {{ $t("index.how_it_works.step_3") }}
            </p>
          </div>

          <div class="advantage-card-dashed-line"></div>
        </div>

        <div class="col-md-3">
          <div class="advantage-card">
            <span class="advantage-number">4</span>

            <div class="advantage-icon">
              <img src="../../assets/images/icons/dota-icon.png" alt="" />
            </div>

            <p class="advantage-text">
              {{ $t("index.how_it_works.step_4") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HowItWorks",
  components: {}
};
</script>

<style scoped lang="scss">
.femida-link-underline {
  color: #b3b3b3;

  text-decoration: none;

  transition: all 0.3s;

  position: relative;

  &:hover {
    color: #fff;

    &:after {
      background-color: #fff;
    }
  }

  &:after {
    transition: all 0.3s;

    position: absolute;

    content: " ";

    width: 100%;
    height: 1px;

    bottom: -2px;
    left: 0;

    background-color: #b3b3b3;
  }
}

.compare-us {
  margin-bottom: 200px;
}

.how-it-works-row {
  margin-top: 70px;
}

$line-width: calc(100% - 120px);

.advantage-card-dashed-line {
  position: absolute;
  width: $line-width;
  height: calc(calc(100% - 120px) / 2.96);

  left: calc(50% + 65px);
  top: calc(12px + 28px + 105px);

  transform: rotate(-15deg);

  background-image: url(../../assets/images/line-dashed.png);
  background-size: contain;
  background-repeat: no-repeat;

  &.invert {
    left: calc(50% + 75px);
    top: calc(12px + 28px + 70px);
    transform: rotate(-135deg);
  }
}

.advantage-card {
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;

  align-items: center;

  @media (max-width: 767px) {
    &:after {
      content: " ";
      position: absolute;
      top: -32px;
      width: 2px;
      height: 20px;

      left: 0;
      right: 0;
      margin: 0 auto;

      background-color: #fff;
    }
  }

  .advantage-number {
    color: rgb(255, 255, 255);
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  .advantage-icon {
    width: 120px;
    height: 120px;
    background-image: linear-gradient(
      180deg,
      rgba(0, 198, 251, 0.1) 0%,
      rgba(0, 91, 234, 0.1) 100%
    );
    border: 2px solid #00b2f8;
    border-radius: 50%;
    margin-bottom: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: auto;
      height: 50px;
    }
  }

  .advantage-text {
    margin: 0;
    font-size: 18px;
    font-weight: normal;
    line-height: 27px;
    color: #fff;
  }

  &.bottom {
    margin-top: 150px;

    .advantage-icon {
      background-image: linear-gradient(
        180deg,
        rgba(0, 198, 251, 0.5) 0%,
        rgba(0, 91, 234, 0.5) 100%
      );
    }
  }
}

@media (max-width: 767px) {
  .title {
    text-align: center;
  }

  .compare-us {
    margin-bottom: 100px;
  }

  .advantage-card {
    margin-top: 0px !important;

    .advantage-text {
      margin-bottom: 3rem;
      max-width: 90%;
    }
  }

  .advantage-card-dashed-line {
    display: none;
  }
}

@media (max-width: 575px) {
  .title {
    white-space: normal;
  }
}
</style>
