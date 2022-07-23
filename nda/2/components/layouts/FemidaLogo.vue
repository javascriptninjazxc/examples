<template>
  <div class="logo"></div>
</template>

<script>
  export default {
    name: "FemidaLogo"
  }
</script>

<style scoped lang="scss">
  .logo {
    width: 103px;
    height: 89px;

    color: #fff;

    background: #fff;
    mask: url(../../assets/images/logo.svg) no-repeat center center;
    mask-size: contain;

    stroke: #fff !important;
    fill: #fff !important;
  }
</style>
