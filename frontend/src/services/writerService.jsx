import api from './api'

export const handleCreateWriter = async (data) => {
    try {
        const response = await api.post(`/writer/signup`, data);
        if (response) {
            // console.log(response);
            return response
        }
    } catch (error) {
        console.log(`Error in creating writer ${error}`);
    }
}

export const handleGetWriterData = async (writerId) => {
    try {
        const response = await api.get(`/writer/${writerId}`)
        if (response) {
            // console.log(response);
            return response;
        }
    } catch (error) {
        console.log(`Error in geting writer data..${error}`);

    }
}
