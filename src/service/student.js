import { API_SERVER } from ".";

export default {
    list: (limit = 10, offset = 0) => {
        return API_SERVER.get('/student/list', {
            params: {
                limit, offset
            }
        })
    },
    listAll: () => {
        return API_SERVER.get('/student/list', {
        })
    },
    getById: (id) => {
        return API_SERVER.get(`/student/${id}`)
    },
    updateById: (formData) => {
        return API_SERVER.put(`/student/${formData.id}`, formData)
    },
    insert: (formData) => {
        return API_SERVER.post(`/student`, formData)
    },
    delete: (id) => {
        return API_SERVER.delete(`/student/${id}`)
    },
}