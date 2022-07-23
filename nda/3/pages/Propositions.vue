<template>
  <div class="propositions full-width full-height">
    <div class="background full-width align-center column-block">
      <div class="column-block">
        <div class="all-categories column-block">
          <div class="all-categories__title">Другие категории</div>
          <HouseCategories />
        </div>
      </div>
      <div class="route full-width">
        <span class="route__text">Главная > Акции</span>
        <div class="route__title">Акции</div>
      </div>
    </div>

    <div class="container column-block">
      <div
        v-for="i in $options.PROMOTIONS_AMOUNT"
        :key="`slide-${i}`"
        class="proposition-element full-width column-block"
        :style="{ 'background-image': `url(${require(`~/assets/img/Promotion/${$options.promotionConfig[i - 1].path}.png`)})` }"
      >
        <span class="proposition-element__title">{{ $options.promotionConfig[i - 1].title }}</span>
        <span class="proposition-element__text" :class="{ small: $options.promotionConfig[i - 1].description.length > $options.MAX_LEN }">{{
          $options.promotionConfig[i - 1].description
        }}</span>

        <NuxtLink
          v-if="$options.promotionConfig[i - 1].button"
          class="proposition-element__button"
          :to="$options.promotionConfig[i - 1].buttonPath"
          >{{ $options.promotionConfig[i - 1].button }}</NuxtLink
        >
      </div>
    </div>

    <Questions />
  </div>
</template>

<script>
import promotionConfig from '@/assets/config/promotion.js';

export default {
  name: 'Propositions',
  promotionConfig,
  MAX_LEN: 40,
  PROMOTIONS_AMOUNT: 5, // temp solution
  transition: 'local-fade',
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.propositions {
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
    padding: vw(40px) vw(162px);

    .proposition-element {
      height: vw(399px);
      padding: vw(61px) 0 0 vw(127px);
      margin-bottom: vw(90px);

      &:last-child {
        margin-bottom: 0;
      }

      background: {
        size: cover;
        position: center;
        repeat: no-repeat;
      }

      &__title {
        @include font(Lato, 900, normal, vw(48px));
        color: #333333;
        width: vw(400px);
      }

      &__text {
        @include font(Lato, normal, normal, vw(24px));
        color: rgba(black, 0.6);
        margin-top: vw(15px);
        width: vw(380px);

        &.small {
          font-size: vw(18px);
        }
      }

      &__button {
        @include font(Lato, normal, normal, vw(22px));
        @extend %content-center;
        width: vw(269px);
        height: vw(64px);
        margin-top: vw(15px);
        background-color: #0fb684;
        border-radius: vw(5px);
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>
