export default ({ app }, inject) => {
  const setHeader = (config) => {
    const accessToken = '81661be704d01a49e0b964c9c99cac783036e159ae6aa184ff7119745e75b228'

    return {
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }

  inject('get', (endpoint, config = {}) => {
    const endpoint2 = endpoint && endpoint.charAt(0) === '/' && endpoint.length > 0 ? endpoint : '/' + endpoint
    config = setHeader(config)
    return app.$axios.get(`${endpoint2}`, config)
  })

  inject('post', (endpoint, config = {}) => {
    const endpoint2 = endpoint && endpoint.charAt(0) === '/' && endpoint.length > 0 ? endpoint : '/' + endpoint
    config = setHeader(config)
    return app.$axios.post(`${endpoint2}`, config)
  })

  inject('patch', (endpoint, config = {}) => {
    const endpoint2 = endpoint && endpoint.charAt(0) === '/' && endpoint.length > 0 ? endpoint : '/' + endpoint
    config = setHeader(config)
    return app.$axios.patch(`${endpoint2}`, config)
  })

  inject('put', (endpoint, config = {}) => {
    const endpoint2 = endpoint && endpoint.charAt(0) === '/' && endpoint.length > 0 ? endpoint : '/' + endpoint
    config = setHeader(config)
    return app.$axios.put(`${endpoint2}`, config)
  })

  inject('delete', (endpoint, config = {}) => {
    const endpoint2 = endpoint && endpoint.charAt(0) === '/' && endpoint.length > 0 ? endpoint : '/' + endpoint
    config = setHeader(config)
    return app.$axios.delete(`${endpoint2}`, config)
  })
}
