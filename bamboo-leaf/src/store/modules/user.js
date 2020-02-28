import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  // 重置 state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 设置 Token 信息
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 设置用户名称
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 设置用户头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 设置用户角色
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录，并将token设置到缓存中
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          let data = response;
          const { roles, username, avatar } = data
          if (!data) {
            reject('认证失败, 请重新登录..')
          }

          if (!roles || roles.length <= 0) {
            reject('用户角色为空, 请先为用户分配角色!')
          }

          commit('SET_ROLES', roles)
          commit('SET_NAME', username)
          // 用户头像
          commit('SET_AVATAR', avatar)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

