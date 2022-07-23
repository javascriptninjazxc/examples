<template>
  <div class="about full-width full-height">
    <div class="background full-width align-center column-block">
      <div class="column-block">
        <div class="all-categories column-block">
          <div class="all-categories__title">Другие категории</div>
          <HouseCategories />
        </div>
      </div>
      <div class="route full-width">
        <span class="route__text">Главная > О компании</span>
        <div class="route__title">О компании</div>
      </div>
    </div>

    <div class="container column-block align-center">
      <div class="about-container row-block align-center full-width">
        <div class="text-container">
          <div class="text-container__title">О компании «Брусичъ»</div>
          <div class="text-container__text">
            В 2017 году на рынке деревянного домостроения Московского региона появилась новая, принципиально отличающаяся от других, компания.
            <br /><br />
            Ее создателями и впоследствии движущей силой стала команда профессионалов с огромным опытом работы. Глубокое знание сферы помогло компании
            «Брусичъ» совершить важный прорыв в области деревянного домостроения. Главной идеей стало строительство качественных и комфортных домов.
            <br /><br />
            Сегодня «Брусичъ» предоставляет полный спектр услуг: строительство деревянных домов, достройка и реконструкция, инженерные коммуникации,
            кредитование и страхование, благоустройство и продажа земельных участков и многое другое.
          </div>
        </div>

        <img src="~/assets/img/About/logo.png" class="about-container__picture" alt="" />
      </div>

      <div class="numbers column-block">
        <div class="background full-width full-height"></div>
        <span class="numbers__title">«Брусичъ» в цифрах</span>
        <div class="row-block">
          <div class="number-element column-block align-center">
            <span class="number-element__title">720+</span>
            <span class="number-element__value">Построенных объектов</span>
          </div>

          <div class="number-element column-block align-center">
            <span class="number-element__title">22 года</span>
            <span class="number-element__value">Производим</span>
          </div>

          <div class="number-element column-block align-center">
            <span class="number-element__title">5 лет</span>
            <span class="number-element__value">Строим</span>
          </div>

          <div class="number-element column-block align-center">
            <span class="number-element__title">99%</span>
            <span class="number-element__value">Довольных клиентов</span>
          </div>
        </div>
      </div>

      <div class="watch-video row-block full-width" style="heigth: 30vw !important;">
        <div class="background full-width full-height"></div>
        <video-player src="https://www.youtube.com/embed/1zUmd5f-PXQ" autoplay="true" preload='true' />
      </div>
    </div>

    <Questions />
  </div>
</template>

<script>
import VideoPlayer from 'nuxt-video-player';
require('nuxt-video-player/src/assets/css/main.css');
export default {
  name: 'About',
  components: {
    VideoPlayer,
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.watch-video {

  height: 34vw !important;

}

.about {
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
    .about-container {
      height: vw(661px);
      background-color: #2cc37c;
      overflow: hidden;
      position: relative;

      &__picture {
        height: inherit;
        position: absolute;
        right: 0;
        filter: drop-shadow(0 vw(4px) vw(15px) rgba(black, 0.25));
      }

      .text-container {
        padding-left: vw(162px);

        &__title {
          @include font(Lato, 900, normal, vw(64px));
          width: vw(394px);
          color: white;
        }

        &__text {
          @include font(Lato, normal, normal, vw(24px));
          width: vw(882px);
          color: white;
          margin-top: vw(40px);
        }
      }
    }

    .watch-video,
    .numbers {
      overflow: hidden;
      position: relative;

      .background {
        @extend %absolute;
        background-color: rgba(black, 0.61);
      }
    }

    .numbers {
      @extend %content-center;
      margin-top: vw(90px);
      width: vw(1596px);
      height: vw(398px);
      border-radius: vw(10px);
      border-radius: vw(10px);
      background: {
        size: cover;
        position: center;
        repeat: no-repeat;
        image: url('~/assets/img/About/house.png');
      }

      &__title {
        @include font(Lato, 900, normal, vw(48px));
        color: white;
        z-index: 2;
        margin-bottom: vw(40px);
      }

      .number-element {
        margin-right: vw(132px);
        z-index: 2;

        &:last-child {
          margin-right: 0;
        }

        &__title {
          @include font(Lato, 900, normal, vw(64px));
          color: #2cc37c;
        }

        &__value {
          @include font(Lato, 500, normal, vw(24px));
          color: white;
          margin-top: vw(8px);
        }
      }
    }

    .watch-video {
      @extend %content-center;
      height: vw(398px);
      margin-top: vw(90px);
      margin-bottom: vw(70px);
      background: {
        size: cover;
        position: center;
        repeat: no-repeat;
      }

      .play-button {
        border-radius: 50%;
        width: vw(130px);
        height: vw(130px);
        z-index: 2;
        padding: vw(9px);
        border: vw(3px) solid #2cc37c;
        margin-right: vw(60px);
        cursor: pointer;
        transition: transform ease 0.2s;

        &:hover {
          transform: scale(1.1);
        }

        .button {
          @extend %content-center;
          background-color: #2cc37c;
          border-radius: 50%;

          svg {
            width: vw(45.35px);
            height: vw(45.35px);
          }
        }
      }

      .text {
        @include font(Lato, 900, normal, vw(64px));
        z-index: 2;
        color: white;
        width: vw(545px);
      }
    }
  }
}
</style>
