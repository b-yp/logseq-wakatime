import request from "./request"

const { post } = request

export const sendHeartbeats = (body: { [key: string]: unknown }) => post('/users/current/heartbeats', body) 
