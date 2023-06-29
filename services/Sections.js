import axios from "axios"

/* SECTION */
export function allSections() {
  return axios("/api/operations/sections")
}

export function sectionById({ id }) {
  return axios(`/api/operations/sections/${id}`)
}
export function newSection(headers) {
  return axios.post("/api/operations/sections", headers)
}
export function editSection([{ id }, headers]) {
  return axios.put(`/api/operations/sections/${id}`, headers)
}
export function deleteSection(id) {
  return axios.delete(`/api/operations/sections/${id}`)
}
