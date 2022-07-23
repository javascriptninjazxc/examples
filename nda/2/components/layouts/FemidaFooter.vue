<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="footer-flex">
          <ul class="footer-links">
            <li class="headline">{{ $t("footer.product") }} ——</li>
            <li class="link">
              <a href="https://vk.me/femida_io" target="_blank">
                {{ $t("footer.customer_support") }}
              </a>
            </li>
            <li class="link">
              <a
                href="https://cdn.femida.io/FemidaLauncherSetup.exe"
                target="_blank"
              >
                {{ $t("footer.downloads") }}
              </a>
            </li>
            <li class="link">
              <a href="https://vk.com/femida.io" target="_blank">
                {{ $t("footer.vkontakte") }}
              </a>
            </li>
          </ul>

          <ul class="footer-links">
            <li class="headline">{{ $t("footer.policies") }} ——</li>
            <li class="link">
              <a href="/terms_of_use.pdf" target="_blank">
                {{ $t("footer.terms_and_conditions") }}
              </a>
            </li>
            <li class="link">
              <a href="/privacy_policy.pdf" target="_blank">
                {{ $t("footer.privacy_policy") }}
              </a>
            </li>
            <li class="link">
              <a href="/data_processing.pdf" target="_blank">
                {{ $t("footer.data_processing") }}
              </a>
            </li>
          </ul>
        </div>

        <no-ssr>
          <div class="footer-ie-info">
            ИП Обухов Максим Вячеславович, ОГРНИП 320532100010820, ИНН
            532116121378, email: info@femida.io, +79509150232
          </div>
        </no-ssr>

        <div class="footer-logos">
          <a href="https://info.paymaster.ru" target="_blank">
            <img src="~/assets/images/payments/logos.png" alt="" />
          </a>
          <a href="https://info.paymaster.ru" target="_blank">
            <img src="~/assets/images/payments/paymaster.png" alt="" />
          </a>
          <a
            href="https://www.digitalocean.com/?refcode=5ce6cf2dc8f5&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"
            target="_blank"
          >
            <img
              src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg"
              alt="DigitalOcean Referral Badge"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FemidaFooter"
};
</script>

<style lang="scss">
.footer-ie-info {
  width: 100%;
  margin-top: 12px;
  padding-top: 12px;
  text-align: center;
  border-top: 1px solid #6c6e98;

  color: #6c6e98;
}

.footer-flex {
  display: flex;
  justify-content: space-between;

  @media (max-width: 575px) {
    & {
      flex-wrap: wrap;
    }
  }
}

.footer-bg {
  background-image: url(../../assets/images/footer_bg.webp);
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: contain;
}
</style>

<style scoped lang="scss">
footer {
  width: 100%;
  padding-top: 32px;
  padding-bottom: 32px;
  /*height: 115px;*/
  background-color: rgba(0, 0, 0, 0.55);

  display: flex;
  align-items: center;

  align-self: flex-end;

  .footer-logos {
    width: 100%;
    padding-top: 24px;
    display: flex;
    justify-content: flex-end;

    a:not(:last-child) {
      margin-right: 8px;
    }

    img {
      height: 64px;
      border-radius: 5px;
    }
  }

  ul {
    list-style: none;
    padding: 0;

    display: flex;
    flex-direction: column;

    margin-right: 24px;

    li {
      &:not(:last-child) {
        margin-bottom: 12px;
      }

      a {
        color: rgb(255, 255, 255);
        font-size: 16px;
        font-weight: 500;
        text-decoration: none;

        transition: color 0.3s;

        &:not(:hover) {
          color: rgb(108, 110, 152);
        }
      }

      &.headline {
        font-size: 18px;

        color: #fff;
        font-weight: bold;
      }
    }
  }
}

@media (max-width: 575px) {
  footer {
    padding: 8px 12px;
    flex-wrap: wrap;

    ul {
      width: 100%;
      margin-right: 0;
    }
  }
}
</style>
