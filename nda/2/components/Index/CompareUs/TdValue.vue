<template>
  <div class="td-value">
    <div class="td-success" v-show="success" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <div v-show="this.showDesc && desc && desc.trim().length > 0"
           class="td-description-text">
        {{ desc }}
      </div>
    </div>
    <div class="td-error" v-show="!success">

    </div>
  </div>
</template>

<script>
  export default {
    name: "TdValue",
    props: {
      success: {
        type: Boolean,
        required: true,
      },
      desc: {
        type: String,
        required: false,
      },
    },
    data: () => ({
      showDesc: false,
    }),
    methods: {
      mouseEnter() {
        this.showDesc = true;
      },
      mouseLeave() {
        this.showDesc = false;
      },
    },
  }
</script>

<style scoped lang="scss">
  .td-success {
    position: relative;
    display: inline-block;

    height: 12px;
    width: 12px;
    background-color: #31da61;
    border-radius: 50%;
  }

  .td-error {
    position: relative;
    display: inline-block;

    height: 12px;
    width: 2px;
    background-color: #e92d33;
    //border-radius: 50%;

    transform: rotate(45deg);

    &:after {
      content: ' ';
      position: absolute;

      height: 12px;
      width: 2px;

      background-color: #e92d33;
      left: 0;
      top: 0;

      transform: rotate(-90deg);
    }
  }

  .td-description-text {
    position: absolute;
    display: inline-block;
    top: -8px;
    left: calc(12px + 16px);

    text-align: left;

    width: 250px;
    padding: 12px;

    background-color: rgba(0, 0, 0, 1);

    z-index: 1;

    border-radius: 3px;

    &:after {
      content: ' ';
      position: absolute;

      top: 11px;
      left: -8px;

      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 8px 4px 0;
      border-color: transparent rgba(0, 0, 0, 1) transparent transparent;
    }
  }
</style>
