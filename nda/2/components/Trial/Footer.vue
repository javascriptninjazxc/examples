<template>
  <div class="footer" id="footer">
    <div
      class="footer-inner container align-items-center d-flex justify-content-between"
    >
      <div class="footer-info">
        <nuxt-link v-for="(item, i) in footer.info" :key="i" :to="item.path">
          {{ item.title }}
        </nuxt-link>
      </div>

      <div class="footer-copyright">© femida.io, 2020</div>

      <div class="footer-social d-flex">
        <span class="language-switch__item">
          <svg
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 0H24V18H0V0Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 6H24V18H0V6Z"
              fill="#0039A6"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 12H24V18H0V12Z"
              fill="#D52B1E"
            />
          </svg>
        </span>

        <nuxt-link v-for="(item, i) in footer.social" :key="i" :to="item">
          <img
            :src="require(`@/assets/images/trial/footer/${i + 1}.svg`)"
            alt=""
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footer: {
        info: [
          {
            title: "Связаться с поддержкой",
            path: "/",
          },
          {
            title: "Пользовательское соглашение",
            path: "/",
          },
        ],
        social: ["/", "/", "/", "/"], // пути куда ссылка введет.
      },
    };
  },
};
</script>

<style lang="scss" scoped>
#footer {
  background: #1d2126;
}

.footer {
  padding-top: 112px;
  padding-bottom: 50px;
  &-info {
    display: flex;
    gap: 25px;
    a {
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #485058;

      &:hover {
        color: white;
      }
    }
  }

  .language-switch__item {
    background: rgba(108, 110, 152, 0.2);
    border-radius: 3px;
    padding: 11px 13px;
    display: inline-flex;
    align-items: center;
    margin-right: 40px;
  }

  &-social {
    a {
      background: linear-gradient(
        251.95deg,
        rgba(0, 198, 251, 0.1) -0.15%,
        rgba(0, 91, 234, 0.1) 100.05%
      );
      border: 1px solid #00c6fb;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 24px;
    }
  }
}
</style>
