export const state = () => ({});

export const actions = {
  async nuxtServerInit({dispatch}) {
    await dispatch('retrieveFrontendData');
  },

  async retrieveFrontendData({commit}) {
    let data = await this.$axios.get(`${process.env.apiUrl}/frontend/data`);

    data = data.data;

    if (data.user !== null) {
      commit('user/setToken', data.access_token);
      commit('user/set', data.user);

      commit('discounts/setDiscounts', data.personal_discounts);
    }

    commit('products/setShoppingArea', data.shopping_area);
    commit('products/setProducts', data.products);
    commit('products/setCurrencyData', {
      code: data.currency_code,
      symbol: data.currency_symbol
    });
  },
};
