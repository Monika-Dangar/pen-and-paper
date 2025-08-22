import { useEffect, useState } from 'react'
import loginWriter from '../services/loginService'

const useSignIn = ({ username, password }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState();

    useEffect(() => {
        const logIn = async () => {

            try {
                setLoading(true)
                const response = await loginWriter(username, password)

                if (response) {
                    setData(response)
                }
            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false)
            }
        }
        logIn()
    }, [])
    return { loading, data }
}

export default useSignIn