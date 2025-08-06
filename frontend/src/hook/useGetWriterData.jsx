import { useEffect, useState } from 'react'
import { handleGetWriterData } from '../services/writerService'

const useGetWriterData = () => {
    const [data, setData] = useState();
    const [loading, IsLoading] = useState(true);

    useEffect(() => {
        const fetchWriterData = async () => {
            try {
                IsLoading(true)
                const response = await handleGetWriterData();
                if (response) {
                    // console.log(response);
                    setData(response.data.writerData);
                    IsLoading(false);
                }
            } catch (error) {
                console.log(`Error in getting writer data: ${error}`);
            } finally {
                IsLoading(false)
            }
        }
        fetchWriterData()
    }, [])
    return { data, loading }
}

export default useGetWriterData