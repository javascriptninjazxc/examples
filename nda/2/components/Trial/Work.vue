<template>
  <div class="trial-work" id="work">
    <div class="work-inner container">
      <div class="trial-work-header">
        <h4>Наши преимущества</h4>
        <p>В нашем скинченжере много уникальных фишек:</p>
      </div>

      <div class="trial-work-card d-flex">
        <div
          class="trial-work-card-item col-4"
          v-for="(item, i) in work"
          :key="i"
        >
          <h2 class="card__identification mb-3">{{ i + 1 }}</h2>

          <span class="card__circle mb-3">
            <img
              :src="require(`@/assets/images/trial/work/${i + 1}.svg`)"
              alt=""
            />
          </span>

          <p class="text-center">
            {{ item }}
          </p>

          <div class="dashed-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      work: [
        "Пройдите простую регистрацию, которая не займет больше минуты.",
        "Скачайте и установите программу",
        "Кастомизируйте игру так, как вам захочется!",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#work {
  background: #262b32;
  height: 100%;
  padding-bottom: 70px;
  position: relative;

  &::before {
    background: url("@/assets/images/trial/padding/4.svg");
    content: "";
    position: absolute;
    height: 149px;
    width: 100%;
    background-size: cover;
    z-index: 2;
    bottom: -124px;
    background-repeat: NO-REPEAT;
  }
}

.trial-work {
  &-card {
    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .card__circle {
        background: linear-gradient(
          251.95deg,
          rgba(0, 198, 251, 0.1) -0.15%,
          rgba(0, 91, 234, 0.1) 100.05%
        );
        width: 120px;
        height: 120px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 2px solid rgba(0, 198, 251, 1);
        z-index: 2;
        position: relative;
      }

      p {
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
        /* or 150% */

        text-align: center;

        /* #FFFFFF */

        color: #ffffff;
        width: 70%;
      }

      &:hover .card__circle {
        background: linear-gradient(
          251.95deg,
          rgba(0, 198, 251, 0.5) -0.15%,
          rgba(0, 91, 234, 0.5) 100.05%
        );
      }
    }
  }
}

.trial-work-header {
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
</style>
