import api from './api'
export const loginWriter = async (username, password) => {
    try {
        // console.log(`username: ${username} & ${password}`);

        const response = await api.post(`writer/login`, {
            username,
            password,
        })
        // console.log(response);
        if (response) {
            return response;
        }

    } catch (error) {
        console.error('Error during login:', error);
    }
}
