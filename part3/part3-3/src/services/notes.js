import axios from 'axios'
const baseURL = '/api/notes'

const getAll = () => {
    const note = {
        content: 'Testing Error',
        important: false,
        id: 6
    }
    return axios.get(baseURL).then(response => response.data.concat(note))
}

const create = newObject => {
    return axios.post(baseURL, newObject).then(response => response.data)
}

const update = async (id, newObject) => {
    const response = await axios.put(`${baseURL}/${id}`, newObject)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, update}