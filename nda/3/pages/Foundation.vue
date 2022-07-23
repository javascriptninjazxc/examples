<template>
  <div class="foundation full-width full-height">
    <div class="background full-width align-center column-block">
      <div class="column-block">
        <div class="all-categories column-block">
          <div class="all-categories__title">Другие категории</div>
          <HouseCategories />
        </div>
      </div>
      <div class="route full-width">
        <span class="route__text">Главная > Фундаменты</span>
        <div class="route__title">Фундаменты</div>
      </div>
    </div>

    <div class="container row-block">
      <div class="types column-block">
        <div v-for="(type, i) of $options.types" :key="`${i}${type.title}`" class="type column-block">
          <div
            class="type-picture column-block full-width"
            :style="{ 'background-image': `url(${require(`@/assets/img/Foundation/${i + 1}.png`)})` }"
            @click="selectTile(i)"
          >
            <div class="mark">{{ type.mark }}</div>

            <div class="shadow full-width full-height"></div>
            <div class="content column-block">
              <div class="content__title">{{ type.title }}</div>
              <div class="content__text">{{ type.text }}</div>
            </div>
          </div>

          <div v-if="i === selectedTileId" class="price row-block full-width align-center justify-between">
            <div class="price__title">Введите данные для расчета стоимости</div>

            <div class="input-container row-bock align-center">
              <input v-model.number="models[i]" type="text" maxlength="3" class="input-container__input" />
              <div class="input-title">{{ type.input }}</div>

              <span class="input-container__text">
                {{
                  isNaN(parseInt(models[i]))
                    ? 0
                    : formatNumber((models[i] || 0) * type.price + (checkboxes[i] ? type.checkbox.addPrice * models[i] : 0))
                }}
                <span class="currency">₽</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="additional-container">
        <div class="additional-content column-block">
          <div class="additional-content__title">{{ selectedTile.title }}</div>
          <div v-if="selectedTile.checkbox || selectedTile.table" class="additional-content__text">Дополнительные услуги:</div>

          <div v-if="selectedTile.checkbox" class="checkbox">
            <label class="input-container row-block">
              <input v-model="checkboxes[selectedTileId]" type="checkbox" class="input-container__checkbox" />
              <div class="input-container__text">{{ selectedTile.checkbox.text }}</div>
            </label>

            <div class="checkbox__text">{{ selectedTile.checkbox.desc }}</div>
          </div>

          <template v-if="selectedTile.table">
            <table v-if="selectedTile.type === 'strip'">
              <tbody>
                <tr>
                  <td>Размер объекта</td>
                  <td>Ширина ленты 300 мм, общая высота 1 м</td>
                  <td>Ширина ленты 400 мм, общая высота 1 м</td>
                  <td>Включено перегородок по ширине меньшей стороны</td>
                </tr>
                <tr>
                  <td>6x6 м</td>
                  <td>140 000 р</td>
                  <td>180 000 р</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>6x8 м</td>
                  <td>150 000 р</td>
                  <td>205 000 р</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>8x8 м</td>
                  <td>180 000 р</td>
                  <td>240 000 р</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>9x8 м</td>
                  <td>222 000 р</td>
                  <td>300 000 р</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>9x9 м</td>
                  <td>240 000 р</td>
                  <td>320 000 р</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>10x9 м</td>
                  <td>250 000 р</td>
                  <td>330 000 р</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>10x10 м</td>
                  <td>365 000 р</td>
                  <td>355 000 р</td>
                  <td>2</td>
                </tr>
              </tbody>
            </table>

            <table v-else-if="selectedTile.type === 'monolithic'">
              <tbody>
                <tr>
                  <td>Размер объекта</td>
                  <td>Толщина плиты 250 мм</td>
                  <td>Толщина плиты 300 мм</td>
                </tr>
                <tr>
                  <td>6x6 м</td>
                  <td>160 000 р</td>
                  <td>190 000 р</td>
                </tr>
                <tr>
                  <td>6x8 м</td>
                  <td>210 000 р</td>
                  <td>254 000 р</td>
                </tr>
                <tr>
                  <td>8x8 м</td>
                  <td>280 000 р</td>
                  <td>337 000 р</td>
                </tr>
                <tr>
                  <td>9x8 м</td>
                  <td>315 000 р</td>
                  <td>376 000 р</td>
                </tr>
                <tr>
                  <td>9x9 м</td>
                  <td>355 000 р</td>
                  <td>424 000 р</td>
                </tr>
                <tr>
                  <td>10x9 м</td>
                  <td>395 000 р</td>
                  <td>469 000 р</td>
                </tr>
                <tr>
                  <td>10x10 м</td>
                  <td>435 000 р</td>
                  <td>522 000 р</td>
                </tr>
              </tbody>
            </table>
          </template>

          <span class="additional-content__text-result">Итого:</span>
          <span class="additional-content__value">
            {{
              isNaN(parseInt(models[selectedTileId]))
                ? 0
                : formatNumber(
                    (models[selectedTileId] || 0) * selectedTile.price +
                      (checkboxes[selectedTileId] ? selectedTile.checkbox.addPrice * models[selectedTileId] : 0)
                  )
            }}<span class="currency">₽</span></span
          >
        </div>
      </div>
    </div>

    <Questions />
  </div>
</template>

<script>
export default {
  name: 'Foundation',
  transition: 'local-fade',
  types: [
    {
      mark: '5 160 руб за сваю',
      title: 'Свайно-винтовой фундамент',
      text: 'Надежный и современный вид фундамента. Возводится на любой почве (кроме каменистой и сильно заболоченной). Диаметр сваи - 108 мм. Стандартная длина - 2.5 м. С оцинковкой.',
      price: 5160,
      input: 'свай',
      checkbox: {
        addPrice: 500,
        text: 'увеличение длины сваи на 0.5 м',
        desc: '500 руб/шт',
      },
    },

    {
      mark: '5 900 руб за 1 шт.',
      title: 'ЖБ забивные сваи',
      text: 'Современные железобетонные сваи погружаются в землю на расчетную глубину методом забивки.',
      price: 5900,
      input: 'свай',
    },

    {
      mark: '15 000 руб/м3',
      title: 'Ленточный фундамент',
      text: 'Монолитная железобетонная полоса, заливаемая по всему периметру несущих стен строения.',
      price: 15000,
      input: 'куб.м',
      table: true,
      type: 'strip',
    },

    {
      mark: '15 000 руб/м3',
      title: 'Монолитная плита',
      text: 'Достаточно универсальный вид фундамента, который являет собой монолитную плиту. Она устанавливается по всей площади будущей постройки.',
      price: 15000,
      input: 'куб.м',
      table: true,
      type: 'monolithic',
    },

    {
      mark: '1 500 руб за тумбу',
      title: 'Опорно-столбчатый фундамент из бетонных блоков',
      text: 'Наиболее простой вариант фундамента. Подойдет для строительства легких строений плотном грунте с низким уровнем залегания грунтовых вод. Одна тумба: 400х400х400 мм. Состоит из четырех цементных блоков 200х200х400 мм.',
      price: 1500,
      input: 'тумб',
      checkbox: {
        addPrice: 1000,
        text: 'Посадка блоков на цементно-песочную смесь',
        desc: '1 000 руб/тумба',
      },
    },
  ],

  data() {
    return {
      models: [],
      checkboxes: {},
      selectedTileId: 0,
    };
  },

  computed: {
    selectedTile() {
      return this.$options.types[this.selectedTileId];
    },
  },

  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },

    selectTile(tileId) {
      this.selectedTileId = tileId;
      this.models = [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.foundation {
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

    .types {
      .type {
        width: vw(900px);
        margin-top: vw(40px);

        &-picture {
          height: vw(350px);
          width: inherit;
          position: relative;
          overflow: hidden;
          border-radius: vw(10px);
          cursor: pointer;
          background: {
            size: contain;
            position: center;
            repeat: no-repeat;
          }

          .mark {
            @include font(Lato, 900, normal, vw(24px));
            padding: vw(10px) vw(47px);
            background-color: #2cc37c;
            border-radius: vw(58px);
            position: absolute;
            top: vw(30px);
            left: vw(30px);
            color: white;
            z-index: 2;
          }

          .shadow {
            @extend %absolute;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.53) 0%, rgba(0, 0, 0, 0) 100%);
          }

          .content {
            position: absolute;
            left: vw(30px);
            bottom: vw(30px);

            &__title {
              @include font(Lato, 900, normal, vw(40px));
              color: white;
            }

            &__text {
              @include font(Lato, 400, normal, vw(20px));
              color: rgba(white, 0.7);
              margin-top: vw(20px);
            }
          }
        }

        .price {
          height: vw(129px);
          width: inherit;
          background-color: #f8f8f8;
          border-radius: vw(10px);
          margin-top: vw(30px);
          padding: 0 vw(30px);

          &__title {
            @include font(Lato, 900, normal, vw(24px));
            color: #333333;
            width: vw(261px);
          }

          .input-container {
            &__input {
              @include font(Lato, 400, normal, vw(18px));
              width: vw(49px);
              height: vw(37px);
              border-radius: vw(5px);
              background-color: transparent;
              border: vw(0.5px) solid rgba(51, 51, 51, 0.5);
              text-align: center;
            }

            .input-title {
              @include font(Lato, 400, normal, vw(18px));
              color: rgba(#333333, 0.8);
              margin-left: vw(15px);
              text-align: center;
            }

            &__text {
              @include font(Lato, 500, normal, vw(36px));
              margin-left: vw(100px);
              color: #333333;
              width: vw(180px);
              white-space: nowrap;
              text-align: right;
            }
          }
        }
      }
    }
  }

  .additional-container {
    margin-left: vw(30px);
    margin-top: vw(40px);

    .additional-content {
      display: inline-flex;
      background-color: #f8f8f8;
      border-radius: 10px;
      width: vw(663px);
      padding: vw(30px);

      &__title {
        @include font(Lato, 900, normal, vw(36px));
        color: #333333;
      }

      &__text {
        @include font(Lato, 400, normal, vw(24px));
        color: #333333;
        margin-top: vw(35px);

        &-result {
          @include font(Lato, 900, normal, vw(36px));
          color: #333333;
          margin-top: vw(125px);
        }
      }

      &__value {
        @include font(Lato, 900, normal, vw(36px));
        color: #333333;

        .currency {
          @include font(Lato, normal, normal, vw(36px));
          margin-left: vw(3px);
        }
      }

      .checkbox {
        margin-top: vw(21px);

        .input-container {
          margin-top: vw(20px);

          &__checkbox {
            @extend %content-center;
            appearance: none;
            width: vw(25px);
            height: vw(25px);
            border: vw(1px) solid rgba(51, 51, 51, 0.5);
            position: relative;
            border-radius: vw(5px);
            transition: ease 0.2s;
            transition-property: border-color, background-color;

            &::after {
              content: '';
              display: flex;
              width: vw(10px);
              height: vw(10px);
              background-color: white;
              opacity: 0;
              position: absolute;
              border-radius: 50%;
              transition: opacity ease 0.2s;
            }

            &:checked {
              background-color: #2cc37c;
              border-color: transparent;

              &::after {
                opacity: 1;
              }
            }
          }

          &__text {
            @include font(Lato, 400, normal, vw(18px));
            color: rgba(#333333, 0.7);
            margin-left: vw(10px);
          }
        }

        &__text {
          @include font(Lato, 900, normal, vw(18px));
          color: #333333;
          margin-top: vw(10px);
        }
      }

      table {
        @include font(Lato, normal, normal, vw(16px));
        margin-top: vw(25px);
        border-spacing: 0;
        border-collapse: collapse;
        color: rgba(#333333, 0.9);

        tr td {
          padding: 10px 5px;
          border: 1px solid #ddd;
        }

        td {
          padding: 10px;
        }
      }
    }
  }
}
</style>
