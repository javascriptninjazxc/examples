<template>
  <div class="technologies full-width full-height">
    <div class="background full-width align-center column-block">
      <div class="column-block">
        <div class="all-categories column-block">
          <div class="all-categories__title">Другие категории</div>
          <HouseCategories />
        </div>
      </div>
      <div class="route full-width">
        <span class="route__text">Главная > Технологии</span>
        <div class="route__title">Технологии</div>
      </div>
    </div>

    <div class="choose-category full-width column-block">
      <span class="choose-category__title">Выберите категорию</span>

      <div class="categories-items row-block full-width">
        <NuxtLink v-for="category of $options.categories" :key="category.type" :to="category.type" append class="category">
          <div class="shadow full-width full-height"></div>
          <div class="title">{{ category.title }}</div>
        </NuxtLink>
      </div>
    </div>

    <Questions />
  </div>
</template>

<script>
export default {
  name: 'Technologies',
  transition: 'local-fade',
  categories: [
    {
      title: 'Дома из бруса',
      type: 'timber',
    },

    {
      title: 'Каркасные дома',
      type: 'frame',
    },
  ],
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.technologies {
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

  .choose-category {
    margin-top: vw(40px);
    padding: 0 vw(162px);
    margin-top: vw(70px);

    &__title {
      @include font(Lato, 900, normal, vw(48px));
      color: #333333;
    }

    .categories-items {
      margin-top: vw(70px);
      margin-bottom: vw(70px);

      .category {
        width: vw(450px);
        height: vw(450px);
        margin-right: vw(100px);
        border-radius: vw(10px);
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: transform ease 0.2s;

        &:hover {
          transform: scale(1.05);
        }

        &:first-child {
          background-color: #c7e1f9;
          background: {
            image: url('~/assets/img/Category/technologies/timber.png');
            size: cover;
            position: center;
          }
        }

        &:nth-child(2) {
          background-color: #b6ffd2;
          background: {
            image: url('~/assets/img/Category/technologies/frame.png');
            size: cover;
            position: center;
          }
        }

        &:nth-child(3) {
          margin-right: 0;
        }

        .shadow {
          @extend %absolute;
          background-image: linear-gradient(to top, rgba(black, 0.3), transparent 50%);
        }

        .title {
          @include font(Lato, 900, normal, vw(40px));
          position: absolute;
          bottom: vw(30px);
          left: vw(30px);
          color: white;
        }
      }
    }
  }
}
</style>
