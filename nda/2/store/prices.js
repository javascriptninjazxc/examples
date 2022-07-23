export const state = () => ({
  prices: {
    "ru": {
      "basePrice": 29,
      "currencySign": "\u20bd",
      "currencyName": "RUB",
      "labels": [
        {
          "value": 1,
          "price": 29,
          "discountPrice": 0,
          "activeColor": "#00c1fa",
          "thumbClass": "yellow"
        },
        {
          "value": 7,
          "price": 129, "discountPrice": 0, "activeColor": "#00c1fa", "thumbClass": "orange"
        },
        {
          "value": 14,
          "price": 149,
          "discountPrice": 0
        },
        {
          "value": 30,
          "price": 199,
          "discountPrice": 0,
          "activeColor": "#00c1fa",
          "thumbClass": "yellow-pink"
        },
        {
          "value": 60,
          "price": 369,
          "discountPrice": 0
        },
        {
          "value": 90,
          "price": 549,
          "discountPrice": 0,
          "activeColor": "#00c1fa",
          "thumbClass": "pink"
        },
        {
          "value": 120,
          "price": 769,
          "discountPrice": 0
        },
        {
          "value": 150,
          "price": 949,
          "discountPrice": 0
        },
        {
          "value": 180,
          "price": 1099,
          "discountPrice": 0,
          "activeColor": "#00c1fa",
          "thumbClass": "red"
        }]
    },
    "en": {
      "basePrice": 1,
      "currencySign": "$",
      "currencyName": "USD",
      "labels": [{
        "value": 1,
        "price": 0.99,
        "discountPrice": 0,
        "activeColor": "#FFD210",
        "thumbClass": "yellow"
      }, {
        "value": 7,
        "price": 2.79,
        "discountPrice": 0,
        "activeColor": "#FBA842",
        "thumbClass": "orange"
      }, {"value": 14, "price": 4.49, "discountPrice": 0}, {
        "value": 30,
        "price": 7.29,
        "discountPrice": 0,
        "activeColor": "#F05A6B",
        "thumbClass": "yellow-pink"
      }, {"value": 60, "price": 13.79, "discountPrice": 0}, {
        "value": 90,
        "price": 20.49,
        "discountPrice": 0,
        "activeColor": "#EA2C69",
        "thumbClass": "pink"
      }, {"value": 120, "price": 26.49, "discountPrice": 0}, {
        "value": 150,
        "price": 32.49,
        "discountPrice": 0
      }, {"value": 180, "price": 38.99, "discountPrice": 0, "activeColor": "#ea2d32", "thumbClass": "red"}]
    }
  },
});

export const mutations = {
  set(state, prices) {
    state.prices = prices;
  },
};

export const actions = {
  async get() {
    // try {
    //   if (process.server) {
    //     try {
    //       return await new Promise((resolve, reject) => {
    //         const redis = require("redis");
    //         const client = redis.createClient({
    //           db: 0,
    //         });
    //         const PHPUnserialize = require('php-unserialize');
    //
    //         client.on('error', function (error) {
    //           console.error(error);
    //         });
    //
    //         client.get('socket_io:minority_cache:prices', (err, data) => {
    //           if (err) {
    //             reject(err);
    //           } else {
    //             let obj = JSON.parse(PHPUnserialize.unserialize(data));
    //
    //             if(obj) {
    //               resolve(obj);
    //             } else {
    //               reject(new Error('Can\'t find data in cache'));
    //             }
    //           }
    //         });
    //       });
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   }
    //
    //   let prices = await this.$axios.get(`${process.env.apiUrl}/price`);
    //
    //   return prices.data;
    // } catch (e) {
    //   console.error(e);
    //
    //   return null;
    // }

    return {
      "ru": {
        "basePrice": 79,
        "currencySign": "\u20bd",
        "currencyName": "RUB",
        "labels": [{
          "value": 1,
          "price": 79,
          "discountPrice": 0,
          "activeColor": "#FFD210",
          "thumbClass": "yellow"
        }, {
          "value": 7,
          "price": 199,
          "discountPrice": 0,
          "activeColor": "#FBA842",
          "thumbClass": "orange"
        }, {"value": 14, "price": 319, "discountPrice": 0}, {
          "value": 30,
          "price": 499,
          "discountPrice": 0,
          "activeColor": "#F05A6B",
          "thumbClass": "yellow-pink"
        }, {"value": 60, "price": 949, "discountPrice": 0}, {
          "value": 90,
          "price": 1399,
          "discountPrice": 0,
          "activeColor": "#EA2C69",
          "thumbClass": "pink"
        }, {"value": 120, "price": 1799, "discountPrice": 0}, {
          "value": 150,
          "price": 2199,
          "discountPrice": 0
        }, {"value": 180, "price": 2599, "discountPrice": 0, "activeColor": "#ea2d32", "thumbClass": "red"}]
      },
      "en": {
        "basePrice": 1,
        "currencySign": "$",
        "currencyName": "USD",
        "labels": [{
          "value": 1,
          "price": 0.99,
          "discountPrice": 0,
          "activeColor": "#FFD210",
          "thumbClass": "yellow"
        }, {
          "value": 7,
          "price": 2.79,
          "discountPrice": 0,
          "activeColor": "#FBA842",
          "thumbClass": "orange"
        }, {"value": 14, "price": 4.49, "discountPrice": 0}, {
          "value": 30,
          "price": 7.29,
          "discountPrice": 0,
          "activeColor": "#F05A6B",
          "thumbClass": "yellow-pink"
        }, {"value": 60, "price": 13.79, "discountPrice": 0}, {
          "value": 90,
          "price": 20.49,
          "discountPrice": 0,
          "activeColor": "#EA2C69",
          "thumbClass": "pink"
        }, {"value": 120, "price": 26.49, "discountPrice": 0}, {
          "value": 150,
          "price": 32.49,
          "discountPrice": 0
        }, {"value": 180, "price": 38.99, "discountPrice": 0, "activeColor": "#ea2d32", "thumbClass": "red"}]
      }
    }
  },
};

export const getters = {
  prices: (state) => {
    return state.prices;
  },
  localePrices: (state, getters) => (locale) => {
    if (getters.prices[locale]) {
      return getters.prices[locale];
    }

    throw new Error(`Locale prices not found`);
  },
  getPriceByDay: (state, getters) => (days, locale) => {
    let prices = getters.localePrices(locale);

    for (let data of prices.labels) {
      if (data.value === days) {
        return data.price;
      }
    }

    throw new Error(`Price by days not found`);
  },
  getCurrencySignByLocale: (state, getters) => (locale) => {
    return getters.localePrices(locale).currencySign;
  },
};
