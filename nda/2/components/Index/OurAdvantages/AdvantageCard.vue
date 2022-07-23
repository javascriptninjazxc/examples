<template>
  <div class="card">
    <div class="icon"  :style="iconStyless" />
    <div class="icon-shadow"  :style="iconStyless" />

    <p class="text">
      <slot />
    </p>
  </div>
</template>

<script>
  export default {
    name: "AdvantageCard",
    props: {
      icon: {
        type: String,
      },
    },

    computed: {
      // iconsStyles() {
      //   switch (this.icon) {
      //     case "/images/advantages-icons/crate.svg":
      //       return 'icon-crate';
      //       break;

      //     case "/images/advantages-icons/speedo.svg":
      //       return 'icon-speedo';
      //       break;

      //     case "/images/advantages-icons/crown.svg":
      //       return 'icon-crown';
      //       break;

      //     case "/images/advantages-icons/landshaft.svg":
      //       return 'icon-landshaft';
      //       break;

      //     case "/images/advantages-icons/voicemsg.svg":
      //       return 'icon-voicemsg';
      //       break;

      //     case "/images/advantages-icons/brain.svg":
      //       return 'icon-brain';
      //       break;
      //   }
      // }

      iconStyless() {
        return {
          'mask': `url(${this.icon}) no-repeat center center`,
          'mask-size': 'contain',
          '-webkit-mask-image': `url(${this.icon})`,
          'mask-repeat': 'no-repeat',
          'mask-position': 'center center'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .card {
    display: block;
    width: 100%;
    height: 255px;
    border-radius: 3px;
    background-image: linear-gradient(-165deg, rgba(21, 23, 53, 0) 0%, #151735 100%);
    margin-top: 52px;

    position: relative;

    @media (max-width: 767px) {
      & {
        margin-top: 12px;
      }
    }

    p.text {
      text-align: center;
      color: #fff;

      width: 80%;

      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;

      bottom: 44px;

      font-size: 18px;
      font-weight: 500;
      line-height: 27px;

      @media (max-width: 767px) {
        & {
          width: 95%;
        }
      }
    }

    .icon {
      top: 44px;
      left: 0;
      position: absolute;

      background: linear-gradient(-165deg, #00c6fb 0%, #005bea 100%);

      height: 70px;
      width: 100%;

      z-index: 1;
    }

    .icon-shadow {
      top: 24px;
      left: 0;
      position: absolute;

      background: #6c6e98;;

      height: 210px;
      width: 100%;

      opacity: .075;
    }

    .icon-crate {
      mask: url("/images/advantages-icons/crate.svg") no-repeat center center;
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center center;
    }

    .icon-speedo {
      mask: url("/images/advantages-icons/speedo.svg") no-repeat center center;
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center center;
    }

    .icon-crown {
      mask: url("/images/advantages-icons/crown.svg") no-repeat center center;
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center center;
    }

    .icon-landshaft {
      mask: url("/images/advantages-icons/landshaft.svg") no-repeat center center;
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center center;
    }

    .icon-voicemsg {
      mask: url("/images/advantages-icons/voicemsg.svg") no-repeat center center;
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center center;
    }

    .icon-brain {
      mask: url("/images/advantages-icons/brain.svg") no-repeat center center;
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center center;
    }
  }
</style>
