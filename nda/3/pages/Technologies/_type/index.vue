<template>
  <div class="technology full-width full-height">
    <div class="background full-width align-center column-block">
      <div class="column-block">
        <div class="all-categories column-block">
          <div class="all-categories__title">Другие категории</div>
          <HouseCategories />
        </div>
      </div>
      <div class="route full-width">
        <span class="route__text">Главная > Технологии</span>
        <div class="route__title">Технологии строительства</div>
      </div>
    </div>

    <div class="container full-width align-center column-block">
      <div class="container__title full-width">{{ $options.titles[route] }}</div>
      <Technologies :category="category" />
    </div>

    <Questions />
  </div>
</template>

<script>
import { FRAME_HOUSES } from '@/assets/config/variables';

export default {
  name: 'Type',
  transition: 'local-fade',

  titles: {
    frame: 'Каркасные дома',
    timber: 'Дома из бруса',
  },

  data() {
    return {
      category: null,
      route: null,
    };
  },

  created() {
    this.route = this.$route.params.type;

    if (this.$route.params.type === 'frame') {
      this.category = FRAME_HOUSES;
      return;
    }

    this.category = this.$route.params.type;
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.technology {
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
    padding: 0 vw(162px);
    margin-bottom: vw(100px);

    &__title {
      @include font(Lato, 900, normal, vw(48px));
      color: #333333;
      margin: vw(40px) 0 vw(70px) 0;
    }
  }
}
</style>
