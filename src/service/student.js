import { API_SERVER } from ".";

export default {
    list: (gender, order = 'id', desc = 0, limit = 100, offset = 0) => {
        return API_SERVER.get('/student/list', {
            params: {
                gender,order, desc, limit, offset
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

    upload: (file) => {
        const formData= new FormData();
        formData.append("file",file);
        return API_SERVER.post(`/student/upload`,formData ,{
            'Content-type':'multipart/form-data'
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