<template>
  <div class="FAQ full-width full-height">
    <div class="background full-width align-center column-block">
      <div class="column-block">
        <div class="all-categories column-block">
          <div class="all-categories__title">Другие категории</div>
          <HouseCategories />
        </div>
      </div>
      <div class="route full-width">
        <span class="route__text">Главная > Вопрос-ответ</span>
        <div class="route__title">Вопрос-ответ</div>
      </div>
    </div>

    <div class="container column-block">
      <div class="categories row-block">
        <a v-for="(item, i) of titles" :key="`${item}${i}`" class="category" :href="`#${item}`">{{ item }}</a>
      </div>

      <div class="questions column-block full-width">
        <div v-for="(item, i) of $options.FAQ" :id="item.title" :key="`${item}${i}`" class="questions-list column-block">
          <span class="questions-list__title">{{ item.title }}</span>
          <div class="list-items column-block">
            <div
              v-for="(question, j) of item.items"
              :key="`${question.description}${j}`"
              class="list-item column-block"
              :class="{ opened: questions.includes(question.title) }"
              @click="toggleQuestion(question.title)"
            >
              <span class="list-item__title">{{ question.title }}</span>
              <div class="triangle"></div>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span class="list-item__description column-block" v-html="question.description"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Questions />
  </div>
</template>

<script>
import FAQ from '@/assets/config/FAQ.js';

export default {
  name: 'FAQ',
  FAQ,
  transition: 'local-fade',

  data() {
    return {
      questions: [],
    };
  },

  computed: {
    titles() {
      return this.$options.FAQ.map((el) => el.title);
    },
  },

  methods: {
    toggleQuestion(questionId) {
      if (this.questions.includes(questionId)) {
        const index = this.questions.indexOf(questionId);
        this.questions.splice(index, 1);
      } else {
        this.questions.push(questionId);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.FAQ {
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
    padding: 0 vw(155px);

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
          background-color: #2cc37c;
          color: white;
        }

        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }

    .questions {
      margin-top: vw(50px);

      &-list {
        border-top: vw(1px) dashed rgba(51, 51, 51, 0.46);
        padding: vw(50px) 0;

        &__title {
          @include font(Lato, 900, normal, vw(48px));
          color: #333333;
          margin-bottom: vw(40px);
        }

        .list-item {
          min-height: vw(116px);
          border-radius: vw(10px);
          background-color: #f8f8f8;
          padding-top: vw(40px);
          margin-top: vw(50px);
          position: relative;
          transition: background-color ease 0.2s;
          cursor: pointer;

          &.opened {
            background-color: #2cc37c;

            .list-item {
              &__title {
                color: white;
              }

              &__description {
                display: flex;
              }
            }

            .triangle {
              border-color: white transparent transparent transparent;
              transform: rotate(180deg);
            }
          }

          &:first-child {
            margin-top: 0;
          }

          &__title {
            @include font(Lato, 500, normal, vw(30px));
            margin-left: vw(54px);
            transition: color ease 0.2s;
          }

          &__description {
            @include font(Lato, 400, normal, vw(30px));
            color: rgba(white, 0.75);
            display: none;
            padding: vw(25px) vw(71px) vw(22px) vw(54px);
          }

          .triangle {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: vw(10.42px) vw(10.415px) 0 vw(10.415px);
            border-color: #323232 transparent transparent transparent;
            position: absolute;
            top: vw(53.83px);
            right: vw(51.75px);
            transition: ease 0.2s;
            transition-property: border-color, transform;
          }
        }
      }
    }
  }
}
</style>
