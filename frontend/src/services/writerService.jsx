import api from './api'

export const handleCreateWriter = async (data) => {
    try {
        const response = await api.post(`/writer/signup`, data);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        throw new Error('Error occur during sign up.')
    }
}

export const handleGetWriterData = async (writerId) => {
    try {
        const response = await api.get(`/writer/${writerId}`)
        if (response) {
            return response;
        }
    } catch (error) {
        throw new Error("Error occur while getting writer data.")
    }
}
