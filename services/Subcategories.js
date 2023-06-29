import axios from "axios"

/* SUBCATEGORY */
export function allSubCategories() {
  return axios("/api/operations/subcategories")
}
export function subcategoryById({ id }) {
  return axios(`/api/operations/subcategories/${id}`)
}
export function newSubCategory(headers) {
  return axios.post("/api/operations/subcategories", headers)
}
export function editSubCategory([{ id }, headers]) {
  return axios.put(`/api/operations/subcategories/${id}`, headers)
}
export function deleteSubCategory(id) {
  return axios.delete(`/api/operations/subcategories/${id}`)
}
