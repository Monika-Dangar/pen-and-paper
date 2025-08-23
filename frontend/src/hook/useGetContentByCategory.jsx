import { useEffect, useState } from "react";
import { handleGetContentByCategory } from "../services/contentService";

const useGetContentByCategory = (filter, liked, cmt) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            try {
                const response = await handleGetContentByCategory(filter);
                if (response && response.data) {
                    setData(response.data);
                }
            } catch (error) {
                console.log("Error in fetching content by category:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchContent();
    }, [filter, liked, cmt]);

    return { data, loading };
};

export default useGetContentByCategory;
