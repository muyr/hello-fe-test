import axios from 'axios'

export const fetchData = (fn) => {
  axios.get('http://www.dell-lee.com/react/api/demo.json').then((response) => {
    fn(response.data)
  })
}

export const fetchDataPromise = (url)=>{
  return axios.get(url)
}
