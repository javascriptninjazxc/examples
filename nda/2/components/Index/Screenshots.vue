<template>
  <section class="compare-us">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-5">
          <div class="text-block">
            <h2 class="headline">{{ $t("index.items_disposal.title") }}</h2>
            <p>
              {{ $t("index.items_disposal.desc1") }}
            </p>
            <p>
              {{ $t("index.items_disposal.desc2") }}
            </p>
          </div>
        </div>

        <div class="col-md-7">
          <div class="video-container">
            <video
              autoplay
              loop="loop"
              muted
              src="https://i.imgur.com/yr4zUHL.mp4"
            ></video>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Screenshots",
  components: {}
};
</script>

<style scoped lang="scss">
.compare-us {
  padding-top: 164px;
  padding-bottom: 164px;

  h2 {
    font-size: 32px;
  }

  p {
    font-size: 16px;
    color: #c1bbc9;
  }

  video {
    position: relative;
    width: 100%;
    height: auto;

    transition: transform 0.3s;

    &:hover {
      transform: scale(1.7);
    }
  }
}
</style>
