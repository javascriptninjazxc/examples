<template>
  <section class="compare-us">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="text-block">
            <h2 class="headline">{{ $t("index.still_in_doubts.title") }}</h2>
            <p>
              {{ $t("index.still_in_doubts.compare_us") }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 compare-table-column">
          <table class="compare-table">
            <thead>
              <tr>
                <th></th>
                <th>{{ $t("index.still_in_doubts.femida") }}</th>
                <th>{{ $t("index.still_in_doubts.competitors") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{{ $t("index.still_in_doubts.items_fast") }}</th>
                <td>
                  <TdValue
                    :success="true"
                    desc="После добавление вещи в игру наша программа автоматически добавит её в ваш инвентарь"
                  ></TdValue>
                </td>
                <td>
                  <TdValue :success="false"></TdValue>
                </td>
              </tr>

              <tr>
                <th>{{ $t("index.still_in_doubts.customer_support") }}</th>
                <td>
                  <TdValue
                    :success="true"
                    desc="Если у вас есть предложения или возникла проблема вы можете обратиться в поддержку пользователей"
                  ></TdValue>
                </td>
                <td>
                  <TdValue :success="false"></TdValue>
                </td>
              </tr>

              <tr>
                <th>{{ $t("index.still_in_doubts.change_items") }}</th>
                <td>
                  <TdValue
                    :success="true"
                    desc="Предметы добавляются прямиком в ваш инвентарь. Благодаря этому вы можете одевать персонажа не выходя из игры"
                  ></TdValue>
                </td>
                <td>
                  <TdValue :success="false"></TdValue>
                </td>
              </tr>

              <tr>
                <th>{{ $t("index.still_in_doubts.hero_items") }}</th>
                <td>
                  <TdValue
                    :success="true"
                    desc="Уникальный алгоритм работы позволяет не отображать вещи на противниках; вещи будут видны только на вашем персонаже и подконтрольных юнитах"
                  ></TdValue>
                </td>
                <td>
                  <TdValue :success="false"></TdValue>
                </td>
              </tr>

              <tr>
                <th>{{ $t("index.still_in_doubts.styles_available") }}</th>
                <td>
                  <TdValue :success="true"></TdValue>
                </td>
                <td>
                  <TdValue :success="false"></TdValue>
                </td>
              </tr>

              <tr>
                <th>{{ $t("index.still_in_doubts.personal_available") }}</th>
                <td>
                  <TdValue :success="true"></TdValue>
                </td>
                <td>
                  <TdValue :success="false"></TdValue>
                </td>
              </tr>

              <tr>
                <th>{{ $t("index.still_in_doubts.startup_time") }}</th>
                <td>
                  <th>{{ $t("index.still_in_doubts.less_than_5_secs") }}</th>
                </td>
                <td>
                  {{ $t("index.still_in_doubts.a_few_mins") }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TdValue from "./CompareUs/TdValue";

export default {
  name: "Screenshots",
  components: {
    TdValue
  }
};
</script>

<style scoped lang="scss">
.compare-table-column {
  margin-top: 56px;

  .compare-table {
    border-collapse: collapse;
    overflow-x: scroll;

    thead {
      th {
        font-size: 20px;
        padding: 16px;
      }
    }

    tbody {
      tr {
        border-collapse: initial;

        th {
          text-align: left;
        }

        th,
        td {
          padding-top: 24px;
          padding-bottom: 24px;
        }

        td {
          text-align: center;
        }

        &:not(:last-child) {
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
        }
      }
    }
  }
}

.compare-us {
  padding-top: 32px;
  padding-bottom: 164px;

  .compare-table {
    width: 100%;
  }

  .text-block {
    text-align: center;

    h2 {
      font-size: 32px;
      margin: 0;
    }

    p {
      font-size: 16px;
      color: #c1bbc9;
    }
  }
}
</style>
