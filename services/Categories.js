import axios from "axios"

export function allCategories() {
  return axios("/api/operations/categories")
}
export function categoryById({ id }) {
  return axios(`/api/operations/categories/${id}`)
}
export function newCategory(headers) {
  return axios.post("/api/operations/categories", headers)
}
export function editCategory([{ id }, headers]) {
  return axios.put(`/api/operations/categories/${id}`, headers)
}
export function deleteCategory(id) {
  return axios.delete(`/api/operations/categories/${id}`)
}
