<template>
  <div class="how-we-work full-width full-height">
    <div class="background full-width align-center column-block">
      <div class="column-block">
        <div class="all-categories column-block">
          <div class="all-categories__title">Другие категории</div>
          <HouseCategories />
        </div>
      </div>
      <div class="route full-width">
        <span class="route__text">Главная > Как мы работаем</span>
        <div class="route__title">Как мы работаем</div>
      </div>
    </div>

    <div class="container column-block">
      <div class="categories row-block">
        <a v-for="(item, i) of titles" :key="`${item}${i}`" class="category row-block align-center" :href="`#${item}`">
          <div class="category__index">{{ i + 1 }}</div>
          <span class="category__title">{{ item }}</span>
        </a>
      </div>

      <div class="advantages column-block">
        <div v-for="(item, i) of $options.Advantages" :id="item.title" :key="`${item.title}${i}`" class="advantage row-block align-center">
          <div class="content column-block">
            <span class="content__title">{{ item.title }}</span>
            <span class="content__text">{{ item.description }}</span>

            <div class="difference row-block">
              <div class="likes align-center column-block">
                <span class="difference__title">Мы</span>

                <div v-for="(advItem, j) of item.ourCompany" :key="`${advItem}${j}`" class="difference-item row-block full-width align-center">
                  <LikeSvg class="difference__picture" />
                  <span class="difference__text">{{ advItem }}</span>
                </div>
              </div>

              <div class="dislikes align-center column-block">
                <span class="difference__title">Другие</span>

                <div v-for="(advItem, j) of item.others" :key="`${advItem}${j}`" class="difference-item row-block full-width align-center">
                  <DislikeSvg class="difference__picture" />
                  <span class="difference__text">{{ advItem }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="picture full-width full-height">
            <div class="icon" :style="{ 'background-image': `url(${require(`~/assets/img/advantages/${item.img}.png`)})` }"></div>
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>

    <Questions />
  </div>
</template>

<script>
import Advantages from '@/assets/config/advantages.js';
import LikeSvg from '@/assets/img/advantages/like.svg';
import DislikeSvg from '@/assets/img/advantages/dislike.svg';

export default {
  name: 'HowWeWork',
  Advantages,

  components: {
    LikeSvg,
    DislikeSvg,
  },
  transition: 'local-fade',

  computed: {
    titles() {
      return this.$options.Advantages.map((el) => el.title);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.how-we-work {
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

    .categories {
      flex-wrap: wrap;
      padding: vw(25px) vw(80px);
      box-shadow: 0px vw(18px) vw(39px) rgba(black, 0.06);
      border-radius: vw(10px);

      .category {
        width: vw(250px);
        height: vw(65px);
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

          .category__title {
            color: white;
          }
        }

        &:nth-child(5n) {
          margin-right: 0;
        }

        &__title {
          @include font(Lato, 500, normal, vw(24px));
          color: #333333;
          margin-left: vw(20px);
        }

        &__index {
          @include font(Lato, 900, normal, vw(24px));
          @extend %content-center;
          width: vw(40px);
          height: vw(40px);
          border-radius: 50%;
          background-color: white;
          color: black;
          margin-left: vw(21px);
        }
      }
    }
  }

  .advantages {
    margin-top: vw(100px);

    .advantage {
      border-top: vw(1px) dashed rgba(#333333, 0.46);
      margin-bottom: vw(100px);
      padding-top: vw(40px);

      &:first-child {
        border-top: none;
      }

      &:last-child {
        margin-bottom: vw(62px);
      }

      .content {
        &__title {
          @include font(Lato, 900, normal, vw(48px));
          color: #333333;
        }

        &__text {
          @include font(Lato, 500, normal, vw(30px));
          width: vw(523px);
          margin-top: vw(20px);
          color: rgba(#333333, 0.7);
        }

        .difference {
          margin-top: vw(50px);

          &-item {
            margin-bottom: vw(60px);

            &:last-child {
              margin-bottom: 0;
            }
          }

          .likes {
            .difference__title {
              color: #2cc37c;
            }
          }

          .dislikes {
            margin-left: vw(95px);

            .difference__title {
              color: rgba(#333333, 0.3);
            }
          }

          &__title {
            @include font(Lato, 500, normal, vw(24px));
            color: #333333;
            margin-bottom: vw(25px);
          }

          &__picture {
            width: vw(50px);
            height: vw(50px);
            margin-right: vw(35px);
          }

          &__text {
            @include font(Lato, 500, normal, vw(24px));
            color: #333333;
            width: vw(400px);
          }
        }
      }

      .picture {
        @extend %content-center;

        .circle {
          width: vw(374px);
          height: vw(374px);
          border-radius: 50%;
          background-color: #f8f8f8;
        }

        .icon {
          width: vw(450px);
          height: vw(450px);
          position: absolute;
          background: {
            size: contain;
            position: center;
            repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>
