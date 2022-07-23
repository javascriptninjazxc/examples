<template>
  <section class="our-advantages">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2 class="title">
            {{ $t("index.why_us.title") }}
            <span class="title-shadow">
              {{
                $t("index.why_us.title")
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")
              }}
            </span>
          </h2>
        </div>
      </div>

      <div class="row cards-row">
        <div class="col-md-4">
          <advantage-card icon="/images/advantages-icons/crate.svg">
            {{ $t("index.why_us.1") }}
          </advantage-card>
        </div>
        <div class="col-md-4">
          <advantage-card icon="/images/advantages-icons/speedo.svg">
            {{ $t("index.why_us.2") }}
          </advantage-card>
        </div>
        <div class="col-md-4">
          <advantage-card icon="/images/advantages-icons/crown.svg">
            {{ $t("index.why_us.3") }}
          </advantage-card>
        </div>

        <div class="col-md-4">
          <advantage-card icon="/images/advantages-icons/landshaft.svg">
            {{ $t("index.why_us.4") }}
          </advantage-card>
        </div>
        <div class="col-md-4">
          <advantage-card icon="/images/advantages-icons/voicemsg.svg">
            {{ $t("index.why_us.5") }}
          </advantage-card>
        </div>
        <div class="col-md-4">
          <advantage-card icon="/images/advantages-icons/brain.svg">
            {{ $t("index.why_us.6") }}
          </advantage-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AdvantageCard from "./OurAdvantages/AdvantageCard";

export default {
  name: "OurAdvantages",
  components: {
    AdvantageCard
  }
};
</script>

<style scoped lang="scss">
.our-advantages {
  margin-bottom: 100px;
}

@media (max-width: 575px) {
  .title {
    text-align: center;
    white-space: normal;
  }
}
</style>
