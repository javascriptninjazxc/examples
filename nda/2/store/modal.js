export const state = () => ({
  modal: 1,
});

export const getters = {
  modalActual(state) {
    return state.modal;
  },
};

export const mutations = {
  setModal(state, payload) {
    state.modal = payload;
  },
};
