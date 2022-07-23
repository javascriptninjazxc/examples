<template>
  <div class="trial-unique" id="unique">
    <div class="trial-inner container">
      <div class="unique-header">
        <h4>Наши преимущества</h4>
        <p>В нашем скинченжере много уникальных фишек:</p>
      </div>

      <div class="unique-card d-flex justify-content-between flex-wrap">
        <div class="unique-card-item" v-for="(card, i) in unique" :key="i">
          <img
            :src="require(`@/assets/images/trial/unique/icon/${i + 1}.svg`)"
            alt="ssvg"
          />
          <p>{{ card }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unique: [
        "Все предметы прямо в инвентаре",
        "Изменение цветов кликов",
        "Уровни героев Dota+",
        "Можно менять ландшафт и деревья",
        "Легальный анализатор пиков",
        "Полная кастомизация профиля",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#unique {
  background: url("@/assets/images/trial/bg-2.png");
  background-color: #262b32;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  padding-bottom: 70px;

  &::before {
    background: url("@/assets/images/trial/padding/2.svg");
    content: "";
    position: absolute;
    height: 149px;
    width: 100%;
    background-size: cover;
    z-index: 2;
    bottom: -140px;
    background-repeat: NO-REPEAT;
  }
}

.unique {
  &-header {
    text-align: center;
    padding-top: 40px;
    margin-bottom: 100px;

    h4 {
      font-weight: 400;
      font-size: 36px;
      line-height: 180%;
      font-family: "Gang";

      letter-spacing: 0.05em;

      color: #ffffff;

      text-shadow: 0px 0px 15px rgba(251, 247, 247, 0.25);
    }

    p {
      font-weight: 700;
      font-size: 24px;
      line-height: 180%;
      /* or 43px */

      text-align: center;

      color: #ffffff;
    }
  }

  &-card {
    row-gap: 81px;
    &-item {
      background: url("@/assets/images/trial/unique/bg.svg");
      background-repeat: no-repeat;
      width: 350px;
      height: 255px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;

      &:hover {
        background: url("@/assets/images/trial/unique/bg-active.svg");
      }
    }
  }
}
</style>
