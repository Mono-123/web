import { API_SERVER } from ".";

export default {
    list: (order = 'id', desc = 0, limit = 10, offset = 0) => {
        return API_SERVER.get('/student/list', {
            params: {
                order, desc, limit, offset
            }
        })
    },

    listCondition: (condition, query) => {
        return API_SERVER.get(`/student/${condition}/${query}`, {
        })
    },

    conditionalQuery: (name, gender, grade, score) => {
        return API_SERVER.get(`/student/condition`, {
            params: {
                name, gender, grade, score
            }
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