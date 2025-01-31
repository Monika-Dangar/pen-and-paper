import { useEffect, useState } from "react";
import { handleGetContentType } from '../services/contentService';
import { useParams } from "react-router-dom";

const useGetWriterContent = (isDeleted) => {
    const { contentType } = useParams();
    const [data, setData] = useState(null);
    const [loading, IsLoading] = useState(true);

    useEffect(() => {

        const getContent = async () => {
            IsLoading(false)
            try {

                const response = await handleGetContentType(contentType)
                if (response) {
                    setData(response.data.data);
                    IsLoading(false);
                }
            } catch (error) {
                console.log(`Error in fetching content: ${error}`);
            } finally {
                IsLoading(false);
            }
        }

        getContent();
    }, [contentType, isDeleted]);

    return { data, loading }
}

export default useGetWriterContent