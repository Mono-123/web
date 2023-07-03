import { API_SERVER } from ".";

export default {
    list: (limit = 100, offset = 0) => {
        return API_SERVER.get('/score/list', {
            params: {
                limit:100, offset
            }
        })
    },
    getById: (id) => {
        return API_SERVER.get(`/score/${id}`)
    },
    updateById: (formData) => {
        return API_SERVER.put(`/score/${formData.id}`, formData)
    },
    insert: (formData) => {
        return API_SERVER.post(`/score`, formData)
    },
    delete: (id) => {
        return API_SERVER.delete(`/score/${id}`)
    },
}