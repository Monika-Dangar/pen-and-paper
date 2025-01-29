import { useEffect, useState } from 'react'
import { handleUploadContent } from '../services/contentService'

const useUploadContent = ({ contentType, postData }) => {
    const [response, setResponse] = useState();

    useEffect(() => {
        const uploadContent = async () => {

            if (!contentType || !postData) return;
            console.log(`contentType : ${contentType}, ${postData}`);

            try {
                const data = await handleUploadContent(contentType, postData);;
                if (data) {
                    console.log(data);
                    setResponse(data);
                }
            } catch (error) {
                console.log(`Error in uploding content: ${error}`);

            }
        }
        uploadContent()
    }, [contentType, postData])

    return { response }
}

export default useUploadContent