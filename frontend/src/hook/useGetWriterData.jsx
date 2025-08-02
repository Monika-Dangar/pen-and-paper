import { useEffect, useState } from 'react'
import { handleGetWriterData } from '../services/writerService'

const useGetWriterData = () => {
    const [data, setData] = useState();
    const [loading, IsLoading] = useState(true);

    useEffect(() => {
        const fetchWriterData = async () => {
            try {
                const response = await handleGetWriterData();
                if (response) {
                    // console.log(response.data.writerData.data);
                    setData(response.data.writerData.data);
                    IsLoading(false);
                }
            } catch (error) {
                console.log(`Error in getting writer data: ${error}`);
            }
        }
        fetchWriterData()
    }, [])
    return { data, loading }
}

export default useGetWriterData