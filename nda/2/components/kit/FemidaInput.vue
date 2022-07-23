<template>
  <div class="input-wrapper">
    <input @input="$emit('input', $event.target.value)" v-bind:value="value" :type="type" :placeholder="placeholder">
    <span class="error-label" v-if="errorLabel && errorLabel.length">{{ errorLabel }}</span>
  </div>
</template>

<script>
  export default {
    name: "FemidaInput",
    props: {
      placeholder: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        required: false,
        default: 'text',
      },
      errorLabel: {
        type: String,
        required: false,
      },
      value: {
        type: String,
        required: false,
      }
    },
  }
</script>

<style scoped lang="scss">
  .input-wrapper {
    width: 100%;

    margin-bottom: 16px;

    position: relative;
    display: flex;
    flex-direction: column;

    .error-label {
      position: absolute;
      left: calc(100% + 12px);
      white-space: nowrap;
      margin: auto;

      top: calc(56px / 2 - 14px / 2);

      color: rgb(255, 122, 0);
      font-size: 14px;
      font-weight: 500;
    }

    input {
      border: 1px solid #212241;
      width: 100%;

      background-color: #0e0f2b;
      border-radius: 40px;

      padding: 12px 24px;

      line-height: 30px;

      color: #fff;

      font-size: 16px;
      font-weight: 500;

      transition: border .3s;

      &:focus {
        border: 1px solid #0075ee;
      }

      &::placeholder {
        color: rgba(108, 110, 152, .5);
      }
    }
  }
</style>
