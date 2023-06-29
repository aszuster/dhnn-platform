import axios from "axios"

export function allActivities() {
  return axios(`/api/calendar`)
}
