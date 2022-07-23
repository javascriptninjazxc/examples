<template>
  <div class="contacts full-width full-height">
    <div class="background full-width align-center column-block">
      <div class="column-block">
        <div class="all-categories column-block">
          <div class="all-categories__title">Другие категории</div>
          <HouseCategories />
        </div>
      </div>
      <div class="route full-width">
        <span class="route__text">Главная > Контакты</span>
        <div class="route__title">Контакты</div>
      </div>
    </div>

    <div class="container column-block">
      <div class="row-block full-width justify-between">
        <div class="on-map column-block">
          <span class="on-map__title">Мы на карте</span>
          <span class="on-map__text">Адрес офиса</span>
          <span class="on-map__value">Москва, Большой Овчинниковский переулок, 12 ст1 вход со стороны двора</span>

          <div class="map full-width">
            <client-only>
              <yandex-map
                ref="myMap"
                :coords="$options.COORDS"
                class="full-width full-height"
                :zoom="$options.MAP_ZOOM"
                :scroll-zoom="false"
                @map-was-initialized="ready"
              >
                <!-- <ymap-marker v-if="marker" :marker-id="0" :coords="$options.COORDS" :icon="marker.icon" /> -->
              </yandex-map>
            </client-only>
          </div>

          <span class="on-map__text">Адрес производства</span>
          <span class="on-map__value">Вологодская область, г. Устюжна, посёлок Раменье</span>
        </div>

        <div class="our-contacts column-block">
          <span class="our-contacts__title">Наши контакты</span>
          <span class="our-contacts__text-phone">+7 (958) 582 61-29</span>
          <div class="our-contacts__text-advantage row-block align-center">
            <div class="circle"></div>
            <span>Без выходных 10:00 - 20:00</span>
          </div>

          <div class="actions row-block align-center">
            <div class="actions__button" @click="setModal('callManager')">Позвоните мне</div>
            <div class="social row-block">
              <div class="social__picture">
                <img src="~/assets/img/Contacts/viber.png" alt="" />
              </div>
              <div class="social__picture">
                <img src="~/assets/img/Contacts/whatsapp.png" alt="" />
              </div>
              <div class="social__picture">
                <img src="~/assets/img/Contacts/telegram.png" alt="" />
              </div>
            </div>
            <div class="write-us">Или напишите нам любым удобным способом</div>
          </div>

          <div class="email column-block">
            <div class="email__title">Электронная почта</div>

            <div class="address row-block align-center">
              <img class="address__picture" src="~/assets/img/Contacts/email.png" alt="" />
              <span class="address__text">info@brusich.ru</span>
            </div>
          </div>

          <div class="our-social column-block">
            <span class="our-social__title">Наши соц. сети</span>

            <div class="social-list row-block">
              <div class="social-item">
                <img src="~/assets/img/Contacts/vk.png" alt="" />
              </div>
              <div class="social-item">
                <img src="~/assets/img/Contacts/youtube.png" alt="" />
              </div>
              <div class="social-item">
                <img src="~/assets/img/Contacts/insta.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="see-you full-width column-block">
        <div class="see-you__title">До встречи</div>

        <div class="places row-block full-width justify-between">
          <div class="place">
            <div class="place__title">В офисе</div>
          </div>
          <div class="place">
            <div class="place__title">На участке</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MARKER_URI } from '@/assets/config/variables.js';

export default {
  name: 'Contacts',
  COORDS: [55.7442198, 37.6292938],
  MAP_ZOOM: 4,

  data() {
    return {
      marker: null,
    };
  },

  methods: {
    setModal(type) {
      this.$nuxt.$emit('set-modal', type);
    },

    ready() {
      const map = this.$refs.myMap.myMap;

      map.controls.remove('rulerControl');
      map.controls.remove('geolocationControl');
      map.controls.remove('trafficControl');
      map.controls.remove('typeSelector');
      map.controls.remove('fullscreenControl');
      map.controls.remove('searchControl');

      map.geoObjects.add(
        new ymaps.Placemark(this.$options.COORDS, null, {
          iconLayout: 'default#image',
          iconImageHref: MARKER_URI,
          iconImageSize: [43, 43],
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.contacts {
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
    padding: vw(90px) vw(160px) vw(90px) vw(160px);

    .on-map {
      width: vw(611px);

      &__title {
        @include font(Lato, 900, normal, vw(64px));
        color: #333333;
      }

      &__text {
        @include font(Lato, 500, normal, vw(36px));
        color: #333333;
        margin-top: vw(22px);
      }

      &__value {
        @include font(Lato, normal, normal, vw(24px));
        color: #333333;
        margin-top: vw(15px);
      }

      .map {
        height: vw(224px);
        margin-top: vw(25px);
        border-radius: vw(10px);
        overflow: hidden;

        &::v-deep .ymaps-2-1-79-map-copyrights-promo {
          display: none;
        }
      }
    }

    .our-contacts {
      &__title {
        @include font(Lato, 900, normal, vw(64px));
        color: #333333;
      }

      &__text {
        &-phone {
          @include font(Lato, 900, normal, vw(36px));
          color: #333333;
          margin-top: vw(22px);
        }

        &-advantage {
          margin-top: vw(15px);

          .circle {
            width: vw(10px);
            height: vw(10px);
            border-radius: 50%;
            background-color: #2cc37c;
          }

          span {
            @include font(Lato, normal, normal, vw(24px));
            color: #333333;
            margin-left: vw(8px);
          }
        }
      }
    }

    .actions {
      margin-top: vw(30px);

      &__button {
        @include font(Lato, 500, normal, vw(26px));
        @extend %content-center;
        width: vw(324px);
        height: vw(88px);
        background-color: #2cc37c;
        border-radius: vw(5px);
        color: white;
        cursor: pointer;
      }

      .social {
        margin-left: vw(40px);

        &__picture {
          width: vw(40px);
          height: vw(40px);
          margin-right: vw(11px);

          &:last-child {
            margin-right: 0;
          }

          img {
            width: inherit;
            height: inherit;
          }
        }
      }

      .write-us {
        @include font(Lato, normal, normal, vw(20px));
        width: vw(273px);
        margin: vw(20px);
        color: #333333;
      }
    }

    .email {
      margin-top: vw(30px);

      &__title {
        @include font(Lato, 900, normal, vw(36px));
        color: #333333;
      }

      .address {
        margin-top: vw(15px);

        &__picture {
          width: vw(30px);
          height: vw(30px);
        }

        &__text {
          @include font(Lato, 500, normal, vw(16px));
          color: #333333;
          margin-left: vw(10px);
        }
      }
    }

    .our-social {
      margin-top: vw(50px);

      &__title {
        @include font(Lato, 900, normal, vw(64px));
        color: #333333;
      }

      .social-list {
        margin-top: vw(35px);

        .social-item {
          width: vw(61.15px);
          height: vw(61.15px);
          margin-right: vw(40.77px);
          cursor: pointer;

          img {
            width: inherit;
            height: inherit;
          }
        }
      }
    }

    .see-you {
      margin-top: vw(50px);

      &__title {
        @include font(Lato, 900, normal, vw(64px));
      }

      .places {
        margin-top: vw(50px);
        height: vw(330px);

        .place {
          width: vw(758px);
          border-radius: vw(10px);
          position: relative;
          background: {
            size: cover;
            position: center;
            repeat: no-repeat;
          }

          &:first-child {
            background-image: url('~/assets/img/Contacts/office.png');
          }

          &:last-child {
            background-image: url('~/assets/img/Contacts/field.png');
          }

          &:hover .place__title {
            background-color: #2cc37c;
            color: white;
          }

          &__title {
            @include font(Lato, 500, normal, vw(24px));
            @extend %content-center;
            position: absolute;
            bottom: vw(40px);
            right: vw(40px);
            padding: vw(11px) vw(45px);
            color: #333333;
            background-color: white;
            border-radius: vw(44px);
            cursor: pointer;
            transition: ease 0.2s;
            transition-property: background-color, color;
          }
        }
      }
    }
  }
}
</style>
