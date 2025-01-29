import { useEffect, useState } from "react";
import { handleGetContentType } from '../services/contentService';
import { useParams } from "react-router-dom";

const useGetWriterContent = (isDeleted) => {
    const { contentType } = useParams();
    const [data, setData] = useState(null);
    const [loading, IsLoading] = useState(true);

    useEffect(() => {

        const getContent = async () => {
            const response = await handleGetContentType(contentType)
            if (response) {
                // console.log(`Got writer all files`, response.data)
                setData(response.data.data);
                IsLoading(false);

            } else {
                IsLoading(false);
            }
        }
        getContent();
    }, [contentType, isDeleted]);

    return { data, loading }
}

export default useGetWriterContent