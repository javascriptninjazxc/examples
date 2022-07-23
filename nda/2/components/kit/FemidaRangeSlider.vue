<template>
  <div class="range-slider-wrapper" :class="getWrapperClasses">
    <div class="femida-range-slider" ref="slider" @mousemove="move">
      <div class="thumb"
           @mousedown="start"
           @mouseup="stop"
           :style="getThumbStyles"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FemidaRangeSlider",
    computed: {
      thumbXComputed() {
        return `calc(${this.thumbX}% - 16px)`;
      },
      getThumbStyles() {
        return {
          left: this.thumbXComputed,
        }
      },
      getWrapperClasses() {
        return {
          dragging: this.dragging,
        }
      },
    },
    mounted: function () {
      document.addEventListener('mouseup', this.stop);
      document.addEventListener('mousemove', this.move);
    },
    beforeDestroy: function () {
      document.removeEventListener('mouseup', this.stop);
      document.removeEventListener('mousemove', this.move);
    },
    data: () => ({
      thumbX: 0,
      dragging: false,
    }),
    methods: {
      start() {
        this.dragging = true;
      },
      stop() {
        this.dragging = false;
      },
      move($event) {
        if (this.dragging === false) {
          return;
        }

        let elWidth = this.$refs.slider.clientWidth;

        if (elWidth > $event.target.clientWidth) {
          return;
        }



        let scale = 1;

        this.thumbX += $event.movementX / elWidth * 100 * scale;

        this.thumbX = Math.max(Math.min(100, this.thumbX), 0);
      }
    },
  }
</script>

<style scoped lang="scss">
  .femida-range-slider {
    width: 100%;
    height: 20px;

    background: linear-gradient(to right, #005bea 0%, #01c1fa 100%);

    border-radius: 71px;

    position: relative;

    .thumb {
      position: absolute;
      top: -8px;
      left: 0;

      width: 36px;
      height: 36px;
      box-shadow: 0 0 10px #02c0f9;
      border: 8px solid #00c2fa;
      background-color: #11122f;

      border-radius: 50%;

      cursor: pointer;
    }
  }
</style>
