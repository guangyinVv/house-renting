import axios from 'axios'

export const getCity = JSON.parse(localStorage.getItem('hkzf_city')) || {}

// 获取定位城市
export const getCurrentCity = () => {
  const localCity = JSON.parse(localStorage.getItem('hkzf_city'))
  if (!localCity) {
    return new Promise((resolve, reject) => {
      try {
        var myCity = new window.BMapGL.LocalCity()
        myCity.get(async (result) => {
          var cityName = result.name
          const { data } = await axios.get(`/area/info?name=${cityName}`)
          localStorage.setItem('hkzf_city', JSON.stringify(data.body))
          resolve(data.body)
        })
      } catch (e) {
        reject(e)
      }
    })
  }
  return Promise.resolve(localCity)
}
