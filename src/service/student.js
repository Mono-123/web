import { API_SERVER } from ".";

export default {
    list: (limit = 10, offset = 0) => {
        return API_SERVER.get('/student/list', {
            params: {
                limit, offset
            }
        })
    },
    getById: (id) => {
        return API_SERVER.get(`/student/${id}`)
    },
    updateById: (formData) => {
        return API_SERVER.put(`/student/${formData.id}`, formData)
    },
}