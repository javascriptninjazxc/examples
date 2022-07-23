<template>
  <section class="video-reviews">

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2 class="title">
            {{ $t('index.video_reviews.title') }}
            <span class="title-shadow">{{ $t('index.video_reviews.undertitle') }}</span>
          </h2>
        </div>
      </div>
    </div>

    <div class="container reviews">
      <div class="row">

        <div class="col-md-4">
          <VideoCard
            title="Инструкция"
            text="Быстрое описание функционала от команды Femida"
            url="https://www.youtube.com/watch?v=nb2Auqv2kgA"/>
        </div>

        <div class="col-md-4">
          <VideoCard
            title="Весь функционал"
            text="Описание всех возможностей ченджера от команды Femida"
            url="https://www.youtube.com/watch?v=UQu32OhnvX0"/>
        </div>

        <div class="col-md-4">
          <VideoCard
            title="Обзор от Repachino"
            text="Описание всех возможностей ченджера от команды Femida"
            url="https://www.youtube.com/watch?v=saOXDI2KhwA"/>
        </div>

        <div class="col-md-4">
          <VideoCard
            title="Обзор от Bloodmoon"
            text="Установка и использование"
            url="https://www.youtube.com/watch?v=ezBTDwkRG0Q"/>
        </div>

        <div class="col-md-4">
          <VideoCard
            title="Обзор от Wiksent"
            text="Краткий обзор и использование"
            url="https://www.youtube.com/watch?v=UDEKkiCecnQ"/>
        </div>

        <div class="col-md-4">
          <VideoCard
            title="Обзор от команды Femida"
            text="Описание всех возможностей ченджера от команды Femida"
            url="https://www.youtube.com/watch?v=YW-QEdbvj4Q"/>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
  import VideoCard from "./VideoReviews/VideoCard";

  export default {
    name: "VideoReviews",
    components: {
      VideoCard,
    },
  }
</script>

<style scoped lang="scss">
.reviews {
  margin-top: 40px;
  margin-bottom: 200px;
}

@media (max-width: 767px) {
  .title {
    left: -50px;
  }

  .reviews {
    margin-bottom: 100px;
  }
}

@media (max-width: 575px) {
  .title {
    white-space: normal;
    text-align: center;
    left: 0px;
  }
}
</style>
