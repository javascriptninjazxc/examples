<template>
  <div class="trial-how" id="how">
    <div
      class="trial-how-inner container align-items-center d-flex justify-content-between"
    >
      <div class="trial-how-column col-7">
        <img src="@/assets/images/Trial/how/preview.png" alt="" />
      </div>

      <div class="trial-how-column col-4">
        <h2>Что дает FEMIDA?</h2>
        <p>
          Femida разблокирует абсолютно все косметические предметы для
          персонажей, игровых интерфейсов, крипов, ландшафтов и музыки. Также
          Femida позволяет изменять цвета кликов и полностью кастомизировать
          свой профиль. Встроенный анализатор пиков - абсолютно легален и не
          использует данные из закрытых профилей.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#how {
  background: #1d2126;
  position: relative;
  padding-bottom: 70px;

  &::before {
    background: url("@/assets/images/trial/padding/3.svg");
    content: "";
    position: absolute;
    height: 149px;
    width: 100%;
    background-size: cover;
    z-index: 2;
    bottom: 0;
    background-repeat: NO-REPEAT;
  }
}
.trial-how {
  &-inner {
    padding-top: 130px;
  }
  &-column {
    h2 {
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
      font-size: 18px;
      line-height: 180%;
      /* or 43px */

      color: #ffffff;
    }
  }

  img {
    width: 100%;
  }
}
</style>
