<template>
  <div class="buy-card">
    <div class="wrapper" />

    <div class="content">
      <h3>{{ $t("index.purchase.access_for") }}</h3>
      <h2>{{ term }}</h2>
      <FemidaButton
        block
        rounded
        transparent
        to="/profile/my-subscription"
        mini
      >
        {{ $t("index.purchase.buy") }}
      </FemidaButton>
      <span class="price-tag">{{ price }} рублей</span>
    </div>

    <div class="underline" />

    <div class="chevron left" />
    <div class="chevron right" />
  </div>
</template>

<script>
import FemidaButton from "../../kit/FemidaButton";

export default {
  name: "BuyCard",
  components: {
    FemidaButton
  },
  props: {
    term: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.buy-card {
  position: relative;

  padding: 87px 84px 22px;

  display: flex;
  flex-direction: column;

  background: url(../../../assets/images/index/buy-card-bg.png) no-repeat center
    center;
  background-size: contain;

  text-align: center;

  @media (max-width: 575px) {
    & {
      padding: 40px 32px 22px;
    }
  }

  h2,
  h3 {
    margin: 0;
  }

  h3 {
    font-size: 16px;
    line-height: 19px;
  }

  h2 {
    font-size: 48px;
    margin-bottom: 40px;

    white-space: nowrap;
  }

  .price-tag {
    display: block;

    margin-top: 30px;

    margin-bottom: 60px;
  }

  .content {
    position: relative;
    z-index: 1;
  }

  .chevron {
    position: absolute;

    bottom: 10px;
    height: 100%;
    width: 40%;
    max-width: 92px;

    background: url(../../../assets/images/index/buy-block-chevron.png)
      no-repeat bottom;
    background-size: contain;

    &.left {
      left: 3%;
    }

    &.right {
      right: 3%;
      transform: scaleX(-1);
    }
  }

  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 70%;
    height: 100%;

    margin: 0 auto;

    background-image: linear-gradient(0deg, #19358c 0%, #0d2348 100%);
    mask: url(../../../assets/images/index/buy-card-mask.png) no-repeat;
    mask-size: contain;
    mask-position: center 140px;
  }

  .underline {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: 0 auto;

    width: 50%;
    height: 1px;
    background-image: linear-gradient(90deg, #005bea 0%, #00c5fb 100%);
  }
}
</style>
