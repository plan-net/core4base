import iHelper from './internal/$internal'
import { axiosInternal } from './internal/axios.config.js'
import axios from 'axios'
export default {
  login (user) {
    return axiosInternal
      .post('/login', user)
      .then(result => {
        window.localStorage.setItem('user', JSON.stringify(result.data))
        return result.data
      })
      .catch(error => Promise.reject(error))
  },
  async profile () {
    if (this.$profile != null) {
      return Promise.resolve(this.$profile)
    }
    return axiosInternal
      .get('/profile')
      .then(result => {
        this.$profile = Object.assign(result.data, {
          short: iHelper.shortName(result.data.realname)
        })
        return this.$profile
      })
      .catch(error => {
        throw new Error(`ApiService ${error}`)
      })
  },
  async version () {
    if(window.__VERSION__ != null){
      return {version: window.__VERSION__}
    }
    return axios
      .get('/_info?version')
      .then(result => {
        return result
      })
      .catch(error => {
        throw new Error(`ApiService ${error}`)
      })
  },
  async setting () {
    return axiosInternal
      .get('/setting/_general')
      .then(result => {
        return result
      })
      .catch(error => {
        throw new Error(`ApiService ${error}`)
      })
  },
  logout () {
    this.$profile = null
    return axiosInternal
      .get('/logout')
      .then(result => {
        return result.data
      })
      .catch(error => Promise.reject(error))
  },
  reset (data) {
    // resetten mit token und neuem passwort und token
    // anfordern mit email
    return axiosInternal
      .put('/login', data)
      .then(result => result)
      .catch(error => {
        return Promise.reject(error)
      })
  }
}
