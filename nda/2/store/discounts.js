export const state = () => ({
  discounts: [],
});

export const mutations =  {
  setDiscounts(state, discounts) {
    state.discounts = discounts;
  },
};

export const getters = {
  getDiscount(state) {
    if (state.discounts[0]) {
      return state.discounts[0];
    }

    return null;
  }
};
