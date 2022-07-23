export const state = () => ({
  filters: {
    'doma-iz-brusa': null,
    'karkasnie-doma': null,
    'doma-pod-usadku': null,
    barnhausy: null,
    'bani-iz-brusa': null,
  },
  prices: [],
});

export const mutations = {
  setPrices(state, data) {
    state.prices = data;
  },

  initFilters(state, type) {
    state.filters[type] = {};
  },

  setFilter(state, { category, type, items }) {
    state.filters[category][type] = items;
  },
};
