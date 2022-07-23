export const state = () => ({
  products: null,
  shoppingArea: 'global',
  currencyCode: 'usd',
  currencySymbol: '$',
});

export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setShoppingArea(state, area) {
    state.shoppingArea = area;
  },
  setCurrencyData(state, {code, symbol}) {
    state.currencyCode = code;
    state.currencySymbol = symbol;
  },
};

export const actions = {
  async get() {
    try {
      return await this.$axios.get(`${process.env.apiUrl}/product`);
    } catch (e) {
      console.error(e);

      return null;
    }
  },
};

export const getters = {
  getCurrencySymbol(state) {
    return state.currencySymbol;
  },
  getCurrencyCode(state) {
    return state.currencyCode;
  },

  // Возвращает все доступные продукты в зависимости от региона пользователя
  getAvailableProducts(state) {
    let result = state.products.filter((product) => {
      return product.product_region === state.shoppingArea;
    });

    if (result.length <= 0) {
      return state.products.filter((product) => {
        return product.product_region === 'cis';
      });
    }

    return result;
  },

  // Возвращает список продуктов-подписок для текущего региона
  getAvailableSubscriptions(state) {
    let result = state.products.filter((product) => {
      return product.product_type === 'subscription' && product.product_region === state.shoppingArea;
    });

    if(result.length <= 0) {
      return state.products.filter((product) => {
        return product.product_type === 'subscription' && product.product_region === 'cis';
      });
    }

    return result;
  },

  // Возвращает продукт подписки по количеству дней
  getSubscriptionByDaysCount(state, getters) {
    return (days) => {
      for (let product of getters.getAvailableSubscriptions) {
        if (product.product_params.days === days) {
          return product;
        }
      }

      return null;
    };
  },
};
