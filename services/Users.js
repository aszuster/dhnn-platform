import axios from "axios"

export function allUsers() {
  return axios(`/api/users`)
}

export function userId({ id }) {
  return axios.get(`/api/user/${id}`)
}

export function newUser(headers) {
  return axios.post(`/api/users`, headers)
}

export function editUser([{ id }, headers]) {
  return axios.put(`/api/user/${id}`, headers)
}

export function deleteUser(id) {
  return axios.delete(`/api/user/${id}`)
}
