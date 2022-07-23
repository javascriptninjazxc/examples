<template>
  <section class="buy-block">
    <div class="container">
      <div class="row pre-title">
        <div class="col-md-12">
          <h2 class="title">
            {{ $t("index.purchase.title") }}
            <span class="title-shadow">
              {{ $t("index.purchase.title") }}
            </span>
          </h2>
        </div>
      </div>

      <div class="container">
        <div class="row blocks">
          <div class="col-md-4">
            <BuyCard
              :price="
                this.$store.getters['products/getSubscriptionByDaysCount'](1)
                  .price
              "
              :term="$t('index.purchase.one_day')"
            />
          </div>
          <div class="col-md-4">
            <BuyCard
              :price="
                this.$store.getters['products/getSubscriptionByDaysCount'](7)
                  .price
              "
              :term="$t('index.purchase.seven_days')"
            />
          </div>
          <div class="col-md-4">
            <BuyCard
              :price="
                this.$store.getters['products/getSubscriptionByDaysCount'](30)
                  .price
              "
              :term="$t('index.purchase.thirty_days')"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BuyCard from "./BuyBlock/BuyCard";

export default {
  name: "BuyBlock",
  components: {
    BuyCard
  }
};
</script>

<style scoped lang="scss">
.buy-block {
  margin-bottom: 200px;

  @media (max-width: 375px) {
    & {
      margin-bottom: 56px;
    }
  }

  .pre-title {
    margin-bottom: 56px;
  }
}

.blocks {
  display: flex;
}

@media (max-width: 375px) {
  .pre-title {
    margin-bottom: 0 !important;
  }
}

@media (max-width: 767px) {
  .title {
    text-align: center;
  }
}

@media (max-width: 991px) {
  .blocks {
    flex-direction: column;
    align-items: center;
  }
}
</style>

<style lang="scss">
@media (max-width: 375px) {
  .buy-card {
    margin-bottom: 0 !important;
  }
}

@media (max-width: 991px) {
  .buy-card {
    // padding: 0 !important;
    margin-bottom: 5rem;
  }
}
</style>
