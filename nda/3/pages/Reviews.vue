<template>
  <div class="reviews full-width full-height">
    <div class="background full-width align-center column-block">
      <div class="column-block">
        <div class="all-categories column-block">
          <div class="all-categories__title">Другие категории</div>
          <HouseCategories />
        </div>
      </div>
      <div class="route full-width">
        <span class="route__text">Главная > Отзывы</span>
        <div class="route__title">Отзывы наших клиентов</div>
      </div>
    </div>

    <div class="container column-block">
      <div v-for="(review, i) of reviews" :key="`${review.name}-${i}`" class="review-container row-block justify-between full-width">
        <div class="reviewer-data column-block">
          <div class="user-data row-block align-center">
            <img src="~/assets/img/Reviews/user.png" class="user-data__picture" alt="" />

            <div class="column-block">
              <span class="user-data__title">{{ review.name }}</span>
              <div class="date row-block">
                <CalendarSvg class="date__picture" />
                <span class="date__title">{{ review.date }}</span>
              </div>
            </div>
          </div>

          <div class="building row-block align-center">
            <span class="reviewer-data__title">Постройка: </span>
            <span class="reviewer-data__value">{{ review.object }}</span>
          </div>

          <div class="district row-block align-center">
            <span class="reviewer-data__title">Район: </span>
            <span class="reviewer-data__value">{{ review.address }}</span>
          </div>

          <div class="text">{{ review.review }}</div>
        </div>

        <!-- {{ review.img }} -->

        <div class="review-picture full-height" :style="{ 'background-image': `url(${review.img})` }"></div>
      </div>
    </div>

    <Questions />
  </div>
</template>

<script>
import housesConfig from '~/assets/config/houses';
import requestData from '~/assets/config/requestData';
import CalendarSvg from '~/assets/img/Reviews/calendar.svg';

import getImages from '@/assets/mixins/getImages.js';

export default {
  name: 'Reviews',
  components: {
    CalendarSvg,
  },

  mixins: [getImages],
  transition: 'local-fade',
  fetchOnServer: true,

  data() {
    return {
      reviews: [],
    };
  },

  async fetch() {
    const data = await housesConfig.reviews.createRequest({
      asynchronous: true,
      fields: requestData.reviews.fields,
      populate: requestData.reviews.populate,
    });

    for (const el of data) {
      el.img = this.getImages([el.img.data], 'large');
    }

    this.reviews = data;
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.reviews {
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
    padding: vw(60px) vw(155px) vw(70px) vw(155px);

    .review-container {
      margin-top: vw(60px);

      &:first-child {
        margin-top: 0;
      }

      .reviewer-data {
        padding: vw(60px);
        width: vw(827px);
        height: vw(925px);
        border-radius: vw(10px);
        background: #f8f8f8;

        &__title {
          @include font(Lato, 500, normal, vw(24px));
          color: #333333;
        }

        &__value {
          @include font(Lato, 400, normal, vw(22px));
          color: rgba(#333333, 0.5);
          margin-left: vw(5px);
        }

        .user-data {
          &__picture {
            width: vw(177px);
            height: vw(177px);
            margin-right: vw(50px);
          }

          &__title {
            @include font(Lato, 400, normal, vw(36px));
            color: #333333;
          }

          .date {
            margin-top: vw(12px);

            &__picture {
              width: vw(18px);
              height: vw(20px);
            }

            &__title {
              @include font(Lato, 400, normal, vw(18px));
              margin-left: vw(13px);
              color: rgba(#333333, 0.7);
            }
          }
        }

        .building {
          margin-top: vw(40px);
        }

        .district {
          margin-top: vw(16px);
        }

        .text {
          @include font(Lato, 400, normal, vw(22px));
          color: #333333;
          margin-top: vw(61.5px);
          line-height: vw(30.47px);
        }
      }

      .review-picture {
        width: vw(672px);
        height: vw(925px);
        background: {
          size: cover;
          position: center;
          repeat: no-repeat;
        }
      }
    }
  }
}
</style>
