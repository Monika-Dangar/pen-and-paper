import api from './api'
export const loginWriter = async (username, password) => {
    try {

        const response = await api.post(`writer/login`, {
            username,
            password,
        })
        if (response) {
            return response;
        }

    } catch (error) {
        console.error('Error during login:', error);
    }
}
