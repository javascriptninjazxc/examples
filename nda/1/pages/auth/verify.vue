<template>
  <div class="main-container">
    <div class="verify">
      <div class="verify__content">
        <div class="verify__box">
          <div class="verify__header">
            <div class="verify__avatar">
              <IconVerify />
            </div>
            <h1 class="verify__title">
              avangard.grk@gmail.com
            </h1>
            <p class="verify__descr">
              Please enter the code that we sent
              you by email
            </p>
          </div>
          <div class="verify__body">
            <div class="verify__items">
              <div class="verify__item">
                <CodeInput :loading="false" class="input" v-on:change="onChange" v-on:complete="onComplete" />
              </div>
            </div>
          </div>
          <div class="verify__footer">
            <ButtonSecondary style="width:100%;display:flex;align-items:center;justify-content:center;">
              Log In
            </ButtonSecondary>
            <div class="verify__msg">
              <div class="verify__error">
                <IconDanger />
                <h3 class="verify__error-msg">
                  You entered an incorrect code
                </h3>
              </div>
            </div>
            <h4 class="verify__code">Resent code: <a href="#"> Send (00:54)</a></h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeInput from "../../components/input/CodeInput.vue";

export default {
  name: "app",
  components: {
    CodeInput
  },
  methods: {
    onChange(v) {
      console.log("onChange ", v);
    },
    onComplete(v) {
      console.log("onComplete ", v);
    }
  }
};
</script>