<template>
  <div class="button-wrapper">
    <button :type="type" :class="buttonClasses" v-if="!to"
            @click="$emit('click', $event)">
      <slot/>
    </button>

    <nuxt-link v-else-if="isNuxtLink" tag="button" :type="type" :class="buttonClasses" :to="to"
               @click="$emit('click', $event)">
      <slot/>
    </nuxt-link>

    <a v-else :href="to" target="_blank" :type="type" :class="buttonClasses"
       @click="$emit('click', $event)">
      <slot/>
    </a>
  </div>
</template>

<script>
export default {
  name: "FemidaButton",
  props: {
    type: {
      type: String,
      required: false,
      default: 'button',
    },
    block: {
      type: Boolean,
      required: false,
      default: false,
    },
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    transparent: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
    },
    mini: {
      type: Boolean,
      required: false,
      default: false,
    },
    weakRound: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      let classes = ['femida-button'];

      if (this.block) {
        classes.push('block');
      }

      if (this.rounded) {
        classes.push('rounded');
      }

      if (this.transparent) {
        classes.push('transparent');
      }

      if (this.mini) {
        classes.push('mini');
      }

      if (this.weakRound) {
        classes.push('weak-round');
      }

      if (this.disabled) {
        classes.push('disabled');
      }

      return classes;
    },
    isNuxtLink() {
      return this.to.startsWith('/');
    },
  },
}
</script>

<style scoped lang="scss">
.button-wrapper {
  &:not(:last-child) {
    margin-bottom: 16px;
  }

  .femida-button {
    color: #fff;
    background-image: linear-gradient(-45deg, rgb(0, 198, 251) 0%, rgb(0, 91, 234) 100%);
    line-height: 32px;

    padding: 12px 24px;

    border: 0px;

    text-decoration: none;

    display: inline-flex;
    align-items: center;
    position: relative;
    justify-content: center;
    margin: 0;

    white-space: nowrap;

    &.disabled {
      cursor: not-allowed;
      background-image: none;
      background-color: #2b2b35;

      color: rgba(255, 255, 255, .5);

      &:hover {
        box-shadow: none;
      }
    }

    &.weak-round {
      border-radius: 10px;
    }

    &.rounded {
      border-radius: 40px;
    }

    &.block {
      display: flex;
      width: 100%;
    }

    &.transparent {
      background: linear-gradient(0deg, rgba(0, 198, 251, 0.2) 0%, rgba(0, 91, 234, 0.2) 100%);
      border: 1px solid #008ff2;

      transition: background .3s;

      &:hover {
        background: #008ff2;
      }
    }

    &.mini {
      padding: 6px 12px;
    }

    // &:hover {
    // }
  }
}
</style>

<style lang="scss">
.femida-button {
  img {
    margin-right: 12px;
    height: 18px;
    width: auto;
    margin-top: -4px;
  }
}
</style>
