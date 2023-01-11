import axios from 'axios'
const baseUrl = '/api/persons'

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

// Get all contacts
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    create: create,
    getAll: getAll,
    update: update,
    deleteContact: deleteContact
}