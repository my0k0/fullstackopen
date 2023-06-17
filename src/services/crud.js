import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const create = newObject => {
    return axios.post(baseURL, newObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject).then(response => response.data)
}

const del = id => {
    return axios.delete(`${baseURL}/${id}`).then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll: getAll,
    create: create,
    update: update,
    delete: del
}