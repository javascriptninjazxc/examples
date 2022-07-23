<template>
  <div class="our-works full-width full-height">
    <div class="background full-width align-center column-block">
      <div class="column-block">
        <div class="all-categories column-block">
          <div class="all-categories__title">Другие категории</div>
          <HouseCategories />
        </div>
      </div>
      <div class="route full-width">
        <span class="route__text">Главная > Наши работы</span>
        <div class="route__title">Наши работы</div>
      </div>
    </div>

    <div class="container column-block">
      <div class="categories row-block">
        <span
          v-for="(item, i) of $options.categories"
          :key="`${item}${i}`"
          class="category"
          :class="{ selected: item.title === selectedCategory.title }"
          @click="selectCategory(item)"
          >{{ item.title }}</span
        >
      </div>

      <div v-if="!isMap" class="houses row-block full-width">
        <div v-for="(house, i) of elementsMapped" :key="`house-${i}`" class="house column-block">
          <ImageSwiper :imgs="house.imgs" />
          <div class="content column-block justify-between full-width full-height">
            <div class="column-block">
              <span class="content__title">{{ house.name }}</span>
              <span class="content__text-address">{{ house.adress }}</span>
              <span class="content__text-date">{{ house.date }}</span>
            </div>

            <NuxtLink class="content__button" append :to="`${house.id}`">Подробнее</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <keep-alive>
      <div v-show="isMap" class="works-map">
        <MapWorks />
      </div>
    </keep-alive>

    <Questions />
  </div>
</template>

<script>
import housesConfig from '@/assets/config/houses.js';
import requestData from '@/assets/config/requestData.js';
import getImages from '@/assets/mixins/getImages.js';

export default {
  name: 'OurWorks',
  fetchOnServer: true,
  housesConfig,

  mixins: [getImages],
  transition: 'local-fade',

  categories: [
    { title: 'Все объекты', filter: 'all' },
    { title: 'Дома из бруса', filter: 'DB' },
    { title: 'Каркасные дома', filter: 'KD' },
    { title: 'Бани', filter: 'BB' },
    { title: 'Карта построек', filter: 'open-map' },
  ],

  data() {
    return {
      selectedCategory: null,
      elements: [],
      buttonsDisabled: false,
      isMap: false,
    };
  },

  async fetch() {
    this.selectedCategory = this.$options.categories[0];

    console.log('постучался')

    const elements = [];

    const res = await housesConfig.ourWorks.createRequest({
      asynchronous: true,
      populate: requestData.ourWorks.populate,
      filterResponse: false,
    });

    for (const element of res.data.data) {
      elements.push({
        ...element.attributes,
        id: element.id,
      });
    }

    this.elements = elements;
  },
  computed: {
    elementsMapped() {
      if (!this.elements.length) return;

      const elements = JSON.parse(JSON.stringify(this.elements));

      for (let i = 0; i < elements.length; i++) {
        if (elements[i].imgs.data == null) {
          if (elements[i].img_main) {
            elements[i].imgs = this.getImages([elements[i].img_main.data], 'large');
          } else {
            elements[i].imgs = [];
          }

          continue;
        }

        elements[i].imgs = this.getImages([elements[i].img_main.data, ...elements[i].imgs.data], 'large');
      }

      return elements;
    },
  },
  methods: {
    selectCategory(category) {
      if (this.buttonsDisabled) return;

      this.selectedCategory = category;
      this.updateHouses();
    },

    async updateHouses() {
      let filters = {};

      if (['all', 'open-map'].includes(this.selectedCategory.filter)) {
        if (this.selectedCategory.filter === 'all') {
          filters = {};
        } else {
          this.isMap = true;
          return;
        }
      } else {
        filters = { type: this.selectedCategory.filter };
      }

      this.isMap = false;

      this.buttonsDisabled = true;

      const elements = [];

      const res = await housesConfig.ourWorks.createRequest({
        asynchronous: true,
        populate: requestData.ourWorks.populate,
        filterResponse: false,
        filters,
      });

      for (const element of res.data.data) {
        elements.push({
          ...element.attributes,
          id: element.id,
          filters,
        });
      }

      this.buttonsDisabled = false;
      this.elements = elements;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.our-works {
  .works-map {
    margin-top: vw(40px);
  }

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
          background-color: #2cb173;
          color: white;
        }

        &.selected {
          background-color: #2cb173;
          color: white;
        }

        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }

    .houses {
      margin-top: vw(100px);
      flex-wrap: wrap;

      .house {
        width: vw(472px);
        height: vw(713px);
        border-radius: vw(10px);
        background-color: #f8f8f8;
        margin-right: vw(90px);
        margin-top: vw(90px);
        overflow: hidden;

        .content {
          padding: vw(20px) vw(40px) vw(40px) vw(40px);

          &__title {
            @include font(Lato, 700, normal, vw(25px));
            color: #333333;
            height: vw(84px);
          }

          &__text {
            &-address,
            &-date {
              @include font(Lato, 500, normal, vw(24px));
              margin-top: vw(21px);
              color: rgba(#333333, 0.7);
            }
          }

          &__button {
            @include font(Lato, 500, normal, vw(24px));
            @extend %content-center;
            height: vw(63px);
            border-radius: vw(4px);
            background-color: #2cc37c;
            color: white;
            cursor: pointer;
          }
        }

        &:nth-child(n + 1):nth-child(-n + 3) {
          margin-top: 0;
        }

        &:nth-child(3n) {
          margin-right: 0;
        }

        .slide__picture {
          min-height: vw(305px);
        }
      }
    }
  }
}
</style>
