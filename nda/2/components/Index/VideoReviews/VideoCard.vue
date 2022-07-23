<template>
  <a class="video-card" :href="url" target="_blank">
    <img src="/video/creepblocker-preview.webp" alt="" class="image">

    <div class="video-top">
      <div class="text">
        <h3>{{ title }}</h3>
        <p>{{ text }}</p>
      </div>

      <div class="triangle">
        <div class="content"></div>
      </div>

    </div>

  </a>
</template>

<script>
  export default {
    name: "VideoCard",
    props: {
      title: String,
      text: String,
      url: String,
    },
  }
</script>

<style scoped lang="scss">
  .video-card {
    margin-top: 24px;
    display: inline-block;
    height: 170px;
    width: 100%;
    border: 1px solid #0e6acd;
    border-radius: 3px;

    overflow: hidden;

    position: relative;

    .image {
      width: 100%;
      height: auto;
    }

    .video-top {
      position: absolute;
      top: 0px;
      left: 0px;

      width: calc(100% - 0px);
      height: calc(100% - 0px);

      display: flex;
      flex-direction: row;

      align-items: flex-end;

      justify-content: space-between;

      padding: 20px;

      background-image: linear-gradient(180deg, rgba(17, 18, 47, 0) 0%, rgb(17, 18, 47) 100%);

      .triangle {
        width: 34px;
        height: 34px;
        background-image: linear-gradient(-90deg, rgb(0, 198, 251) 0%, rgb(0, 91, 234) 100%);
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        .content {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 7px 0 7px 11px;
          border-color: transparent transparent transparent #ffffff;
        }
      }

      .text {
        display: inline-block;
        max-width: calc(100% - 34px);

        h3 {
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 4px;
        }

        p {
          margin: 0;
          color: rgb(108, 110, 152);
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  }
</style>
