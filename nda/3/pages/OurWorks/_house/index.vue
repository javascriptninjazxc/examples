<template>
  <div class="house full-width full-height">
    <transition name="local-fade" appear>
      <ImgsViewer v-if="viewer.imgs.length" :imgs="viewer.imgs" :selected="viewer.selected" @close="openViewer([], 0)" />
    </transition>

    <div class="background full-width align-center column-block">
      <div class="column-block">
        <div class="all-categories column-block">
          <div class="all-categories__title">Другие категории</div>
          <HouseCategories />
        </div>
      </div>
      <div class="route full-width">
        <span class="route__text">Главная > {{ $options.aliases[house.type] }} > {{ house.name }}</span>
        <div class="route__title">{{ house.name }}</div>
      </div>
    </div>

    <div class="container column-block">
      <div class="main-data row-block full-width justify-between align-center">
        <div class="main-data__picture" :style="{ 'background-image': `url(${house.img_main})` }" @click="openViewer([house.img_main], 0)"></div>
        <div class="data-container column-block">
          <div class="data-block">
            <div class="data-block__title">Объект:</div>
            <div class="data-block__value">{{ house.name }}</div>
          </div>

          <div class="data-block">
            <div class="data-block__title">Проект:</div>
            <div class="data-block__value">{{ house.project }}</div>
          </div>

          <div class="data-block">
            <div class="data-block__title">Адрес:</div>
            <div class="data-block__value">{{ house.adress }}</div>
          </div>

          <div class="data-block">
            <div class="data-block__title">Время постройки:</div>
            <div class="data-block__value">{{ house.date_start }} - {{ house.date_finish }}</div>
          </div>

          <div class="data-block">
            <div class="data-block__title">Стоимость:</div>
            <div class="data-block__value">{{ formatNumber(parseInt(house.price)) }}<span class="currency">₽</span></div>
          </div>

          <div class="control-buttons full-width column-block">
            <div class="control-button new-project full-width" @click="setModal('callback')">Хочу так же</div>

            <div class="row-block full-width justify-between">
              <!-- <div class="control-button catalog">Этот проект в каталоге</div> -->
              <NuxtLink to="/category/doma-iz-brusa" class="control-button projects full-width">Все проекты</NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="images column-block full-width">
        <span class="images__title">Фотоотчет</span>

        <div class="imgs-container full-width row-block">
          <div
            v-for="(img, i) of house.imgs"
            :key="`image-${i}`"
            class="image"
            :style="{ 'background-image': `url(${img})` }"
            @click="openViewer(house.imgs, i)"
          ></div>
        </div>
      </div>

      <div class="description column-block">
        <span class="description__title">Описание построенного объека</span>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span class="description__text column-block" v-html="house.description"></span>
      </div>

      <client-only>
        <div v-if="house && coords" class="map column-block">
          <span class="map__title">Данный объект на карте</span>
          <yandex-map ref="myMap" :coords="coords" class="full-width" :zoom="$options.MAP_ZOOM" :scroll-zoom="false" @map-was-initialized="ready">
            <ymap-marker :marker-id="1" :coords="coords" :icon="marker.icon"
          /></yandex-map>
        </div>
      </client-only>
    </div>

    <Questions />
  </div>
</template>

<script>
import { marked } from 'marked';
import housesConfig from '@/assets/config/houses.js';
import requestData from '@/assets/config/requestData.js';
import getImages from '@/assets/mixins/getImages.js';
import { MARKER_URI } from '@/assets/config/variables.js';

export default {
  name: 'House',
  mixins: [getImages],
  MAP_ZOOM: 10,
  transition: 'local-fade',

  aliases: {
    DB: 'Дома из бруса',
    KD: 'Каркасные дома',
    BH: 'Барнхаусы',
    DPU: 'Дома под усадку',
    BB: 'Бани из бруса',
  },

  data() {
    return {
      houseId: null,
      house: {},
      coords: null,
      viewer: {
        imgs: [],
        selected: null,
      },
      marker: {
        coords: [],
        icon: {
          layout: 'default#imageWithContent',
          imageHref: MARKER_URI,
          imageSize: [43, 43],
          imageOffset: [0, 0],
        },
      },
    };
  },

  async fetch() {
    this.houseId = this.$route.params.house;

    const data = await housesConfig.ourWorks.createRequest({
      asynchronous: true,
      populate: requestData.ourWorks.populate,
      filters: { id: this.houseId },
    });

    this.house = data[0];

    this.house.img_main = this.getImages([data[0].img_main.data], 'large')[0];
    this.house.imgs = this.getImages(data[0].imgs.data, 'large');

    this.house.description = marked.parse(this.house.description);

    this.coords = this.house.coordinate.split(',').map((el) => parseFloat(el));
  },

  methods: {
    setModal(type) {
      this.$nuxt.$emit('set-modal', type);
    },

    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },

    openViewer(imgs, selected) {
      this.viewer.imgs = imgs;
      this.viewer.selected = selected;
    },

    ready() {
      const map = this.$refs.myMap.myMap;

      map.controls.remove('rulerControl');
      map.controls.remove('geolocationControl');
      map.controls.remove('trafficControl');
      map.controls.remove('typeSelector');
      map.controls.remove('fullscreenControl');
      map.controls.remove('searchControl');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.house {
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
    padding: 0 vw(158px);
    margin-top: vw(40px);

    .main-data {
      &__picture {
        min-width: vw(1029px);
        height: vw(696px);
        border-radius: vw(10px);
        cursor: pointer;
        background: {
          size: cover;
          position: center;
          repeat: no-repeat;
        }
      }

      .data-container {
        width: vw(476px);

        .data-block {
          margin-top: vw(25px);

          &:first-child {
            margin-top: 0;
          }

          &__title {
            @include font(Lato, normal, normal, vw(24px));
            color: rgba(#333333, 0.5);
          }

          &__value {
            @include font(Lato, 900, normal, vw(24px));
            color: #333333;
            margin-top: vw(5px);
          }

          .currency {
            font-weight: normal;
          }
        }
      }

      .control-buttons {
        margin-top: vw(63px);

        .control-button {
          @extend %content-center;
          color: #333333;
          background-color: #f8f8f8;
          transition: ease 0.2s;
          transition-property: background-color, color;

          height: vw(64px);
          cursor: pointer;

          &.new-project {
            @include font(Lato, 500, normal, vw(24px));
            border-radius: vw(4px);
            margin-bottom: vw(20px);
          }

          &.projects {
            @include font(Lato, normal, normal, vw(22px));
            border-radius: vw(5px);
          }

          &:hover {
            background-color: #2cc37c;
            color: white;
          }
        }
      }
    }

    .images {
      margin-top: vw(90px);

      &__title {
        @include font(Lato, 900, normal, vw(48px));
        color: #333333;
      }

      .imgs-container {
        margin-top: vw(40px);
        flex-wrap: wrap;

        .image {
          width: vw(339px);
          height: vw(330px);
          border-radius: vw(10px);
          margin-right: vw(80px);
          margin-top: vw(80px);
          cursor: pointer;
          transition: transform ease 0.2s;

          &:hover {
            transform: scale(1.05);
          }

          &:nth-child(n + 1):nth-child(-n + 4) {
            margin-top: 0;
          }

          &:nth-child(4n) {
            margin-right: 0;
          }

          background: {
            size: cover;
            position: center;
            repeat: no-repeat;
          }
        }
      }
    }

    .description {
      margin-top: vw(90px);

      &__title {
        @include font(Lato, 900, normal, vw(48px));
        color: #333333;
      }

      &__text {
        @include font(Lato, normal, normal, vw(30px));
        color: #333333;
        margin-top: vw(20px);

        &::v-deep * {
          line-height: vw(45px);
        }

        &::v-deep ul {
          margin-left: vw(40px);
        }
      }
    }

    .map {
      margin-top: vw(90px);
      border-radius: vw(10px);
      overflow: hidden;

      &__title {
        @include font(Lato, 900, normal, vw(48px));
        color: #333333;
        margin-bottom: vw(20px);
      }

      .ymap-container {
        height: vw(520px);
      }
    }
  }
}
</style>
