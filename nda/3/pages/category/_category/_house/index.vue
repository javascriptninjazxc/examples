<template>
  <div class="house column-block full-width">
    <transition name="local-fade" appear>
      <ImgsViewer v-if="viewer.imgs.length" :selected="viewer.selected" :imgs="viewer.imgs" @close="removeViewer" />
    </transition>

    <div class="background full-width align-center column-block">
      <div class="all-categories column-block">
        <div class="all-categories__title">Другие категории</div>
        <HouseCategories />
      </div>

      <div class="routing column-block full-width">
        <div class="route-path row-block">Главная > {{ $options.titles[category] }} > {{ name }}</div>

        <div class="house-title row-block align-center full-width justify-between">
          <div class="route-title">{{ name }}</div>
        </div>
      </div>
    </div>

    <div class="house-container full-width">
      <div class="house-wrapper row-block">
        <div class="pictures column-block">
          <div class="main-picture" :style="preview" @click="expandViewer"></div>
          <div class="row-block align-center">
            <div class="prev-button slider-button" @click="slideLeft">
              <ArrowSvg />
            </div>

            <div class="list full-width row-block">
              <div v-for="(img, i) of imgs" :key="`slide-${i}`" ref="imgs" class="list-item full-height" :class="{ selected: selectedImg === i }">
                <div class="list-item__picture full-height full-width" :style="{ 'background-image': `url(${img})` }" @click="selectImage(i)"></div>
              </div>
            </div>

            <div class="next-button slider-button" @click="slideRight">
              <ArrowSvg />
            </div>
          </div>
        </div>

        <div class="characteristics column-block">
          <template v-if="house">
            <span class="characteristics__title">Характеристики</span>

            <div class="items row-block">
              <div class="item-container column-block">
                <span class="item-container__title">Площадь</span>
                <div class="row-block align-center">
                  <AreaSvg class="item-container__picture" />
                  <span class="item-container__value">{{ house.s }} м<sup>2</sup></span>
                </div>
              </div>

              <div class="item-container column-block">
                <span class="item-container__title">Размеры</span>
                <div class="row-block align-center">
                  <SizeSvg class="item-container__picture" />
                  <span class="item-container__value">{{ house.size }} м</span>
                </div>
              </div>

              <div class="item-container column-block">
                <span class="item-container__title">Комнат</span>
                <div class="row-block align-center">
                  <RoomsSvg class="item-container__picture" />
                  <span class="item-container__value">{{ house.rooms }}</span>
                </div>
              </div>

              <div class="item-container column-block">
                <span class="item-container__title">Этажей</span>
                <div class="row-block align-center">
                  <FloorsSvg class="item-container__picture" />
                  <span class="item-container__value">{{ house.floor.data.attributes.floor }}</span>
                </div>
              </div>
            </div>

            <div v-if="house.specificity" class="specifities">
              <span class="characteristics__title">Особенности</span>

              <div class="specifities-list row-block">
                <div v-for="(item, i) of house.specificity.data" :key="`${i}${item.attributes.specificity}`" class="specifity row-block align-center">
                  <TickSvg class="specifity__picture" />
                  <span class="specifity__value">{{ item.attributes.specificity }}</span>
                </div>
              </div>
            </div>

            <div class="prices column-block">
              <span class="characteristics__title">Цены за комплектацию</span>

              <div class="options row-block">
                <div class="option" :class="{ selected: pricesList === 'key' }" @click="selectPricesList('key')">
                  {{ category === 'doma-pod-usadku' ? 'Под усадку' : 'Под ключ' }}
                </div>

                <div
                  v-if="house.price_4 && house.price_5 && house.price_6"
                  class="option"
                  :class="{ selected: pricesList === 'shrink' }"
                  @click="selectPricesList('shrink')"
                >
                  Под усадку
                </div>
              </div>

              <div class="timber column-block">
                <div v-for="i in [1, 2, 3]" :key="`timber-${i}`" class="timber-item row-block align-center">
                  <div class="row-block align-center">
                    <div
                      :style="{ 'background-image': `url(${require(`~/assets/img/Category/detailing/${woodType}/${i}.png`)})` }"
                      class="timber-item__picture"
                    ></div>
                    <span class="timber-item__title">{{ woodSizes[i - 1] }}</span>
                  </div>
                  <span class="timber-item__value">{{ formatNumber(house[`price_${i + (pricesList === 'shrink' ? 3 : 0)}`]) }}₽</span>
                </div>
              </div>
            </div>

            <div class="control-panel row-block">
              <div class="order-project" @click="setModal('callback')">Заказать проект</div>

              <div class="print">
                <PrinterSvg />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="hint">Доработка проекта и изменение планировки - бесплатно</div>

    <div class="advantages row-block full-width justify-center">
      <div v-for="(advantage, i) of $options.advantages" :key="`${i}${advantage.text}`" class="advantage column-block">
        <img :src="require(`~/assets/img/Category/detailing/advantages/${advantage.img}.png`)" class="advantage__picture" alt="" />
        <span class="advantage__text">{{ advantage.text }}</span>
      </div>
    </div>

    <div class="house-detailing full-width">
      <div class="control-buttons row-block">
        <div
          v-for="(item, i) of $options.detailingPages"
          :key="`${item.title}${i}`"
          class="control-button"
          :class="{ selected: detailingPage === item.path }"
          @click="setDetailingPage(item.path)"
        >
          {{ item.title }}
        </div>
      </div>
      <client-only>

        <div v-show="detailingPage === 'equipment'" class="equipment full-width column-block">
          <div class="equipment-header full-width row-block align-center justify-between">
            <span class="equipment-header__title">Комплектация</span>

            <div class="options row-block">
              <div v-if="category !== 'karkasnie-doma'" class="option">Под усадку</div>
              <div class="option">Под ключ</div>
            </div>
          </div>

          <div class="equipment-content column-block full-width">
            <div class="content-item foundation row-block full-width align-center justify-between">
              <div class="row-block">
                <span class="content-item__title">Фундамент</span>
                <div class="content-item__picture">
                  <CameraSvg />
                </div>
              </div>
              <span class="content-item__text"
                >В базовую стоимость не входит, рассчитывается отдельно. Возможные варианты: опорно-столбчатый из бетонных блоков, свайно-винтовой,
                ленточный, монолитная плита</span
              >
              <div class="content-item__button">Выбрать фундамент</div>
            </div>

            <div v-for="i of equipmentPoints" :key="`point-${i}`" class="point column-block full-width">
              <div v-if="equipmentFiltered[`header${i}`]" class="point-title full-width">{{ equipmentFiltered[`header${i}`] }}</div>
              <div
                v-for="(item, j) of equipmentFiltered[`point${i}`]"
                :key="`point-container${j}`"
                class="content-item row-block full-width align-center justify-between"
              >
                <div class="row-block align-center">
                  <span class="content-item__title">{{ item.title }} </span>
                  <div class="content-item__picture" @click="openDetailingImages(item.imgs)">
                    <CameraSvg v-if="item.imgs.length" />
                  </div>
                </div>
                <span class="content-item__text">{{ item.description }}</span>

                <div class="options row-block">
                  <TickSvg style="margin-right: 35px;" :style="{opacity: item.pod_usadku ? 1 : 0}" />
                  <TickSvg :style="{opacity: item.pod_kluch ? 1 : 0}" />
                </div>

                <div v-if="category === 'karkasnie-doma'" class="options row-block">
                  <TickSvg />
                </div>
              </div>
            </div>
          </div>

          <div v-if="!specialType" class="timber-container row-block full-width align-center">
            <span class="timber-container__title">Брус на выбор</span>

            <div class="column-block">
              <div class="timber-nav row-block">
                <div
                  v-for="(item, i) of $options.timberPages"
                  :key="`${item.type}${i}`"
                  :class="{ selected: item.type === timberPage }"
                  class="timber-button"
                  @click="setTimberPage(item.type)"
                >
                  {{ item.title }}
                </div>
              </div>

              <div class="types row-block">
                <div v-for="i in 3" :key="`type-${i}`" class="timber-type align-center column-block">
                  <img :src="require(`~/assets/img/Category/detailing/timber/types/${timberPage}/${i}.png`)" class="timber-type__picture" alt="" />
                  <span class="timber-type__value">{{ $options.timberTypes[i - 1] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </client-only>

      <div v-show="detailingPage === 'technologies'" class="technologies column-block full-width">
        <div class="technologies-title full-width">Технология</div>

        <div class="technologies-container full-width">
          <Technologies :category="category" />
        </div>
      </div>


      <div v-show="detailingPage === 'additional'" class="extra full-width column-block">
        <div class="extra-header full-width row-block align-center">
          <span class="extra-header__title">Дополнительные услуги</span>
        </div>

        <template v-if="extra && extra.point && extra.point.length">
          <div class="extra-content column-block full-width">
            <div v-for="(item, i) of extraFiltered" :key="`point-${i}`" class="point column-block full-width">
              <div :key="`point-container${i}`" class="content-item row-block full-width align-center justify-between">
                <div class="row-block align-center">
                  <span class="content-item__title">{{ item.title }} </span>
                  <div class="content-item__picture" @click="openDetailingImages(item.imgs)">
                    <CameraSvg v-if="item.imgs.length" />
                  </div>
                </div>
                <span class="content-item__text">{{ item.description }}</span>

                <!-- eslint-disable-next-line vue/no-v-html -->
                <div class="price row-block align-end" v-html="item.price"></div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div v-if="detailingPage === 'description'" class="technologies column-block full-width">
        <div class="technologies-title full-width">Описание</div>

          <div class="point column-block full-width">
              <div class="content-item row-block full-width align-center justify-between">
                <div class="row-block align-center" style="width: 100%;">
                  <span class="content-item__title house-desc__inner"> {{ house.description }} </span>
                </div>
              </div>
            </div>
      </div>

    </div>

    <HouseEditor />

    <Promotion />

    <DistanceCalc />

    <div class="stages-container">
      <WorkStages />
    </div>

    <Questions />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'swiper/swiper.min.css';

import housesConfig from '~/assets/config/houses';
import requestData from '~/assets/config/requestData';
import getImages from '@/assets/mixins/getImages.js';

import ArrowSvg from '@/assets/img/global/arrow.svg';
import AreaSvg from '@/assets/img/Category/detailing/area.svg';
import SizeSvg from '@/assets/img/Category/detailing/size.svg';
import RoomsSvg from '@/assets/img/Category/detailing/rooms.svg';
import FloorsSvg from '@/assets/img/Category/detailing/floors.svg';
import TickSvg from '@/assets/img/Category/detailing/tick.svg';
import PrinterSvg from '@/assets/img/Category/detailing/printer.svg';
import CameraSvg from '@/assets/img/Category/detailing/camera.svg';

export default {
  name: 'House',
  titles: housesConfig.titles,
  components: { ArrowSvg, AreaSvg, SizeSvg, RoomsSvg, FloorsSvg, TickSvg, PrinterSvg, CameraSvg },
  mixins: [getImages],
  transition: 'local-fade',
  SCROLL_BEHAVIOUR: {
    behavior: 'smooth',
    block: 'nearest',
  },

  timberTypes: ['90x140', '140x140', '190x140'],
  frameTypes: ['Каркас 100мм', 'Каркас 150мм', 'Каркас 200мм'],

  timberPages: [
    {
      title: 'Прямой',
      type: 'straight',
    },

    {
      title: 'Овал',
      type: 'oval',
    },
  ],

  detailingPages: [
    {
      path: 'equipment',
      title: 'Комплектация',
    },

    {
      path: 'description',
      title: 'Описание проекта',
    },

    {
      path: 'technologies',
      title: 'Технология',
    },

    {
      path: 'additional',
      title: 'Дополнительные услуги',
    },
  ],

  advantages: [
    {
      img: 'free_ship',
      text: 'Бесплатная доставка',
    },

    {
      img: 'metal_door',
      text: 'Металлическая дверь в подарок',
    },

    {
      img: 'warn_corner',
      text: '“Теплый угол” бесплатно',
    },

    {
      img: 'clean_floors',
      text: 'Чистовые полы из сухой доски 36мм',
    },

    {
      img: 'racks',
      text: 'Монтаж роек в дверные и оконные проемы',
    },
  ],

  data() {
    return {
      category: '',
      houseId: '',
      house: null,
      currentElement: null,
      pricesList: 'key',
      name: '',
      selectedImg: 0,
      imgs: [],
      detailingPage: 'equipment',
      equipment: null,
      timberPage: 'straight',
      extra: null,
      calculatorShowed: false,
      viewer: {
        imgs: [],
        selected: 0,
      },
    };
  },

  async fetch() {
    this.category = this.$route.params.category;
    this.houseId = this.$route.params.house;

    if (this.houseId === 'undefined') return;

    if (!housesConfig.availableRoutes.includes(this.category)) this.$router.push('/');

    if (housesConfig.houses[this.category]) {
      let data = await housesConfig.houses[this.category].createRequest({
        populate: requestData.houses.populate,
        filters: {
          id: { $eq: this.houseId },
        },
        asynchronous: true,
      });

      const house = data[0];
      this.name = house.name;
      this.imgs = this.getImages(house.imgs.data, 'large');
      this.house = house;

      data = await housesConfig.equipments[this.category].createRequest({
        populate: requestData.equipments[this.category].populate,
        fields: requestData.equipments[this.category].fields,
        asynchronous: true,
      });

      this.equipment = data.attributes;

      data = await housesConfig.extra[this.category].createRequest({
        populate: requestData.extra[this.category].populate,
        asynchronous: true,
      });

      this.extra = data.attributes;
    }
  },

  computed: {
    ...mapState({
      filters: (state) => state.category.filters,
    }),

    specialType() {
      return ['barnhausy', 'karkasnie-doma'].includes(this.category);
    },

    woodSizes() {
      if (this.specialType) return this.$options.frameTypes;
      return this.$options.timberTypes;
    },

    woodType() {
      if (this.specialType) return 'frame';
      return 'timber';
    },

    preview() {
      return {
        'background-image': `url(${this.imgs[this.selectedImg]})`,
      };
    },

    equipmentFiltered() {
      const equipment = JSON.parse(JSON.stringify(this.equipment));

      for (let i = 1; i <= this.equipmentPoints; i++) {
        const point = equipment[`point${i}`];

        for (let j = 0; j < point.length; j++) {
          equipment[`point${i}`][j].imgs = this.getImages(point[j].imgs.data, 'medium');
        }
      }

      return equipment;
    },

    extraFiltered() {
      if (!this.extra) return;

      const { point } = JSON.parse(JSON.stringify(this.extra));

      for (let i = 0; i <= point.length; i++) {
        if (!point[i]) continue;

        point[i].imgs = this.getImages(point[i].imgs.data, 'medium');
      }

      return point;
    },

    equipmentPoints() {
      if (this.equipment == null) return;

      return Object.keys(this.equipment).reduce((counter, value) => {
        if (value.toLowerCase().includes('point')) counter++;

        return counter;
      }, 0);
    },
  },

  methods: {
    setModal(type) {
      this.$nuxt.$emit('set-modal', type);
    },

    setTimberPage(page) {
      this.timberPage = page;
    },

    selectImage(i) {
      this.selectedImg = i;
    },

    openDetailingImages(imgs) {
      this.viewer.imgs = imgs;
      this.viewer.selected = 0;
    },

    setDetailingPage(page) {
      this.detailingPage = page;
    },

    expandViewer() {
      this.viewer.imgs = this.imgs;
      this.viewer.selected = this.selectedImg;
    },

    removeViewer() {
      this.viewer.imgs = [];
      this.viewer.selected = 0;
    },

    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },

    slideLeft() {
      if (this.selectedImg > 0) {
        this.selectImage(this.selectedImg - 1);

        this.$refs.imgs[this.selectedImg].scrollIntoView(this.$options.SCROLL_BEHAVIOUR);
      }
    },

    slideRight() {
      if (this.selectedImg < this.imgs.length - 1) {
        this.selectImage(this.selectedImg + 1);

        this.$refs.imgs[this.selectedImg].scrollIntoView(this.$options.SCROLL_BEHAVIOUR);
      }
    },

    selectPricesList(list) {
      this.pricesList = list;
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

    .all-categories {
      margin-top: vw(120px);

      &__title {
        @include font(Lato, 700, normal, vw(48px));
        color: #333333;
        margin-bottom: vw(35px);
      }
    }

    .routing {
      margin-top: vw(120px);
      padding: 0 vw(162px) vw(50px) vw(162px);

      .route-path {
        @include font(Lato, 400, normal, vw(18px));
        color: rgba(#333333, 0.4);
      }

      .route-title {
        @include font(Lato, 700, normal, vw(48px));
        color: #333333;
        margin-top: vw(6px);
      }
    }
  }

  .house-container {
    @extend %content-center;
    padding-top: vw(40px);

    .house-wrapper {
      width: vw(1546px);

      .pictures {
        width: vw(1029px);

        .main-picture {
          width: inherit;
          height: vw(696px);
          border-radius: vw(10px);
          margin-bottom: vw(20px);
          transition: background-image ease 0.2s;
          cursor: pointer;
          background: {
            size: cover;
            position: center;
            repeat: no-repeat;
          }
        }

        .slider-button {
          @extend %content-center;
          min-width: vw(55px);
          max-width: vw(55px);
          height: vw(55px);
          border-radius: 50%;
          background-color: rgba(51, 51, 51, 0.26);
          cursor: pointer;
          transition: background-color ease 0.2s;

          &:first-child svg {
            transform: rotate(180deg);
          }

          svg {
            height: vw(12px);
            width: vw(12px);

            &::v-deep path {
              fill: #f8f8f8;
              transition: fill ease 0.2s;
            }
          }

          &:hover {
            background-color: #2cc37c;

            svg::v-deep path {
              fill: white;
            }
          }
        }

        .list {
          height: vw(144px);
          max-width: vw(887px);
          min-width: vw(887px);
          overflow: hidden;
          margin: 0 vw(17px);

          .list-item {
            min-width: vw(165px);
            border-radius: vw(10px);
            overflow: hidden;
            cursor: pointer;
            opacity: 0.6;
            transition: opacity ease 0.2s;
            margin-right: vw(15px);

            &.selected {
              opacity: 1;
            }

            &__picture {
              background: {
                size: cover;
                position: center;
                repeat: no-repeat;
              }
            }
          }
        }
      }

      .characteristics {
        margin-left: vw(75px);

        &__title {
          @include font(Lato, 500, normal, vw(30px));
          color: #333333;
        }

        .items {
          margin-top: vw(25px);
          width: vw(465px);
          flex-wrap: wrap;

          .item-container {
            width: vw(190px);
            margin-right: vw(82px);
            margin-top: vw(35px);

            &:first-child,
            &:nth-child(2) {
              margin-top: 0;
            }

            &:nth-child(2n) {
              margin-right: 0;
            }

            &__title {
              @include font(Lato, 400, normal, vw(24px));
              color: rgba(#333333, 0.5);
              margin-bottom: vw(10px);
            }

            &__picture {
              min-width: vw(50px);
              max-width: vw(50px);
              height: vw(50px);
            }

            &__value {
              @include font(Lato, 500, normal, vw(24px));
              color: #333333;
              margin-left: vw(10px);
              white-space: nowrap;
            }
          }
        }
      }

      .specifities {
        margin-top: vw(25px);

        &-list {
          margin-top: vw(25px);
          width: vw(465px);
          flex-wrap: wrap;
        }

        .specifity {
          width: vw(180px);
          margin-right: vw(42px);
          margin-top: vw(35px);

          &:first-child,
          &:nth-child(2) {
            margin-top: 0;
          }

          &:nth-child(2n) {
            margin-right: 0;
          }

          &__picture {
            width: vw(25px);
            height: vw(25px);
          }

          &__value {
            @include font(Lato, 400, normal, vw(24px));
            margin-left: vw(15px);
          }
        }
      }

      .prices {
        margin-top: vw(25px);

        .options {
          margin-top: vw(25px);

          .option {
            @include font(Lato, 400, normal, vw(24px));
            color: rgba(#333333, 0.5);
            width: vw(148px);
            border-bottom: vw(2px) solid rgba(51, 51, 51, 0.21);
            text-align: center;
            padding-bottom: vw(7px);
            cursor: pointer;
            transition: ease 0.2s;
            transition-property: color, border-bottom-color;

            &.selected {
              border-bottom-color: #2cc37c;
              color: #333333;
            }
          }
        }
      }

      .timber {
        margin-top: vw(25px);
        height: vw(171px);

        &-item {
          margin-top: vw(24px);

          &:first-child {
            margin-top: 0;
          }

          &__picture {
            width: vw(49px);
            height: vw(40px);
            background: {
              size: contain;
              position: left center;
              repeat: no-repeat;
            }
          }

          &__title {
            @include font(Lato, 400, normal, vw(24px));
            color: #333333;
            width: vw(154px);
            margin-left: vw(21px);
            white-space: nowrap;
          }

          &__value {
            @include font(Lato, 500, normal, vw(28px));
            color: #333333;
            margin-left: vw(44px);
          }
        }
      }

      .control-panel {
        margin-top: vw(25px);
        min-height: vw(64px);

        .order-project {
          @include font(Lato, 400, normal, vw(22px));
          @extend %content-center;
          min-height: inherit;
          width: vw(363px);
          background-color: #f8f8f8;
          border-radius: vw(5px);
          color: #333333;
          cursor: pointer;
        }

        .print {
          @extend %content-center;
          min-height: inherit;
          width: vw(64px);
          border-radius: vw(5px);
          background-color: #f8f8f8;
          margin-left: vw(15px);
          cursor: pointer;

          svg {
            width: vw(30px);
            height: vw(30px);
          }
        }
      }
    }
  }

  .hint {
    @include font(Lato, 400, normal, vw(24px));
    margin-top: vw(30px);
    color: rgba(black, 0.5);
    margin-left: vw(341px);
  }

  .advantages {
    margin-top: vw(76px);

    .advantage {
      margin-right: vw(86px);
      transition: transform ease 0.2s;

      &:hover {
        transform: translateY(-10%);
      }

      &:last-child {
        margin-right: 0;
      }

      &__picture {
        width: vw(250px);
        height: vw(250px);
      }

      &__text {
        @include font(Lato, normal, normal, vw(24px));
        width: vw(237px);
        margin-top: vw(20px);
        color: #333333;
        text-align: center;
      }
    }
  }

  &-detailing {
    margin-top: vw(84px);
    padding: vw(50px) vw(162px);
    background-color: #f8f8f8;

    .control-buttons {
      .control-button {
        @include font(Lato, 400, normal, vw(22px));
        padding: vw(19px) vw(62px);
        background-color: white;
        color: #333333;
        border-radius: vw(5px);
        margin-right: vw(25px);
        cursor: pointer;
        transition: ease 0.2s;
        transition-property: background-color, color;

        &.selected {
          background-color: #2cc37c;
          color: white;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .equipment,
    .extra {
      margin-top: vw(35px);

      &-header {
        background-color: white;
        height: vw(117px);
        border-radius: vw(10px);

        &__title {
          @include font(Lato, 900, normal, vw(40px));
          color: #333333;
          margin-left: vw(70px);
        }

        .options {
          margin-right: vw(70px);

          .option {
            @include font(Lato, 400, normal, vw(24px));
            color: rgba(#333333, 0.7);

            &:first-child {
              margin-right: vw(50px);
            }
          }
        }
      }

      &-content {
        margin-top: vw(35px);
        background-color: white;
        border-radius: vw(10px);
        padding: 0 vw(70px);

        .content-item {
          padding: vw(30px) 0;
          border-bottom: vw(1px) dashed rgba(#333333, 0.25);

          &:last-child {
            border-bottom: unset;
          }

          &__title {
            @include font(Lato, 900, normal, vw(30px));
            color: #333333;
            width: vw(200px);
          }

          &__picture {
            width: vw(35px);
            height: vw(35px);
            margin-left: vw(30px);
            @extend %content-center;
            cursor: pointer;

            &:hover svg {
              fill: #2cc37c;
            }

            svg {
              width: inherit;
              height: inherit;
              fill: rgba(#333333, 0.3);
            }
          }

          &__text {
            @include font(Lato, normal, normal, vw(24px));
            width: vw(705px);
            color: rgba(black, 0.5);
          }

          .options {
            svg {
              width: vw(50px);
              height: vw(50px);

              &:first-child {
                margin-right: 0;
              }
            }
          }

          &__button {
            @include font(Lato, normal, normal, vw(22px));
            @extend %content-center;
            width: vw(283px);
            height: vw(64px);
            border-radius: vw(5px);
            background-color: #2cc37c;
            color: white;
            cursor: pointer;
          }

          &.foundation {
            padding: vw(60px) 0 vw(50px) 0;
            border-bottom: unset;
          }
        }

        .point {
          &-title {
            @include font(Lato, 900, normal, vw(24px));
            @extend %content-center;
            background-color: #f8f8f8;
            height: vw(85px);
            border-radius: vw(10px);
          }
        }
      }

      .timber-container {
        background-color: white;
        border-radius: vw(10px);
        height: vw(260px);
        margin-top: vw(35px);

        &__title {
          @include font(Lato, 900, normal, vw(30px));
          color: #333333;
          margin-left: vw(70px);
          margin-right: vw(142px);
        }

        .timber-button {
          @include font(Lato, normal, normal, vw(24px));
          @extend %content-center;
          width: vw(149px);
          padding-bottom: vw(7px);
          border-bottom: vw(2px) solid rgba(#333333, 0.21);
          color: rgba(black, 0.5);
          cursor: pointer;

          &.selected {
            border-bottom-color: #2cc37c;
            color: #333333;
          }
        }

        .types {
          .timber-type {
            margin-right: vw(61.22px);

            &:last-child {
              margin-right: 0;
            }

            &__picture {
              width: vw(131.19px);
              height: vw(131.19px);
            }

            &__value {
              @include font(Lato, normal, normal, vw(21px));
              color: rgba(#333333, 0.8);
            }
          }
        }
      }
    }

    .technologies {
      @extend %content-center;

      &-title {
        @include font(Lato, 900, normal, vw(40px));
        color: #333333;
        margin-top: vw(35px);
        padding: vw(35px) vw(70px);
        background-color: white;
        border-radius: vw(10px);
      }

      &-container {
        @extend %content-center;
        background-color: white;
        margin-top: vw(35px);
        padding: vw(38px) 0;
      }
    }

    .extra-content {
      .content-item__title {
        width: vw(370px);
      }

      .point {
        border-bottom: vw(1px) dashed rgba(51, 51, 51, 0.25);

        &:last-child {
          border-bottom: none;
        }
      }

      .price {
        @include font(Lato, 700, normal, vw(24px));
        display: flex;
        justify-content: flex-end;
        text-align: right;
        width: vw(200px);
      }
    }
  }

  .swiper-container {
    margin-top: vw(100px);
  }

  .stages-container {
    margin-top: vw(100px);
    display: flex;
    align-items: center;
    justify-content: center;

    .work-stages {
      margin-top: 0;
      width: unset;

      &::v-deep .free-item {
        display: none;
      }

      &::v-deep .stages-list {
        width: vw(1596px);
      }

      &::v-deep .stage-line {
        justify-content: center !important;

        .stage-item:first-child {
          margin-right: vw(90px);
        }
      }
    }
  }
}

.house-desc__inner {

    padding: 15px;
    background: white;
    border-radius: 10px;
    margin-top: 15px;
    width: 100%;
    font-family: Lato;
    font-size: 20px;
    line-height: 160%;

}
</style>
