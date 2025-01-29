import { useEffect, useState } from 'react'
import { handleGetContentById } from '../services/contentService'

const useGetContentById = ({ contentId }) => {
    const [writingData, setData] = useState();

    useEffect(() => {
        const fetchContentById = async () => {
            if (!contentId) return;
            try {
                const response = await handleGetContentById(contentId);
                if (response) {
                    // console.log(response.data.data);
                    setData(response.data.data)
                }
            } catch (error) {
                console.log(`Error in fetching content by Id: ${error}`);

            }
        }
        fetchContentById()

    }, [contentId])

    return { writingData }
}

export default useGetContentById