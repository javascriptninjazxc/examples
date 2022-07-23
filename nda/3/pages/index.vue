<template>
  <div class="home-page">
    <houses-swiper />

    <div class="popular-projects full-width row-block align-center justify-between">
      <div class="text-container column-block">
        <span class="text-container__title">Популярные проекты</span>
        <span class="text-container__text">Опираясь на многолетний опыт, мы сделали подборку самых востребованных проектов.</span>
        <div class="house-types column-block">
          <div
            v-for="(item, i) of $options.houseTypes"
            :key="`${item}${i}`"
            :class="{ selected: selectedHouseType === item.type }"
            class="list-item row-block align-center"
            @click="selectHouseType(item.type)"
          >
            <div class="list-circle"></div>
            <span class="list-item__text">{{ item.title }}</span>
          </div>
        </div>
      </div>

      <HousesTypesSwiper :popular-houses="popularHouses" />
    </div>

    <div class="content-container align-center column-block">
      <div class="content">
        <CalculatePrice />

        <div class="marquiz-container marquiz__fix">
          <Marquiz />
        </div>

        <div class="column-block">
          <div class="building-technologies column-block">
            <span class="building-technologies__title">Технологии строительства</span>
            <span class="building-technologies__text"
              >Предлагаем большой выбор вариантов проектов из дерева. Это брусовые дома и каркасники размером от 37 до 250 м2 — теплые зимние
              коттеджи, дачные и садовые домики, гостевые дома, бани и банные комплексы с жилым вторым этажом.</span
            >
          </div>

          <div v-if="!isMobile" class="technologies row-block">
            <div class="technologies-items column-block">
              <NuxtLink class="technologies-item" to="/About">
                <TechContainer class="small" :content="$options.TECHNOLOGIES[0]" />
              </NuxtLink>

              <NuxtLink class="technologies-item" to="/OurWorks">
                <TechContainer class="small" :content="$options.TECHNOLOGIES[1]" />
              </NuxtLink>
            </div>

            <NuxtLink class="technologies-item big full-width flex-block" to="/HowWeWork">
              <TechContainer class="big full-width full-height" :content="$options.TECHNOLOGIES[2]" />
            </NuxtLink>

            <div class="technologies-items column-block">
              <NuxtLink class="technologies-item" to="/Technologies">
                <TechContainer class="small" :content="$options.TECHNOLOGIES[3]" />
              </NuxtLink>

              <NuxtLink class="technologies-item" to="/FAQ">
                <TechContainer class="small" :content="$options.TECHNOLOGIES[4]" />
              </NuxtLink>
            </div>
          </div>

          <client-only v-else>
            <swiper :options="$options.swiperMobileTechnologies" class="technologies-mobile row-block">
              <swiper-slide>
                <TechContainer :content="$options.TECHNOLOGIES[0]" />
              </swiper-slide>

              <swiper-slide>
                <TechContainer :content="$options.TECHNOLOGIES[1]" />
              </swiper-slide>

              <swiper-slide>
                <TechContainer :content="$options.TECHNOLOGIES[2]" />
              </swiper-slide>

              <swiper-slide>
                <TechContainer :content="$options.TECHNOLOGIES[3]" />
              </swiper-slide>

              <swiper-slide>
                <TechContainer :content="$options.TECHNOLOGIES[4]" />
              </swiper-slide>
            </swiper>
          </client-only>
        </div>

        <WorkStages id="stages" />
      </div>
    </div>

    <div class="company-advantages column-block full-width justify-center">
      <div class="text-container column-block">
        <span class="text-container__title">Почему именно мы?</span>
        <span class="text-container__subtitle">Работаем без посредников - древесину добываем в Вологодской области.</span>
        <span class="text-container__text"
          >Пиломатериалы заготавливаем на своем <br />
          производстве <br />
          в г. Устюжина и доставляем на своем транспорте</span
        >

        <AskManager />
      </div>
      <img :src="require(`~/assets/img/global/house.webp`)" class="company-advantages__picture" alt="" />
    </div>

    <div class="quality column-block full-width align-center">
      <div class="column-block">
        <div class="headers column-block">
          <span class="headers__title">Отвечаем за качество</span>
          <span class="headers__text"
            >Наша готовность сделать любой индивидуальный проект помогает людям каждый день воплощать свои мечты о счастливой жизни.</span
          >
        </div>

        <div class="quality-elements full-width row-block justify-between">
          <div v-for="(item, i) of $options.quality" :key="`${i}-container`" class="quality-container full-height justify-between column-block columnfix">
            <div class="top-block full-width column-block">
              <div
                class="quality-container__picture full-width full-height"
                :style="{ 'background-image': `url(${require(`~/assets/img/Home/quality/${i + 1}.webp`)})` }"
              ></div>

              <div class="description-content column-block">
                <span class="description-content__title">{{ item.title }}</span>
                <span class="description-content__text">{{ item.text }}</span>
              </div>
            </div>
            <div class="bottom-block full-width column-block justify-between">
              <span class="bottom-block__title">{{ item.subtitle }}</span>
              <span class="bottom-block__text">{{ item.subtext }}</span>
            </div>
          </div>

          <div class="quality-container long full-height column-block justify-between">
            <div
              class="quality-container__picture full-width full-height"
              :style="{ 'background-image': `url(${require('~/assets/img/Home/quality/4.webp')})` }"
            ></div>

            <div class="block-content column-block">
              <div class="column-block">
                <span class="block-content__title">Бесплатная</span>
                <span class="block-content__title">доставка</span>
              </div>

              <span class="block-content__text">*500км от производства</span>
            </div>

            <NuxtLink to="/Delivery" class="more column-block align-center">
              <div class="circle-button"><ArrowSvg /></div>
              <span class="more__text">Подробнее</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="regional-coverage row-block full-width justify-center">
      <div class="regions-content row-block justify-between full-width flex-wrap">
        <div class="background"></div>

        <div class="text-container column-block">
          <span class="text-container__title fixmobile24">Большой региональный охват</span>
          <span class="text-container__text fixmobile11"
            >Заказать строительство можно в Московской, Ленинградской,<br />
            Новгородской, Ярославской, Калужской, Псковской, Владимирской, Вологодской, Тверской областях и также во многих городах: Москве,
            Подмосковье, СПБ, Великом Новгороде, Ярославле, Калуге, Вологде, Пестово, Владимире
          </span>
          <span class="text-container__text none"
            >Организуем быструю бесплатную доставку дерева, комплектующих и оборудования в радиусе 500км от г. Устюжна, где находится наше
            производство</span
          >
        </div>

        <form class="widthfix input-card column-block">
          <div class="uCalc_392132"></div>
          <script>
            var widgetOptions392132 = { bg_color: 'transparent' };
            (function () {
              var a = document.createElement('script'),
                h = 'head';
              a.async = true;
              a.src =
                (document.location.protocol == 'https:' ? 'https:' : 'http:') +
                '//ucalc.pro/api/widget.js?id=392132&t=' +
                Math.floor(new Date() / 18e5);
              document.getElementsByTagName(h)[0].appendChild(a);
            })();
          </script>
        </form>
      </div>
    </div>

    <Reviews />

    <div>
      <div class="our-buildings row-block"></div>
      <MapWorks />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import housesConfig from '@/assets/config/houses';
import requestData from '@/assets/config/requestData';

import ArrowSvg from '@/assets/img/global/arrow.svg';
// import SendSvg from '@/assets/img/Home/send.svg';
// import cacheControl from '@/assets/utils/cacheControl.js';

import windowResize from '@/assets/mixins/windowResize';
import getImages from '@/assets/mixins/getImages.js';

export default {
  name: 'HomePage',
  components: { ArrowSvg },
  mixins: [windowResize, getImages],
  DEBOUNCE_TIME: 2000,
  TECHNOLOGIES: [
    { title: 'Материалы', text: 'Используем только качественные материалы со своего производства' },
    { title: 'Карта работ', text: 'Смотрите наши работы на яндекс карте' },
    { title: 'Этапы строительства', text: 'Отлаженная до мелочей схема работы по строительству вашего объекта' },
    { title: 'Технологии', text: 'Используем самые передовые технологии домостроения' },
    { title: 'Вопросы и ответы', text: 'База ответов на самые часто задаваемые вопросы' },
  ],

  swiperMobileTechnologies: {
    slidesPerView: 2,
    resistanceRatio: 0,
    spaceBetween: 13,
  },

  // middleware: cacheControl({
  //   'max-age': 60 * 60,
  //   'stale-while-revalidate': 60 * 5,
  // }),

  transition: 'local-fade',
  fetchOnServer: true,

  quality: [
    {
      title: 'Опытные бригады',
      text: 'Опыт каждого мастера - от 7 лет. Раз в год всех отправляем на обучение',
      subtitle: 'Работаем без предоплаты',
      subtext: 'Аванс — после доставки материалов остаток – после сдачи',
    },

    {
      title: 'Более 200 готовых решений',
      text: 'Проекты разной площади и размеров',
      subtitle: '12 лет на рынке',
      subtext: 'Настоящая вологодская хвойная древесина. Гарантия - 12 месяцев',
    },

    {
      title: 'Строим по всей России',
      text: 'Любой город страны',
      subtitle: 'Договор, смета, гарантия',
      subtext: 'Юридические обязательства сдачи объекта точно в срок',
    },
  ],

  houseTypes: [
    {
      title: 'Дома из бруса',
      type: 'doma-iz-brusa',
    },
    {
      title: 'Каркасные дома',
      type: 'karkasnie-doma',
    },
    { title: 'барнхаусы', type: 'barnhausy' },
    { title: 'дома под усадку', type: 'doma-pod-usadku' },
    { title: 'бани из бруса', type: 'bani-iz-brusa' },
  ],

  data() {
    return {
      selectedHouseType: null,
      popularHouses: [],
      debounce: null,
    };
  },

  async fetch() {
    this.selectHouseType(this.$options.houseTypes[0].type, true);

    await this.fetchPopular();
  },

  computed: {
    ...mapState({
      prices: (state) => state.category.prices,
    }),
  },

  methods: {
    selectHouseType(type, init) {
      // if (this.selectedHouseType === type || this.debounce != null) return;

      this.selectedHouseType = type;

      if (!init) {
        this.debounce = setTimeout(() => {
          clearTimeout(this.debounce);
          this.debounce = null;
        }, this.$options.DEBOUNCE_TIME);

        this.fetchPopular();
      }
    },

    fetchPopular() {
      this.popularHouses = [];

      return new Promise((resolve) => {
        housesConfig.houses[this.selectedHouseType].createRequest({
          callback: (data) => {
            const elements = [];

            for (const el of data) {
              const prices = [el.price_1, el.price_2, el.price_3];

              if (el.price_4 && el.price_5 && el.price_6) {
                prices.push(el.price_4);
                prices.push(el.price_5);
                prices.push(el.price_6);
              }

              elements.push({
                id: el.URL,
                title: el.name_description,
                mark: el.name,
                characteristic: [
                  { title: 'Площадь', value: el.s },
                  { title: 'Размер', value: el.size },
                  { title: 'Комнат', value: el.rooms },
                  { title: 'Этажей', value: el.floor.data.attributes.floor },
                ],
                price: Math.min(...prices),
                imgs: this.getImages(el.imgs.data, 'large'),
              });
            }

            this.popularHouses = elements;
            resolve();
          },
          cache: true,
          filters: requestData.popular.filters,
          populate: requestData.popular.populate,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.home-page {
  max-width: 100vw;
  overflow: hidden;

  .popular-projects {
    height: vh(828px);
    margin-top: vh(120px);
    background-color: #f8f8f8;
    padding-left: vw(162px);

    .text-container {
      width: vw(398px);

      &__title {
        @include font(Lato, 900, normal, vh(48px));
        color: #333333;
      }

      &__text {
        @include font(Lato, normal, normal, vh(24px));
        color: #6f6f6f;
        margin-top: vh(30px);
      }

      .house-types {
        margin-top: vh(50px);

        .list-item {
          margin-top: vh(15px);
          cursor: pointer;

          &.selected {
            .list-item__text {
              color: #2cc37c;
              transform: scale(1.2);
            }

            .list-circle {
              background-color: #2cc37c;
            }
          }

          &:first-child {
            margin-top: 0;
          }

          .list-circle {
            width: vh(10px);
            height: vh(10px);
            border-radius: 50%;
            background-color: #d2d2d2;
            transition: background-color ease 0.2s;
          }

          &__text {
            @include font(Lato, bold, normal, vh(15px));
            color: #969696;
            text-transform: uppercase;
            margin-left: vw(15px);
            transform-origin: left center;
            transition: ease 0.2s;
            transition-property: color, transform;
          }
        }
      }
    }
  }

  .content-container {
    padding-top: vh(60px);

    .content {
      width: vw(1595px);

      .marquiz-container {
        height: 600px;
        margin-top: vw(40px);
      }

      .building-technologies {
        margin-top: vh(60px);

        &__title {
          @include font(Lato, 700, normal, vh(48px));
          color: #333333;
        }

        &__text {
          @include font(Lato, 400, normal, vh(24px));
          color: rgba(#333333, 0.7);
          margin-top: vh(30px);
          width: vh(1029px);
        }
      }

      .technologies {
        margin-top: vh(40px);

        .technologies-item {
          cursor: pointer;
          border-radius: vh(10px);
          overflow: hidden;
        }

        .technologies-items {
          .technologies-item.big {
            height: vh(510px);
          }

          &:first-child {
            .technologies-item {
              &:first-child {
                background: {
                  color: #e6dbc0;
                  image: url('~assets/img/Home/technologies/materials.png');
                  size: contain;
                  position: center;
                  repeat: no-repeat;
                }
              }

              &:last-child {
                margin-top: vh(20px);
                background: {
                  color: rgba(149, 218, 218, 0.56);
                  image: url('~assets/img/Home/technologies/working-map.png');
                  size: contain;
                  position: center;
                  repeat: no-repeat;
                }
              }
            }
          }

          &:nth-child(2) {
            height: vh(510px);
          }

          &:last-child {
            .technologies-item {
              &:first-child {
                background: {
                  color: #c7e1f9;
                  image: url('~assets/img/Home/technologies/technologies.png');
                  size: contain;
                  position: center;
                  repeat: no-repeat;
                }
              }

              &:last-child {
                margin-top: vh(20px);

                background: {
                  color: #edede1;
                  image: url('~assets/img/Home/technologies/FAQ.png');
                  size: contain;
                  position: center;
                  repeat: no-repeat;
                }
              }
            }
          }
        }
      }
    }
  }

  .company-advantages {
    margin-top: vw(120px);
    min-height: vw(733px);
    background-color: #f8f8f8;
    position: relative;

    &__picture {
      width: vw(1054px);
      height: vw(855px);
      position: absolute;
      bottom: 0;
      right: 0;
    }

    .text-container {
      margin-left: vw(162px);

      &__title {
        @include font(Lato, 700, normal, em(48px));
        color: #333333;
      }

      &__subtitle {
        @include font(Lato, 400, normal, em(30px));
        margin-top: vw(20px);
        color: #6f6f6f;
        width: vw(646px);
      }

      &__text {
        @include font(Lato, 400, normal, em(30px));
        margin-top: vw(20px);
        color: #6f6f6f;
        width: vw(763px);
      }
    }
  }

  .quality {
    margin-top: vw(120px);

    .headers {
      &__title {
        @include font(Lato, 700, normal, em(48px));
        color: #333333;
      }

      &__text {
        @include font(Lato, 400, normal, em(24px));
        color: rgba(#333333, 0.7);
        width: vw(558px);
        margin-top: vw(30px);
      }
    }

    &-elements {
      margin-top: vw(85px);
      height: vw(601px);
      width: vw(1596px);

      .quality-container {
        width: vw(371px);
        position: relative;
        display: flex;

        &__picture {
          position: absolute;

          background: {
            size: cover;
            position: center;
            repeat: no-repeat;
          }
        }

        .top-block {
          background-color: #f5f5f5;
          border-radius: vw(10px);
          min-height: vw(379px);
          position: relative;

          .description-content {
            margin: vw(20px) 0 0 vw(20px);

            &__title {
              @include font(Lato, 900, normal, vw(30px));
              color: #333333;
              width: vw(298px);
            }

            &__text {
              @include font(Lato, normal, normal, vw(18px));
              color: #333333;
              margin-top: vw(10px);
              width: vw(298px);
            }
          }
        }

        .bottom-block {
          background-color: #f5f5f5;
          border-radius: vw(10px);
          min-height: vw(172px);
          padding: vw(25px);

          &__title {
            @include font(Lato, 900, normal, vw(24px));
            color: #333333;
          }

          &__text {
            @include font(Lato, normal, normal, vw(18px));
            color: #333333;
          }
        }

        &.long {
          background-color: #f5f5f5;

          .block-content {
            position: absolute;
            padding: vw(30px);

            &__title {
              &:first-child {
                @include font(Lato, 900, normal, vw(36px));
                color: #2cc37c;
              }

              &:last-child {
                @include font(Lato, normal, normal, vw(36px));
                color: #333333;
              }
            }

            &__text {
              @include font(Lato, normal, normal, vw(18px));
              color: rgba(#333333, 0.4);
              margin-top: vw(10px);
            }
          }

          .more {
            width: vw(100px);
            position: absolute;
            bottom: vw(29px);
            z-index: 2;
            align-self: center;

            cursor: pointer;

            &:hover .circle-button {
              transform: scale(1.2);
            }

            .circle-button {
              @extend %content-center;
              width: vw(86px);
              height: vw(86px);
              background-color: #72899f;
              border-radius: 50%;
              transition: transform ease 0.2s;

              svg {
                width: vw(19.48px);
                height: vw(18.98px);

                path {
                  fill: #f8f8f8;
                }
              }
            }

            &__text {
              @include font(Lato, normal, normal, vw(18px));
              margin-top: vw(10px);
              color: rgba(#333333, 0.7);
            }
          }
        }
      }
    }
  }

  .regional-coverage {
    margin-top: vw(120px);
    padding: 0 vw(162px);

    .regions-content {
      position: relative;

      .background {
        position: absolute;
        width: vw(1066px);
        height: vw(535px);
        background: {
          size: contain;
          position: top center;
          repeat: no-repeat;
          image: url('~assets/img/Home/regions.png');
        }
      }

      .text-container {
        width: vw(1126px);
        position: relative;
        z-index: 2;

        &__title {
          @include font(Lato, 900, normal, vw(48px));
          color: #333333;
        }

        &__text {
          @include font(Lato, normal, normal, vw(30px));
          color: rgba(#333333, 0.7);
          margin-top: vw(40px);
          line-height: vw(40px);
        }
      }

      .input-card {
        width: vw(483px);
        height: 550px;
        margin-left: vw(87px);
        border-radius: vw(14px);
        box-shadow: 0 0 vw(47px) rgba(0, 0, 0, 0.2);
        padding: vw(30px);

        .inputs {
          margin-top: vw(46px);
          margin-bottom: vw(45px);

          &__input {
            @include font(Lato, normal, normal, vw(14px));
            padding-bottom: vw(7px);
            border: {
              top: none;
              left: none;
              right: none;
              bottom: vw(1px) solid rgba(#333333, 0.5);
            }

            &:last-child {
              margin-top: vw(30px);
            }

            &::placeholder {
              color: rgba(#333333, 0.9);
            }
          }
        }

        &__title {
          @include font(Lato, 900, normal, vw(24px));
          color: #333333;
          line-height: vw(32.88px);
        }

        &__text {
          @include font(Lato, normal, normal, vw(18px));
          color: rgba(#333333, 0.5);
          margin-top: vw(10px);
          line-height: vw(24.66px);

          &-label {
            @include font(Lato, normal, normal, vw(14px));
            color: #333333;
            width: vw(258px);
            margin-left: vw(14px);
            line-height: vw(19.18px);
          }
        }

        &__checkbox {
          margin-top: vw(5px);
        }

        .submit-button {
          @extend %content-center;
          margin-top: vw(45px);
          width: vw(75px);
          height: vw(75px);
          border-radius: 50%;
          background-color: #2cc37c;
          align-self: center;
          cursor: pointer;
          transition: transform ease 0.2s;

          &:hover {
            transform: scale(1.1);
          }

          svg {
            width: vw(21px);
            height: vw(18px);
          }
        }
      }
    }
  }
}

@import '@/assets/css/media/index';
</style>
