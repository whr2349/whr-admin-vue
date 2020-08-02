import http from './http'

export const login = (data) => http.post("/account", data)