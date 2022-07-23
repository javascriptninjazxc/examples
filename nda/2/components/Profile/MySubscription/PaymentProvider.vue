<template>
  <div class="provider"
       :class="{ active: active }"
       @mouseenter="showHint = true"
       @mouseleave="showHint = false">
    <div class="provider-content-wrapper">
      <div class="provider-content">
        <div class="image-container">
          <img :src="image" :alt="name">
        </div>
      </div>

      <div class="hint" v-if="showHint">
        {{ name }}
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "PaymentProvider",
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    showHint: false,
  }),
}
</script>

<style scoped lang="scss">
.provider {
  position: relative;
  margin-right: 16px;
  margin-bottom: 16px;
  width: 100%;
  height: 80px;
  max-width: 120px;

  cursor: pointer;

  $border-width: 2px;

  background: linear-gradient(90.65deg, #00C6FB 0.46%, #005BEA 113.59%);
  border-radius: 3px;
  padding: $border-width;

  .hint {
    z-index: 1339;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 8px 12px;
    background-color: black;
    //white-space: nowrap;
    width: auto;
  }

  &:hover, &.active {
    .provider-content-wrapper {
      background: rgba(0, 0, 0, 0);
    }
  }

  .provider-content-wrapper {
    position: absolute;
    top: $border-width;
    left: $border-width;

    width: calc(100% - 2px * 2);
    height: calc(100% - 2px * 2);

    transition: background .3s;

    background: #12264B;
    border-radius: 3px;
    padding: 8px;
  }

  .provider-content {
    position: relative;
    width: 100%;
    height: 100%;

    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .image-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      //margin-bottom: 4px;

      text-align: center;

      img {
        max-width: 100%;
        max-height: 100%;

        margin: auto;
      }
    }

    p {
      font-size: 16px;
      line-height: 16px;
      margin: 0;
    }

  }
}
</style>
