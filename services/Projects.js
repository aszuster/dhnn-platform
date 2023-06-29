import axios from "axios"

export function allProjects() {
  return axios(`/api/projects`)
}

export function projectId({ id }) {
  return axios(`/api/project/${id}`)
}

export function newProject(headers) {
  return axios.post(`/api/projects`, headers)
}

export function editProject([{ id }, headers]) {
  return axios.put(`/api/project/${id}`, headers)
}

export function deleteProject(id) {
  return axios.delete(`/api/project/${id}`)
}
