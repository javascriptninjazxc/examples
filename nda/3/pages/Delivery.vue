<template>
  <div class="delivery full-width full-height">
    <div class="background full-width align-center column-block">
      <div class="column-block">
        <div class="all-categories column-block">
          <div class="all-categories__title">Другие категории</div>
          <HouseCategories />
        </div>
      </div>
      <div class="route full-width">
        <span class="route__text">Главная > Доставка и оплата</span>
        <div class="route__title">Доставка и оплата</div>
      </div>
    </div>

    <div class="container column-block">
      <span class="container__text">
        Доставка строительного материала и бригады рабочих производится на собственном автотранспорте компании от нашей производственной базы в городе
        Пестово (Новгородская область). На данный момент действует акция, по которой <span class="bold">первые 500 км. не взимается оплата.</span> За
        последующий километраж необходимо будет доплатить из расчета <span class="bold">100 руб. за 1 км. пути.</span> Мы работаем по всей европейской
        части России, согласно зоне, выделенной зеленым цветом на карте.<br /><br />
        Более подробно рассчитать стоимость доставки можно с помощью калькулятора для яндекс-карт. Введите адрес доставки в форме выше, или укажите
        его с помощью курсора непосредственно на карте. Также Вы можете обратиться за помощью к нашим консультантам для более подробного расчета.
        Выгрузка материала осуществляется бесплатно в рамках 30 м. от стоянки автотранспорта. Если к участку невозможно подъехать на это расстояние -
        свяжитесь с нашим менеджером через форму обратной связи или по телефону. Мы рассчитаем стоимость доплаты за разгрузочные работы в
        индивидуальном порядке. <br /><br />
        Оплата осуществляется по принципу 70% на 30%. Первая часть - после доставки и выгрузки материала. Вторая часть - после сдачи объекта и
        подписания акта о приемке.
      </span>

      <DistanceCalc />
    </div>

    <Questions />
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

.delivery {
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

    &__text {
      @include font(Lato, normal, normal, vw(20px));
      color: #333333;
      line-height: vw(40px);
      margin-top: vw(25px);

      .bold {
        font-weight: 900;
      }
    }

    .distance-calc {
      padding: 0;
      margin-top: vw(20px);
    }
  }
}
</style>
