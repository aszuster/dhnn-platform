import axios from "axios"

export function allNews() {
  return axios(`/api/news`)
}

export function newsId({ id }) {
  return axios(`/api/news/${id}`)
}

export function newNews(headers) {
  return axios.post(`/api/news`, headers)
}

export function editNews([{ id }, headers]) {
  return axios.put(`/api/news/${id}`, headers)
}

export function deleteNews(id) {
  return axios.delete(`/api/news/${id}`)
}
