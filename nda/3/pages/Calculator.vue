<template>
  <div class="calculator full-width full-height">
    <div class="background full-width align-center column-block">
      <div class="column-block">
        <div class="all-categories column-block">
          <div class="all-categories__title">Другие категории</div>
          <HouseCategories />
        </div>
      </div>
      <div class="route full-width">
        <span class="route__text">Главная > Калькулятор</span>
        <div class="route__title">Калькулятор</div>
      </div>
    </div>

    <div class="container column-block">
      <div class="uCalc_390551"></div>
      <script>
        var widgetOptions390551 = { bg_color: 'transparent' };
        (function () {
          var a = document.createElement('script'),
            h = 'head';
          a.async = true;
          a.src =
            (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//ucalc.pro/api/widget.js?id=390551&t=' + Math.floor(new Date() / 18e5);
          document.getElementsByTagName(h)[0].appendChild(a);
        })();
      </script>
    </div>

    <Questions />
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.calculator {
  .background {
    background-color: #f8f8f8;
  }

  .all-categories {
    margin-top: vw(120px);

    &__title {
      @include font(Lato, 700, normal, vw(48px));
      color: #333333;
      margin-bottom: vw(35px);
    }
  }

  .route {
    margin-top: vw(120px);
    padding: 0 vw(162px) vw(50px) vw(162px);

    &__text {
      @include font(Lato, normal, normal, vw(18px));
      color: rgba(51, 51, 51, 0.4);
    }

    &__title {
      @include font(Lato, 900, normal, vw(48px));
      color: #333333;
      margin-top: vw(6px);
    }
  }

  .container {
    padding: 0 vw(155px);

    .categories {
      flex-wrap: wrap;
      padding: vw(25px) vw(90px);
      box-shadow: 0px vw(18px) vw(39px) rgba(black, 0.06);
      border-radius: vw(10px);

      .category {
        @include font(Lato, 500, normal, vw(24px));
        @extend %content-center;
        width: vw(250px);
        height: vw(65px);
        color: #333333;
        background-color: #f8f8f8;
        border-radius: vw(67px);
        margin-right: vw(40px);
        margin-top: vw(40px);
        cursor: pointer;
        transition: ease 0.2s;
        transition-property: background-color, color;

        &:nth-child(n + 1):nth-child(-n + 5) {
          margin-top: 0;
        }

        &:hover {
          background-color: #2cc37c;
          color: white;
        }

        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
