import { useEffect, useState } from "react";
import { handleGetContentByCategory } from "../services/contentService";

const useGetContentByCategory = (category, liked, cmt) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            try {
                const response = await handleGetContentByCategory(category);
                if (response && response.data) {
                    setData(response.data.contents);
                }
            } catch (error) {
                console.log("Error in fetching content by category:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchContent();
    }, [category, liked, cmt]);

    return { data, loading };
};

export default useGetContentByCategory;
