<template>
  <div class="download-item">
    <h3>{{ title }}</h3>
    <FemidaButton rounded transparent block :to="url"><img :src="icon" class="dwn-icon"> {{ buttonLabel }}</FemidaButton>
    <span>
      <slot/>
    </span>
  </div>
</template>

<script>
  import FemidaButton from "../../kit/FemidaButton";

  export default {
    name: "DownloadItem",
    components: {
      FemidaButton,
    },

    props: {
      title: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },

      buttonLabel: {
        type: String,
        required: true,
      },

      icon: {
        type: String,
        // required: true,
      },
    },
  }
</script>

<style scoped lang="scss">
  .download-item {
    width: 100%;
    height: 255px;
    padding-top: 30px;
    padding-bottom: 30px;

    background-color: rgba(0, 0, 0, .1);
    border-radius: 3px;

    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      color: #fff;
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 32px;
    }

    span {
      color: rgb(108, 110, 152);
      line-height: 21px;
      // font-weight: 600;
      max-width: 200px;
      margin: 0;
      padding: 0;
      margin-top: 18px;
      text-align: center;

      img {
        height: 13px;
        margin-right: 4px;
      }
    }
  }

  // .dwn-icon {
  //   // margin-right: 8px;
  //   vertical-align: middle;
  //   // margin-bottom: 5px;
  // }

  .button-wrapper {
    height: 55px;
    width: 180px;
    text-align: center;
  }
</style>
