import Vue from 'vue';

export const state = () => ({
  user: null,
  access_token: null,
});

export const mutations = {
  set(state, user) {
    if (!user || typeof user !== "object" || Object.keys(user).length === 0) {
      state.user = null;
    } else {
      state.user = user;
    }
  },
  setToken(state, token) {
    state.access_token = token;

    if (token) {
      this.$cookies.set('auth', {
        access_token: token,
      });
      this.$axios.setToken(token, 'Bearer');
    } else {
      this.$cookies.remove('auth');
      this.$axios.setToken(null);
    }
  },
};

export const getters = {
  user: state => {
    return state.user;
  },
  token: state => state.access_token,
  subscriptionPauseMaxDaysCount: state => {
    let end = Vue.moment.utc(state.user.expires_at);
    let totalDays = end.diff(Vue.moment(), 'days');

    return Math.min(Math.floor(totalDays / 2), 3);
  },
  getSubscriptionState: state => {
    if (state.user.subscription_frozen_length) {
      // подписка заморожена
      return 1;
    } else if (Date.parse(state.user.subscription_next_froze_date) > Date.now()) {
      // кулдаун заморозки
      return 2;
    } else if (Date.parse(state.user.expires_at) < Date.now()) {
      // нет активной подписки
      return 0;
    } else {
      if (Date.parse(state.user.expires_at) - Date.now() < 7 * 86400 * 1000) {
        // срок действия меньше 7 дней
        return 4;
      }

      // можно заморозить
      return 3;
    }
  },
  isActiveSubscription: state => {
    if (!state.user || !state.user.expires_at) {
      return false;
    }

    if (+Date.parse(state.user.expires_at) < new Date().getTime()) {
      return false;
    }

    return true;
  },
  expires_at: state => {
    if (!state.user.expires_at) {
      return null;
    }

    return Vue.moment.utc(state.user.expires_at);
  },
};

// import lsd from 'fingerprintjs2';

let timerInitializer = false;

export const actions = {
  async changePassword({}, {old_password, new_password}) {
    // console.log(process.env.apiUrl, old_password, new_password);
    return this.$axios.post(`${process.env.apiUrl}/user/password/change`, {
      old_password,
      new_password,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(response => {
        // console.log(response);
        if (response.status !== 200) {
          return {
            status: false,
            errors: [`Unknown status: ${response.status}`],
          }
        }

        // this.commit('user/set', response.data.user);

        return {
          status: true,
          data: response.data,
        };
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 422) {
            return {
              status: false,
              errors: err.response.data.errors,
            }
          }
        }

        return {
          status: false,
          errors: {
            old_password: 'Неизвестная ошибка: ' + err.toString(),
          },
        }
      })
  },

  // async pauseSubscription() {
  //   return this.$axios.post(`${process.env.apiUrl}/user/subscription/pause`)
  //     .then(response => {
  //       if (response.status !== 200) {
  //         return {
  //           status: false,
  //           message: `Unknown status: ${response.status}`,
  //         }
  //       }
  //
  //       this.commit('user/set', response.data.user);
  //
  //       return response.data;
  //     })
  //     .catch(e => ({
  //       status: false,
  //       message: e.message,
  //     }))
  // },

  // async unpauseSubscription() {
  //   return this.$axios.post(`${process.env.apiUrl}/user/subscription/unpause`)
  //     .then(response => {
  //       if (response.status !== 200) {
  //         return {
  //           status: false,
  //           message: `Unknown status: ${response.status}`,
  //         }
  //       }
  //
  //       this.commit('user/set', response.data.user);
  //
  //       return response.data;
  //     })
  //     .catch(e => ({
  //       status: false,
  //       message: e.message,
  //     }))
  // },

  async resetHwid() {

    return this.$axios.post(`${process.env.apiUrl}/user/hwid/reset`)
      .then(response => {
        if (response.status !== 200) {
          return {
            status: false,
            message: `Unknown status: ${response.status}`,
          }
        }

        this.commit('user/set', response.data.user);

        return response.data;
      })
      .catch(e => ({
        status: false,
        message: e.message,
      }))
  },

  // async fp() {
  //   return new Promise(resolve => {
  //     lsd.get(components => {
  //       resolve(components);
  //     });
  //   });
  // },

  async auth({commit}, {login, password, recaptchaToken}) {
    return this.$axios.post(`${process.env.apiUrl}/au1h`,
      {
        login,
        password,
        recaptchaToken,
      })
      .then(response => {
        if (response.data.access_token) {
          commit('setToken', response.data.access_token);

          let userData = response.data.user;

          commit('set', userData);

          setTimeout(() => {
            this.dispatch('retrieveFrontendData');
          });

          return {
            status: true,
            user: userData,
          };
        } else {
          return {
            status: false,
            errors: ['Неизвестная ошибка'],
          };
        }
      }, err => {
        if (err.response.status === 422) {
          return {
            status: false,
            errors: err.response.data.errors
          }
        } else if (err.response.status === 401) {
          return {
            status: false,
            errors: {
              login: ['В нашей базе данных нет пользователя с таким логином/паролем'],
            }
          }
        }

        console.log(err.response);

        return {
          status: false,
          errors: ['Неизвестная ошибка']
        }
      });
  },

  async logout({commit}) {
    // TODO: сделать здесь инвалидацию токена
    commit('setToken', null);
    commit('set', null);

    setTimeout(() => {
      this.dispatch('retrieveFrontendData');
    });

    return true;
  },

  async register({commit}, {login, password, email, recaptchaToken, referrer}) {
    return this.$axios.post(`${process.env.apiUrl}/auth/register`,
      {
        login,
        email,
        password,
        recaptchaToken,
        referrer,
      })
      .then(response => {
        // console.log(response);

        if (response.data.access_token) {
          let auth = {
            access_token: response.data.access_token,
          };

          commit('setToken', auth);
          this.$cookies.set('auth', auth);

          let userData = response.data.user;

          commit('set', userData);

          // Возможно костыль, надо подумать получше
          setTimeout(() => {
            this.dispatch('retrieveFrontendData');
          });

          return {
            status: true,
            user: userData,
          };
        } else {
          return {
            status: false,
            errors: ['Неизвестная ошибка'],
          };
        }
      }, err => {
        if (err.response.status === 422) {
          return {
            status: false,
            errors: err.response.data.errors
          }
        }

        console.log(err.response);

        return {
          status: false,
          errors: ['Неизвестная ошибка']
        }
      });
  },

  async get({commit}) {
    try {
      let c = this.$cookies.get('auth');
      this.$axios.setToken(c.access_token, 'Bearer');

      let user = await this.$axios.get(`${process.env.apiUrl}/auth/me`);

      if (!timerInitializer) {
        timerInitializer = true;

        if (!process.server) {
          setInterval(() => {
            let token = this.$cookies.get('auth');
            commit('setToken', token);
          });
        }

      }

      let data = user.data;

      commit('set', data.user);
      commit('setToken', data.access_token);

      return data;
    } catch (e) {
      console.error(e);
      return null;
    }

  },

  async sendReset({}, {email, recaptchaToken}) {
    return this.$axios.post(`${process.env.apiUrl}/auth/reset`,
      {
        email,
        recaptchaToken,
      })
      .then(response => {
        // console.log(response);

        if (response.data.status === true) {

          return response.data;
        } else {
          return {
            status: false,
            errors: ['Неизвестная ошибка'],
          };
        }
      }, err => {
        if (err.response.status === 422) {
          return {
            status: false,
            errors: err.response.data.errors
          }
        }

        console.error(err.response);

        return {
          status: false,
          errors: {
            general: [err.toString()],
          }
        }
      });
  },

  async validateResetCode({}, {email, resetCode, recaptchaToken}) {
    return this.$axios.post(`${process.env.apiUrl}/auth/validateResetCode`,
      {
        email,
        resetCode,
        recaptchaToken,
      })
      .then(response => {
        // console.log(response);

        if (response.data.status === true) {

          return response.data;
        } else {
          return {
            status: false,
            errors: ['Неизвестная ошибка'],
          };
        }
      }, err => {
        if (err.response.status === 422) {
          return {
            status: false,
            errors: err.response.data.errors
          }
        }

        console.error(err.response);

        return {
          status: false,
          errors: ['Неизвестная ошибка']
        }
      });
  },

  async setPasswordReset({}, {email, resetCode, password, recaptchaToken}) {
    return this.$axios.post(`${process.env.apiUrl}/auth/setPasswordReset`,
      {
        email,
        resetCode,
        password,
        recaptchaToken,
      })
      .then(response => {
        // console.log(response);

        if (response.data.status === true) {

          return response.data;
        } else {
          return {
            status: false,
            errors: ['Неизвестная ошибка'],
          };
        }
      }, err => {
        if (err.response.status === 422) {
          return {
            status: false,
            errors: err.response.data.errors
          }
        }

        console.error(err.response);

        return {
          status: false,
          errors: ['Неизвестная ошибка']
        }
      })
  }
};
